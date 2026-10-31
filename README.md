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
├── Dockerfile             