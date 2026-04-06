export default function Templates() {
  return (
    <section className="templates">
      <h2>Custom QR code designs and templates you can create</h2>
      <p>Choose from ready-to-use templates or build your own unique style.</p>
      <div className="template-grid">
        {['Launch', 'Events', 'Menu', 'Retail', 'Music', 'Travel'].map((name) => (
          <div className="template-card" key={name}>
            <div className="template-card__qr" />
            <h4>{name}</h4>
            <p className="muted">Optimized for high scan rates.</p>
          </div>
        ))}
      </div>
      <div className="template-note">Scan any sample QR code to see how it works IRL.</div>
    </section>
  );
}
