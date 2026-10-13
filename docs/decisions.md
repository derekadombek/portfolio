# Decisions

Settled choices and why. Check this before proposing an alternative. To change a
decision, add a new entry that supersedes the old one; don't edit history.

Format: `## YYYY-MM-DD — Title` · **Decision** · **Why** · (optional) **Supersedes**

---

## Pre-2026-10 — Static Astro site, no UI framework
**Decision:** Astro with `.astro` components only; no React/Vue islands, no Tailwind.
**Why:** It's a brochure site. Zero client JS keeps it fast and cheap to host on S3.

## Pre-2026-10 — One global stylesheet with CSS variables
**Decision:** All styles in `src/styles/global.css`; tokens are `:root` custom
properties. Layout is fluid (`clamp()`, grid/flex), not duplicated per breakpoint.
**Why:** The old site duplicated whole stylesheets per breakpoint and drifted.

## Pre-2026-10 — Content as typed TS arrays
**Decision:** Services and case studies live in `src/data/*.ts`, not Markdown
content collections or a CMS.
**Why:** Small, structured, and type-checked; pages just `.map()` over them.

## Pre-2026-10 — Pivot to DevOps consulting for small businesses
**Decision:** Sell outcomes (uptime, backups, painless deploys), not tooling. Lead
with services and case studies; personal and hobby work goes lower on the page.
**Why:** See `docs/positioning.md`.

## Pre-2026-10 — Case studies are capabilities, not client history
**Decision:** Each case study is a problem I solve, with a diagram. It doesn't claim
a past client engagement. Live demos are available on request.
**Why:** Honesty; there's no prior consulting client list yet.

## Pre-2026-10 — Deploy through the website-deploy catalog
**Decision:** `deploy.yml` calls `derekadombek/website-deploy/actions/aws-static-site@v1`
with GitHub OIDC (no stored AWS keys). Infra Terraform lives in that repo.
**Why:** The site is itself the proof for the "Reliable Hosting" service.

## Pre-2026-10 — Diagrams normalized to WebP
**Decision:** AI-generated diagrams go through `scripts/normalize-diagram.py` into
`public/diagrams/<slug>.webp`.
**Why:** Raw exports are framed inconsistently and get clipped by the 16:10 card crop.

## 2026-10-10 — CLAUDE.md is the single agent-instructions file
**Decision:** `CLAUDE.md` is canonical; `AGENTS.md` and `.github/copilot-instructions.md`
are symlinks. Skills live in `.claude/skills/` (`.github/skills` is a symlink). `PLAN.md`
is the only status ledger. No changelog.
**Why:** The earlier three-file setup was copied from another project and drifted.

## 2026-10-10 — Enforced session handoff file
**Decision:** `docs/handoff.md` is overwritten at the end of every task that changes
files (enforced by a Stop hook) and printed at session start. It holds short-term
state only.
**Why:** Each new agent should know exactly where things stand and what comes next.
Overwriting instead of appending keeps it short and current.

## 2026-10-10 — Hooks come from agent-kit
**Decision:** `.claude/hooks/*.sh` are managed by the personal `/agent-kit` skill
(`~/.claude/skills/agent-kit`) and overwritten on update. Repo-specific settings
(build command, guard rules) live in `.claude/agent-kit.conf`.
**Why:** The same handoff and guardrail setup is being rolled out to other repos;
one source for the hook logic.

## 2026-10-10 — Case-study diagram is optional
**Decision:** `CaseStudy.diagram` is optional. Without it, the card shows the
`.cs-placeholder` box and the detail page skips the hero image.
**Why:** A case study can be added before its diagram is ready (first case: `paper-to-data`),
and the page doesn't show a broken image while it waits.

## 2026-10-10 — Plan split: PLAN.md is the ledger, details in docs/demos/
**Decision:** `PLAN.md` holds only one-line status items, grouped by phase. Each demo
has a file in `docs/demos/` with its notes and step checklist; the shared demo rules are
in `docs/demos/README.md`. Positioning moved to `docs/positioning.md`. This replaces "PLAN.md
is the only status ledger": demo-level status stays in PLAN.md, and step status lives
in the demo file.
**Why:** PLAN.md was about to get huge, and CLAUDE.md loads it every session. The
session-start hook only reads checkboxes from PLAN.md, so the claimable items stay there.

## 2026-10-11 — Product/service planning moved to portfolio-business
**Decision:** The catalog, delivery modes, versioning, demo plans (`docs/demos/`), and
positioning moved to the private `~/repos/portfolio-business` repo (`planning/`, its
`PLAN.md`, its `docs/decisions.md`), along with the six product/service decisions
logged here on 2026-10-10/11. This repo keeps the website only: site copy in
`src/data/*.ts`, case studies, pages. Supersedes the demo parts of "Plan split".
**Why:** Pricing, care plans, client inventory, and sales strategy shouldn't be in a
public repo, and they belong next to the contracts and client records.
