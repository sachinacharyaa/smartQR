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

const cardBackgrounds = [
  'linear-gradient(135deg, #fff0f4 0%, #f8d9ff 100%)',
  'linear-gradient(135deg, #fff7e0 0%, #ffe1c2 100%)',
  'linear-gradient(135deg, #e8f7ff 0%, #d9e6ff 100%)',
  'linear-gradient(135deg, #e8fff3 0%, #d7f3e8 100%)',
  'linear-gradient(135deg, #f3f0ff 0%, #e0e6ff 100%)',
  'linear-gradient(135deg, #fff3e8 0%, #ffe7d6 100%)'
];

export default function Features() {
  return (
    <section className="features">
      <h2 className="features__title">Everything you need in an all-in-one QR platform</h2>
      <p className="features__lead muted">
        smartQR is built to solve real-world problems with dynamic routing, analytics,
        and collaboration that stand out from basic generators.
      </p>
      <div className="features__grid">
        {features.map((feature, idx) => (
          <div
            className="feature-card"
            key={feature.title}
            style={{ background: cardBackgrounds[idx % cardBackgrounds.length] }}
          >
            <h4>{feature.title}</h4>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
