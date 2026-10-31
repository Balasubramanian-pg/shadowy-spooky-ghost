# 📊 Opus Finance Dashboard

> **Enterprise-Grade Personal Finance Analytics & Wealth Management Platform**  
> Built with React 18, TypeScript, Tailwind CSS, Vite 6, and Recharts. Engineered for modularity, type-safety, test coverage, and automated GitHub Actions CI/CD.

[![CI Pipeline](https://github.com/Balasubramanian-pg/shadowy-spooky-ghost/actions/workflows/ci.yml/badge.svg)](https://github.com/Balasubramanian-pg/shadowy-spooky-ghost/actions/workflows/ci.yml)
[![Deploy to GitHub Pages](https://github.com/Balasubramanian-pg/shadowy-spooky-ghost/actions/workflows/deploy.yml/badge.svg)](https://github.com/Balasubramanian-pg/shadowy-spooky-ghost/actions/workflows/deploy.yml)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.2-61dafb?logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.4-646CFF?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## 🏛 Architecture & Project Structure

The codebase is organized using a domain-driven, feature-based enterprise architecture where UI components, business logic, calculations, services, and types are cleanly decoupled:

```
opus-finance-dashboard/
├── .github/
│   ├── workflows/
│   │   ├── ci.yml                 # Automated CI: Typecheck, ESLint, Unit Tests, Build
│   │   └── deploy.yml             # Automated CD: Zero-touch deployment to GitHub Pages
│   └── dependabot.yml             # Automated dependency security scanning
├── public/
│   ├── favicon.svg                # Brand icon asset
│   └── manifest.json              # Web app manifest
├── src/
│   ├── components/                # Modular UI components
│   │   ├── common/                # Atomic UI primitives (KPICard, Card, Badge, SectionHeader)
│   │   ├── layout/                # Shell layout (Sidebar, Topbar)
│   │   ├── upload/                # Drag-and-drop Excel file uploader
│   │   ├── Navigation.tsx         # Layout facade for seamless backward compatibility
│   │   ├── Shared.tsx             # Shared UI facade
│   │   └── FileUploader.tsx       # Uploader facade
│   ├── features/                  # Domain-driven feature modules
│   │   ├── overview/              # Executive summaries, net worth, cash flow & active goals
│   │   ├── income-expenses/       # Income vs Expense breakdowns, trends, and transactions
│   │   ├── budget/                # Category budgets, actuals, variance tracking
│   │   ├── investments/           # Portfolio allocation, cost basis, unrealized gains
│   │   └── goals/                 # Financial milestones, target timelines, projections
│   ├── services/
│   │   └── excelParser.ts         # Excel ingestion & validation service (SheetJS)
│   ├── types/
│   │   └── index.ts               # Domain data contracts & interfaces
│   ├── utils/
│   │   ├── formatters.ts          # INR currency & compact numeric formatters
│   │   ├── calculations.ts        # Pure financial calculations & metrics
│   │   └── index.ts               # Unified utility exports
│   ├── constants/
│   │   └── index.ts               # Color tokens, glassmorphism styles, demo mock data
│   ├── styles/
│   │   └── index.css              # Global styles, glass effects & animations
│   ├── App.tsx                    # Root application component
│   ├── main.tsx                   # Application entry point
│   └── vite-env.d.ts              # Vite environment typings
├── tests/                         # Automated unit & integration tests (Vitest)
│   ├── setup.ts                   # Testing environment setup
│   ├── utils.test.ts              # Formatter test suite
│   ├── calculations.test.ts       # Financial math test suite
│   └── excelParser.test.ts        # Excel parser & validation test suite
├── .dockerignore                  # Docker build exclusions
├── .editorconfig                  # Consistent code formatting across editors
├── .env.example                   # Template environment variables
├── .eslintrc.json                 # ESLint code quality configuration
├── .gitignore                     # Git exclusions
├── .prettierrc                    # Prettier formatting rules
├── Dockerfile                     # Multi-stage production container build (Nginx)
├── eslint.config.js               # Modern ESLint flat config
├── index.html                     # Application HTML shell
├── nginx.conf                     # Production Nginx SPA routing & caching
├── package.json                   # Project metadata & npm scripts
├── tsconfig.json                  # Strict TypeScript configuration with `@/*` aliases
├── vite.config.ts                 # Modern Vite configuration with vendor chunk splitting
└── vitest.config.ts               # Vitest configuration
```

---

## ✨ Features

- **💼 Executive Overview**: Net worth trends, savings rate gauge, net cash flow tracking, and quick milestone status.
- **📈 Income & Expense Analysis**: Detailed category breakdown, transaction histories, recurring payment detection, and multi-period filtering (Last Month, Last 3 Months, Last 6 Months).
- **🎯 Dynamic Budget Tracking**: Visual budget vs. actual consumption, monthly variance analysis, and over-budget alerts.
- **💹 Investment Portfolio**: Holdings breakdown, cost-basis vs. market value, allocation percentages, and unrealized gains.
- **🚀 Goal Simulator**: Target timelines, monthly contribution tracking, and priority scheduling (High, Medium, Low).
- **📂 Excel File Ingestion**: Drag-and-drop support for `.xlsx` spreadsheets with automatic schema parsing and client-side validation.
- **🇮🇳 Indian Rupee (INR) Support**: Native currency formatting with Indian number system conventions (Lakhs, Crores).
- **⚡ Offline Demo Mode**: Instant one-click demo data generation for testing without uploading files.

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v18.x or v20.x or v22.x (v22 recommended)
- **npm**: v9+ (or pnpm / yarn)

### 1. Installation

```bash
# Clone the repository
git clone https://github.com/Balasubramanian-pg/shadowy-spooky-ghost.git
cd shadowy-spooky-ghost

# Install dependencies
npm install
```

### 2. Environment Configuration

```bash
# Copy example environment variables
cp .env.example .env.local
```

### 3. Start Development Server

```bash
npm run dev
```

The application will be live at:
- **Local**: `http://localhost:3000/`

---

## 🛠 Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts Vite local development server on port 3000 |
| `npm run build` | Compiles TypeScript and builds production assets to `dist/` |
| `npm run preview` | Previews the production build locally |
| `npm run test` | Runs the full Vitest automated test suite |
| `npm run test:watch` | Runs Vitest in interactive watch mode |
| `npm run test:coverage`| Generates code coverage report |
| `npm run lint` | Runs ESLint across `src/` and `tests/` |
| `npm run lint:fix` | Automatically fixes autofixable ESLint errors |
| `npm run typecheck` | Validates TypeScript types across the entire project |
| `npm run format` | Formats all code using Prettier |

---

## 🧪 Testing & Code Quality

The project includes an enterprise test suite powered by **Vitest** and **Testing Library**:

```bash
npm run test
```

Test coverage includes:
- **Currency & Formatter Logic**: Verifies accurate INR currency symbol formatting, compact notation, date formatting, and NaN tolerance.
- **Financial Calculations**: Validates savings rate equations, budget utilization percentages, portfolio market values, and goal completion progress.
- **Excel Parser Service**: Validates schema mapping, empty worksheet error handling, and automated allocation distribution.

---

## 🔄 CI/CD Pipeline (GitHub Actions)

The repository includes two automated GitHub Actions workflows:

### 1. Continuous Integration (`.github/workflows/ci.yml`)
- Triggers on every **push** or **pull request** to the `main` branch.
- **Jobs**:
  1. `lint-and-typecheck`: Validates TypeScript (`npm run typecheck`) and runs ESLint (`npm run lint`).
  2. `test`: Executes all unit test suites (`npm run test`).
  3. `build`: Compiles the production bundle with manual vendor chunking and uploads the distribution artifact.

### 2. Continuous Deployment (`.github/workflows/deploy.yml`)
- Automatically builds and deploys the latest dashboard to **GitHub Pages** upon successful push to `main`.
- Includes concurrency controls to prevent conflicting deployments.

---

## 🐳 Docker Deployment

A production-ready, multi-stage Docker configuration is included:

```bash
# Build the Docker image
docker build -t opus-finance-dashboard:latest .

# Run container on port 80
docker run -d -p 80:80 --name opus-finance opus-finance-dashboard:latest
```

Open `http://localhost/` in your browser.

---

## 📄 License

This project is licensed under the MIT License.
