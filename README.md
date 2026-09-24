# ?? Study Abroad Advisor — AI-Powered RAG Platform

<div align="center">

**An intelligent, bilingual (English & Urdu RTL) web platform for Pakistani students**
Get personalized, AI-driven guidance to select the best foreign universities for BS, MS, PhD, and Postdoc programs.

[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-06B6D4?logo=tailwindcss)](https://tailwindcss.com)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?logo=prisma)](https://www.prisma.io)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?logo=supabase)](https://supabase.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

[Live Demo](https://github.com/AbdulAzeemHashmi/study-abroad-advisor) • [Report Bug](https://github.com/AbdulAzeemHashmi/study-abroad-advisor/issues) • [GitHub Repo](https://github.com/AbdulAzeemHashmi/study-abroad-advisor)

</div>

---

## ?? Table of Contents

- [Features](#-key-features)
- [Tech Stack](#?-tech-stack)
- [Directory Structure](#-directory-structure)
- [Local Development Setup](#?-local-development-setup)
- [Fix Google OAuth redirect_uri_mismatch](#-fix-google-oauth-redirect_uri_mismatch-error)
- [Environment Variables Reference](#-environment-variables-reference)
- [Deploying to Vercel](#-deploying-to-vercel)
- [License](#-license)

---

## ?? Key Features

1. **AI RAG Consultation with Automatic Failover**
   - **Primary**: Google Gemini 1.5 Flash (Google AI Studio — free tier)
   - **Secondary**: xAI Grok (via xAI API)
   - **Tertiary**: Llama 3.3 (via Groq Cloud — free tier)
   - **Fallback**: Local rule-based advisory engine guaranteeing **100% uptime**

2. **Strict Excluded Countries Filter**
   - Automatically excludes: Africa (all), Pakistan, Iran, Afghanistan, Lebanon, India, Syria, Yemen, Sri Lanka, Bangladesh, Nepal, Iraq
   - Recommends top global destinations: Germany, UK, USA, Canada, Australia, Italy, Turkey, Malaysia, South Korea, Japan, Nordic nations

3. **Bilingual UI — English & Urdu RTL**
   - Full native Urdu translation with automatic `dir="rtl"` layout switching
   - AI responds in the same language as the student's query

4. **Dynamic Data Ingestion & Self-Healing Pipeline**
   - Live data from **Hipolabs University API** and **OpenAlex API**
   - Weekly self-healing via **Vercel Cron Jobs** (`/api/cron/update-data`)

5. **Financial Realism for Pakistani Aspirants**
   - Tuition & living costs with realistic **PKR conversions**
   - German Sperrkonto (€11,208), Canadian GIC (CAD $20,635) details
   - Part-time work regulations (20 hrs/week typical)

6. **Authentication & Password Recovery**
   - NextAuth.js v4 — Credentials + Google OAuth providers
   - Password reset with cryptographically secure tokens via **Resend** emails

---

## ??? Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 14 (App Router — Server & Client Components) |
| **Language** | TypeScript 5 |
| **Styling** | Tailwind CSS + Shadcn UI + Glassmorphism |
| **i18n & RTL** | Custom lightweight provider (`messages/en.json`, `messages/ur.json`) |
| **Database** | PostgreSQL with `pgvector` extension via **Supabase** |
| **ORM** | Prisma ORM |
| **Authentication** | NextAuth.js v4 + bcryptjs |
| **AI Orchestration** | Google Gemini 1.5 Flash ? xAI Grok ? Groq Llama 3.3 |
| **Email** | Resend (3,000 emails/month free) |
| **Data Scraping** | Hipolabs University API + OpenAlex API |
| **Deployment** | Vercel Hobby + GitHub |

---

## ?? Directory Structure

```
study-abroad-advisor/
+-- app/
¦   +-- (auth)/
¦   ¦   +-- layout.tsx                  # Minimal layout (no sidebar), centered cards
¦   ¦   +-- signin/page.tsx             # Login form (email/password + Google OAuth)
¦   ¦   +-- signup/page.tsx             # Registration form
¦   ¦   +-- forgot-password/page.tsx    # Request password reset link
¦   ¦   +-- reset-password/page.tsx     # Reset password with token
¦   +-- (dashboard)/
¦   ¦   +-- layout.tsx                  # Layout with Header + Sidebar
¦   ¦   +-- dashboard/page.tsx          # Main AI consultation page
¦   ¦   +-- compare/page.tsx            # Side-by-side university comparison
¦   ¦   +-- my-saved/page.tsx           # Saved consultations
¦   ¦   +-- settings/page.tsx           # Profile & language preferences
¦   +-- api/
¦   ¦   +-- auth/[...nextauth]/route.ts # NextAuth.js v4 handler
¦   ¦   +-- auth/register/route.ts      # User registration endpoint
¦   ¦   +-- consult/route.ts            # RAG query with AI failover
¦   ¦   +-- consult/save/route.ts       # Save a consultation
¦   ¦   +-- consult/saved/route.ts      # Saved queries CRUD
¦   ¦   +-- reset-password/route.ts     # Password reset token & email
¦   ¦   +-- cron/update-data/route.ts   # Vercel Cron — weekly data sync
¦   +-- layout.tsx                      # Root layout (lang, dir, providers)
¦   +-- globals.css                     # Design tokens & RTL styles
¦   +-- page.tsx                        # Landing page (public home)
+-- components/
¦   +-- ui/                             # Shadcn UI (Button, Card, Input, Badge…)
¦   +-- Sidebar.tsx                     # Collapsible navigation panel
¦   +-- Header.tsx                      # Top bar with LocaleSwitcher & Profile
¦   +-- LocaleSwitcher.tsx              # Toggle English to Urdu RTL
¦   +-- AuthGuard.tsx                   # Client-side route protection
¦   +-- MarkdownRenderer.tsx            # AI response markdown renderer
¦   +-- Providers.tsx                   # Session + I18n context providers
+-- lib/
¦   +-- auth.ts                         # NextAuth authOptions config
¦   +-- db.ts                           # Prisma client singleton
¦   +-- utils.ts                        # Utility helpers & currency conversions
¦   +-- i18n.tsx                        # I18n context provider & hooks
¦   +-- rag/
¦   ¦   +-- vector-store.ts             # pgvector store & seed fallback
¦   ¦   +-- chain.ts                    # Country exclusion filter & prompt template
¦   +-- llm/
¦   ¦   +-- failover.ts                 # Gemini to Grok to Llama failover pipeline
¦   +-- scraping/
¦   ¦   +-- sources.ts                  # Hipolabs & OpenAlex API connectors
¦   ¦   +-- ingester.ts                 # Clean, deduplicate & self-heal data
¦   +-- email/
¦       +-- resend.ts                   # Resend password reset email sender
+-- prisma/
¦   +-- schema.prisma                   # Models: User, University, SavedQuery
+-- scripts/
¦   +-- ingest-data.ts                  # One-time university data seed script
+-- messages/
¦   +-- en.json                         # English UI strings
¦   +-- ur.json                         # Urdu UI strings (RTL)
+-- .env.local                          # Local environment variables (gitignored)
+-- next.config.mjs                     # Next.js configuration
+-- tailwind.config.js                  # Tailwind CSS configuration
+-- vercel.json                         # Vercel cron schedule
+-- package.json                        # Dependencies & scripts
+-- README.md                           # This file
```

---

## ?? Local Development Setup

### 1. Prerequisites
- **Node.js** v18 or higher (v20/v22 recommended)
- **Git**
- A **Supabase** project (free tier) for the PostgreSQL database

### 2. Clone & Install
```bash
git clone https://github.com/AbdulAzeemHashmi/study-abroad-advisor.git
cd study-abroad-advisor
npm install
```

### 3. Configure Environment Variables
Edit `.env.local`:
```env
# Supabase PostgreSQL (with pgvector enabled)
DATABASE_URL="postgresql://postgres:<YOUR_PASSWORD>@db.<YOUR_PROJECT_REF>.supabase.co:5432/postgres"

# NextAuth
NEXTAUTH_SECRET="your-generated-secret-32-chars-minimum"
NEXTAUTH_URL="http://localhost:3000"

# Google OAuth (see section below to fix redirect_uri_mismatch)
GOOGLE_CLIENT_ID="your-google-client-id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="GOCSPX-your-google-client-secret"

# Resend (free transactional email)
RESEND_API_KEY="re_your_resend_api_key"

# AI Keys
GEMINI_API_KEY="your-gemini-api-key"
XAI_API_KEY="your-xai-api-key"
GROQ_API_KEY="your-groq-api-key"

# Public URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 4. Sync Prisma Schema to Database
```bash
npx prisma generate
npx prisma db push
```

### 5. Seed University Data (Optional)
```bash
npm run data:ingest
```

### 6. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

> **Demo login** (no database needed): `student@example.com` / `password123`

---

## ?? Fix Google OAuth `redirect_uri_mismatch` Error

If you see **"Error 400: redirect_uri_mismatch"** when clicking **Continue with Google**, this is a Google Cloud Console configuration issue — **not a code bug**. Follow these steps:

### Step 1 — Open Google Cloud Console Credentials
Go to: [https://console.cloud.google.com/apis/credentials](https://console.cloud.google.com/apis/credentials)

Select the project whose Client ID is in your `.env.local`.

### Step 2 — Edit Your OAuth 2.0 Client
Click on your **OAuth 2.0 Client ID** (type: Web application).

### Step 3 — Add Authorized Redirect URIs

Under **"Authorized redirect URIs"**, click **"+ Add URI"** and add:

**For local development:**
```
http://localhost:3000/api/auth/callback/google
```

**For production (Vercel deployment):**
```
https://your-app-name.vercel.app/api/auth/callback/google
https://your-custom-domain.com/api/auth/callback/google
```

### Step 4 — Add Authorized JavaScript Origins

Under **"Authorized JavaScript origins"**, click **"+ Add URI"** and add:

**For local development:**
```
http://localhost:3000
```

**For production:**
```
https://your-app-name.vercel.app
https://your-custom-domain.com
```

### Step 5 — Save & Wait
Click **Save**. Changes can take up to **5–10 minutes** to propagate.

### Step 6 — Add Test User (if app is in Testing mode)
1. Go to **[APIs & Services ? OAuth consent screen](https://console.cloud.google.com/apis/credentials/consent)**
2. Under **Test users**, click **"+ Add Users"**
3. Add your Google email: `abdulazeemhashmi29@gmail.com`

> **The exact callback URL NextAuth uses:**
> `{NEXTAUTH_URL}/api/auth/callback/google`
> For local dev: `http://localhost:3000/api/auth/callback/google`

---

## ?? Environment Variables Reference

| Variable | Required | Description |
|---|---|---|
| `DATABASE_URL` | ? Required | Supabase PostgreSQL connection string with password |
| `NEXTAUTH_SECRET` | ? Required | Random secret (min 32 chars) for JWT signing |
| `NEXTAUTH_URL` | ? Required | App base URL (`http://localhost:3000` for local dev) |
| `GOOGLE_CLIENT_ID` | ?? OAuth | Google Cloud Console OAuth 2.0 Client ID |
| `GOOGLE_CLIENT_SECRET` | ?? OAuth | Google Cloud Console OAuth 2.0 Client Secret |
| `RESEND_API_KEY` | ?? Email | Resend API key for password reset emails |
| `GEMINI_API_KEY` | ?? AI | Google AI Studio key (primary AI provider) |
| `XAI_API_KEY` | ?? Optional | xAI Grok key (secondary AI failover) |
| `GROQ_API_KEY` | ?? Optional | Groq Cloud key (tertiary Llama 3.3 failover) |
| `NEXT_PUBLIC_APP_URL` | ?? Optional | Public URL used in email templates |

> The app has a built-in rule-based fallback engine — it works even without AI API keys.

---

## ?? Deploying to Vercel

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "feat: study abroad advisor platform"
   git push origin main
   ```

2. **Import to Vercel**: [vercel.com/new](https://vercel.com/new) ? Import `AbdulAzeemHashmi/study-abroad-advisor`

3. **Add Environment Variables** in Vercel ? Settings ? Environment Variables:
   - All keys from `.env.local`
   - `NEXTAUTH_URL` = `https://your-app.vercel.app`
   - `NEXT_PUBLIC_APP_URL` = `https://your-app.vercel.app`

4. **Update Google OAuth** — Add Vercel URL to Authorized Redirect URIs in Google Cloud Console.

5. **Enable pgvector** in Supabase Dashboard ? Database ? Extensions ? search `vector` ? Enable.

6. **Deploy** — Vercel auto-builds on every push to `main`.

7. **Cron Job** runs every Sunday at 2:00 AM UTC automatically via `vercel.json`.

---

## ?? Demo Credentials

| Feature | Credentials |
|---|---|
| Email login | `student@example.com` / `password123` |
| Google login | Requires Google OAuth setup (see guide above) |
| AI Consultation | Works with Gemini key or falls back to rule-based engine |

---

## ?? License

MIT License — Free and open source for students worldwide. See [LICENSE](LICENSE) for full details.

---

<div align="center">
Built with love for Pakistani students aspiring to study abroad.
Stars are welcome!
</div>
