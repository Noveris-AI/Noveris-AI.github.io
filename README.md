# Noveris AI Tech Blog

<div align="center">

![Noveris Logo](public/logo.svg)

**A Technical Blog by Liu Yaojie (Passion)**

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Deployed-success?logo=github)](https://noveris-ai.github.io)
[![Vue 3](https://img.shields.io/badge/Vue-3.x-4FC08D?logo=vue.js)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?logo=vite)](https://vitejs.dev/)

[Live Demo](https://noveris-ai.github.io) | [Report Issue](https://github.com/Noveris-AI/Noveris-AI.github.io/issues)

</div>

---

## Overview

Noveris is a personal technical blog covering topics in:

- **Artificial Intelligence** - Machine learning, deep learning, and AI research
- **Cloud Native** - Kubernetes, Docker, microservices, and cloud infrastructure
- **Development** - Programming, software engineering, and best practices
- **Large Language Models** - GPT, LLaMA, prompt engineering, and LLM applications

## Features

- **Bilingual Support** - Full Chinese/English internationalization (i18n)
- **Dark/Light Theme** - Toggle between dark and light modes
- **Auto-Translation** - Automatic translation for Chinese articles when viewed in English
- **Responsive Design** - Mobile-first, works on all devices
- **Contact System** - Message form with history tracking
- **Category System** - Organized content by topic
- **Modern Stack** - Vue 3 + Vite + TypeScript

## Tech Stack

| Technology | Purpose |
|------------|---------|
| Vue 3 | Frontend framework |
| Vite | Build tool |
| TypeScript | Type safety |
| vue-router | Client-side routing |
| vue-i18n | Internationalization |
| marked | Markdown rendering |
| GitHub Pages | Hosting |
| GitHub Actions | CI/CD |

## Development

### Prerequisites

- Node.js 18+
- npm or yarn

### Setup

```bash
# Clone the repository
git clone https://github.com/Noveris-AI/Noveris-AI.github.io.git

# Navigate to project
cd Noveris-AI.github.io

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Project Structure

```
src/
├── components/       # Reusable Vue components
├── composables/      # Vue composables (hooks)
├── data/            # Static data (posts, categories)
├── i18n/            # Internationalization
├── layouts/         # Page layouts
├── router/          # Vue Router configuration
├── views/           # Page components
└── style.css        # Global styles
```

## Deployment

The site is automatically deployed to GitHub Pages via GitHub Actions when pushing to the `main` branch.

### Email Configuration (for Vercel deployment)

If deploying to Vercel with email functionality, set these environment variables:

```
EMAIL_USER=novatra.ai@novatra.cn
EMAIL_PASS=<your-password>
```

---

## Copyright & Legal Notice

### All Rights Reserved

Copyright © 2024-2025 Liu Yaojie (刘耀杰) / Passion. All rights reserved.

This repository and all its contents, including but not limited to:
- Source code
- Documentation
- Design assets
- Blog content
- Images and logos

are the exclusive intellectual property of **Liu Yaojie (刘耀杰)**, also known as **Passion**.

### Restrictions

**UNAUTHORIZED USE IS STRICTLY PROHIBITED.**

Without explicit written permission from the copyright holder, you may NOT:

1. **Copy** - Reproduce any part of this repository
2. **Modify** - Create derivative works based on this repository
3. **Distribute** - Share or redistribute this repository or its contents
4. **Commercial Use** - Use any part of this repository for commercial purposes
5. **Sublicense** - Grant rights to third parties
6. **Remove Attribution** - Remove or alter any copyright notices

### Legal Protection

This repository is protected under:

- **Copyright Law of the People's Republic of China** (中华人民共和国著作权法)
- **Regulations on the Protection of Computer Software** (计算机软件保护条例)
- **Anti-Unfair Competition Law of the People's Republic of China** (中华人民共和国反不正当竞争法)

### Enforcement

Any unauthorized use, reproduction, modification, or distribution of this repository will be considered a violation of the copyright holder's rights and will be subject to legal action under Chinese law.

**Violations may result in:**
- Civil liability for damages
- Criminal prosecution in severe cases
- Injunctive relief and other legal remedies

### Contact for Permissions

For licensing inquiries or permission requests, contact:

📧 **Email:** novatra.ai@novatra.cn
🔗 **GitHub:** [@Noveris-AI](https://github.com/Noveris-AI)

---

## Disclaimer

The content published on this blog represents the personal views of the author and does not represent any organization or employer. The technical information is provided "as is" without warranty of any kind.

---

<div align="center">

**Noveris AI Tech Blog**

Made with ❤️ by [Passion](https://github.com/Noveris-AI)

*Unauthorized modifications to this repository are prohibited and will be prosecuted under Chinese law.*

</div>
