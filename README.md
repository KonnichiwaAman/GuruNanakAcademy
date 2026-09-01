<div align="center">

# Guru Nanak Academy

**Official institutional web platform and digital portal for Guru Nanak Academy.**

[**Visit Live Website: gurunanakacademy.netlify.app →**](https://gurunanakacademy.netlify.app)

[![Next.js 16](https://img.shields.io/badge/Next.js-16.0-000000?logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Jest Tests](https://img.shields.io/badge/tested_with-Jest-C21325?logo=jest&logoColor=white)](https://jestjs.io/)
[![CI Status](https://img.shields.io/github/actions/workflow/status/amandeavor/GuruNanakAcademy/ci.yml?branch=main&label=CI)](https://github.com/amandeavor/GuruNanakAcademy/actions/workflows/ci.yml)
[![License: Proprietary](https://img.shields.io/badge/license-Proprietary-red.svg)](LICENSE)

<p align="center">
  <a href="#overview">Overview</a> •
  <a href="#key-capabilities">Capabilities</a> •
  <a href="#quickstart">Quickstart</a> •
  <a href="#quality-checks">Quality Checks</a> •
  <a href="#contributing">Guidelines</a>
</p>

</div>

---

## Overview

The Guru Nanak Academy web platform serves as the central digital hub for prospective students, enrolled families, faculty, and alumni. Built on **Next.js** and **TypeScript**, it delivers fast server-rendered pages, interactive admission inquiries, curriculum overviews, school announcements, and secure fee payment processing.

---

## Key Capabilities

| Subsystem | Functionality |
| :--- | :--- |
| **Admissions & Onboarding** | Interactive admission registration forms, eligibility criteria, and fee schedule calculators. |
| **Academics & Faculty** | Detailed curriculum outlines, faculty directories, academic calendars, and syllabus downloads. |
| **Secure Payment Flow** | Seamless tuition and registration fee checkout powered by Razorpay with webhook verification. |
| **Anti-Abuse Protection** | Cloudflare Turnstile integration guarding contact and registration endpoints from automated bot spam. |
| **Editorial Content** | Markdown/MDX powered newsroom, event notices, and student achievement chronicles. |

---

## Architecture & Project Structure

```
GuruNanakAcademy/
├── src/
│   ├── app/            # Next.js App Router (routes, server actions, api handlers)
│   ├── components/     # Reusable UI elements, navigation, forms, fee modals
│   ├── content/        # Markdown / MDX articles, school policies, syllabus
│   └── lib/            # Razorpay clients, Turnstile verification, utils
├── __tests__/          # Jest unit and component test suite
└── public/             # Static institutional photography, prospectus assets
```

---

## Quickstart

### Prerequisites
- Node.js `18.17+`
- npm `9+`

### Setup

```bash
# 1. Clone repository
git clone https://github.com/amandeavor/GuruNanakAcademy.git
cd GuruNanakAcademy

# 2. Install dependencies
npm install

# 3. Configure environment
cp .env.example .env.local

# 4. Launch local development server
npm run dev
```

---

## Quality Checks

Run all verification suites prior to opening pull requests:

```bash
# ESLint code linting
npm run lint

# Prettier format check
npm run format:check

# Run unit and component test suite
npm test

# Production Next.js build
npm run build
```

---

## Contributing & Policies

- [Contributing Guide](CONTRIBUTING.md)
- [Security Policy](SECURITY.md)
- [Code of Conduct](CODE_OF_CONDUCT.md)

---

## License

Copyright © 2024–2026 KonnichiwaAman / Guru Nanak Academy. All rights reserved. See [LICENSE](LICENSE) for proprietary terms.
