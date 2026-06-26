// Productized DevOps services for small businesses. Fixed-scope, outcome-first.
export interface Service {
  slug: string;
  name: string;
  tagline: string;
  outcomes: string[];
  // which case-study slug demonstrates this service (optional until built)
  demo?: string;
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
];
