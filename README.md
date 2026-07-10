# Craig Bosman

**Full-Stack Developer & AI Systems Specialist**

📍 EST Timezone | 💼 Available for Contract Work | 🚀 Building Production AI Systems
⭐ **Upwork Rising Talent** (Top 5% of New Freelancers - Feb 2026)

[![GitHub](https://img.shields.io/badge/GitHub-bozzdev-181717?logo=github)](https://github.com/bozzdev)
[![Upwork](https://img.shields.io/badge/Upwork-Rising_Talent-6fda44?logo=upwork)](https://www.upwork.com/freelancers/~0106db0a5fb7076794?utm_source=portfolio&utm_medium=badge&utm_campaign=portfolio_header)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-csbosman-0077B5?logo=linkedin)](https://www.linkedin.com/in/csbosman/)

---

## 👋 About Me

I build production AI systems — full-stack products, automated pipelines, and
intelligent infrastructure that runs without babysitting. My work spans consumer
products (a live chess coaching app for kids), B2B automation (a fully hands-off
intelligence platform for financial services clients), and large-scale data
systems (71 microservices, 54K events/day, paying subscribers).

**What makes me different:**
- 🏗️ **Production standards** — I ship systems with 99%+ uptime, real transactions,
  and comprehensive error handling. Not MVPs. Not demos.
- 🤖 **AI architecture depth** — I design AI pipelines where models do the right job:
  deterministic engines for analysis, LLMs for language. Hallucination-proof by design.
- 🎯 **Full-stack ownership** — From Next.js frontend to Python backend to Railway/AWS
  deployment. One person, complete delivery.
- 💡 **Teaching background** — I homeschool five kids and built an edtech product from
  that experience. I understand how people learn, not just how systems work.

---

## 🚀 Featured Projects

### [SeekHim](https://seekhim.ai) - Historical Text Retrieval System
**Live at [seekhim.ai](https://seekhim.ai) | Hybrid retrieval + reranking | Self-correcting ingestion**

Production RAG platform for high-precision search across historical religious and
philosophical texts — the kind with inconsistent formatting and mixed scan quality
that defeats naive search. Hybrid BM25 + vector retrieval fused via Reciprocal Rank
Fusion, with cross-encoder reranking and parent-child chunking for exact-term precision.

- **Retrieval:** Hybrid BM25 + dense vector (20 + 20 candidates) fused via RRF to top-10, with cross-encoder reranking
- **Reliability:** Self-correcting six-stage ingestion pipeline auto-demotes documents when extraction coverage drops below threshold — fired unprompted on real data
- **Correctness:** Solved near-duplicate retrieval-poisoning by treating dedup as a retrieval-correctness problem, not a hashing one
- **Tech:** Next.js 15, FastAPI, PostgreSQL + pgvector, Celery, Redis, OpenAI embeddings

[View Live →](https://seekhim.ai)

### [Pawnprint](./projects/pawnprint/) - AI Chess Coaching Platform
**Live at [pawnprint.com](https://pawnprint.com) | 99% uptime | 5.4M puzzles | 8,543-chunk RAG corpus**

AI chess coaching platform for kids where LLM hallucination is prevented
architecturally — Stockfish evaluates positions, a deterministic rule engine
maps output to teaching concepts, Gemini Flash translates to age-appropriate
language. Never the other way around.

- **Scale:** 5.4M indexed Lichess puzzles, 8,543 enriched RAG chunks from classical chess literature
- **Reliability:** 99% uptime, $60/month infrastructure, 100% Phase-0 tester retention
- **Innovation:** Three-layer deterministic + LLM pipeline; per-user vocabulary acquisition tracking across 7 exposures
- **Tech:** Next.js 14, TypeScript, Turso, Stockfish 18, Gemini 2.5 Flash, SM-2, Glicko-1

[View Details](projects/pawnprint/) | [COPPA Case Study →](case-studies/pawnprint-coppa.html)

---

### [TalentSignals](./projects/talentsignals/) - B2B Competitive Intelligence Platform
**4/4 milestones delivered | 39/39 tests passing | Fully automated monthly pipeline**

Fully automated pipeline delivering monthly branded PDF competitive intelligence
reports to GCC financial services clients. Four-stage architecture: Enrichlayer +
Apify + Playwright data collection → two-pass Claude API analysis → ReportLab PDF
generation → SendGrid delivery with Stripe billing.

- **Automation:** Fully automated monthly cycle after client onboarding
- **AI Pipeline:** Two-pass Claude architecture — structured extraction then insight generation
- **Reliability:** 39/39 tests passing, live Stripe billing, delivery audited via SendGrid webhooks
- **Tech:** Python, FastAPI, Supabase, Railway, Claude API, ReportLab, Stripe, SendGrid

[View Details →](./projects/talentsignals/)

---

### [Anubis Bot](./projects/anubis-bot/) - Cryptocurrency Intelligence Platform
**99% uptime | $480/month MRR | 54,000 events/day** | 🗄️ *Archived*

71-microservice production system that processed cryptocurrency market data in real-time,
serving 31 paying subscribers via Stripe integration.

- **Scale:** 29GB PostgreSQL database, 1.86M rows, 54K events/day
- **Reliability:** 99% uptime over 220 consecutive days, zero data loss
- **Business:** $480/month recurring revenue, real transactions, Stripe payments
- **Tech:** Python (asyncio), PostgreSQL, Telegram bots, Docker, SystemD

[View Details →](https://bozzdev.github.io/portfolio/projects/anubis-bot/) | [Read Case Study →](https://bozzdev.github.io/portfolio/case-studies/anubis-bot.html)

---

### [FreelanceOS](./projects/freelanceos/) - AI-Powered Upwork Automation
**80% time reduction | 10-minute response time | Mobile-first workflow**

End-to-end automation system reducing Upwork proposal work from 10+ hours/week to
under 2 hours. Built with n8n, Claude Sonnet 4.5 API, ClickUp, and Telegram Bot.

- **Impact:** 8-10 hours/week saved ($800-1,000/week value)
- **Tech:** n8n, Claude API, ClickUp API, Telegram Bot, Docker, PostgreSQL
- **Innovation:** External prompts system - edit AI behavior via text files, no code changes

[View Details →](https://bozzdev.github.io/portfolio/projects/freelanceos/) | [Read Case Study →](https://bozzdev.github.io/portfolio/case-studies/freelanceos.html)

---

### [Docira](./projects/docira/) - AWS Serverless RAG System
**90-minute build | $24/month infrastructure | 100+ MB PDFs**

Complete AWS serverless RAG pipeline built in 90 minutes despite never using AWS
before. Production-ready on first deployment.

- **Speed:** Concept to production in 90 minutes (learning AWS from scratch)
- **Scale:** Handles 100+ MB PDF files, multi-level extraction fallback
- **Cost:** $24/month AWS costs (Lambda + S3 + API Gateway)
- **Tech:** AWS Lambda, S3, API Gateway, Claude API, React, Tailwind CSS

[View Details →](./projects/docira/)

---

### [Praxis Bot](./projects/praxis-bot/) - Solana DeFi Monitoring
**99.9% accuracy | Zero data loss | 30-second real-time updates** | 🗄️ *Archived*

Production Solana blockchain monitoring system with 99.9% accuracy versus
professional trading platforms.

- **Accuracy:** Reversed-engineered 281-byte binary blockchain data format
- **Reliability:** 99.9% uptime across 15+ deployments, zero data loss
- **Scale:** 50+ positions per wallet, 30-second update intervals
- **Tech:** Solana WebSocket API, Binary parsing, Telegram integration

[View Details →](https://bozzdev.github.io/portfolio/projects/praxis-bot/) | [Read Case Study →](https://bozzdev.github.io/portfolio/case-studies/praxis-bot.html)

---

### [Financial Data Pipeline](./projects/financial-data-pipeline/) - Multi-API Integration
**OAuth 2.0 | 1,000+ records | Client delivery**

Multi-API orchestration system integrating financial data APIs with automated
Google Drive exports. Delivered for paying client.

- **Integration:** OAuth 2.0 authentication, Google Drive API, financial data APIs
- **Web Interface:** Flask dashboard, role-based access control
- **Status:** Delivered for paying client ($1,250 contract)
- **Tech:** Python, Flask, OAuth 2.0, Google Drive API, PostgreSQL

[View Details →](./projects/financial-data-pipeline/)

---

## 🛠️ Development Methodology

### [Praxis SDD](https://github.com/bozzdev/praxis-sdd) - Spec-Driven Development for AI-Assisted Builds
**Open source | MIT licensed | In active production use**

A documented methodology for building software with AI coding agents without 
shipping wrong things. Combines a pre-implementation articulation layer 
(constitution → spec → plan → tasks) with investigation-first phase execution, 
approval gates, and cross-artifact consistency verification at closure.

- **Origin:** Derived from 21-phase COPPA compliance work for Pawnprint — 
  discipline caught a Phase 3.5 spec-drift error before silent closure
- **Includes:** 17 files covering the full build lifecycle, 3 real filled 
  examples, token efficiency rules for Claude Code
- **Compatible:** Claude Code, Cursor, Copilot Workspace, Codex CLI, Gemini CLI
- **Tech:** Markdown templates | Claude Code | Any AI coding agent

[View on GitHub →](https://github.com/bozzdev/praxis-sdd)

---
## 💼 What I Do

**Core Competencies:**
- 🤖 **AI Integration** - Claude API, Gemini, multi-model architectures, RAG pipelines
- ⚡ **Full-Stack TypeScript** - Next.js 14 App Router, Turso/libSQL, production deployments
- 🔄 **Workflow Automation** - n8n, event-driven architectures, zero-touch pipelines
- 📊 **API Development** - RESTful APIs, webhooks, OAuth 2.0, multi-service orchestration
- ☁️ **Cloud Infrastructure** - AWS Lambda/S3/API Gateway, Railway, DigitalOcean, Supabase
- 🗄️ **Database Design** - PostgreSQL optimization, Turso/libSQL, large-scale data management
- 🔗 **Blockchain/DeFi** - Solana, binary data parsing, real-time on-chain monitoring
- 🔒 **Privacy/Compliance** - End-to-end COPPA compliance under the amended 2025 Rule, processor data processing agreements, written information security programs, append-only audit infrastructure, plan-ladder posture scaling — engineering discipline transfers to HIPAA, FERPA, GDPR, GLBA, PCI-DSS

**Languages & Tools:**
- **Languages:** Python (expert), TypeScript, JavaScript/Node.js, SQL
- **Frameworks:** Next.js, React, Flask, FastAPI, n8n, Docker
- **AI/ML:** Claude API, Gemini API, OpenAI, RAG pipelines, Stockfish integration
- **APIs:** Stripe, SendGrid, Telegram, ClickUp, Enrichlayer, Apify
- **Databases:** PostgreSQL, Turso (libSQL), Supabase, Redis
- **DevOps:** Railway, DigitalOcean, AWS, Docker Compose, PM2, Cloudflare Tunnel

---

## 📊 By The Numbers

| Metric | Achievement |
|--------|-------------|
| **Upwork Recognition** | ⭐ Rising Talent (Top 5% of New Freelancers - Feb 2026) |
| **Production Uptime** | 99%+ (Pawnprint active, Anubis Bot 220 days, Praxis Bot 15+ deployments) |
| **Live Product** | pawnprint.com — 5.4M puzzles, 8,543 RAG chunks, 100% tester retention |
| **Client Delivery** | TalentSignals — 4/4 milestones, 39/39 tests, fully automated pipeline |
| **Revenue Generated** | $480/month MRR (Anubis Bot subscribers) |
| **Time Saved** | 8-10 hours/week (FreelanceOS automation) |
| **Data Scale** | 54,000 events/day, 29GB database, 1.86M rows |
| **Accuracy** | 99.9% (Praxis Bot vs professional platforms) |
| **Cost Efficiency** | $24/month (Docira serverless), $60/month (Pawnprint full-stack) |
| **Children's Privacy** | End-to-end COPPA compliance under amended 2025 Rule — 21 production phases, 8 processor DPAs, formal § 312.4–312.10 self-assessment, append-only audit, end-to-end verified in production |

---

## 🎯 How I Work

**My Process:**
1. **Understand the business problem** - Not just technical requirements
2. **Design for production** - 99%+ uptime, real transactions, zero data loss
3. **Build iteratively** - Ship fast, iterate based on real usage
4. **Optimize for cost** - Lean infrastructure that scales without surprise bills
5. **Own the full stack** - Frontend to backend to deployment, no handoffs

**What You Get:**
- ✅ Production-grade code (not MVPs or demos)
- ✅ Comprehensive error handling (graceful degradation)
- ✅ Real-world testing (edge cases, concurrent access)
- ✅ Cost-optimized architecture (no unnecessary spending)
- ✅ Same-day responses (EST timezone, <1 hour during business hours)

---

## 📫 Get In Touch

**Availability:** Open to contract work (fixed-price or hourly)

**Start Here:**
- 💡 **[Book $75 Technical Consultation](https://www.upwork.com/freelancers/~0106db0a5fb7076794?utm_source=portfolio&utm_medium=contact_section&utm_campaign=technical_consultation)** - 30-minute feasibility assessment (credited toward project if hired)
- 💼 **[Hire on Upwork](https://www.upwork.com/freelancers/~0106db0a5fb7076794?utm_source=portfolio&utm_medium=hire_link&utm_campaign=portfolio_contact)** - Rising Talent freelancer
- 📧 **Email:** [cbosman@praxisprotocol.io](mailto:cbosman@praxisprotocol.io) - Direct contact

**Best For:**
- AI product development (RAG pipelines, multi-model architectures, edtech)
- Full-stack TypeScript applications (Next.js, production deployments)
- Automated B2B pipelines (data collection → analysis → delivery)
- Production systems requiring 99%+ uptime
- AWS serverless architectures (Lambda, cost-optimized)
- API integration (multi-service orchestration, OAuth 2.0)
- Workflow automation (n8n, Zapier, complex orchestration)
- COPPA / children's privacy compliance (plan ladder articulation, processor DPAs, formal self-assessments, audit infrastructure)
- Regulated-industry compliance posture (HIPAA, FERPA, GDPR, GLBA — same disciplined execution patterns, different subject matter)

**Response Time:** <1 hour during business hours (9 AM - 6 PM EST)

**Other Platforms:**
- 🔗 LinkedIn: [Craig Bosman](https://www.linkedin.com/in/csbosman/)
- 💻 GitHub: [@bozzdev](https://github.com/bozzdev)

---

## 🏆 Why Work With Me

**Production Standards:**
Most developers ship working code. I ship systems with 99%+ uptime, real error
handling, and zero data loss — proven across multiple production deployments.

**AI Architecture Depth:**
I design AI pipelines correctly. Pawnprint's coaching system prevents hallucination
by construction — Stockfish handles analysis, the LLM handles language. That
separation matters in systems where accuracy counts.

**Full-Stack Ownership:**
Next.js frontend, Python/FastAPI backend, Railway/AWS/DigitalOcean deployment.
One person handles the full stack — no coordination overhead, no handoffs.

**Business Thinking:**
I understand ROI, not just code. Built $480/month MRR, delivered fully automated
B2B pipelines, designed systems where variable cost per client is predictable.

**Communication:**
EST timezone with <1 hour response times. Same-day responses, daily updates,
proactive problem notification.

**Proven Track Record:**
- 99% uptime, 100% tester retention (Pawnprint - live at pawnprint.com)
- 4/4 milestones delivered, 39/39 tests passing (TalentSignals - complete)
- 99% uptime over 220 days (Anubis Bot - archived)
- 99.9% accuracy vs professional platforms (Praxis Bot - archived)
- 80% time reduction (FreelanceOS - active)
- $24/month serverless architecture (Docira - active)

---

## 📚 Case Studies

### [Pawnprint COPPA Compliance: A Children's Privacy Implementation Under the Amended 2025 Rule](https://bozzdev.github.io/portfolio/case-studies/pawnprint-coppa.html)

**Comprehensive end-to-end COPPA compliance build for a children's-data-handling commercial service — application infrastructure, procedural artifacts, and the engineering discipline that made both survive audit**

Twenty-one production phases across two structured workplans, built specifically against the amended 2025 Rule under the compliance deadline that just passed. Application infrastructure shipped: verifiable parental consent, six parental rights surfaces, two-tier authentication, append-only audit infrastructure enforced at the application code level, soft-delete-then-purge with anonymization on purge. Procedural infrastructure shipped: eight processor data processing agreements, privacy notice statically rendered from committed source, written data retention policy, formal § 312.4 through § 312.10 self-assessment, operative posture closure document, comprehensive self-audit. End-to-end-verified in production with cross-document consistency validated at closure (15-of-15 cross-artifact + 10-of-10 operational probes passing). The engineering discipline transfers to HIPAA, FERPA, GDPR, GLBA, PCI-DSS, and any regulated-industry compliance build.

**Key Highlights:**

* 21 production phases across Workplan 2 (13 phases, application infrastructure) and Workplan 3 (8 phases, procedural artifacts)
* Built against the amended 2025 Rule, not the legacy 2013 baseline
* Eight processor data processing agreements with documented written assurances per § 312.8(c)
* Formal § 312.4–312.10 self-assessment (~628 lines) plus operative posture closure document plus comprehensive self-audit (~828 lines)
* End-to-end verified in production against real closed-beta cohort with full append-only audit trail across multiple policy versions
* Plan ladder articulated with explicit escalation triggers — escalation paths from current posture to attorney engagement, expanded engagement, or Safe Harbor program participation, each with documented activation conditions
* Engineering discipline transfers to HIPAA, FERPA, GDPR, GLBA, PCI-DSS, and any regulated-industry compliance build

[Read Full Case Study →](https://bozzdev.github.io/portfolio/case-studies/pawnprint-coppa.html)

---

### [FreelanceOS: 80% Time Reduction Through AI Automation](./case-studies/freelanceos.md)

**How I automated my entire Upwork workflow from 10+ hours/week to under 2 hours
using n8n, Claude API, and Telegram Bot**

Complete deep dive into the technical architecture, implementation timeline, and
business impact of building an intelligent job screening and proposal generation
system.

**Key Highlights:**
- 100-point job evaluation matrix
- Automated proposal generation with 95%+ first-draft quality
- Real-time Telegram notifications
- Time savings breakdown and ROI analysis

[Read Full Case Study →](./case-studies/freelanceos.md)

---

### [Anubis Bot: Building a $480/month SaaS in Production](./case-studies/anubis-bot.md)

**Lessons learned building and maintaining a 71-microservice cryptocurrency platform
serving 31 paying subscribers**

Complete story of building a production-grade cryptocurrency intelligence platform
that achieved 99%+ uptime over 220 days while processing 54,000 events daily.

**Key Highlights:**
- 71 microservices orchestrated via SystemD
- 29GB PostgreSQL database with 1.86M tokens tracked
- 5-model ML ensemble with outcome tracking
- Stripe + Solana Pay revenue implementation
- Strategic pivot analysis and business lessons

[Read Full Case Study →](./case-studies/anubis-bot.md)

---

### [Praxis Bot: 99.9% Accuracy Through Binary Data Reverse Engineering](./case-studies/praxis-bot.md)

**How I reverse-engineered Solana's 281-byte binary format and achieved 99.9%
accuracy vs professional platforms**

Complete documentation of reverse-engineering methodology for parsing Solana
blockchain transaction binaries.

**Key Highlights:**
- 281-byte binary format completely reverse-engineered
- 99.9% accuracy validated against 1.5M+ transactions
- Sub-millisecond parsing latency
- Competitive comparison vs Helius, QuickNode, dexscreener

[Read Full Case Study →](./case-studies/praxis-bot.md)

---

## 💡 Technical Feasibility Consultations

**Not sure if your AI/automation project is technically feasible?** Get expert
assessment before committing to full development.

### 30-Minute Technical Assessment - $75

**What You'll Get:**
- ✅ Technical approach recommendation (specific technologies & architecture)
- ✅ Timeline & cost estimates (realistic, not theoretical)
- ✅ Risk assessment (what could go wrong, how to mitigate)
- ✅ Go/no-go recommendation (honest evaluation)
- ✅ Written summary with actionable next steps

**💰 Consultation Fee Credit:**
If you hire me for the full project within 30 days, your **$75 consultation fee
is fully credited** toward the project cost. Zero risk.

### Process:
1. **Submit project details** via Upwork
2. **I review and prepare assessment** (24 hours)
3. **30-minute consultation call** (Zoom/Google Meet)
4. **Receive written assessment** within 2 business days

### Best For:
- 🏢 Teams evaluating AI integration feasibility (Claude API, RAG pipelines, automation)
- 💼 Companies needing expert validation before budget approval
- 🔍 Projects requiring independent technical assessment
- 🤔 Second opinions on proposed technical approaches
- ⚡ Fast evaluation needed (assessment within 48 hours)

### Why Trust My Assessment?

**Production-grade expertise, not theoretical knowledge:**
- Built and shipped a **live AI product** (pawnprint.com) with 99% uptime
- Delivered **fully automated B2B pipeline** across four milestones for paying client
- Built and operated **71-microservice cryptocurrency platform** over 220 days
- Real experience with **AI integration** (Claude, Gemini, multi-model architectures)

**I give honest recommendations** - if your project isn't technically feasible
or cost-effective, I'll tell you upfront.

---

### 📅 Book Your Technical Consultation

**[Book Consultation on Upwork →](https://www.upwork.com/freelancers/~0106db0a5fb7076794?utm_source=portfolio&utm_medium=consultation_cta&utm_campaign=technical_consultation)**

Or email me for more info: [cbosman@praxisprotocol.io](mailto:cbosman@praxisprotocol.io?subject=Technical%20Consultation%20Inquiry)

---

## 🎓 Background

**Experience:**
- Full-stack development (TypeScript/Python, 6+ years)
- Production AI systems architecture
- AI/ML integration (Claude API, Gemini, multi-model pipelines)
- Teaching background — homeschool educator, 5 kids, built edtech product from lived experience

**Domain Expertise:**
- EdTech (Pawnprint — chess coaching, age-adaptive AI, spaced repetition)
- Finance/Trading (market data, real-time processing, DeFi)
- B2B Intelligence (competitive analysis pipelines, automated reporting)
- Healthcare/Insurance (HIPAA compliance understanding)
- Blockchain/Cryptocurrency (Solana, DeFi, on-chain analysis)

**Personal:**
- Homeschool parent (5 kids)
- EST timezone (North Carolina)
- Focused development blocks — async-friendly, reliable communication

---

**Let's build something together.** 🚀

**[Book $75 Consultation](https://www.upwork.com/freelancers/~0106db0a5fb7076794?utm_source=portfolio&utm_medium=footer_cta&utm_campaign=technical_consultation)** | [Contact Me](mailto:cbosman@praxisprotocol.io) | [View Projects](./projects/)
