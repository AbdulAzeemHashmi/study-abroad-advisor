<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:2563eb,100:0ea5e9&height=200&section=header&text=Study%20Abroad%20Advisor&fontSize=42&fontColor=ffffff&animation=fadeIn&fontAlignY=35&desc=An%20AI%20Powered%20RAG%20Platform%20for%20Pakistani%20Students&descAlignY=58&descSize=18" width="100%"/>

<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=20&pause=1000&color=2563EB&center=true&vCenter=true&width=700&lines=AI+Guidance+for+BS%2C+MS%2C+PhD%2C+and+Postdoc+Programs;Bilingual+English+and+Urdu+RTL;Gemini+then+Grok+then+Llama+Failover;Built+for+Pakistani+Students" alt="Typing SVG" />

**An intelligent, bilingual (English and Urdu RTL) web platform for Pakistani students.**
It gives personalized, AI driven guidance to help students pick the best foreign universities for BS, MS, PhD, and Postdoc programs.

[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-06B6D4?logo=tailwindcss)](https://tailwindcss.com)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?logo=prisma)](https://www.prisma.io)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?logo=supabase)](https://supabase.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

[Live Demo](https://github.com/AbdulAzeemHashmi/study-abroad-advisor) &nbsp;|&nbsp; [Report Bug](https://github.com/AbdulAzeemHashmi/study-abroad-advisor/issues) &nbsp;|&nbsp; [GitHub Repo](https://github.com/AbdulAzeemHashmi/study-abroad-advisor)

</div>

<div align="center">
<img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="450">
</div>

---

## Table of Contents

- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Directory Structure](#directory-structure)
- [Local Development Setup](#local-development-setup)
- [Fix Google OAuth redirect_uri_mismatch](#fix-google-oauth-redirect_uri_mismatch-error)
- [Environment Variables Reference](#environment-variables-reference)
- [Deploying to Vercel](#deploying-to-vercel)
- [Demo Credentials](#demo-credentials)
- [License](#license)

---

## Key Features

1. **AI RAG Consultation with Automatic Failover**
   - **Primary**: Google Gemini 1.5 Flash, through Google AI Studio, free tier
   - **Secondary**: xAI Grok, through the xAI API
   - **Tertiary**: Llama 3.3, through Groq Cloud, free tier
   - **Fallback**: A local rule based advisory engine that guarantees 100 percent uptime

2. **Strict Excluded Countries Filter**
   - Automatically excludes: all of Africa, Pakistan, Iran, Afghanistan, Lebanon, India, Syria, Yemen, Sri Lanka, Bangladesh, Nepal, and Iraq
   - Recommends top global destinations: Germany, UK, USA, Canada, Australia, Italy, Turkey, Malaysia, South Korea, Japan, and the Nordic nations

3. **Bilingual UI, English and Urdu RTL**
   - Full native Urdu translation with automatic `dir="rtl"` layout switching
   - The AI responds in the same language as the student's query

4. **Dynamic Data Ingestion and a Self Healing Pipeline**
   - Live data from the Hipolabs University API and the OpenAlex API
   - Weekly self healing through Vercel Cron Jobs (`/api/cron/update-data`)

5. **Financial Realism for Pakistani Applicants**
   - Tuition and living costs with realistic PKR conversions
   - German Sperrkonto (11,208 euros) and Canadian GIC (20,635 CAD) details
   - Part time work regulations (20 hours per week is typical)

6. **Authentication and Password Recovery**
   - NextAuth.js v4, with Credentials and Google OAuth providers
   - Password reset with cryptographically secure tokens sent through Resend emails

---

## Tech Stack

<div align="center">
  <img src="https://skillicons.dev/icons?i=nextjs,typescript,tailwind,postgres,prisma,vercel" alt="Tech Stack Icons"/>
</div>

<br/>

| Layer | Technology |
|---|---|
| **Framework** | Next.js 14 (App Router, Server and Client Components) |
| **Language** | TypeScript 5 |
| **Styling** | Tailwind CSS with Shadcn UI and a glassmorphism look |
| **i18n and RTL** | A custom lightweight provider (`messages/en.json`, `messages/ur.json`) |
| **Database** | PostgreSQL with the `pgvector` extension, through Supabase |
| **ORM** | Prisma ORM |
| **Authentication** | NextAuth.js v4 plus bcryptjs |
| **AI Orchestration** | Google Gemini 1.5 Flash, then xAI Grok, then Groq Llama 3.3 |
| **Email** | Resend (3,000 emails per month free) |
| **Data Scraping** | Hipolabs University API plus OpenAlex API |
| **Deployment** | Vercel Hobby plus GitHub |

---

## Directory Structure

```
study-abroad-advisor/
├── app/
│   ├── (auth)/
│   │   ├── layout.tsx                  # Minimal layout, no sidebar, centered cards
│   │   ├── signin/page.tsx             # Login form (email and password, plus Google OAuth)
│   │   ├── signup/page.tsx             # Registration form
│   │   ├── forgot-password/page.tsx    # Request a password reset link
│   │   └── reset-password/page.tsx     # Reset password with a token
│   ├── (dashboard)/
│   │   ├── layout.tsx                  # Layout with Header plus Sidebar
│   │   ├── dashboard/page.tsx          # Main AI consultation page
│   │   ├── compare/page.tsx            # Side by side university comparison
│   │   ├── my-saved/page.tsx           # Saved consultations
│   │   └── settings/page.tsx           # Profile and language preferences
│   ├── api/
│   │   ├── auth/[...nextauth]/route.ts # NextAuth.js v4 handler
│   │   ├── auth/register/route.ts      # User registration endpoint
│   │   ├── consult/route.ts            # RAG query with AI failover
│   │   ├── consult/save/route.ts       # Save a consultation
│   │   ├── consult/saved/route.ts      # Saved queries, create, read, update, delete
│   │   ├── reset-password/route.ts     # Password reset token and email
│   │   └── cron/update-data/route.ts   # Vercel Cron, weekly data sync
│   ├── layout.tsx                      # Root layout (language, direction, providers)
│   ├── globals.css                     # Design tokens and RTL styles
│   └── page.tsx                        # Landing page (public home)
├── components/
│   ├── ui/                             # Shadcn UI (Button, Card, Input, Badge, and more)
│   ├── Sidebar.tsx                     # Collapsible navigation panel
│   ├── Header.tsx                      # Top bar with LocaleSwitcher and Profile
│   ├── LocaleSwitcher.tsx              # Toggle between English and Urdu RTL
│   ├── AuthGuard.tsx                   # Client side route protection
│   ├── MarkdownRenderer.tsx            # AI response markdown renderer
│   └── Providers.tsx                   # Session and i18n context providers
├── lib/
│   ├── auth.ts                         # NextAuth authOptions config
│   ├── db.ts                           # Prisma client singleton
│   ├── utils.ts                        # Utility helpers and currency conversions
│   ├── i18n.tsx                        # i18n context provider and hooks
│   ├── rag/
│   │   ├── vector-store.ts             # pgvector store and seed fallback
│   │   └── chain.ts                    # Country exclusion filter and prompt template
│   ├── llm/
│   │   └── failover.ts                 # Gemini to Grok to Llama failover pipeline
│   ├── scraping/
│   │   ├── sources.ts                  # Hipolabs and OpenAlex API connectors
│   │   └── ingester.ts                 # Clean, deduplicate, and self heal data
│   └── email/
│       └── resend.ts                   # Resend password reset email sender
├── prisma/
│   └── schema.prisma                   # Models: User, University, SavedQuery
├── scripts/
│   └── ingest-data.ts                  # One time university data seed script
├── messages/
│   ├── en.json                         # English UI strings
│   └── ur.json                         # Urdu UI strings (RTL)
├── .env.local                          # Local environment variables (gitignored)
├── next.config.mjs                     # Next.js configuration
├── tailwind.config.js                  # Tailwind CSS configuration
├── vercel.json                         # Vercel cron schedule
├── package.json                        # Dependencies and scripts
└── README.md                           # This file
```

---

## Local Development Setup

### 1. Prerequisites
- **Node.js** v18 or higher (v20 or v22 recommended)
- **Git**
- A **Supabase** project (free tier) for the PostgreSQL database

### 2. Clone and Install
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

# Google OAuth (see the section below to fix redirect_uri_mismatch)
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

### 4. Sync the Prisma Schema to the Database
```bash
npx prisma generate
npx prisma db push
```

### 5. Seed University Data (Optional)
```bash
npm run data:ingest
```

### 6. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

> **Demo login** (no database needed): `student@example.com` and `password123`

---

## Fix Google OAuth redirect_uri_mismatch Error

If you see "Error 400: redirect_uri_mismatch" when clicking Continue with Google, this is a Google Cloud Console configuration issue, not a code bug. Follow these steps.

### Step 1, Open Google Cloud Console Credentials
Go to: [https://console.cloud.google.com/apis/credentials](https://console.cloud.google.com/apis/credentials)

Select the project whose Client ID is in your `.env.local`.

### Step 2, Edit Your OAuth 2.0 Client
Click on your OAuth 2.0 Client ID (type: Web application).

### Step 3, Add Authorized Redirect URIs

Under "Authorized redirect URIs", click "+ Add URI" and add:

**For local development:**
```
http://localhost:3000/api/auth/callback/google
```

**For production (Vercel deployment):**
```
https://your-app-name.vercel.app/api/auth/callback/google
https://your-custom-domain.com/api/auth/callback/google
```

### Step 4, Add Authorized JavaScript Origins

Under "Authorized JavaScript origins", click "+ Add URI" and add:

**For local development:**
```
http://localhost:3000
```

**For production:**
```
https://your-app-name.vercel.app
https://your-custom-domain.com
```

### Step 5, Save and Wait
Click Save. Changes can take up to 5 to 10 minutes to take effect.

### Step 6, Add a Test User (if the app is in Testing mode)
1. Go to [APIs and Services, then OAuth consent screen](https://console.cloud.google.com/apis/credentials/consent)
2. Under "Test users", click "+ Add Users"
3. Add your Google email: `abdulazeemhashmi29@gmail.com`

> The exact callback URL that NextAuth uses is `{NEXTAUTH_URL}/api/auth/callback/google`.
> For local development, that is `http://localhost:3000/api/auth/callback/google`.

---

## Environment Variables Reference

| Variable | Required | Description |
|---|---|---|
| `DATABASE_URL` | Required | Supabase PostgreSQL connection string with password |
| `NEXTAUTH_SECRET` | Required | A random secret (32 characters minimum) for JWT signing |
| `NEXTAUTH_URL` | Required | The app's base URL (`http://localhost:3000` for local development) |
| `GOOGLE_CLIENT_ID` | Needed for OAuth | Google Cloud Console OAuth 2.0 Client ID |
| `GOOGLE_CLIENT_SECRET` | Needed for OAuth | Google Cloud Console OAuth 2.0 Client Secret |
| `RESEND_API_KEY` | Needed for email | Resend API key for password reset emails |
| `GEMINI_API_KEY` | Needed for AI | Google AI Studio key, the primary AI provider |
| `XAI_API_KEY` | Optional | xAI Grok key, the secondary AI failover |
| `GROQ_API_KEY` | Optional | Groq Cloud key, the tertiary Llama 3.3 failover |
| `NEXT_PUBLIC_APP_URL` | Optional | The public URL used in email templates |

> The app has a built in rule based fallback engine. It still works even without any AI API keys.

---

## Deploying to Vercel

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "feat: study abroad advisor platform"
   git push origin main
   ```

2. **Import to Vercel**: go to [vercel.com/new](https://vercel.com/new) and import `AbdulAzeemHashmi/study-abroad-advisor`

3. **Add Environment Variables** in Vercel, under Settings, then Environment Variables:
   - All keys from `.env.local`
   - `NEXTAUTH_URL` set to `https://your-app.vercel.app`
   - `NEXT_PUBLIC_APP_URL` set to `https://your-app.vercel.app`

4. **Update Google OAuth**: add your Vercel URL to the Authorized Redirect URIs in Google Cloud Console.

5. **Enable pgvector** in the Supabase Dashboard, under Database, then Extensions, search for `vector`, then Enable.

6. **Deploy**: Vercel builds automatically on every push to `main`.

7. **Cron Job** runs every Sunday at 2:00 AM UTC automatically, through `vercel.json`.

---

## Demo Credentials

| Feature | Credentials |
|---|---|
| Email login | `student@example.com` and `password123` |
| Google login | Requires Google OAuth setup (see the guide above) |
| AI Consultation | Works with a Gemini key, or falls back to the rule based engine |

---

## License

MIT License. Free and open source for students worldwide. See [LICENSE](LICENSE) for full details.

---

<div align="center">

Built with care for Pakistani students who want to study abroad. Stars are always welcome.

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:0ea5e9,100:2563eb&height=100&section=footer" width="100%"/>

</div>