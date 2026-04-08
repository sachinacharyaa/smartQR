export default function Hero({ onPrimary }) {
  const heroVisual = `${import.meta.env.BASE_URL || '/'}imageQR.jpg`;

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
        </div>
      </div>
      <div className="hero__card">
        <img src={heroVisual} alt="Scanning a QR code at a restaurant" className="hero__visual" />
      </div>
    </section>
  );
}
