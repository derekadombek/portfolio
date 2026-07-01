// Productized DevOps services for small businesses. Fixed-scope, outcome-first.
export interface Service {
  slug: string;
  name: string;
  tagline: string;
  outcomes: string[];
  // which case-study slug demonstrates this service (optional until built)
  demo?: string;
  // an optional aside spoken directly to the reader (e.g. proof / example)
  note?: string;
}

export const services: Service[] = [
  {
    slug: 'hosting',
    name: 'Reliable Hosting & Auto-Deploy',
    tagline: 'Your website on solid cloud footing, with push-button updates.',
    outcomes: [
      'Custom domain with automatic SSL',
      'Changes go live the moment you publish them',
      'No more "the site is down and I don\'t know why"',
    ],
    note: 'This very site ships through that same pipeline — a predictable, fast, one-click deployment.',
    demo: 'site-deploy-pipeline',
  },
  {
    slug: 'backup',
    name: 'Backup & Disaster Recovery',
    tagline: "A crash, a bad update, or ransomware shouldn't end your business.",
    outcomes: [
      'Automated daily backups to the cloud',
      'Tested, one-command restore',
      'Peace of mind that your data survives anything',
    ],
    demo: 'automated-backups',
  },
  {
    slug: 'monitoring',
    name: 'Uptime Monitoring & Alerts',
    tagline: 'Know your site is down before your customers do.',
    outcomes: [
      '24/7 uptime checks on your site and tools',
      'Instant text/email alert when something breaks',
      'A simple status dashboard you can actually read',
    ],
    demo: 'monitoring-dashboard',
  },
  {
    slug: 'cost',
    name: 'Cloud Cost Cleanup',
    tagline: 'Stop overpaying for hosting and cloud services.',
    outcomes: [
      'Audit of what you pay for and what you actually use',
      'Right-sized, cheaper infrastructure',
      'A clear monthly bill you understand',
    ],
  },
  {
    slug: 'tools',
    name: 'Internal Tool Hosting',
    tagline: 'Your booking, inventory, or admin tool — hosted and dependable.',
    outcomes: [
      'Your custom tool packaged to run anywhere',
      'Reliable hosting with monitoring built in',
      'Updates without downtime',
    ],
    demo: 'booking-tool',
  },
  {
    slug: 'web-development',
    name: 'Web Development',
    tagline: 'A fast, modern website built to fit your business — not a template.',
    outcomes: [
      'Custom, responsive design that works on every device',
      'Fast-loading pages built for search and conversions',
      'Easy content updates you can manage yourself',
    ],
  },
  {
    slug: 'backend-development',
    name: 'Backend Development',
    tagline: 'The APIs, databases, and logic that power your app behind the scenes.',
    outcomes: [
      'Secure APIs and integrations that connect your tools',
      'Well-structured databases built to scale',
      'Reliable server-side logic with automated tests',
    ],
  },
  {
    slug: 'rpa',
    name: 'Robotic Process Automation',
    tagline: 'Hand off the repetitive, click-heavy work to software.',
    outcomes: [
      'Automate manual data entry and report generation',
      'Bots that run on schedule or on demand, without errors',
      'Free up hours of staff time every week',
    ],
  },
];
