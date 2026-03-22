# GC Tech Intro Site

Tapestry GC Technology Enterprise Portal - a Next.js static site with minimalist white-background design and yellow brand theme.

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server on port 3000 |
| `npm run build` | Production build (outputs to `.next/`) |
| `npm run export` | Static export for local file access (outputs to `out/`) |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## Static Export

For local file access (opening HTML files directly in browser):

```bash
npm run export
```

Then open `out/index.html` in your browser. The post-export script automatically fixes asset paths for local file access.

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Home page
│   ├── cicd-workflow/        # CI/CD workflow page
│   └── layout.tsx            # Root layout with sidebar
├── components/
│   ├── Header.tsx            # Top navigation bar
│   ├── Sidebar.tsx           # Collapsible left sidebar
│   ├── MainContent.tsx       # Content wrapper
│   └── providers/            # React context providers
└── lib/
    └── constants.ts          # Brand & navigation config
```

## Features

- **Collapsible Sidebar** - Toggle between expanded (256px) and collapsed (64px) states
- **Yellow Brand Theme** - Primary color (#EAB308) used throughout
- **Responsive Layout** - Fixed header with adaptive content area
- **Static Export Support** - Can be deployed as static HTML files

## Tech Stack

- [Next.js 16](https://nextjs.org/) - React framework with App Router
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- [Tailwind CSS v4](https://tailwindcss.com/) - Utility-first CSS
- [Lucide React](https://lucide.dev/) - Icon library
- [Framer Motion](https://motion.dev/) - Animation library

## Deployment

### Static File Hosting
```bash
npm run export
```
Deploy the contents of `out/` directory to any static file host.

### Vercel (Recommended for Next.js)
```bash
npm run build
```
Deploy via [Vercel Platform](https://vercel.com/).

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)