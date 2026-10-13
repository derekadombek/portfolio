---
name: service
description: Add, edit, or remove a productized service on the /services page and home page via src/data/services.ts. Use when changing what services are offered or their wording.
---

# Add or update a service

## 1. Check for overlap first (no duplicates)

Read `src/data/services.ts`. If an existing service covers the same outcome, edit it
instead of adding a near-duplicate. Each `slug` must be unique.

## 2. The entry

- `slug`: kebab-case; used as the `/services/#<slug>` anchor from the home page.
- `name`, `tagline`: outcome-first, plain language. Sell what the owner feels
  ("know your site is down before your customers do"), not the tool ("Prometheus").
- `outcomes`: 3 short bullets.
- `demo` (optional): slug of a case study in `src/data/caseStudies.ts` that proves
  it. Only set it if that case study exists.
- `note` (optional): a short aside to the reader.

## 3. If you remove or rename a slug

Search for the old slug in `src/data/caseStudies.ts` (`service:` fields) and anywhere
else in `src/` it's referenced, and update those in the same change.

## 4. Finish

Home (`index.astro`) and `/services` render from this array automatically. Don't
hand-edit those pages to add a service. `npm run build` must pass.
