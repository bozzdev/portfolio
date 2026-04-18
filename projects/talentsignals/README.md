# TalentSignals

Fully automated B2B competitive talent intelligence platform that delivers
monthly branded PDF reports to GCC financial services clients with zero
recurring human intervention.

## What It Does

TalentSignals runs a four-stage monthly pipeline: it collects data from
LinkedIn profiles, job boards, Glassdoor, career pages, and news feeds for
a client's defined competitor set; passes the collected data through a
two-pass Claude API analysis architecture to generate structured intelligence;
renders a branded 10-page PDF report using ReportLab; and delivers it via
SendGrid with Stripe billing on a fixed monthly cycle. After initial client
onboarding via a single form submission, the system operates without human
input.

---

## Architecture

**Stack:** Python 3.11 | FastAPI (Uvicorn) | Supabase (PostgreSQL + Storage)
| Railway | Enrichlayer | Apify | Playwright | Anthropic Claude API |
ReportLab | SendGrid | Stripe | Typeform

```
Typeform Onboarding
       │
       ▼
Stripe Checkout ──► ts-webhooks (continuous, port 8000)
       │                    │
       ▼                    ▼
Supabase client_config   audit_events
       │
       ▼
ts-collect-weekly (cron)
  ├── Enrichlayer  → executive profiles
  ├── Apify        → job boards, Glassdoor
  ├── Playwright   → career pages
  └── NewsAPI      → press releases
       │
       ▼ diff_events (SQL change detection)
       │
ts-analysis-monthly (cron)
  ├── Pass 1: Structured extraction → JSON (Claude Sonnet, sections 1-5)
  └── Pass 2: Insight generation    → narrative (Claude Opus, section 6)
       │
ts-reports-monthly (cron)
  └── ReportLab → PDF → Supabase Storage (signed URL, 48hr expiry)
       │
ts-delivery-monthly (cron)
  └── SendGrid → client email with PDF attachment → audit_events
```

---

## Key Technical Decisions

**Two-pass AI architecture:** Raw data goes through a structured extraction
pass (facts only, strict JSON schema) before an insight generation pass
(narrative + client context injected). This separation keeps analysis
consistent and prevents the model from interpreting before it has the full
picture.

**Cost-tiered model selection:** Sections 1–5 use Claude Sonnet for
structured extraction. Only Section 6 (Strategic Brief) uses Claude Opus
for higher-quality cross-section synthesis. Variable AI cost per report is
kept low enough to maintain healthy margins at scale.

**Five isolated Railway services:** One continuous Uvicorn webhook server
handles Stripe and SendGrid event webhooks in real time. Four cron jobs
handle each pipeline stage independently — a failure in data collection
doesn't block report generation from prior data.

**Security-first external data handling:** Every external API response passes
through a Pydantic validation model before database insertion. No raw API
responses reach Supabase. Stripe and SendGrid webhooks verify cryptographic
signatures before any processing. All Supabase Storage signed URLs expire
within 48 hours.

---

## Production Metrics

| Metric | Value |
|--------|-------|
| Test suite | 39/39 passing |
| Railway services deployed | 5 |
| Pipeline stages | 4 (collect → analyze → generate → deliver) |
| Report length | 10 pages, 6 intelligence sections |
| Human hours per monthly cycle | 0 (post-onboarding) |
| Contract milestones | 4/4 delivered |
| Stripe mode | Live |
| Delivery confirmation | Logged to audit_events via SendGrid webhook |

---

## Challenges Solved

**Brittle career page scrapers:** Corporate career pages restructure without
notice. Each Playwright scraper includes zero-result detection; consecutive
zero-result runs trigger a system alert rather than silently producing empty
data. A SQL diff function compares weekly snapshots so a single bad scrape
run doesn't corrupt the historical change record.

**Gmail clipping from large email payloads:** The initial implementation
embedded the TalentSignals logo as a base64 string in shared HTML signature
files, adding 150KB+ to every delivery email and triggering Gmail's message
clipping threshold. Replaced with a hosted URL reference, eliminating the
payload issue across all client deliveries without any per-email change.

**Deployment state vs code state:** A webhook endpoint fix was committed but
the Railway service hadn't redeployed, leaving consecutive 404s logged
against incoming SendGrid events. Surfaced the importance of verifying
deployment state after any fix — not just code state.

---

## Status

Live in production. All four milestones delivered to client. Railway
deployment active across five services. Stripe billing running in live mode.

*Private repository — available on request.*