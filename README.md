# AI Tools Directory

A simple, responsive directory for discovering AI tools by category. Built with Next.js (App Router), TypeScript, and Tailwind CSS.

## Features (v1)

- Browse all tools in a responsive grid
- Filter tools by category
- Search tools by name/description
- Tool detail pages with a link to the tool's website and related tools
- Static, JSON-based data — no backend or database required

## Project structure

```
app/
  page.tsx                 Home (browse all tools)
  category/[slug]/page.tsx Category page
  tool/[slug]/page.tsx     Tool detail page
  search/page.tsx          Search results page
  about/page.tsx           About page
components/                Reusable UI components
data/
  tools.json                Tool listings
  categories.json           Category list
lib/
  types.ts                  Shared TypeScript types
  tools.ts                  Data access + filtering helpers
```

## Getting started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Other scripts

```bash
npm run build   # production build (also type-checks)
npm start       # run the production build
npm run lint    # lint the project
```

## Adding a tool

Add an entry to `data/tools.json` following the `Tool` shape in `lib/types.ts`. Categories referenced by a tool must exist in `data/categories.json`.
