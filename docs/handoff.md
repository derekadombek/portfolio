# Session handoff

<!--
Rules for agents:
- OVERWRITE this file at the end of every task that changed files. Don't append.
  Old versions are in git history.
- Keep it under ~30 lines. Long-term status belongs in PLAN.md; decisions belong in
  docs/decisions.md. Link to them; don't copy them here.
- "Next step" must be concrete enough that a fresh agent can start without asking.
-->

**Updated:** 2026-10-13 · **Branch:** hosting-links-and-pin (PR open, not merged)

## Just done
- Hosting case study: `links` field + "See it" section (code, Bob's live demo, this site).
- `deploy.yml` pinned to website-deploy `@v1.0.0`; `renovate.json` added.

## Current state
- Build green. The PR can't merge until the website-deploy `v1.0.0` tag exists
  (website-deploy #46, #47 merged, tag pushed). Merging to main deploys.

## Next step
1. Derek: merge this PR after the tag; install Renovate on this repo.
2. Then: Formspree `YOUR_FORM_ID` in `src/pages/contact.astro`, OCR case-study diagram,
   products/modes decision for `/services`.

## Watch out for
- Never copy pricing, care plans, client names, or leads from portfolio-business here.
- Don't push main: pushing main deploys.
