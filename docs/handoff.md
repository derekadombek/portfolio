# Session handoff

<!--
Rules for agents:
- OVERWRITE this file at the end of every task that changed files. Don't append.
  Old versions are in git history.
- Keep it under ~30 lines. Long-term status belongs in PLAN.md; decisions belong in
  docs/decisions.md. Link to them; don't copy them here.
- "Next step" must be concrete enough that a fresh agent can start without asking.
-->

**Updated:** 2026-10-11 · **Branch:** main

## Just done
- Moved all product/service planning to the private `~/repos/portfolio-business`
  (`planning/` catalog, positioning, demos; demo status in its `PLAN.md`; six
  decisions). This repo is now site-only; CLAUDE.md, PLAN.md, `/case-study` point there.

## Current state
- Build green. Nothing committed (agent setup, OCR work, Derek's about/Astro edits,
  `docs/` handoff + decisions).
- Site copy (`src/data/services.ts`) doesn't show products/modes yet (open PLAN item).

## Next step
1. Demo work starts in `~/repos/portfolio-business` (its handoff: demo 00, Bob's site).
2. Here: Formspree `YOUR_FORM_ID` in `src/pages/contact.astro`, OCR case-study diagram,
   and the products/modes decision for `/services`.

## Watch out for
- Never copy pricing, care plans, client names, or leads from portfolio-business into
  this public repo.
- Don't push: pushing `main` deploys.
