# CLAUDE.md

Derek Dombek's site (derekadombek.com) — a DevOps/infrastructure consulting site for
small businesses. Static **Astro 7** + TypeScript (strict). No framework UI, no Tailwind.

`AGENTS.md` and `.github/copilot-instructions.md` are symlinks to this file — edit
only this one.

## Before you start any task (duplicate-work guardrail)

1. **Check what's already in flight.** The session-start hook prints `git status`,
   recent commits, and the open items in `PLAN.md`. If the task overlaps uncommitted
   changes or an item marked `[~]` in progress, stop and ask before continuing.
2. **Check the source of truth below before creating anything.** Extend the existing
   file instead of adding a parallel one (a second data file, stylesheet, card
   component, or page that does the same job).
3. **Check `docs/decisions.md`** before proposing an approach — don't re-litigate a
   settled decision; if one needs to change, say so and update the log.
4. For multi-step work from `PLAN.md`, mark the item `[~]` when you start and `[x]`
   when it's done, in the same change as the work. Demo work is claimed and tracked in
   `~/repos/portfolio-business` (its `PLAN.md` + `planning/demos/`), not here.

## Session handoff

- **Start:** the session-start hook prints `docs/handoff.md`. Begin from its
  "Next step" unless the user asks for something else.
- **End of every task that changed files:** overwrite `docs/handoff.md` with these
  sections: Just done / Current state / Next step / Watch out for. Keep it under ~30
  lines. A Stop hook blocks finishing until you do.
- Handoff is short-term (where we are, what's next). Long-term status goes in
  `PLAN.md` and decisions go in `docs/decisions.md`; don't copy them into the handoff.

## Source of truth — read these for fundamentals

| Topic | Read this | Rule |
|---|---|---|
| Status ledger (what's open / claimed / done) | `PLAN.md` | One line per item. Claim work here with `[~]`. |
| Catalog, delivery modes, versioning, demo plans | `~/repos/portfolio-business/planning/` (private) | Plan there; never copy pricing, care plans, or client info into this public repo. |
| Positioning + audiences | `~/repos/portfolio-business/planning/positioning.md` | Outcomes over tooling. |
| Where the last session left off | `docs/handoff.md` | Overwritten each task; short-term only. |
| Settled decisions + why | `docs/decisions.md` | Append; don't duplicate in other files. |
| Services offered | `src/data/services.ts` | Only place services are defined. |
| Case studies | `src/data/caseStudies.ts` | Only place case studies are defined; `service` must match a service `slug`. |
| Styles + design tokens | `src/styles/global.css` (`:root` vars) | The single stylesheet. No per-component `<style>` blocks, no new CSS files. |
| Page shell, `<head>`, SEO | `src/layouts/BaseLayout.astro` | Every page uses it. |
| Deploy | `.github/workflows/deploy.yml` → `derekadombek/website-deploy` | Infra lives in that repo, not here. |

## Layout

- `src/pages/` — one file per route; `portfolio/[slug].astro` renders each case study.
- `src/components/` — `Header`, `Footer`, `SectionMenu`, `CaseStudyCard`.
- `src/assets/` — images processed by `astro:assets` (use `<Image>`, not `<img>`).
- `public/diagrams/` — case-study diagrams (`.webp`), produced by
  `scripts/normalize-diagram.py <input.png> <slug>`.

## Commands

```bash
npm run dev      # http://localhost:4321
npm run build    # the only check — must pass (a Stop hook enforces it)
npm run preview
```

There is no lint or test script. Don't invent them.

## Rules

- Pushing to `main` deploys to production. Never push without being asked.
- `business/` is internal (gitignored) — never reference it from the site or commit it.
- Case studies describe *problems I solve*, not past client engagements. Don't invent
  clients, metrics, or testimonials.
- Copy: outcomes over tooling, plain language for non-technical owners (see
  `~/repos/portfolio-business/planning/positioning.md`).
- Accessibility: real `alt` text, labeled form fields, don't rely on color alone.

## Skills

- `/case-study` — add or update a case study (data, diagram, service link).
- `/service` — add or update a service.

@PLAN.md
