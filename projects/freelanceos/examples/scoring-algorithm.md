# Job Scoring Algorithm - Pseudocode

## Overview
Multi-factor scoring system that evaluates Upwork job opportunities across 8 dimensions. Jobs scoring ≥70/100 proceed to proposal generation.

**Purpose:** Automate the decision of "Is this job worth pursuing?"

---

## Conceptual Approach

```javascript
/**
 * Scores a job opportunity (0-100 points)
 * Higher score = better opportunity
 * Threshold: >= 70 to generate proposal
 */
function scoreJob(job) {
  let score = 0;

  // Factor 1: Budget (0-35 points)
  // Higher budget = more points
  if (job.budget.type === 'fixed') {
    score += scoreBudget(job.budget.amount);
  } else if (job.budget.type === 'hourly') {
    score += scoreHourlyRate(job.budget.rate);
  }

  // Factor 2: Client Quality (0-30 points)
  // Client history, rating, payment verification
  score += scoreClientHistory(job.client);

  // Factor 3: Skills Match (0-20 points)
  // How many of my core skills are required?
  const myTopSkills = ['React', 'Node.js', 'TypeScript', 'Python'];
  const matchedSkills = job.skills.filter(skill =>
    myTopSkills.some(mySkill => skill.toLowerCase().includes(mySkill.toLowerCase()))
  );
  score += Math.min(matchedSkills.length * 5, 20);

  // Factor 4: Posting Age (+5 to +15 points)
  // Newer jobs get bonus (early bird advantage)
  const hoursOld = (Date.now() - job.postedAt) / (1000 * 60 * 60);
  if (hoursOld < 1) score += 15;
  else if (hoursOld < 4) score += 10;
  else if (hoursOld < 12) score += 5;

  // Factor 5: Red Flags (-50 to 0 points)
  // Detect problematic language in description
  score += detectRedFlags(job.title + ' ' + job.description);

  // Factor 6: Opportunity Indicators (+0 to +10 points)
  // MVP potential, scope expansion opportunity
  if (isMVPOpportunity(job)) score += 10;

  // Factor 7: Description Quality (0-5 points)
  // Well-written job posts indicate serious clients
  if (job.description.length > 500) score += 5;
  else if (job.description.length > 200) score += 3;

  // Factor 8: Client Location (+0 to +5 points)
  // Prefer certain markets (time zone overlap, payment reliability)
  if (preferredCountries.includes(job.client.country)) score += 5;

  // Normalize to 0-100 range
  return Math.max(0, Math.min(100, score));
}

/**
 * Helper: Score budget based on fixed project amount
 */
function scoreBudget(amount) {
  // Higher budget = higher score (diminishing returns)
  if (amount >= 10000) return 35;
  if (amount >= 5000) return 30;
  if (amount >= 2500) return 25;
  if (amount >= 1000) return 20;
  if (amount >= 500) return 15;
  return 0; // Below minimum threshold
}

/**
 * Helper: Score client based on history
 */
function scoreClientHistory(client) {
  let points = 0;

  // Total spent on Upwork (0-15 points)
  if (client.totalSpent > 100000) points += 15;
  else if (client.totalSpent > 50000) points += 12;
  else if (client.totalSpent > 10000) points += 9;
  else if (client.totalSpent > 5000) points += 6;
  else if (client.paymentVerified) points += 3;

  // Client rating (0-10 points)
  if (client.rating >= 4.9) points += 10;
  else if (client.rating >= 4.7) points += 8;
  else if (client.rating >= 4.5) points += 6;
  else if (client.rating >= 4.0) points += 4;

  // Active jobs (0-5 points)
  if (client.activeJobs > 10) points += 5;
  else if (client.activeJobs > 5) points += 3;

  return Math.min(points, 30); // Cap at 30
}

/**
 * Helper: Detect red flag keywords
 */
function detectRedFlags(text) {
  const redFlags = [
    'need it done asap',
    'tight budget',
    'cheap',
    'unpaid trial',
    'revenue share only',
    'equity instead of payment',
    'must be available 24/7'
  ];

  const lowerText = text.toLowerCase();
  const flagsFound = redFlags.filter(flag => lowerText.includes(flag));

  // Each red flag = -10 points (max -50)
  return Math.max(flagsFound.length * -10, -50);
}

/**
 * Helper: Detect MVP/growth opportunity
 */
function isMVPOpportunity(job) {
  const opportunityKeywords = [
    'mvp', 'minimum viable product',
    'phase 1', 'initial version',
    'ongoing work', 'long-term relationship',
    'potential for more work'
  ];

  const text = (job.title + ' ' + job.description).toLowerCase();
  return opportunityKeywords.some(keyword => text.includes(keyword));
}

/**
 * Main scoring workflow
 */
async function evaluateJob(job) {
  const score = scoreJob(job);

  if (score >= 70) {
    // High-quality job → Generate proposal
    return { decision: 'generate_proposal', score };
  } else {
    // Low-quality job → Reject with reason
    const reason = determineRejectionReason(job, score);
    return { decision: 'reject', score, reason };
  }
}
```

---

## Key Concepts

### 1. Multi-Factor Evaluation
- No single factor dominates (balanced scoring)
- Budget important but not everything (30% vs 100%)
- Quality indicators (client history, rating) heavily weighted

### 2. Positive + Negative Scoring
- Add points for good signals (budget, skills match)
- Subtract points for red flags (problematic language)
- Net score determines quality

### 3. Threshold-Based Decision
- Binary output: Generate proposal (≥70) or Reject (<70)
- Clear, automated decision-making
- Human only reviews edge cases (score 65-75)

### 4. Adaptive Criteria
- Recency bonus (early bird advantage)
- MVP opportunity bonus (future work potential)
- Client location preferences (time zone, payment reliability)

---

## Example Scoring

**Example 1: High-Quality Job (Score: 85)**
```
Budget: $5,000 fixed → 30 points
Client: $50K total spent, 4.9 rating → 25 points
Skills: 3/4 match (React, Node.js, TypeScript) → 15 points
Posting age: 2 hours old → 10 points
Red flags: None → 0 points
Description: 800 words → 5 points
Total: 85 → GENERATE PROPOSAL
```

**Example 2: Low-Quality Job (Score: 45)**
```
Budget: $300 fixed → 0 points (below minimum)
Client: New, no history → 3 points
Skills: 1/4 match → 5 points
Posting age: 48 hours old → 0 points
Red flags: "need it done ASAP, tight budget" → -20 points
Description: 50 words → 0 points
Total: -12 (normalized to 0) → REJECT
```

---

## Complexity

- **Time Complexity:** O(n) where n = number of skills
  - Most operations are constant-time lookups/comparisons
  - Skills matching is linear in skill count
- **Space Complexity:** O(1)
  - No additional data structures created
  - In-place scoring calculation

---

## Important Notes

**What's NOT included (proprietary):**
- Exact scoring weights (shown conceptually)
- Specific budget thresholds (shown as examples)
- Complete red flag keyword list
- Client country preferences (privacy)
- Advanced heuristics (scope expansion detection logic)

**What IS demonstrated:**
- Multi-factor evaluation approach
- Positive/negative scoring pattern
- Threshold-based decision-making
- Algorithmic thinking and architecture

---

**This is pseudocode for portfolio purposes.** Actual implementation includes proprietary scoring weights, refined thresholds, and additional factors based on historical data analysis.
