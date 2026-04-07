export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__brand">
        <div className="nav__logo">
          <span className="logo-mark">S</span>
          <span>smartQR</span>
        </div>
        <p>Beautiful QR codes, real insights, and smart routing for teams of any size.</p>
      </div>
      <div className="footer__links">
        <div>
          <h4>Product</h4>
          <a href="#products">Generator</a>
          <a href="/pricing-plans">Pricing</a>
          <a href="#faq">FAQ</a>
        </div>
        <div>
          <h4>Resources</h4>
          <a href="#learn">Guides</a>
          <a href="#solutions">Templates</a>
          <a href="#">Support</a>
        </div>
        <div>
          <h4>Company</h4>
          <a href="#">About</a>
          <a href="#">Careers</a>
          <a href="#">Contact</a>
        </div>
      </div>
      <div className="footer__cta">
        <h4>Get product updates</h4>
        <p>Join the list for new features, promos, and QR tips.</p>
        <div className="footer__form">
          <input type="email" placeholder="Enter your email" />
          <button className="btn">Notify me</button>
        </div>
      </div>
      <div className="footer__bottom">
        <span>(c) 2026 smartQR. All rights reserved.</span>
        <span>Privacy - Terms - Status</span>
      </div>
    </footer>
  );
}
