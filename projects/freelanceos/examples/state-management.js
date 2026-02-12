/**
 * State Management Pattern for n8n Workflows
 *
 * Challenge: n8n workflows are stateless (each execution is independent)
 * Solution: workflow.staticData for cross-execution persistence
 *
 * Use Case: Track pending proposal approvals across multiple workflow executions
 */

// ===== WORKFLOW 1: Proposal Generator =====
// Generates proposal, sends to Telegram, stores state for later approval

async function generateAndStoreProposal(jobData) {
  // 1. Generate proposal via Claude API
  const proposal = await claudeAPI.generateProposal(jobData);

  // 2. Access workflow.staticData (persists across executions)
  const workflow = this.getWorkflow();
  const staticData = workflow.staticData;

  // 3. Initialize pending approvals object if first run
  if (!staticData.pendingApprovals) {
    staticData.pendingApprovals = {};
  }

  // 4. Store proposal data with unique job ID as key
  staticData.pendingApprovals[jobData.id] = {
    proposalText: proposal,
    jobTitle: jobData.title,
    jobUrl: jobData.url,
    budget: jobData.budget,
    score: jobData.score,
    timestamp: Date.now()
  };

  // 5. Send to Telegram for approval
  await telegram.sendMessage({
    chat_id: USER_ID,
    text: `New proposal ready for: ${jobData.title}\n\nReview?`,
    reply_markup: {
      inline_keyboard: [[
        { text: '✅ Approve', callback_data: `approve_${jobData.id}` },
        { text: '❌ Reject', callback_data: `reject_${jobData.id}` }
      ]]
    }
  });

  // Workflow execution ENDS here (state saved in staticData)
}

// ===== WORKFLOW 2: Approval Handler =====
// Triggered by Telegram button press (separate execution, minutes/hours later)

async function handleApproval(callbackData) {
  // Extract job ID from callback data
  const jobId = callbackData.split('_')[1]; // "approve_abc123" → "abc123"

  // Access staticData (SAME data structure across workflows)
  const workflow = this.getWorkflow();
  const staticData = workflow.staticData;

  // Retrieve proposal data stored earlier (different execution!)
  const pendingData = staticData.pendingApprovals[jobId];

  if (!pendingData) {
    // Edge case: Data missing (workflow restarted, old approval, etc.)
    await telegram.sendMessage({
      chat_id: USER_ID,
      text: '❌ Proposal data not found. It may have expired.'
    });
    return;
  }

  // Use retrieved data to complete approval workflow
  await createClickUpTask({
    title: pendingData.jobTitle,
    description: pendingData.proposalText,
    url: pendingData.jobUrl,
    budget: pendingData.budget
  });

  // Clean up (remove from pending approvals)
  delete staticData.pendingApprovals[jobId];

  // Confirm to user
  await telegram.sendMessage({
    chat_id: USER_ID,
    text: `✅ Proposal approved for: ${pendingData.jobTitle}`
  });
}

// ===== UTILITY: Cleanup Old Pending Approvals =====
// Run periodically to prevent memory bloat

function cleanupOldApprovals() {
  const workflow = this.getWorkflow();
  const staticData = workflow.staticData;

  const ONE_DAY = 24 * 60 * 60 * 1000;
  const now = Date.now();

  // Remove approvals older than 24 hours
  for (const [jobId, data] of Object.entries(staticData.pendingApprovals || {})) {
    if (now - data.timestamp > ONE_DAY) {
      delete staticData.pendingApprovals[jobId];
      console.log(`Cleaned up expired approval for job: ${jobId}`);
    }
  }
}

// ===== KEY CONCEPTS =====

/**
 * 1. workflow.staticData Persistence Scope:
 *    - Persists across workflow executions
 *    - Survives n8n restarts
 *    - Cleared on workflow deactivation/deletion
 *    - Shared across all executions of SAME workflow
 *
 * 2. Use Cases:
 *    - Pending approvals (short-term state)
 *    - Execution counters
 *    - Temporary caches (< 1 hour)
 *    - Last execution timestamps
 *
 * 3. Limitations:
 *    - Single workflow scope (not shared across different workflows)
 *    - Not suitable for long-term storage (use PostgreSQL for that)
 *    - No built-in expiration (need manual cleanup)
 *
 * 4. Best Practices:
 *    - Initialize on first access (if (!staticData.key) staticData.key = {})
 *    - Use unique IDs as keys (jobId, userId, etc.)
 *    - Include timestamps for expiration logic
 *    - Periodically cleanup old entries
 *    - Have fallback for missing data (edge cases)
 */

// ===== ALTERNATIVE: Long-Term Storage (PostgreSQL) =====

async function storeInDatabase(jobData, proposal) {
  // For historical records, use database instead of staticData
  await db.query(`
    INSERT INTO proposals (job_id, content, status, created_at)
    VALUES ($1, $2, $3, NOW())
  `, [jobData.id, proposal, 'pending']);
}

async function retrieveFromDatabase(jobId) {
  const result = await db.query(`
    SELECT * FROM proposals WHERE job_id = $1
  `, [jobId]);

  return result.rows[0];
}

/**
 * Multi-Tier State Strategy:
 *
 * Tier 1 (staticData): Hot data, frequent access
 *   - Pending approvals
 *   - Active workflows
 *   - Performance: <1ms access time
 *
 * Tier 2 (PostgreSQL): Cold data, historical
 *   - Proposal archive
 *   - Job history
 *   - Analytics data
 *   - Performance: ~10-50ms query time
 *
 * Choose staticData for:
 *   - Data needed within hours
 *   - High-frequency access
 *   - Simple key-value storage
 *
 * Choose PostgreSQL for:
 *   - Data needed beyond days
 *   - Complex queries (analytics)
 *   - Data requiring guarantees (backups, ACID)
 */
