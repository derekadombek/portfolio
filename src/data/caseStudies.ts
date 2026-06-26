export interface CaseStudy {
  slug: string;
  title: string;
  service: string; // service slug this maps to
  problem: string;
  solution: string;
  stack: string[];
  outcome: string;
  diagram: string; // architecture diagram in /public/diagrams
}

// Each entry is a problem I solve — the pain, how I approach it, and the
// outcome — not a past client engagement. Seeing it run live is on request.
export const caseStudies: CaseStudy[] = [
  {
    slug: 'site-deploy-pipeline',
    title: 'One-Command Website Deploy',
    service: 'hosting',
    problem:
      'A small business updates its website by manually uploading files — slow, error-prone, and easy to break. No SSL automation, no rollback, no repeatable setup.',
    solution:
      'Terraform provisions the entire hosting stack from scratch — a private S3 bucket, a CloudFront CDN with Origin Access Control, an auto-renewing ACM TLS certificate, and Route 53 DNS. A GitHub Actions pipeline then deploys the site on every push using keyless OIDC auth, with cache invalidation and instant rollback.',
    stack: ['Terraform', 'AWS S3 + CloudFront', 'ACM (TLS)', 'Route 53', 'GitHub Actions (OIDC)'],
    outcome:
      'Publishing a change goes from a nervous 20-minute manual upload to a single git push that is live in under a minute — reproducible, reversible, and secure by default.',
    diagram: '/diagrams/site-deploy.webp',
  },
  {
    slug: 'booking-tool',
    title: 'Containerized Booking Tool',
    service: 'tools',
    problem:
      'A custom internal tool (reservations) runs on someone’s laptop or a fragile shared host. Updates are scary and downtime is silent.',
    solution:
      'The app is containerized with Docker and deployed to a managed host via CI/CD, so it runs identically everywhere and updates roll out without downtime.',
    stack: ['Docker', 'GitHub Actions', 'Fly.io / Render', 'Healthchecks'],
    outcome:
      'A dependable internal tool that updates safely and can move between hosts in minutes.',
    diagram: '/diagrams/booking-tool.webp',
  },
  {
    slug: 'automated-backups',
    title: 'Automated Backup & Restore',
    service: 'backup',
    problem:
      'Most small businesses have no real backups. A bad update, a crash, or ransomware means permanent data loss.',
    solution:
      'A scheduled job backs up the database and site to cloud storage nightly, with retention and a tested, one-command restore that is verified automatically.',
    stack: ['GitHub Actions (scheduled)', 'AWS S3 / Backblaze B2', 'Bash', 'Restore verification'],
    outcome:
      'Nightly off-site backups and a restore that is proven to work — not just assumed to.',
    diagram: '/diagrams/backups.webp',
  },
  {
    slug: 'monitoring-dashboard',
    title: 'Monitoring & Alert Dashboard',
    service: 'monitoring',
    problem:
      'When a small business site or tool goes down, the owner usually finds out from an angry customer.',
    solution:
      'Uptime and health checks watch every service and fire instant alerts (text/email/Slack) on failure, with a simple status dashboard.',
    stack: ['Uptime Kuma / Prometheus + Grafana', 'Alerting (SMS/email/Slack)', 'Docker'],
    outcome:
      'Outages are caught in seconds and fixed before customers notice.',
    diagram: '/diagrams/monitoring.webp',
  },
];
