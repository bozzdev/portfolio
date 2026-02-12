# Telegram Webhook Router - Master Router Pattern

## Overview

**Challenge:** Telegram bots can only register ONE webhook URL globally.
**Need:** Handle multiple workflow types (approvals, commands, status queries, button callbacks).
**Solution:** Master router pattern with cascading IF nodes.

---

## The Problem

### Typical Multi-Webhook Architecture (Not Possible with Telegram)

```
❌ NOT ALLOWED:
Telegram Bot
├─ Webhook 1: /approve → Approval Workflow
├─ Webhook 2: /submit_job → Job Submission Workflow
├─ Webhook 3: /status → Status Query Workflow
└─ Webhook 4: callback_query → Button Handler Workflow

⚠️ Telegram API only allows ONE webhook URL per bot.
```

### Real-World Constraint

```javascript
// Telegram API method
setWebhook({
  url: 'https://domain.com/webhook/telegram-1'  // ✅ Works
});

setWebhook({
  url: 'https://domain.com/webhook/telegram-2'  // ❌ Overwrites previous webhook
});

// Result: Only ONE webhook can be active at a time.
```

---

## The Solution: Master Router Pattern

### Architecture

```
Single Telegram Webhook
        ↓
Master Router Workflow (n8n)
        ↓
   Pattern Matching (IF nodes)
        ↓
┌───────┴───────┬─────────┬─────────┬──────────┐
│               │         │         │          │
Approval      Submit    Status   Button    Help
Workflow      Job      Query   Handler  Message
             Workflow Workflow Workflow
```

### Implementation (Conceptual)

```javascript
/**
 * Master Router: Receives ALL Telegram updates
 * Routes to appropriate sub-workflow based on message content
 */

async function masterRouter(telegramUpdate) {
  const update = telegramUpdate.body;

  // Route 1: Text Commands
  if (update.message && update.message.text) {
    const text = update.message.text;
    const chatId = update.message.chat.id;

    // Pattern matching with cascading IF logic
    if (text.startsWith('/approve')) {
      // Extract job ID from command: "/approve abc123"
      const jobId = text.split(' ')[1];
      return triggerWorkflow('proposal-approval', { jobId, chatId });
    }

    else if (text.startsWith('/reject')) {
      const jobId = text.split(' ')[1];
      return triggerWorkflow('proposal-rejection', { jobId, chatId });
    }

    else if (text.startsWith('/submit_job')) {
      // Extract URL from command: "/submit_job https://upwork.com/jobs/~123"
      const jobUrl = text.split(' ')[1];
      return triggerWorkflow('job-manual-submit', { jobUrl, chatId });
    }

    else if (text.startsWith('/status')) {
      return triggerWorkflow('status-query', { chatId });
    }

    else if (text.startsWith('/interview')) {
      const taskId = text.split(' ')[1];
      return triggerWorkflow('interview-prep', { taskId, chatId });
    }

    else if (text === '/start' || text === '/help') {
      return sendHelpMessage(chatId);
    }

    else {
      // Unknown command
      return sendMessage(chatId, 'Unknown command. Use /help for available commands.');
    }
  }

  // Route 2: Inline Button Callbacks
  else if (update.callback_query) {
    const callbackData = update.callback_query.data; // e.g., "approve_abc123"
    const chatId = update.callback_query.message.chat.id;
    const messageId = update.callback_query.message.message_id;

    // Parse callback data pattern: "action_id"
    const [action, jobId] = callbackData.split('_');

    switch (action) {
      case 'approve':
        return triggerWorkflow('button-approve', { jobId, chatId, messageId });

      case 'reject':
        return triggerWorkflow('button-reject', { jobId, chatId, messageId });

      case 'edit':
        return triggerWorkflow('button-edit', { jobId, chatId, messageId });

      default:
        return answerCallbackQuery(update.callback_query.id, 'Unknown action');
    }
  }

  // Route 3: Other Update Types (future expansion)
  else if (update.edited_message) {
    // Handle edited messages (if needed)
    console.log('Message edited, ignoring');
  }

  else {
    // Unknown update type
    console.log('Unknown update type:', Object.keys(update));
  }
}

/**
 * Helper: Trigger sub-workflow via internal webhook
 */
async function triggerWorkflow(workflowName, data) {
  // n8n workflows can trigger each other via webhooks
  await fetch(`https://n8n.domain.com/webhook/${workflowName}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
}

/**
 * Helper: Send help message
 */
async function sendHelpMessage(chatId) {
  const helpText = `
*Available Commands:*

/submit_job <url> - Submit Upwork job URL for processing
/status - Show active jobs and proposals
/approve <id> - Approve proposal
/reject <id> - Reject proposal
/interview <id> - Generate interview prep
/help - Show this message

*Inline Buttons:*
Tap buttons in messages for quick actions (Approve/Reject/Edit)
  `;

  await telegram.sendMessage({
    chat_id: chatId,
    text: helpText,
    parse_mode: 'Markdown'
  });
}
```

---

## n8n Visual Implementation

### Master Router Workflow (Visual Flow)

```
[Webhook Trigger: /webhook/telegram]
            ↓
    [Parse Telegram Update]
            ↓
    [IF: update.message?]
        ├─ Yes → [Extract text]
        │           ↓
        │       [IF: text starts with '/approve'?]
        │           ├─ Yes → [Trigger Approval Workflow]
        │           └─ No → [Next IF node]
        │                       ↓
        │                   [IF: text starts with '/submit_job'?]
        │                       ├─ Yes → [Trigger Job Submit Workflow]
        │                       └─ No → [Next IF node]
        │                                   ↓
        │                               [IF: text starts with '/status'?]
        │                                   ├─ Yes → [Trigger Status Workflow]
        │                                   └─ No → [Send Unknown Command Message]
        └─ No → [IF: update.callback_query?]
                    ├─ Yes → [Parse callback_data]
                    │           ↓
                    │       [IF: action === 'approve'?]
                    │           ├─ Yes → [Trigger Button Approve Workflow]
                    │           └─ No → [Next IF node]
                    │                       ↓
                    │                   [IF: action === 'reject'?]
                    │                       ├─ Yes → [Trigger Button Reject Workflow]
                    │                       └─ No → [Unknown Action]
                    └─ No → [Ignore/Log]
```

### Routing Performance

- **Pattern Matching:** Cascading IF nodes (early exit on match)
- **Latency:** <100ms routing overhead (negligible)
- **Scalability:** Handles 12+ workflow types without issues
- **Maintainability:** Adding new commands = adding one IF branch

---

## Key Concepts

### 1. Single Entry Point
- **One webhook URL** registered with Telegram
- All updates (messages, callbacks, edits) arrive at master router
- Router examines update type and content

### 2. Pattern Matching
- **Commands:** Check if text starts with `/approve`, `/submit_job`, etc.
- **Callbacks:** Parse `callback_data` for action and parameters
- **Cascading IF logic:** First match wins (early exit)

### 3. Internal Workflow Triggering
- **Master router doesn't do the work** (it only routes)
- Sub-workflows triggered via internal webhooks
- Clean separation of concerns (routing vs business logic)

### 4. Extensibility
- **Adding new command:** Add one IF branch
- **Adding new button action:** Add one case to switch statement
- **No changes to Telegram webhook** (still single URL)

### 5. Error Handling
- **Unknown commands:** Graceful fallback (send help message)
- **Invalid callback data:** Log and ignore (don't crash)
- **Malformed updates:** Log for debugging

---

## Example: Adding New Command

**Requirement:** Add `/report` command to generate weekly report.

**Implementation:**

```javascript
// In master router, add new IF branch:
else if (text.startsWith('/report')) {
  return triggerWorkflow('weekly-report', { chatId });
}
```

**That's it!** No changes to:
- Telegram webhook URL
- Other workflows
- Existing commands

---

## Comparison: Master Router vs Alternatives

| Approach | Pros | Cons |
|----------|------|------|
| **Master Router (n8n)** | Visual, easy to debug, all logic in one place | IF nodes can be verbose for many routes |
| **External Router Service** | Code-based routing (if/switch), centralized | Additional infrastructure, another service to manage |
| **Long Polling (no webhooks)** | No webhook limitation | Higher latency, less efficient, harder to scale |
| **Multiple Bots** | Each bot has own webhook | Confusing UX (which bot to message?), more API keys |

**Chosen:** Master Router in n8n
**Why:** Visual debugging, no additional infrastructure, sufficient for 12+ routes

---

## Visual Routing Benefits

### Debugging
- **See data flow** through router in n8n UI
- **Inspect each IF condition** and branch taken
- **Execution history** shows which route was selected

### Maintainability
- **Non-developers can understand** (visual flowchart)
- **Easy to add routes** (duplicate IF node, change condition)
- **Documentation is the workflow** (self-documenting)

### Performance
- **Early exit optimization:** First match stops evaluation
- **No external network calls** (internal routing)
- **<100ms overhead:** Negligible compared to API calls (1-3 seconds)

---

## Implementation Notes

**What's NOT included (proprietary):**
- Actual n8n workflow JSON (competitive advantage)
- Specific webhook URLs and secrets
- Complete command list (only examples shown)
- Button callback data formats

**What IS demonstrated:**
- Master router architectural pattern
- Pattern matching approach
- Internal workflow triggering
- Extensibility strategy
- Error handling for unknown inputs

---

## Related Patterns

- **State Management:** See `state-management.js` for handling stateful conversations
- **Error Handling:** See `error-handling.js` for retry logic and alerts

---

**This is a portfolio demonstration.** The concept applies to any platform with single webhook limitations (Telegram, Slack, Discord). The pattern is reusable across different automation platforms (n8n, Zapier, custom code).
