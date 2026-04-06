const features = [
  {
    title: 'Smart link routing',
    description: 'Send iOS users to the App Store, Android to Play, and desktop to web.'
  },
  {
    title: 'Bulk QR generation',
    description: 'Import CSVs, tag campaigns, and manage QR fleets with ease.'
  },
  {
    title: 'Scan analytics',
    description: 'Track scans by time, location, device, and campaign performance.'
  },
  {
    title: 'Brand kit',
    description: 'Save logos, colors, and templates so teams stay on-brand.'
  },
  {
    title: 'Security controls',
    description: 'Add passwords, expiration dates, and scan limits for sensitive content.'
  },
  {
    title: 'Integrations',
    description: 'Automate workflows with Sheets, Zapier, Slack, and webhooks.'
  }
];

export default function Features() {
  return (
    <section className="features">
      <h2>Everything you need in an all-in-one QR platform</h2>
      <p className="muted">
        smartQR is built to solve real-world problems with dynamic routing, analytics,
        and collaboration that stand out from basic generators.
      </p>
      <div className="features__grid">
        {features.map((feature) => (
          <div className="feature-card" key={feature.title}>
            <h4>{feature.title}</h4>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
