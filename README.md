<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:4F46E5,50:0EA5E9,100:10B981&height=260&section=header&text=Study%20Abroad%20Advisor&fontSize=46&fontAlignY=36&animation=fadeIn&fontColor=ffffff&desc=AI%20Powered%20RAG%20Platform%20for%20Pakistani%20Students&descSize=18&descAlignY=60" width="100%"/>

<br/>

<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=20&pause=1200&color=4F46E5&center=true&vCenter=true&width=700&lines=Bilingual%3A+English+and+Urdu+with+RTL+support;Automatic+AI+Failover+Chain;Zero+Cost+to+Build%2C+Host%2C+and+Run;Built+for+BS%2C+MS%2C+PhD%2C+and+Postdoc+Students" alt="Typing animation" />

<br/>

<img src="https://img.shields.io/badge/Framework-Next.js%2014-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js"/>
<img src="https://img.shields.io/badge/Styling-Tailwind%20CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS"/>
<img src="https://img.shields.io/badge/Database-PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL"/>
<img src="https://img.shields.io/badge/ORM-Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma"/>
<img src="https://img.shields.io/badge/Deploy-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel"/>

<br/><br/>

<img src="https://img.shields.io/badge/Cost-Zero%20Dollars-22c55e?style=flat-square" alt="Cost"/>
<img src="https://img.shields.io/badge/Languages-English%20and%20Urdu-blueviolet?style=flat-square" alt="Languages"/>
<img src="https://img.shields.io/badge/Uptime-100%25%20with%20failover-orange?style=flat-square" alt="Uptime"/>
<img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" alt="License"/>

<br/><br/>

<img src="https://img.shields.io/github/stars/AbdulAzeemHashmi/study-abroad-advisor?style=flat-square&color=yellow" alt="Stars"/>
<img src="https://img.shields.io/github/forks/AbdulAzeemHashmi/study-abroad-advisor?style=flat-square&color=blue" alt="Forks"/>
<img src="https://img.shields.io/github/last-commit/AbdulAzeemHashmi/study-abroad-advisor?style=flat-square&color=orange" alt="Last Commit"/>
<img src="https://img.shields.io/github/repo-size/AbdulAzeemHashmi/study-abroad-advisor?style=flat-square&color=purple" alt="Repo Size"/>

</div>

<br/>

An intelligent, multi page, bilingual (English and Urdu with RTL support) web platform designed specifically for **Pakistani students (BS, MS, PhD, Postdoc)**. It provides personalized, up to date guidance to select foreign universities and countries considering budget, lifestyle preferences, part time work viability, and long term post study settlement goals.

Costs **zero dollars to develop, host, and run**, using completely free tier tools and services.

---

## Table of Contents

| Section | Link |
|:--------|:-----|
| Key Features | [Jump to Key Features](#key-features) |
| System Architecture | [Jump to Architecture](#system-architecture-and-tech-stack) |
| Directory Structure | [Jump to Structure](#directory-structure) |
| Local Development Setup | [Jump to Setup](#local-development-setup) |
| Deploying to Vercel | [Jump to Deployment](#deploying-to-vercel) |
| License | [Jump to License](#license) |

---

## Key Features

<div align="center">
<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=16&pause=900&color=0EA5E9&center=true&vCenter=true&width=550&lines=Six+core+capabilities%2C+built+for+reliability" alt="Features intro" />
</div>

<br/>

<details open>
<summary><b>1. AI RAG Consultation with Automatic Failover</b></summary>
<br/>

```mermaid
flowchart LR
    A[Student Query] --> B[Google Gemini Primary]
    B -->|If unavailable| C[xAI Grok Secondary]
    C -->|If unavailable| D[Llama 3.3 via Groq Tertiary]
    D -->|If unavailable| E[Local Rule Based Engine Fallback]
    E --> F[Answer Returned to Student]
```

- Primary: **Google Gemini** (`@google/generative-ai` free tier)
- Secondary: **xAI Grok** (via Vercel AI SDK and xAI API)
- Tertiary: **Llama 3.3** (via Groq Cloud free tier)
- Fallback: Local rule based advisory engine, ensuring **100 percent uptime with zero interruptions**

</details>

<details open>
<summary><b>2. Strict Excluded Countries Filter</b></summary>
<br/>

<img src="https://img.shields.io/badge/Filter-Strict%20Country%20Exclusions-red?style=flat-square" alt="Strict filter badge"/>

The platform strictly **excludes** recommendations for universities in:

- Africa (entire continent)
- Pakistan, Iran, Afghanistan, Lebanon, India, Syria, Yemen, Sri Lanka, Bangladesh, Nepal, and Iraq

It enforces recommendations strictly from top, viable global destinations such as Germany, UK, USA, Canada, Australia, Italy, Turkey, Malaysia, South Korea, Japan, and the Nordic nations.

</details>

<details open>
<summary><b>3. Bilingual UI (English and Urdu RTL)</b></summary>
<br/>

- Full native Urdu translation with automatic Right to Left (`dir="rtl"`) layout switching
- The AI consultant detects the query language and responds in the same language

</details>

<details open>
<summary><b>4. Dynamic Data Ingestion and Self Healing Pipeline</b></summary>
<br/>

- Scrapes and ingests live university directories using the **Hipolabs API** and the **OpenAlex API**
- Self heals rankings and tuition metrics weekly through scheduled **Vercel Cron Jobs** (`/api/cron/update-data`)

</details>

<details open>
<summary><b>5. Financial Realism for Pakistani Aspirants</b></summary>
<br/>

- Calculates tuition and living costs with realistic **PKR conversions**
- Details official Blocked Account requirements, for example German Sperrkonto at 11,208 euros and Canadian GIC at 20,635 Canadian dollars
- Clarifies part time work regulations, typically 20 hours per week

</details>

<details open>
<summary><b>6. Authentication and Password Recovery</b></summary>
<br/>

- NextAuth.js v4 with a Credentials Provider and Google OAuth
- Password reset workflow with cryptographically secure tokens and **Resend** transactional emails

</details>

---

## System Architecture and Tech Stack

<div align="center">
<img src="https://skillicons.dev/icons?i=nextjs,tailwind,postgres,prisma,vercel,ts" alt="Tech stack icons"/>
</div>

<br/>

| Layer | Technology |
|:---|:---|
| Framework | Next.js 14 (App Router, Server and Client Components) |
| Styling | Tailwind CSS with Shadcn UI design tokens and Glassmorphism |
| Language and RTL | Custom lightweight i18n provider (`messages/en.json`, `messages/ur.json`) |
| Database and Vector | PostgreSQL with the `pgvector` extension, accessed via **Prisma ORM** |
| Authentication | NextAuth.js v4 with bcryptjs |
| AI LLM Orchestration | Google Gemini 1.5 Flash, Grok, Groq Llama 3.3 |
| Transactional Email | Resend (free tier, 3,000 emails per month) |
| Data Scraping | Hipolabs University API and OpenAlex API |
| Deployment | Vercel Hobby plan, connected to GitHub (`AbdulAzeemHashmi/study-abroad-advisor`) |

---

## Directory Structure

<div align="center">
<img src="https://img.shields.io/badge/Structure-Clean%20and%20Organized-4CAF50?style=flat-square" alt="Structure badge"/>
</div>

<br/>

```
study-abroad-advisor/
├── app/
│   ├── (auth)/
│   │   ├── layout.tsx                 # Minimal layout, no sidebar, centered cards
│   │   ├── signin/page.tsx            # Login form
│   │   ├── signup/page.tsx            # Registration form
│   │   └── forgot-password/page.tsx   # Request reset link
│   ├── (dashboard)/
│   │   ├── layout.tsx                 # Layout with Header and Sidebar
│   │   ├── dashboard/page.tsx         # Main consultation input and output
│   │   ├── compare/page.tsx           # Side by side university comparison
│   │   ├── my-saved/page.tsx          # Saved consultations
│   │   └── settings/page.tsx          # User profile and language preference
│   ├── api/
│   │   ├── auth/[...nextauth]/route.ts # NextAuth configuration
│   │   ├── auth/register/route.ts      # User signup endpoint
│   │   ├── consult/route.ts            # RAG query with failover
│   │   ├── consult/save/route.ts       # Save consultation
│   │   ├── consult/saved/route.ts      # Saved queries CRUD
│   │   ├── reset-password/route.ts     # Password reset email token
│   │   └── cron/update-data/route.ts   # Vercel Cron data ingestion
│   ├── layout.tsx                     # Root layout (lang, dir, providers)
│   ├── globals.css                    # Design tokens and RTL styles
│   └── page.tsx                       # Landing page (public home)
├── components/
│   ├── ui/                            # Shadcn UI (button, card, input, badge, skeleton, dialog)
│   ├── Sidebar.tsx                    # Collapsible navigation panel
│   ├── Header.tsx                     # Top bar with LocaleSwitcher and Profile
│   ├── LocaleSwitcher.tsx             # Toggle between English and Urdu RTL
│   ├── AuthGuard.tsx                  # Client route guard
│   └── Providers.tsx                  # Session and I18n providers
├── lib/
│   ├── db.ts                          # Prisma client singleton
│   ├── utils.ts                       # Utility functions and currency conversions
│   ├── i18n.tsx                       # I18n context provider and hooks
│   ├── rag/
│   │   ├── vector-store.ts            # pgvector connection and seed fallback
│   │   └── chain.ts                   # Strict country exclusions and prompt template
│   ├── llm/
│   │   └── failover.ts                # Gemini then Grok then Llama failover chain
│   ├── scraping/
│   │   ├── sources.ts                 # Hipolabs and OpenAlex connectors
│   │   └── ingester.ts                # Clean, deduplicate, and self heal
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
├── package.json                       # Dependencies and scripts
└── README.md                          # Project documentation
```

---

## Local Development Setup

<div align="center">
<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=16&pause=900&color=10B981&center=true&vCenter=true&width=500&lines=Six+simple+steps+to+run+it+locally" alt="Setup intro" />
</div>

<br/>

### Step 1. Prerequisites

<img src="https://img.shields.io/badge/Node.js-v18%20or%20higher-339933?style=flat-square&logo=node.js&logoColor=white" alt="Node version"/>
<img src="https://img.shields.io/badge/Git-Required-F05032?style=flat-square&logo=git&logoColor=white" alt="Git required"/>

Tested on Node v20 and v22.

### Step 2. Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/AbdulAzeemHashmi/study-abroad-advisor.git
cd study-abroad-advisor
npm install
```

### Step 3. Environment Configuration

Copy the `.env.local` template:

```bash
cp .env.local.example .env.local
```

Fill in the keys. All listed services offer free tiers:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/study_abroad?schema=public"
NEXTAUTH_SECRET="your-generated-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# Optional free AI keys
GEMINI_API_KEY="" # Google AI Studio (Free)
GROQ_API_KEY=""   # console.groq.com (Free Llama 3.3)
XAI_API_KEY=""    # xAI Grok (Optional)
RESEND_API_KEY="" # resend.com (Free, 3,000 emails per month)
```

> Note: If you run locally without external keys, the built in failover knowledge engine and verified dataset still allow full functional exploration.

### Step 4. Prisma Database Sync

Generate the Prisma Client:

```bash
npx prisma generate
```

Sync the schema to your PostgreSQL database:

```bash
npx prisma db push
```

### Step 5. Seed University Data (Optional)

```bash
npm run data:ingest
```

### Step 6. Start the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

<div align="center">
<img src="https://img.shields.io/badge/Setup%20Progress-100%25%20Complete-brightgreen?style=for-the-badge" alt="Setup progress"/>
</div>

---

## Deploying to Vercel

<div align="center">
<img src="https://img.shields.io/badge/Deploy%20With-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Deploy with Vercel"/>
</div>

<br/>

1. Push your repository to GitHub:

   ```bash
   git add .
   git commit -m "feat: complete study abroad advisor platform with RAG failover"
   git push origin main
   ```

2. Visit [vercel.com](https://vercel.com) and import the repository: `AbdulAzeemHashmi/study-abroad-advisor`.
3. Add the environment variables from `.env.local` in the Vercel project dashboard.
4. For the database, attach **Vercel Postgres** or a free **Neon** database, with `pgvector` enabled.
5. Deploy. Vercel will automatically build and deploy the Next.js app.
6. The weekly cron job automatically runs every Sunday at 2:00 AM UTC, configured through `vercel.json` cron settings.

---

## License

<div align="center">
<img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="MIT License"/>
</div>

MIT License. Free and open source for students worldwide.

---

<div align="center">

<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=18&pause=1000&color=4F46E5&center=true&vCenter=true&width=520&lines=Thanks+for+checking+this+out%21;Star+it+if+it+helped+you%21" alt="Footer typing" />

<br/>

If this project helped you plan your study abroad journey, please consider giving it a star.

<a href="https://github.com/AbdulAzeemHashmi/study-abroad-advisor">
  <img src="https://img.shields.io/github/stars/AbdulAzeemHashmi/study-abroad-advisor?style=social" alt="Star this repo"/>
</a>

<br/><br/>

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:10B981,100:4F46E5&height=100&section=footer" width="100%"/>

</div>
