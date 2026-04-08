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
  'linear-gradient(135deg, #ffe1ea 0%, #ffb8d5 100%)',
  'linear-gradient(135deg, #fff2d6 0%, #ffcba8 100%)',
  'linear-gradient(135deg, #dff6ff 0%, #b6e3ff 100%)',
  'linear-gradient(135deg, #efe6ff 0%, #d7c3ff 100%)',
  'linear-gradient(135deg, #e1fff3 0%, #b8f3da 100%)',
  'linear-gradient(135deg, #fff6cc 0%, #f6d58d 100%)'
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
