export default function Hero({ onPrimary }) {
  return (
    <section className="hero" id="products">
      <div className="hero__content">
        <p className="pill">#1 smart QR experience for modern brands</p>
        <h1>The most advanced QR workspace for your brand in one scan.</h1>
        <p className="hero__sub">
          smartQR lets you create unlimited static QR codes for free, with dynamic routing,
          analytics, and team collaboration when you are ready to scale.
        </p>
        <div className="hero__actions">
          <button className="btn" onClick={onPrimary}>Create a FREE QR code</button>
          <button className="btn btn--alt">Watch demo</button>
        </div>
      </div>
      <div className="hero__card">
        <div className="hero__stat">
          <span>99.99%</span>
          <small>Scan uptime</small>
        </div>
        <div className="hero__stat">
          <span>150M+</span>
          <small>Scans tracked</small>
        </div>
        <div className="hero__stat">
          <span>120+</span>
          <small>Countries served</small>
        </div>
      </div>
    </section>
  );
}
