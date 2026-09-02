<div align="center">

# ⚡ ColdMail AI — Intelligent Cold Outreach Generator

**Next-generation, multi-channel B2B cold email & LinkedIn outreach generation platform powered by Groq LLM inference.**

[![GitHub stars](https://img.shields.io/github/stars/farhan6397/aiColdEmail?style=for-the-badge&logo=github&color=2DD4BF)](https://github.com/farhan6397/aiColdEmail/stargazers)
[![License: ISC](https://img.shields.io/badge/License-ISC-080B0C?style=for-the-badge&logo=opensourceinitiative&color=14B8A6)](https://opensource.org/licenses/ISC)
[![React 19](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.2-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind-CSS_v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5.2-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Groq AI](https://img.shields.io/badge/Groq-LPU_Inference-F55036?style=for-the-badge&logo=fastapi&logoColor=white)](https://groq.com/)

[Explore Demo](#-quick-start) • [Features](#-core-features) • [Architecture](#-tech-stack--architecture) • [API Docs](#-api-endpoints-reference) • [Setup Guide](#-getting-started) • [Deployment](#-deployment-guide)

</div>

---

## 📌 Executive Overview

**ColdMail AI** is a production-grade full-stack SaaS platform crafted to revolutionize cold B2B outreach. By combining high-speed AI inference via Groq LPU with fine-tuned cold outreach prompts, ColdMail AI automates the end-to-end copywriting workflow.

Rather than generating generic templates, it generates a complete **4-in-1 multi-channel outreach bundle** for any prospect or ICP in under 2 seconds:
1. 🎯 **High-Open Subject Line**: Click-worthy, spam-free subject lines tailored to the prospect.
2. ✉️ **Primary Cold Email**: Hyper-personalized, concise email following proven cold email frameworks (Pain point $\rightarrow$ Value proposition $\rightarrow$ Soft CTA).
3. 💬 **LinkedIn DM**: Short, conversational connection message or InMail pitch.
4. 🔄 **Strategic Follow-up**: Contextual nudge message designed to maximize response rates after initial contact.

---

## 🚀 Core Features

### 🧠 4-in-1 Instant Outreach Generation
- Generates subject lines, primary body, LinkedIn DM, and follow-up email from a single prompt.
- Powered by ultra-low-latency Groq Cloud LPU inference.
- Structured JSON output parsing ensures consistent, reliable results every time.

### 🎭 Audience & Tone Customization
- Choose between diverse outreach tones: **Conversational**, **Direct & Short**, **Professional**, **Persuasive**, and more.
- Built-in prompt presets for SaaS Engineering pitches, Agency Growth outreach, Proposal Follow-ups, and Executive InMails.

### 🛡️ Deliverability & Spam Analysis
- **Spam Word Dictionary**: Search and identify trigger words that risk landing your campaigns in spam folders.
- **Industry Benchmarks**: Compare cold email metrics against industry averages (open rates, reply rates, bounce rates).
- **Outreach Analytics**: Real-time word count, reading time estimates, and structural readability indicators.

### 🔐 Enterprise-Grade Authentication & Cloud-Ready Verification
- **JWT & Bcrypt**: Secure token-based session handling and salted password encryption.
- **Dual-Mode OTP Verification**: Automated 6-digit OTP delivery using Nodemailer & Gmail SMTP for local environments, paired with automatic cloud bypass when running in cloud environments (Render, Railway, Heroku) where SMTP ports are restricted.

### 📜 Searchable Cloud History & Archives
- Complete MongoDB-backed history tracking with persistent user-bound records.
- Filter, search, and reload previous generations with one click.
- Timestamps standardized in IST (Indian Standard Time) and formatted for human readability.

### 💎 Modern Glassmorphism UI / UX
- Built with React 19, Tailwind CSS v4, and Lucide Icons.
- Deep dark-mode aesthetic with teal accents (`#2DD4BF`).
- Fully responsive across desktop, tablet, and mobile with dedicated bottom navigation for mobile viewports.

---

## 🏗️ Tech Stack & Architecture

### 📐 System Architecture & Data Flow

<div align="center">
  <img src="./image.png" alt="Data Flow Diagram for AI Cold Email Generator" style="border-radius: 8px; max-width: 100%; box-shadow: 0 4px 20px rgba(0,0,0,0.4);" />
  <p><em>Figure 1: End-to-End Architectural Data Flow Diagram (Frontend, Express Backend, JWT Middleware, MongoDB Clusters, Groq AI & Gmail SMTP)</em></p>
</div>

<details>
<summary><b>View Quick Flowchart Diagram</b></summary>

```mermaid
graph TD
    A[Client - React 19 + Vite + Tailwind CSS v4] -->|REST API Requests / JWT| B[Express 5.2 Server]
    B -->|User Data & History| C[(MongoDB Atlas Database)]
    B -->|Transactional Emails / OTP| D[Nodemailer / Gmail SMTP]
    B -->|Fast AI LLM Inference| E[Groq LPU Cloud API]
```

</details>


### Stack Breakdown

| Layer | Technology | Description |
| :--- | :--- | :--- |
| **Frontend Framework** | [React 19](https://react.dev/) + [Vite 8](https://vitejs.dev/) | High-performance SPA with fast HMR |
| **Styling & UI** | [Tailwind CSS v4](https://tailwindcss.com/) + [Lucide React](https://lucide.dev/) | Modern dark glassmorphism system & iconography |
| **Routing & State** | [React Router v7](https://reactrouter.com/) + Context API | Client-side routing and unified AuthContext |
| **Backend Runtime** | [Node.js](https://nodejs.org/) & [Express 5](https://expressjs.com/) | RESTful API server with modular controllers & routes |
| **AI / LLM Engine** | [Groq Cloud API](https://groq.com/) | Ultra-low latency LPU model inference (`groq/compound-mini`) |
| **Database & ODM** | [MongoDB](https://www.mongodb.com/) + [Mongoose 9](https://mongoosejs.com/) | Cloud document store with pre-save middleware |
| **Authentication** | [JSON Web Tokens (JWT)](https://jwt.io/) + [Bcrypt](https://github.com/kelektiv/node.bcrypt.js) | Stateless auth, encrypted password hashing |
| **Email Service** | [Nodemailer](https://nodemailer.com/) | SMTP email dispatcher for OTP verification |
| **Orchestration** | [Concurrently](https://github.com/open-cli-tools/concurrently) | Single-command root script running both client and server |

---

## 📂 Directory Structure

```text
ai-cold-email-generator/
├── package.json               # Root scripts (concurrently dev, install-all)
├── package-lock.json
│
├── client/                    # React 19 + Vite Frontend
│   ├── index.html             # HTML entry point with metadata
│   ├── vite.config.js         # Vite bundler configuration
│   ├── package.json           # Frontend dependencies
│   ├── .env.example           # Frontend environment template
│   └── src/
│       ├── main.jsx           # React DOM root
│       ├── App.jsx            # Router and layout declaration
│       ├── index.css          # Tailwind CSS v4 directives
│       ├── components/        # Reusable UI components
│       │   ├── Navbar.jsx
│       │   ├── Sidebar.jsx
│       │   ├── Footer.jsx
│       │   ├── MobileBottomNav.jsx
│       │   ├── WhatsAppButton.jsx
│       │   └── ScrollToTop.jsx
│       ├── context/           # Global state
│       │   └── AuthContext.jsx
│       ├── pages/             # Route views
│       │   ├── Home.jsx             # Public marketing landing page
│       │   ├── Dashboard.jsx        # Core AI generation suite
│       │   ├── HistoryPage.jsx      # Archived generation records
│       │   ├── PresetsPage.jsx      # Outreach prompt templates
│       │   ├── AnalyticsPage.jsx    # Outreach analytics & scorecards
│       │   ├── SpamDictionary.jsx   # Spam trigger word index
│       │   ├── Benchmarks.jsx       # Cold email conversion stats
│       │   ├── Guide.jsx            # Cold outreach playbook
│       │   ├── Login.jsx            # User sign-in
│       │   ├── Register.jsx         # User registration & OTP modal
│       │   ├── Support.jsx          # Contact & help desk
│       │   ├── Privacy.jsx          # Privacy policy
│       │   ├── Terms.jsx            # Terms of service
│       │   └── SecurityInfo.jsx     # Security architecture details
│       └── utils/
│           ├── api.js               # Axios instance with auth interceptors
│           └── formatDate.js        # IST date formatting helper
│
└── server/                    # Express 5 Backend API
    ├── server.js              # Server entry point, DB init, & middleware
    ├── package.json           # Backend dependencies
    ├── .env.example           # Backend environment template
    ├── config/
    │   └── db.js              # Mongoose MongoDB connection
    ├── controllers/
    │   ├── aiController.js    # Groq inference & history queries
    │   └── authController.js  # Registration, login, OTP generation/validation
    ├── middleware/
    │   └── authMiddleware.js  # Bearer JWT verification guard
    ├── models/
    │   ├── User.js            # User schema, password hashing, IST hooks
    │   └── EmailHistory.js    # Multi-field email generations schema
    └── utils/
        └── sendEmail.js       # Nodemailer SMTP transporter
```

---

## ⚙️ Environment Variables

### 1. Server Configuration (`server/.env`)

Create a file named `.env` inside the `server/` directory (refer to [`server/.env.example`](file:///d:/Farhan/Projects/AI%20COLD%20EMAIL%20GENERATOR/server/.env.example)):

| Variable | Required | Description | Example |
| :--- | :---: | :--- | :--- |
| `PORT` | Optional | Port on which Express server listens | `5000` |
| `NODE_ENV` | Optional | Runtime environment (`development` or `production`) | `development` |
| `MONGO_URI` | **Yes** | MongoDB Atlas or local connection string | `mongodb+srv://user:pass@cluster.mongodb.net/dbname` |
| `JWT_SECRET` | **Yes** | Secret cryptographic key used to sign session tokens | `your_strong_secret_key_2026` |
| `GROQ_API_KEY` | **Yes** | API key from Groq Cloud platform | `gsk_xxxxxxxxxxxxxxxxxxxx` |
| `EMAIL_USER` | **Yes** | Gmail email address for sending OTP verification codes | `your-email@gmail.com` |
| `EMAIL_PASS` | **Yes** | 16-digit Google App Password (not standard account password) | `xxxx xxxx xxxx xxxx` |
| `BYPASS_OTP` | Optional | Set to `true` to auto-verify registrations without SMTP | `false` |

> [!TIP]
> **How to create a Gmail App Password:**
> 1. Visit your [Google Account Security Settings](https://myaccount.google.com/security).
> 2. Ensure **2-Step Verification** is enabled.
> 3. Search for **App passwords** and create an entry named "ColdMail AI".
> 4. Copy the generated 16-character code into `EMAIL_PASS`.

---

### 2. Client Configuration (`client/.env`)

Create a file named `.env` inside the `client/` directory (refer to [`client/.env.example`](file:///d:/Farhan/Projects/AI%20COLD%20EMAIL%20GENERATOR/client/.env.example)):

| Variable | Required | Description | Default |
| :--- | :---: | :--- | :--- |
| `VITE_API_BASE_URL` | **Yes** | Target backend API base address | `http://localhost:5000/api` |

---

## 🛠️ Getting Started

### Prerequisites
Make sure you have installed:
- [Node.js](https://nodejs.org/) (version **18.0.0** or higher recommended)
- [npm](https://www.npmjs.com/) (version **9.0.0** or higher)
- A [MongoDB Atlas](https://www.mongodb.com/atlas) cluster or local MongoDB instance
- A free [Groq Cloud](https://console.groq.com) API account

### Step 1: Clone the Repository
```bash
git clone https://github.com/farhan6397/aiColdEmail.git
cd aiColdEmail
```

### Step 2: Install All Dependencies
Use the unified root script to install dependencies for root, client, and server simultaneously:
```bash
npm run install-all
```
*(Or install manually in each subfolder via `cd server && npm install` and `cd ../client && npm install`)*

### Step 3: Configure Environment Files
Set up `.env` files in both directories:

**Server Configuration:**
```bash
# In server directory:
cp server/.env.example server/.env
# Edit server/.env with your MongoDB URI, Groq API key, and Gmail credentials
```

**Client Configuration:**
```bash
# In client directory:
cp client/.env.example client/.env
```

### Step 4: Run the Development Server
From the root directory, start both the client and server concurrently:
```bash
npm run dev
```

The application will be live at:
- **Frontend App**: [http://localhost:5173](http://localhost:5173)
- **Backend API**: [http://localhost:5000](http://localhost:5000)

---

## 📡 API Endpoints Reference

### Base URL: `/api`

### 1. Health & Server Status
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | Public | Keep-alive health check for cloud uptime pingers |

**Sample Response:**
```json
{
  "status": "active",
  "message": "ColdMail AI Backend is Running 24/7"
}
```

---

### 2. Authentication (`/api/auth`)

#### Register User
`POST /api/auth/register` — Creates user account and dispatches OTP email.
```json
// Request Body
{
  "username": "Alex Mercer",
  "email": "alex@example.com",
  "password": "SecurePassword123"
}

// Response (201 Created)
{
  "success": true,
  "message": "Account created successfully! A 6-digit OTP verification code has been sent to your email."
}
```

#### Verify OTP
`POST /api/auth/verify-otp` — Confirms 6-digit OTP and returns authentication token.
```json
// Request Body
{
  "email": "alex@example.com",
  "otp": "492104"
}

// Response (200 OK)
{
  "success": true,
  "message": "Email verified successfully! Welcome to ColdMail AI.",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "65e8a...",
    "name": "Alex Mercer",
    "email": "alex@example.com"
  }
}
```

#### Resend OTP
`POST /api/auth/resend-otp` — Generates and delivers a fresh 6-digit OTP (10 min expiry).
```json
// Request Body
{
  "email": "alex@example.com"
}
```

#### Login
`POST /api/auth/login` — Authenticates user credentials.
```json
// Request Body
{
  "email": "alex@example.com",
  "password": "SecurePassword123"
}
```

---

### 3. AI Generation & Outreach (`/api/ai`)
*Requires `Authorization: Bearer <token>` header.*

#### Generate Outreach Package
`POST /api/ai/generate-email`
```json
// Request Body
{
  "prompt": "Write a cold email to Sarah Connor, VP of Engineering at Cyberdyne Systems. Pitch our AI test automation platform to cut CI build times by 40%."
}

// Response (200 OK)
{
  "success": true,
  "message": "Outreach package generated successfully!",
  "data": {
    "_id": "664b8a2e...",
    "prompt": "Write a cold email to...",
    "subject": "Quick question regarding Cyberdyne's CI build times",
    "emailBody": "Hi Sarah,\n\nI noticed Cyberdyne is aggressively expanding its engineering team...",
    "linkedInDM": "Hey Sarah! Noticed Cyberdyne's fast growth in engineering. Sent an email regarding cutting test times by 40%—let's connect!",
    "followUpEmail": "Hi Sarah,\n\nQuickly bumping this in case it got buried under your releases...",
    "createdAt": "2026-09-02T17:31:44.000Z"
  }
}
```

#### Get User Outreach History
`GET /api/ai/history` — Returns all outreach packages generated by the authenticated user, sorted in reverse chronological order.

---

## 🚢 Deployment Guide

### Deploying the Backend on Render
1. Create a **New Web Service** on [Render](https://render.com).
2. Connect your GitHub repository `https://github.com/farhan6397/aiColdEmail`.
3. Set **Root Directory** to `server`.
4. Build Command: `npm install`
5. Start Command: `npm start`
6. Add all environment variables (`MONGO_URI`, `JWT_SECRET`, `GROQ_API_KEY`, `EMAIL_USER`, `EMAIL_PASS`).
> [!NOTE]
> Since Render blocks outbound SMTP traffic on free tier instances, the backend includes an automatic Render detection hook that safely auto-verifies registrations so user signups succeed smoothly.

### Deploying the Frontend on Vercel
1. Create a **New Project** on [Vercel](https://vercel.com).
2. Select your repository and set the **Root Directory** to `client`.
3. Framework Preset: **Vite**.
4. Configure Environment Variable:
   - `VITE_API_BASE_URL`: `https://your-render-backend.onrender.com/api`
5. Deploy!

---

## 🔒 Security Best Practices

- **Salted Password Hashing**: Passwords are never stored in plain text; salted with 10 rounds of `bcrypt`.
- **Stateless Tokens**: JWTs signed with HMAC-SHA256, strictly validated per protected route.
- **CORS Restricted**: Controlled origin cross-resource sharing.
- **Input Sanitization**: Email normalization and input length verification on every request.
- **Environment Isolation**: Sensitive credentials kept completely out of source control.

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository.
2. **Create your Feature Branch**:
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your Changes**:
   ```bash
   git commit -m "feat: Add high-converting outreach framework"
   ```
4. **Push to the Branch**:
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**.

---

## 📜 License

This project is open-source software licensed under the **ISC License**.

---

<div align="center">

**Built with ❤️ for modern sales teams, founders, and growth agencies.**

⭐ If you found ColdMail AI helpful, please consider giving it a star on [GitHub](https://github.com/farhan6397/aiColdEmail)!

</div>
