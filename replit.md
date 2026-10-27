# Bilingual Professional Portfolio

A personal portfolio presenting software engineering, AI research, entrepreneurship, consulting experience, and student leadership in Arabic and English.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

_Populate as you build — short repo map plus pointers to the source-of-truth file for DB schema, API contracts, theme files, etc._

## Architecture decisions

_Populate as you build — non-obvious choices a reader couldn't infer from the code (3-5 bullets)._

## Product

The public portfolio lives in `artifacts/portfolio`. It is a presentation-first site; it does not need accounts or a database. Project documents and images supplied by the owner support the case studies.

## User preferences

- The portfolio is only for entrepreneurial projects. Show the owner's name, exactly two biography paragraphs, and eight projects in this order: Ghanatk, YSR, CALIX, Taleeq, Arena OS, Benefit, Mobdi, Malazim Allam. Remove other sections and projects.
- Preserve Arabic/English language switching. Each project card should automatically cycle through every page/image in its supplied project file; use all supplied screenshots for screenshot-only projects.
- Use original project names exactly as shown in the supplied project files and branding, in both interface languages. Do not translate or invent transliterations of brand names.
- Apply the uploaded premium-design brief only to visual styling, not its suggested additional sections. The user confirmed keeping the current content only. Use off-white, navy, charcoal, and subtle electric blue with restrained motion; preserve the fast 1.5-second slideshows.
- The user requested light/dark modes, glass effects, and smooth image transitions resembling rotation of a rectangular 3D object. Keep these while retaining original names and the limited entrepreneurial-project scope.
- Preserve the distinction between completed results, competition concepts, and projected targets. Pitch-deck forecasts must not be represented as achieved outcomes.

## Gotchas

_Populate as you build — sharp edges, "always run X before Y" rules._

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
