# Pawnprint

**AI chess coaching platform for kids — live at [pawnprint.com](https://pawnprint.com)**

**Built:** 2025–2026 | **Status:** Live — Phase 0 tester program

---

## Overview

Pawnprint is an AI chess coaching platform targeting children ages 7–17. It turns 
a player's own games into a personalized training plan — blunder puzzles scheduled 
via spaced repetition, coached in language matched to the learner's age and 
vocabulary level.

**The core problem it solves:** LLM-powered chess tools hallucinate. Language 
models cannot reliably evaluate chess positions, which makes them dangerous 
in a learning product for children. Pawnprint's architecture makes this 
impossible by design, not by instruction.

---

## The Problem

Chess improvement tools fall into two categories: generic platforms (Lichess, 
Chess.com) that serve adult-level content to all ages, and human coaching at 
$50–150/hour that most families can't sustain. Neither option adapts to a 
specific player's mistakes, age, or vocabulary level.

LLM-based alternatives introduce a new problem: models confidently describe 
tactics that don't exist on the board. For a child learning the game, that's 
actively harmful.

---

## The Solution

A three-layer pipeline that enforces strict separation between chess analysis 
and language generation:

1. **Stockfish** evaluates every position deterministically — no language model 
   involved at this stage
2. **A deterministic rule engine** maps engine output to teaching concepts 
   ("your rook was undefended", "you missed a fork after trading queens") — 
   still no language model
3. **Gemini 2.5 Flash** translates those pre-analyzed facts into age-appropriate 
   language — the LLM's job is translation only, never analysis

The LLM receives a structured object of pre-computed facts. There is no path 
in the system for it to perform chess analysis, regardless of what it might 
otherwise generate.

---

## Key Features

**Personalized blunder puzzles**
Games imported from Chess.com are analyzed by Stockfish. Each blunder becomes 
an SM-2 scheduled puzzle tied to the specific position where the player went 
wrong — not generic tactics, their actual mistakes.

**5.4 million puzzle library**
Training pulls from a 5.4M Lichess puzzle corpus difficulty-matched via 
Glicko-1 rating, benchmarked against Chess.com global percentiles sampled 
from 9 community clubs. Players get puzzles at the right difficulty, not 
arbitrary buckets.

**Age-adaptive coaching language**
Four age brackets (under 10, 10–14, teen, adult). The system tracks each 
user's chess vocabulary acquisition — introduced, reinforcing, acquired — 
across 7 exposures per term. Every coaching response is constructed from 
what this specific user already knows and what they don't yet.

**RAG-grounded explanations**
Coaching responses are grounded in 8,543 enriched chunks from classical 
chess literature via FTS5 BM25 retrieval. The same tactical theme retrieves 
different passages for different age brackets.

**Archetype-aware session planning**
Players are profiled by learning archetype — attacker, puzzle-solver, 
competitor — which influences retrieval ranking and session composition.

---

## Children's Privacy & COPPA Compliance

Pawnprint operates as a commercial online service that knowingly collects personal information from children under 13, putting it in scope for COPPA (16 CFR Part 312, as amended by the 2025 amendments effective June 23, 2025, with compliance deadline April 22, 2026 — passed). Pawnprint launched on the live amended Rule, not the legacy 2013 baseline that most operators in the market still target. The platform operates under a comprehensive end-to-end compliance build with both halves shipped: application infrastructure verified in production plus procedural artifacts audited for cross-document consistency.

**Application infrastructure:**

* Verifiable parental consent before any collection of children's personal information, captured via electronic-form variant of § 312.5(b)(2)(i) augmented with email-plus rigor (magic-link delivery, 72-hour token TTL, IP and user-agent capture, typed signature, itemized acknowledgments)
* Six parental rights surfaces — review consent history, export all child data, soft-delete with grace window, hard-purge with anonymization, revoke consent prospectively, view cross-user-boundary access log
* Two-tier authentication with elevated requirements (12+ characters plus special character) for parents with linked children, no-downgrade rule preventing password removal while children active
* Three append-only audit tables enforced at the application code level — no UPDATE or DELETE statements anywhere in production code
* Bulk re-consent infrastructure firing automatically on policy version bumps with full audit trail across multiple policy versions

**Procedural infrastructure:**

* Eight processor data processing agreements documenting written assurances per § 312.8(c)
* Privacy notice statically rendered from committed HTML source under deliberate version control
* Privacy contact form for unauthenticated parental requests with verified delivery pipeline
* Written data retention policy per § 312.10's 2025 amendment requirements
* Formal § 312.4 through § 312.10 self-assessment (~628 lines) as the centerpiece compliance reference
* Operative posture closure document with explicit escalation triggers for each higher-rigor posture
* Comprehensive self-audit (~828 lines) cataloguing all 21 phases, locked decisions, deviations, and outstanding items

**Verification at closure:** end-to-end consent and re-consent flow tested in production against real closed-beta cohort with verified email delivery, append-only audit trail intact across multiple policy versions, and cross-document consistency validated (15-of-15 cross-artifact + 10-of-10 operational probes passing).

For the full case study covering execution discipline, key architectural decisions, lessons captured, and how the engineering patterns transfer to HIPAA / FERPA / GDPR / GLBA / PCI-DSS / regulated-industry compliance more broadly, see: **[Pawnprint COPPA Compliance Case Study →](https://bozzdev.github.io/portfolio/case-studies/pawnprint-coppa.html)**

---
## Production Metrics

| Metric | Value |
|--------|-------|
| Live URL | pawnprint.com |
| Uptime | 99% |
| Infrastructure cost | $60/month |
| RAG knowledge chunks | 8,543 |
| Puzzles indexed | 5.4 million |
| Age brackets | 4 |
| Phase 0 testers | 7 |
| Tester retention | 100% |
| Billing | Stripe (pre-revenue phase) |
| COPPA compliance posture | Comprehensive end-to-end build under amended 2025 Rule — both halves shipped, audited at closure |

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend + API | Next.js 14 (App Router), TypeScript, Tailwind |
| Database | Turso (libSQL + FTS5) |
| Chess engine | Stockfish 18 (WASM + native binary) |
| Chess logic | chess.js |
| Coaching LLM | Gemini 2.5 Flash |
| Index-time generation | Claude Haiku 4.5 |
| Spaced repetition | SM-2 |
| Puzzle rating | Glicko-1 |
| Auth | JWT + TOTP 2FA |
| Infrastructure | DigitalOcean, PM2, Cloudflare Tunnel |
| CI/CD | GitHub SSH deploys |
| Compliance | Termly Pro+, Resend (DKIM), Cloudflare Email Routing, append-only audit (3 tables), formal § 312.X self-assessment, eight processor DPAs |

---

## What Made This Hard

**Preventing hallucination architecturally.** The standard approach — instruct 
the model not to make things up — doesn't hold reliably in a product children 
depend on for accurate instruction. The solution was to remove the possibility 
at the system design level, not the prompt level.

**Age-bracketed retrieval at query time.** The same tactical theme requires 
genuinely different explanations for a 7-year-old versus an adult. Built a 
multi-factor retrieval ranking system that produces different top results for 
the same query depending on the learner's profile.

**Vocabulary scaffolding at scale.** Tracking term acquisition state per user 
across an open-ended chess vocabulary, then dynamically constructing each 
coaching prompt from that state, required careful schema design and prompt 
architecture to remain consistent across millions of potential query combinations.

---

*Pawnprint is in active development. Phase 1 (paid launch) planned following 
Phase 0 tester validation.*
