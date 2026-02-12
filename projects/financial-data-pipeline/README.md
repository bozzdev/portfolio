# Financial Data Pipeline - Multi-API Integration System

> OAuth 2.0 | 1,000+ Records | Currently in Production

**Built:** 2025 | **Timeline:** 2 weeks | **Status:** Production (paying client)

---

## 📊 Overview

Multi-API orchestration system integrating financial data APIs with automated Google Drive exports. **Currently serving paying client** ($1,250 contract).

**The Achievement:**
- OAuth 2.0 authentication flow implemented
- Multi-API orchestration (financial APIs + Google Drive)
- 1,000+ record processing and filtering
- Flask web dashboard with role-based access
- Currently in production use

---

## 🎯 The Problem

Client needed:
- Aggregate data from multiple financial APIs
- Filter and process 1,000+ records
- Automated Google Drive exports (Excel)
- Web dashboard for admin/user access
- OAuth 2.0 security

---

## 💡 The Solution

**Multi-API Pipeline:**
- Financial data API integration
- Google Drive API (automated exports)
- OAuth 2.0 authentication
- ETL pipeline (filtering, processing)
- Flask web dashboard

**Features:**
- Role-based access (admin vs user)
- Automated Excel generation
- 1,000+ record processing
- Real-time data fetching
- Scheduled batch processing

---

## 🏗️ Architecture

```
Financial APIs
  ↓
ETL Pipeline (Python)
  ├─ Data Fetching
  ├─ Filtering Logic
  ├─ Processing (1,000+ records)
  └─ Google Drive Export
  ↓
Flask Web Dashboard
  ├─ OAuth 2.0 Auth
  ├─ Role-Based Access
  └─ User Interface
```

---

## 🛠️ Technology Stack

**Integration:**
- Financial data APIs (market data)
- Google Drive API (OAuth 2.0)
- Multi-API orchestration
- Error handling & retry logic

**Backend:**
- Python 3.x
- Flask (web framework)
- OAuth 2.0 (Google)
- ETL pipeline logic
- PostgreSQL (data storage)

**Frontend:**
- Flask templates
- Role-based UI
- Form handling
- Session management

---

## 📊 Metrics

| Metric | Value |
|--------|-------|
| **Contract Value** | $1,250 |
| **Status** | In production (paying client) |
| **Records Processed** | 1,000+ |
| **APIs Integrated** | Multiple (financial + Google) |
| **Authentication** | OAuth 2.0 |

---

**Built by Craig Bosman** | [Back to Portfolio](../../README.md)
