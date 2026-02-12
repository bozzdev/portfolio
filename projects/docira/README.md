# Docira - AWS Serverless RAG System

> 90-Minute Build | <$5/Month Costs | 100+ MB PDFs

**Built:** 2025 | **Timeline:** 90 minutes | **Status:** Production

---

## 📊 Overview

Complete AWS serverless RAG (Retrieval Augmented Generation) pipeline built in **90 minutes** despite never using AWS before. Production-ready on first deployment.

**The Achievement:**
- Concept to production in 90 minutes
- Never used AWS services before (learned while building)
- <$5/month AWS costs (true serverless, cost-optimized)
- Handles 100+ MB PDF files seamlessly
- Three-level extraction fallback (PyPDF2 → pdfplumber → Textract OCR)

---

## 🎯 The Problem

Client needed PDF document Q&A system:
- Handle large PDFs (100+ MB)
- Semantic search (not just keyword matching)
- Scanned PDFs (OCR required)
- Cost-efficient (small budget)
- React frontend

---

## 💡 The Solution

**AWS Serverless Architecture:**
- Lambda (PDF processing + Claude API)
- S3 (document storage)
- API Gateway (RESTful endpoints)
- React frontend (Tailwind CSS)

**Three-Level Extraction:**
1. PyPDF2 (fast, machine-readable PDFs)
2. pdfplumber (better tables, more reliable)
3. AWS Textract (OCR for scanned documents)

**Result:**
- <$5/month costs
- Handles 100+ MB files
- Semantic search working
- Production-ready first try

---

## 🏗️ Architecture

```
User → React Frontend
  ↓
API Gateway (REST)
  ↓
Lambda (Docker)
  ├─ PDF Upload → S3
  ├─ Extraction (PyPDF2 → pdfplumber → Textract)
  ├─ Embeddings (semantic search)
  └─ Claude API (Q&A)
  ↓
Response to user
```

**Cost Optimization:**
- No always-on servers
- Lambda charged per request
- S3 minimal storage costs
- Textract only for scanned PDFs (most expensive, used last)

**Result:** <$5/month for small to medium workloads

---

## 🛠️ Technology Stack

**AWS:**
- Lambda (Docker-based deployment)
- S3 (presigned URLs for security)
- API Gateway (RESTful endpoints)
- Textract (OCR fallback)

**Backend:**
- Python 3.x
- PyPDF2 (first extraction attempt)
- pdfplumber (second attempt, better tables)
- Claude API (Q&A generation)
- Vector embeddings (semantic search)

**Frontend:**
- React 18
- Tailwind CSS
- Real-time chat interface
- Session management

---

## 🎓 What I Learned

**AWS (learned in 90 minutes):**
- Lambda deployment (Docker containers)
- S3 bucket configuration (presigned URLs)
- API Gateway setup (REST APIs)
- IAM roles (permissions management)
- Cost optimization (true serverless)

**Problem Solving:**
- Multi-level fallback strategy (when simple solution fails)
- Cost vs quality tradeoffs (Textract is expensive, use sparingly)
- Production-ready first try (comprehensive testing as you build)

---

## 📊 Metrics

| Metric | Value |
|--------|-------|
| **Build Time** | 90 minutes (concept to production) |
| **AWS Experience Before** | Zero (never used AWS) |
| **Monthly Cost** | <$5 (Lambda + S3 + API Gateway) |
| **File Size** | 100+ MB PDFs supported |
| **Extraction Levels** | 3 (PyPDF2 → pdfplumber → Textract) |

---

**Built by Craig Bosman** | [Back to Portfolio](../../README.md)
