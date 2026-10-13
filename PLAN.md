# Plan: DevOps consulting site + service demos

## Goal

Turn this personal portfolio into a **DevOps/infrastructure consulting** site for
small/local businesses. Each service has a live demo that works as both proof of the
skills and a sales tool.

## Where things live

- **This file:** the status ledger. One line per item. The session-start hook reads
  the `[ ]` / `[~]` items from here.
- **`~/repos/portfolio-business` (private):** the catalog, delivery modes,
  versioning, positioning, and demo plans (`planning/`), with their status in its
  `PLAN.md`. Demo work is claimed there; only the case-study/site step happens here.
- **`docs/decisions.md`:** settled decisions and the reasons.

`[ ]` todo · `[~]` in progress (claimed; don't start it in parallel) · `[x]` done.

## Status

### Site
- [x] Data model: `src/data/services.ts`, `src/data/caseStudies.ts`
- [x] `/services` page
- [x] Case-study layout: `/portfolio` grid + `/portfolio/[slug]`
- [x] Home reframed: value prop + "Book a free audit" CTA
- [~] Contact → audit-request form. The form is built, but `FORMSPREE_ENDPOINT` in
      `src/pages/contact.astro` is still the `YOUR_FORM_ID` placeholder, so
      submissions go nowhere.
- [~] About re-angled toward reliability/ops (uncommitted edits in `about.astro`)
- [ ] "Also: things I've built for fun" strip for the Unity games
- [ ] Decide whether `/services` shows products + delivery modes (catalog is in portfolio-business)
