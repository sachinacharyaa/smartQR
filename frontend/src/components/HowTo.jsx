export default function HowTo() {
  return (
    <section className="howto" id="solutions">
      <h2>How to create a free QR code</h2>
      <p className="muted">
        Generate branded QR codes in seconds. Add a logo, customize the design, and
        download instantly.
      </p>
      <div className="howto__grid">
        <div className="howto__card">
          <span className="step-chip">Step 1</span>
          <h3>Select a QR type and fill in the details</h3>
          <p>Choose from URL, vCard, file, link page, WiFi, and more.</p>
        </div>
        <div className="howto__card">
          <span className="step-chip">Step 2</span>
          <h3>Customize your QR design</h3>
          <p>Pick patterns, add your logo, and save it as a reusable template.</p>
        </div>
        <div className="howto__card">
          <span className="step-chip">Step 3</span>
          <h3>Download and track</h3>
          <p>Export PNG or SVG. Upgrade for analytics, dynamic edits, and routing.</p>
        </div>
      </div>
    </section>
  );
}
