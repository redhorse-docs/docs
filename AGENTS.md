# Repository Guidelines

## Project Structure & Module Organization
The Next.js App Router drives everything under `app/`. `app/page.tsx` renders the landing doc, `layout.tsx` wraps global metadata, and `globals.css` bootstraps Tailwind v4 primitives. Long-form requirements live in `docs/00-README.md`–`06-API-SPEC.md`; keep numbering stable when adding new specs. Static assets belong in `public/` and are referenced via `/asset-name`. Root-level configs (`next.config.ts`, `tsconfig.json`, `eslint.config.mjs`, `postcss.config.mjs`) are the only places where framework settings should be tweaked.

## Build, Test, and Development Commands
- `npm run dev` — run the hot-reloading server on http://localhost:3000 for day-to-day work.
- `npm run build` — produce the optimized production bundle; run before every release branch.
- `npm run start` — serve the output from `.next/` locally to spot SSR regressions.
- `npm run lint` — execute ESLint with `eslint-config-next`; treat a clean run as a pre-PR gate.

## Coding Style & Naming Conventions
Write idiomatic TypeScript with strict types enabled; favor async/await and React Server Components unless client hooks force `"use client"`. Components, hooks, and contexts follow PascalCase filenames (`DocSidebar.tsx`) while helpers stay camelCase. Use 2-space indentation, avoid default exports inside `app/`, and colocate module-specific styles via Tailwind utilities within the JSX. Document-only assets stay in `docs/` so content diffs remain prose-focused.

## Testing Guidelines
Automated testing is not scaffolded yet, so introduce unit specs under `tests/` that mirror the `app/` path (`tests/app/page.test.tsx`) and reach at least 80% statement coverage. Use React Testing Library for component behavior and add Playwright for e2e flows touching routing or docs navigation. Once those tools are installed, expose them through `npm run test` (unit) and `npx playwright test` (e2e); run both before tagging a PR.

## Commit & Pull Request Guidelines
Git history currently uses short imperative subjects ("Initial commit from Create Next App"). Keep that voice, limit subjects to 72 characters, and describe user-facing impact in the body when needed. Every PR should include: a concise summary of changes, screenshots or terminal output for UI or docs updates, explicit references to the spec file(s) touched, a checklist confirming `npm run lint`/tests were run, and links to related issues or Notion tasks.
