<div align="center">

# Portfolio

**A full-stack, serverless portfolio platform built with Next.js 16, Firebase, and Flutter.**

[![Live](https://img.shields.io/badge/Live-rajs.vercel.app-000000?style=for-the-badge&logo=vercel)](https://rajs.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Firebase](https://img.shields.io/badge/Firebase-BaaS-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![Flutter](https://img.shields.io/badge/Flutter-Mobile-02569B?style=for-the-badge&logo=flutter)](https://flutter.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

</div>

---

## Architecture

```
portfolio/
└── portfolio_suite/
    ├── frontend/          # Next.js 16 (Turbopack) — SSR + Serverless API Routes
    │   ├── src/
    │   │   ├── app/       # App Router (pages, layouts, API routes)
    │   │   ├── components/# Reusable UI components (GSAP + Framer Motion)
    │   │   └── lib/       # Firebase SDK initialization
    │   └── public/        # Static assets (images, CV)
    └── mobile/            # Flutter — Native WebView wrapper (Android/iOS)
```

### System Design

| Layer | Technology | Responsibility |
|-------|-----------|---------------|
| **Presentation** | Next.js 16, Tailwind CSS v4, GSAP, Framer Motion | Server-rendered pages, scroll-driven animations, responsive layout |
| **API** | Next.js Route Handlers (Edge-compatible) | Contact form ingestion, OTP dispatch, JWT issuance |
| **Authentication** | Firebase Auth (OAuth 2.0 + Email/Password) | Identity verification with email whitelist enforcement |
| **Database** | Cloud Firestore | Document store for projects and contact submissions |
| **Email** | Nodemailer (SMTP over TLS) | Transactional email delivery (OTP, contact notifications) |
| **Hosting** | Vercel (Edge Network) | Automatic CI/CD from `main`, serverless function execution |
| **Mobile** | Flutter + `webview_flutter` | Native Android/iOS shell wrapping the production web app |

---

## Features

- **Dynamic Project Management** — Projects are fetched from Firestore at runtime with a static fallback array for resilience.
- **3-Factor Admin Authentication** — Identity (Firebase OAuth) → Possession (Email OTP) → Knowledge (Server-side PIN) → JWT session token.
- **Serverless Contact Pipeline** — Form submissions are persisted to Firestore and forwarded via SMTP to the administrator inbox with an auto-reply to the sender.
- **Scroll-Driven Animations** — 12+ GSAP `ScrollTrigger` sequences including parallax, staggered character reveals, and typewriter effects.
- **CV Download** — Direct browser download of a hosted PDF resume from the hero section.

---

## Local Development

### Prerequisites

- Node.js ≥ 18
- Firebase project with **Authentication** and **Firestore** enabled
- Gmail account with a generated [App Password](https://myaccount.google.com/apppasswords)

### Setup

```bash
git clone https://github.com/RajTewari01/portfolio.git
cd portfolio/portfolio_suite/frontend
npm install
cp .env.example .env.local   # Populate with real credentials
npm run dev                   # http://localhost:3000
```

### Environment Variables

| Variable | Scope | Description |
|----------|-------|-------------|
| `EMAIL_USER` | Server | Gmail address for SMTP transport |
| `EMAIL_PASS` | Server | Gmail App Password (16-char) |
| `JWT_SECRET` | Server | HMAC signing key for session JWTs |
| `ADMIN_PIN` | Server | Static PIN for 3FA knowledge factor |
| `NEXT_PUBLIC_FIREBASE_*` | Client | Firebase SDK configuration keys |

> **Note:** `NEXT_PUBLIC_` variables are bundled into the client. Restrict the API key via [GCP Console → Credentials → HTTP Referrers](https://console.cloud.google.com/apis/credentials) to your production domain.

---

## Deployment

The application is deployed to **Vercel** with environment variables injected via the Vercel Dashboard. The `.env.local` file is excluded from version control.

```
GitHub Push → Vercel CI → Turbopack Build → Edge Deployment
```

**Production URL:** [https://rajs.vercel.app](https://rajs.vercel.app/)

---

## License

© Biswadeep Tewari. All rights reserved.
