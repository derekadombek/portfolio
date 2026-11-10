# Session handoff

<!--
Rules for agents:
- OVERWRITE this file at the end of every task that changed files. Don't append.
  Old versions are in git history.
- Keep it under ~30 lines. Long-term status belongs in PLAN.md; decisions belong in
  docs/decisions.md. Link to them; don't copy them here.
- "Next step" must be concrete enough that a fresh agent can start without asking.
-->

**Updated:** 2026-11-09 · **Branch:** impeccable-plugin

## Just done
- 2026-11-09, branch `impeccable-plugin`, uncommitted: the copied Impeccable setup is reverted (skill,
  binary, four agents, detector hooks in `.claude/settings.json`, Copilot hook) and the official
  plugin `impeccable@impeccable` is enabled in `.claude/settings.json` instead. Kept: the UI gate,
  `.impeccable/config.json`, its `.gitignore` lines. Before committing, check in a fresh session
  opened in this folder (steps in `portfolio-business/planning/agent-tooling.md`, Step 3).
- Impeccable is now required for UI work (decision 2026-11-09 in `portfolio-business`).
  Skill and agents in `.claude/`, detector hook in `.claude/settings.json`, UI gate on
  `src/**/*.astro|css` and `src/assets/` (`UI_SKILL` in `agent-kit.conf`), rule in CLAUDE.md.
- Earlier: hosting case study links + `deploy.yml` pinned to website-deploy `@v1.0.0` (PR #1, merged).

## Current state
- Build green. No PRODUCT.md or DESIGN.md yet, so Impeccable has no brand context here.
- Site copy (`src/data/services.ts`) doesn't show products/modes yet (open PLAN item).

## Next step
1. `/impeccable init` (Derek answers its questions), then `/impeccable document` from the
   current site, so later UI work starts from the real brand.
2. Formspree `YOUR_FORM_ID` in `src/pages/contact.astro`, OCR case-study diagram, and the
   products/modes decision for `/services`. Renovate on this repo, if not installed yet.

## Watch out for
- Never copy pricing, care plans, client names, or leads from portfolio-business into
  this public repo. `.impeccable/config.json` is public too: keep reasons generic.
- Don't push: pushing `main` deploys.
