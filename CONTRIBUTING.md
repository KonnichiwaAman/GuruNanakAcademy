# Contributing to Guru Nanak Academy Website

Thank you for contributing to the Guru Nanak Academy website repository.

## Terms and Licensing

This repository contains proprietary source code for Guru Nanak Academy. All contributions submitted are subject to the terms in [LICENSE](LICENSE). Do not commit third-party material without appropriate licensing and authorization.

## Development Setup

```bash
git clone https://github.com/amandeavor/GuruNanakAcademy.git
cd GuruNanakAcademy
npm install
cp .env.example .env.local
npm run dev
```

## Quality Commands

Before opening a pull request, ensure all checks pass:

```bash
npm run lint
npm run format:check
npm test
npm run build
```

## Guidelines

- Keep pull requests focused on a single feature, bug fix, or content update.
- Never commit private credentials, API keys, or student/school confidential data.
- Update tests for modified React components or utility functions.
