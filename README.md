# Guru Nanak Academy Website

The source code for the Guru Nanak Academy website, covering school information, admissions, events, blog content, contact forms, and fee-payment flows.

## Live site

[gurunanakacademy.netlify.app](https://gurunanakacademy.netlify.app)

## Technology

- Next.js and TypeScript
- Tailwind CSS
- Jest and Testing Library
- MDX content support
- Razorpay integration and Cloudflare Turnstile support

## Project structure

- `src/app/`: routes, server actions, and API handlers
- `src/components/`: shared UI and feature components
- `src/content/`: site content and blog material
- `__tests__/`: component and utility tests
- `public/`: static assets

## Local development

Prerequisites: Node.js 18.17 or later.

```bash
git clone https://github.com/amandeavor/GuruNanakAcademy.git
cd GuruNanakAcademy
npm install
cp .env.example .env.local
npm run dev
```

## Available commands

```bash
npm run lint
npm run format:check
npm test
npm run build
```

## Configuration

Use `.env.example` as the reference for local configuration. Keep service credentials and payment-provider secrets out of version control.

## Deployment

The repository includes Netlify configuration and Next.js sitemap generation. Verify the active provider settings before changing branches, deployment configuration, or domain settings.

## License

This project is proprietary. See [LICENSE](LICENSE) for the current terms.
