<div align="center">
  <h1>PORTFOLIO NEXUS</h1>
  <p><b>A highly animated, serverless portfolio engine built on Next.js 14 and Firebase.</b></p>

  [![Next.js](https://img.shields.io/badge/Next.js-14.1-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
  [![Firebase](https://img.shields.io/badge/Firebase-10.8-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)
  [![GSAP](https://img.shields.io/badge/GSAP-3.12-88CE02?style=for-the-badge&logo=greensock&logoColor=white)](https://greensock.com/gsap/)
</div>

---

## 🚀 Overview

**Portfolio Nexus** is a production-grade, immersive developer portfolio designed to showcase skills through a dynamic, sci-fi aesthetic. 

The application is completely Serverless, utilizing **Next.js API Routes** and a **Firebase Backend-as-a-Service (BaaS)** pipeline to eliminate the need for a persistent Node.js or Python backend. It features a fully custom **3-Factor Authentication (3FA) Command Center** that acts as an integrated CMS, allowing the administrator to dynamically inject new projects and read contact submissions directly from the frontend without touching code.

## ✨ Core Features

*   **12+ Custom GSAP Animations**: Heavy utilization of `gsap.timeline` and `ScrollTrigger` for parallax backgrounds, staggered blur reveals, typing effects, and magnetic hover states.
*   **Zero-Trust Command Center (`/admin`)**: A visually bespoke CMS protected by a military-grade 3-Factor Authentication handshake.
*   **Dynamic Data Pipeline**: Projects are pulled directly from Google Cloud Firestore. If the database goes down, the engine gracefully falls back to a hardcoded `fallbackProjects` array.
*   **Sci-Fi "Glassmorphic" UI**: Custom CSS variables, floating blur orbs, infinite grid backgrounds, and brutualist typography designed specifically for modern mobile and desktop viewports.
*   **Integrated Serverless Contact Protocol (`/hire`)**: Form submissions are securely intercepted by a Next.js API route (`/api/contact`), routed to a Gmail inbox via Nodemailer, and backed up permanently to a Firestore collection.

## 🔐 Security Architecture (Admin Portal)

To prevent unauthorized database mutations, the `/admin` portal requires a highly secure **3-Factor Handshake**:

1.  **Factor 1 (Identity)**: Google OAuth Sign-In. The system enforces a strict whitelist; only predefined administrator emails (e.g., `mericans24@gmail.com`) are allowed past the Firebase gate. Unauthorized Google tokens are immediately destroyed.
2.  **Factor 2 (Possession)**: Upon clearing Factor 1, a dynamic 6-digit OTP is cryptographically generated and dispatched to the administrator's private email via a secure SMTP tunnel.
3.  **Factor 3 (Knowledge)**: The administrator must input the correct Time-based OTP *alongside* a static, server-side Secret Admin PIN to successfully acquire a verified JWT session token.

---

## 🛠️ Local Development

### 1. Prerequisites
- Node.js (v18+)
- A Google Firebase Project (Firestore, Authentication enabled)
- A Gmail Account with an App Password (for Nodemailer)

### 2. Installation
Clone the repository and install the dependencies for the frontend engine:

```bash
git clone https://github.com/RajTewari01/portfolio.git
cd portfolio/portfolio_suite/frontend
npm install
```

### 3. Environment variables
Create a `.env.local` file in the `frontend` directory based on the provided `.env.example`. You **must** populate it with your actual Firebase configuration and SMTP keys for dynamic features to function locally.

```env
# Gmail App Password for executing Nodemailer
EMAIL_USER=mericans24@gmail.com
EMAIL_PASS=your_16_digit_app_password

# Cryptographically strong JWT Secret for signing 3FA sessions
JWT_SECRET=your_super_secret_string

# Factor 3: Static Admin PIN
ADMIN_PIN=592041

# Firebase Client SDK Credentials
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 4. Boot Sequence
```bash
npm run dev
```
Navigate to `http://localhost:3000`.

---

## 🌍 Vercel Deployment Strategy

Deploying this highly dynamic application to Vercel requires strict rules regarding Firebase secret management.

**WARNING: Do not commit `.env.local` to GitHub.**

1. Push your code to a public or private GitHub repository.
2. Link the repository to your Vercel account.
3. In the Vercel Dashboard for this project, navigate to **Settings** → **Environment Variables**.
4. Manually paste all variables from your `.env.local` file into the dashboard.

### 🛡️ Securing the NEXT_PUBLIC_ API Key

Because `NEXT_PUBLIC_FIREBASE_API_KEY` is inherently exposed to the client bundle (which is required by the Firebase Web SDK), you must restrict it in the Google Cloud Console to prevent malicious actors from stealing it and burning your quota.

1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Select your Firebase project.
3. Navigate to **APIs & Services** → **Credentials**.
4. Click on the auto-generated **Browser key**.
5. Under **Application restrictions**, select **HTTP referrers (web sites)**.
6. Add your Vercel domain (e.g., `https://your-portfolio.vercel.app/*`) and your local development environment (`http://localhost:*`).

If anyone steals the key from your Vercel build and tries to use it from their own domain, Google Cloud will block the request.

---
<div align="center">
  <p><i>Design and Architecture by Biswadeep Tewari • Hosted on the Edge</i></p>
</div>
