# Study Abroad Advisor (AI-Powered RAG Platform)

An intelligent, multi-page, bilingual (English & Urdu with RTL support) web platform designed specifically for **Pakistani students (BS, MS, PhD, Postdoc)**. It provides personalized, up-to-date guidance to select foreign universities and countries considering budget, lifestyle preferences, part-time work viability, and long-term post-study settlement goals.

Costs **$0 to develop, host, and run** using completely free tier tools and services.

---

## 🚀 Key Features

1. **AI RAG Consultation with Automatic Failover**:
   - Primary: **Google Gemini** (`@google/generative-ai` free tier)
   - Secondary: **xAI Grok** (via Vercel AI SDK / xAI API)
   - Tertiary: **Llama 3.3** (via Groq Cloud free tier)
   - Fallback: Local rule-based advisory engine ensuring **100% uptime with zero interruptions**.

2. **Strict Excluded Countries Filter**:
   - The platform strictly **excludes** recommendations for universities in:
     - Africa (entire continent)
     - Pakistan, Iran, Afghanistan, Lebanon, India, Syria, Yemen, Sri Lanka, Bangladesh, Nepal, Iraq.
   - Enforces recommendations strictly from top, viable global destinations (e.g., Germany, UK, USA, Canada, Australia, Italy, Turkey, Malaysia, South Korea, Japan, Nordic nations).

3. **Bilingual UI (English & Urdu RTL)**:
   - Full native Urdu translation with automatic Right-to-Left (`dir="rtl"`) layout switching.
   - AI consultant detects query language and responds in the same language.

4. **Dynamic Data Ingestion & Self-Healing Pipeline**:
   - Scrapes and ingests live university directories via **Hipolabs API** and **OpenAlex API**.
   - Self-heals rankings and tuition metrics weekly via scheduled **Vercel Cron Jobs** (`/api/cron/update-data`).

5. **Financial Realism for Pakistani Aspirants**:
   - Calculates tuition and living costs with realistic **PKR conversions**.
   - Details official Blocked Account requirements (e.g., German Sperrkonto €11,208, Canadian GIC CAD $20,635).
   - Clarifies part-time work regulations (typically 20 hrs/week).

6. **Authentication & Password Recovery**:
   - NextAuth.js v4 with Credentials Provider and Google OAuth.
   - Password reset workflow with cryptographically secure tokens and **Resend** transactional emails.

---

## 🛠️ System Architecture & Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 14 (App Router, Server & Client Components) |
| **Styling** | Tailwind CSS + Shadcn UI design tokens + Glassmorphism |
| **Language & RTL** | Custom lightweight i18n provider (`messages/en.json`, `messages/ur.json`) |
| **Database & Vector** | PostgreSQL with `pgvector` extension via **Prisma ORM** |
| **Authentication** | NextAuth.js v4 + bcryptjs |
| **AI LLM Orchestration**| Google Gemini 1.5 Flash, Grok, Groq Llama 3.3 |
| **Transactional Email** | Resend (Free 3,000 emails/month) |
| **Data Scraping** | Hipolabs University API + OpenAlex API |
| **Deployment** | Vercel Hobby + GitHub (`AbdulAzeemHashmi/study-abroad-advisor`) |

---

## 📁 Directory Structure

```
study-abroad-advisor/
├── app/
│   ├── (auth)/
│   │   ├── layout.tsx                 # Minimal layout, NO sidebar, centered cards
│   │   ├── signin/page.tsx            # Login form
│   │   ├── signup/page.tsx            # Registration form
│   │   └── forgot-password/page.tsx   # Request reset link
│   ├── (dashboard)/
│   │   ├── layout.tsx                 # Layout WITH Header and Sidebar
│   │   ├── dashboard/page.tsx         # Main consultation input/output
│   │   ├── compare/page.tsx           # Side-by-side university comparison
│   │   ├── my-saved/page.tsx          # Saved consultations
│   │   └── settings/page.tsx          # User profile & language preference
│   ├── api/
│   │   ├── auth/[...nextauth]/route.ts# NextAuth configuration
│   │   ├── auth/register/route.ts     # User signup endpoint
│   │   ├── consult/route.ts           # RAG query with failover
│   │   ├── consult/save/route.ts      # Save consultation
│   │   ├── consult/saved/route.ts     # Saved queries CRUD
│   │   ├── reset-password/route.ts    # Password reset email token
│   │   └── cron/update-data/route.ts  # Vercel Cron data ingestion
│   ├── layout.tsx                     # Root layout (lang, dir, providers)
│   ├── globals.css                    # Design tokens & RTL styles
│   └── page.tsx                       # Landing page (public home)
├── components/
│   ├── ui/                            # Shadcn UI (button, card, input, badge, skeleton, dialog)
│   ├── Sidebar.tsx                    # Collapsible navigation panel
│   ├── Header.tsx                     # Top bar with LocaleSwitcher & Profile
│   ├── LocaleSwitcher.tsx             # Toggle between English and Urdu RTL
│   ├── AuthGuard.tsx                  # Client route guard
│   └── Providers.tsx                  # Session and I18n providers
├── lib/
│   ├── db.ts                          # Prisma client singleton
│   ├── utils.ts                       # Utility functions & currency conversions
│   ├── i18n.tsx                       # I18n context provider & hooks
│   ├── rag/
│   │   ├── vector-store.ts            # pgvector connection & seed fallback
│   │   └── chain.ts                   # Strict country exclusions & prompt template
│   ├── llm/
│   │   └── failover.ts                # Gemini -> Grok -> Llama failover chain
│   ├── scraping/
│   │   ├── sources.ts                 # Hipolabs & OpenAlex connectors
│   │   └── ingester.ts                # Clean, deduplicate, and self-heal
│   └── email/
│       └── resend.ts                  # Resend password reset email sender
├── prisma/
│   └── schema.prisma                  # Prisma models: User, University, SavedQuery
├── scripts/
│   └── ingest-data.ts                 # Data seeding script
├── messages/
│   ├── en.json                        # English UI dictionary
│   └── ur.json                        # Urdu UI dictionary (RTL)
├── .env.local                         # Environment variables template
├── next.config.mjs                    # Next.js configuration
├── tailwind.config.js                 # Tailwind CSS configuration
├── package.json                       # Dependencies & scripts
└── README.md                          # Project documentation
```

---

## ⚙️ Local Development Setup

### 1. Prerequisites
- **Node.js**: v18 or higher (tested on Node v20/v22)
- **Git**

### 2. Installation
Clone the repository and install dependencies:
```bash
git clone https://github.com/AbdulAzeemHashmi/study-abroad-advisor.git
cd study-abroad-advisor
npm install
```

### 3. Environment Configuration
Copy the `.env.local` template:
```bash
cp .env.local.example .env.local # or edit .env.local directly
```

Fill in the keys (all services offer 100% free tiers):
```env
DATABASE_URL="postgresql://user:password@localhost:5432/study_abroad?schema=public"
NEXTAUTH_SECRET="your-generated-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# Optional free AI keys
GEMINI_API_KEY="" # Google AI Studio (Free)
GROQ_API_KEY=""   # console.groq.com (Free Llama 3.3)
XAI_API_KEY=""    # xAI Grok (Optional)
RESEND_API_KEY="" # resend.com (Free 3,000 emails/month)
```
*(Note: If you run locally without external keys, the built-in failover knowledge engine and verified dataset ensure full functional exploration!)*

### 4. Prisma Database Sync
Generate the Prisma Client:
```bash
npx prisma generate
```
Sync the schema to your PostgreSQL database:
```bash
npx prisma db push
```

### 5. Seed University Data (Optional)
```bash
npm run data:ingest
```

### 6. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌐 Deploying to Vercel

1. Push your repository to GitHub:
   ```bash
   git add .
   git commit -m "feat: complete study abroad advisor platform with RAG failover"
   git push origin main
   ```
2. Visit [vercel.com](https://vercel.com) and import the repository: `AbdulAzeemHashmi/study-abroad-advisor`.
3. Add the environment variables from `.env.local` in Vercel's project dashboard.
4. For the database, attach **Vercel Postgres** or a free **Neon** database (with `pgvector` enabled).
5. Deploy! Vercel will automatically build and deploy the Next.js app.
6. The weekly cron job automatically runs at Sunday 2:00 AM UTC via `vercel.json` / Cron settings.

---

## 📜 License
MIT License. Free and open source for students worldwide.
