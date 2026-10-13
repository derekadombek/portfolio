---
name: case-study
description: Add or update a case study on the /portfolio page — the entry in src/data/caseStudies.ts, its architecture diagram in public/diagrams/, and its link to a service. Use when adding a new showcase project, writing up a finished one, or swapping a diagram.
---

# Add or update a case study

## 1. Check for an existing one first (no duplicates)

- Read `src/data/caseStudies.ts`. If a study already covers this problem, **update it**
  instead of adding another. Each `slug` must be unique.
- Read `PLAN.md` → Status. If the matching demo is `[~]`, someone else is working on
  it, so stop and ask. The demo's details are in its `~/repos/portfolio-business/planning/demos/` file.

## 2. The entry

Add or edit an object in `caseStudies` (`src/data/caseStudies.ts`):

- `slug`: kebab-case; it becomes `/portfolio/<slug>`.
- `service`: must equal an existing `slug` in `src/data/services.ts`. Also set that
  service's `demo` to this case study's slug.
- `problem` → `solution` → `outcome`: a problem I solve, in plain language for a
  non-technical owner. **Don't invent clients, numbers, or testimonials.** Only claim
  what the project actually does.
- `stack`: the real tools used.
- `diagram`: `/diagrams/<slug>.webp`.

## 3. The diagram

Raw diagram PNGs (usually exported from Gemini) need normalizing:

```bash
python3 scripts/normalize-diagram.py <path/to/input.png> <slug>
# -> public/diagrams/<slug>.webp
```

Requires Pillow (`pip3 install --user Pillow`). If there's no image yet, ask for one
rather than pointing `diagram` at a file that doesn't exist.

## 4. Finish

- Pages render from the data automatically (`portfolio.astro`, `portfolio/[slug].astro`).
  Don't create a page per study.
- Styles: reuse existing classes in `src/styles/global.css`.
- Tick the case-study step in the demo's file in `~/repos/portfolio-business/planning/demos/`,
  and update that repo's `PLAN.md` Status if the demo is now done.
- `npm run build` must pass. The Stop hook runs it.
