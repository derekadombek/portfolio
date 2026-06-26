# Plan: Pivot portfolio into a DevOps consulting site

## Goal

Turn this personal portfolio into a **DevOps/infrastructure consulting service** site,
with showcase projects that double as proof-of-work *and* demonstrations of the
services offered.

## Direction (decided)

- **Service focus:** Infrastructure / DevOps (CI/CD, IaC, cloud, containers, monitoring).
- **Target client:** Small / local businesses.
- **Current proof:** None yet — build demonstration projects from scratch.

## Positioning

Pure DevOps (Terraform, Kubernetes, CI/CD) is normally sold to *technical* teams.
Small/local businesses don't buy "Kubernetes" — but they have the problems DevOps
solves (site goes down unnoticed, no backups, scary manual deploys, mystery hosting
bills). So the position is **outcomes, not tooling**:

> "I bring enterprise-grade infrastructure reliability to small businesses — your
> website and tools, hosted, automated, backed up, and monitored so they never
> silently break."

Same DevOps skills, framed as outcomes a non-technical owner feels. The Army
background (discipline, reliability, ops mindset) reinforces this narrative.

## Productized services (for a new `/services` page)

Fixed-scope offers, not hourly — easier for small business to say yes to.

| Service | What they get | DevOps skill behind it |
|---|---|---|
| Reliable Hosting & Auto-Deploy | Site on cloud with SSL, custom domain, push-to-deploy | IaC + CI/CD |
| Backup & Disaster Recovery | Automated daily backups + tested restore | Scripting, scheduled automation, DR |
| Uptime Monitoring & Alerts | Get texted *before* customers notice an outage | Observability/alerting |
| Cloud Cost Cleanup | Audit + cut hosting/cloud bill | Cloud architecture |
| Internal Tool Hosting | Booking/inventory/admin tool containerized & hosted | Docker + deployment |

Lead magnet / contact CTA: **"Free 30-min infrastructure audit."**

## Showcase projects to build (the proof)

Four demos. Each maps to a service, each produces shareable artifacts:
**live link + public GitHub repo + short case-study write-up + architecture diagram.**
Reuse the fictional **"Bob's Fishing Tours"** as the running example client to tie
everything together.

1. **One-command business site deploy** — Terraform provisions Cloudflare/S3+CloudFront,
   DNS, SSL; GitHub Actions builds & deploys on push.
   → proves IaC + CI/CD → sells **Reliable Hosting**. *(Build first — foundation.)*
2. **Containerized booking tool** — small reservation app, Dockerized, deployed to
   Fly.io/Render via CI/CD.
   → proves Docker + deployment → sells **Internal Tool Hosting**.
3. **Automated backup + restore** — scheduled GitHub Action backs up a DB/site to cloud
   storage nightly, with a one-command verified restore.
   → proves DR/reliability → sells **Backup & DR**.
4. **Monitoring & alert dashboard** — uptime checks on the above services with
   Slack/SMS/email alerts (Uptime Kuma or Prometheus/Grafana).
   → proves observability → sells **Monitoring**.

Together they cover the full DevOps story (IaC → CI/CD → containers → monitoring →
backups) while each solves a problem a shop owner understands.

## Site restructuring

- **Home:** reframe hero from "Hi, I'm Derek" to the value prop + CTA ("Book a free
  audit"). Keep a personal touch lower down.
- **New `/services` page:** the services table above as cards.
- **`/portfolio` → case studies:** upgrade `ProjectCard` + `src/data/projects.ts` into a
  richer case-study format (problem → build → stack → outcome → repo/live links →
  diagram). Move the Unity games into a small "Also: things I've built for fun" strip
  instead of leading with them.
- **About:** re-angle the military story toward reliability/ops discipline.
- **Contact:** swap the generic form for an "audit request" form (business name,
  website, what's painful).

## Build order

1. Site scaffolding: extend data model + add `/services` page + case-study layout.
2. Build **Project 1 (deploy pipeline)** — foundation the others plug into, most
   universally sellable.
3. Build Projects 2–4 in order.
4. Write each case study as each project is finished.

## Open questions / to revisit

- Confirm the reliability-for-small-business framing vs. traditional dev-team DevOps
  clients (changes messaging/clients, projects stay similar).
- Which project to tackle first (recommended: #1).
- Whether to start with site scaffolding or Project 1 itself.
