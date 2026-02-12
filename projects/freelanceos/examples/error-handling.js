/**
 * Error Handling Pattern for Production Automation
 *
 * Philosophy: Fail-safe design with human notification
 * - Never silently fail
 * - Retry transient errors (rate limits, network timeouts)
 * - Alert human for persistent failures
 * - Continue processing other jobs (don't block)
 */

// ===== PATTERN 1: Retry with Exponential Backoff =====

async function callExternalAPIWithRetry(apiFunction, params, maxRetries = 3) {
  let lastError;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      // Attempt API call
      const result = await apiFunction(params);
      return { success: true, data: result };

    } catch (error) {
      lastError = error;

      // Check if error is retryable
      if (isRetryableError(error)) {
        // Exponential backoff: 1s, 2s, 4s
        const delayMs = Math.pow(2, attempt) * 1000;
        console.log(`Attempt ${attempt + 1} failed. Retrying in ${delayMs}ms...`);
        await sleep(delayMs);
        continue;
      } else {
        // Non-retryable error (bad request, auth failure, etc.)
        break;
      }
    }
  }

  // All retries failed
  return { success: false, error: lastError };
}

function isRetryableError(error) {
  // Retryable: Network issues, rate limits, server errors
  const retryableCodes = [429, 500, 502, 503, 504];
  return retryableCodes.includes(error.status) || error.code === 'ETIMEDOUT';
}

// ===== PATTERN 2: Fail-Safe with Telegram Alert =====

async function generateProposalFailSafe(jobData) {
  try {
    // Main workflow logic
    const result = await callExternalAPIWithRetry(
      claudeAPI.generateProposal,
      jobData
    );

    if (result.success) {
      return result.data;
    } else {
      // Retries exhausted → Alert human
      throw result.error;
    }

  } catch (error) {
    // Send detailed alert to Telegram
    await sendErrorAlert({
      workflow: 'Proposal Generator',
      job: jobData.title,
      error: error.message,
      action: 'Please generate proposal manually'
    });

    // Log error to database (for analytics)
    await logError({
      workflow: 'proposal-generator',
      jobId: jobData.id,
      error: error.message,
      stack: error.stack
    });

    // Mark job for manual review (don't lose it)
    await markJobForManualReview(jobData.id);

    // Return error state (workflow continues, doesn't crash)
    return null;
  }
}

async function sendErrorAlert({ workflow, job, error, action }) {
  await telegram.sendMessage({
    chat_id: ADMIN_ID,
    text: `❌ *${workflow} Failed*\n\n` +
          `Job: ${job}\n` +
          `Error: ${error}\n\n` +
          `Action: ${action}`,
    parse_mode: 'Markdown'
  });
}

// ===== PATTERN 3: Graceful Degradation =====

async function processJobWithDegradation(job) {
  let proposal = null;
  let score = null;

  // Try to score job
  try {
    score = await scoreJob(job);
  } catch (error) {
    // Scoring failed → Use default/manual review
    console.log('Scoring failed, marking for manual review');
    score = null; // Will trigger manual review
  }

  // Try to generate proposal (only if score is good)
  if (score && score >= 70) {
    try {
      proposal = await generateProposalFailSafe(job);
    } catch (error) {
      // Proposal generation failed → User can write manually
      console.log('Proposal generation failed, continuing without it');
      proposal = null;
    }
  }

  // Create ClickUp task (even if some steps failed)
  try {
    await createClickUpTask({
      title: job.title,
      score: score || 'Manual Review',
      proposal: proposal || 'Generate manually',
      status: proposal ? 'Ready to Send' : 'Needs Manual Review'
    });
  } catch (error) {
    // ClickUp failed → Telegram fallback
    await telegram.sendMessage({
      chat_id: ADMIN_ID,
      text: `⚠️ ClickUp unavailable. Job: ${job.title}\nScore: ${score}\nProposal: ${proposal ? 'Generated' : 'Failed'}`
    });
  }
}

// ===== PATTERN 4: Circuit Breaker =====

class CircuitBreaker {
  constructor(threshold = 5, timeout = 60000) {
    this.failureCount = 0;
    this.threshold = threshold;
    this.timeout = timeout;
    this.state = 'CLOSED'; // CLOSED, OPEN, HALF_OPEN
    this.nextAttempt = Date.now();
  }

  async call(fn) {
    // Circuit is OPEN (too many failures) → Fail fast
    if (this.state === 'OPEN') {
      if (Date.now() < this.nextAttempt) {
        throw new Error('Circuit breaker is OPEN');
      }
      // Timeout elapsed → Try again (HALF_OPEN)
      this.state = 'HALF_OPEN';
    }

    try {
      const result = await fn();
      // Success → Reset circuit
      this.failureCount = 0;
      this.state = 'CLOSED';
      return result;

    } catch (error) {
      this.failureCount++;

      // Too many failures → OPEN circuit
      if (this.failureCount >= this.threshold) {
        this.state = 'OPEN';
        this.nextAttempt = Date.now() + this.timeout;
        await sendErrorAlert({
          workflow: 'Circuit Breaker',
          job: 'N/A',
          error: `Service failing repeatedly (${this.failureCount} failures)`,
          action: 'Circuit opened for 60 seconds'
        });
      }

      throw error;
    }
  }
}

// Usage
const claudeCircuit = new CircuitBreaker();

async function callClaudeWithCircuitBreaker(jobData) {
  try {
    return await claudeCircuit.call(() => claudeAPI.generateProposal(jobData));
  } catch (error) {
    // Circuit open or call failed
    return null;
  }
}

// ===== PATTERN 5: Error Logging for Analytics =====

async function logError({ workflow, jobId, error, stack }) {
  await db.query(`
    INSERT INTO errors (workflow, job_id, error_message, stack_trace, created_at)
    VALUES ($1, $2, $3, $4, NOW())
  `, [workflow, jobId, error, stack]);
}

// Periodic analysis to identify chronic issues
async function analyzeErrorPatterns() {
  const result = await db.query(`
    SELECT workflow, error_message, COUNT(*) as count
    FROM errors
    WHERE created_at > NOW() - INTERVAL '7 days'
    GROUP BY workflow, error_message
    ORDER BY count DESC
    LIMIT 10
  `);

  // Send weekly error digest
  const digest = result.rows.map(row =>
    `${row.workflow}: ${row.error_message} (${row.count}x)`
  ).join('\n');

  await telegram.sendMessage({
    chat_id: ADMIN_ID,
    text: `📊 *Weekly Error Digest*\n\n${digest}`,
    parse_mode: 'Markdown'
  });
}

// ===== KEY CONCEPTS =====

/**
 * 1. Retry Logic:
 *    - Exponential backoff prevents overwhelming failing services
 *    - Max retries limit prevents infinite loops
 *    - Only retry transient errors (rate limits, timeouts)
 *
 * 2. Human Notification:
 *    - Immediate Telegram alert (< 1 second)
 *    - All context included (which job, what error, what to do)
 *    - Actionable alerts (not just "something failed")
 *
 * 3. Graceful Degradation:
 *    - Partial success is better than total failure
 *    - Continue processing even if some steps fail
 *    - Example: Can't generate proposal? Still create ClickUp task for manual review
 *
 * 4. Circuit Breaker:
 *    - Prevent cascading failures
 *    - Fast-fail when service is down (don't wait for timeout on every call)
 *    - Auto-recovery (half-open state)
 *
 * 5. Audit Trail:
 *    - Log all errors to database
 *    - Analyze patterns (is service X unreliable on weekends?)
 *    - Inform infrastructure decisions
 */

// ===== UTILITY FUNCTIONS =====

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function markJobForManualReview(jobId) {
  await db.query(`
    UPDATE jobs SET status = 'needs_manual_review' WHERE id = $1
  `, [jobId]);
}
