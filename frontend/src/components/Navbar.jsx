export default function Navbar() {
  return (
    <nav className="nav">
      <div className="nav__logo">
        <span className="logo-mark">S</span>
        <span>smartQR</span>
      </div>
      <div className="nav__links">
        <a href="#products">Products</a>
        <a href="#solutions">Solutions</a>
        <a href="#learn">Learn</a>
        <a href="#pricing">Pricing</a>
        <a href="#faq">FAQ</a>
      </div>
      <div className="nav__actions">
        <button className="ghost">Log in</button>
        <button className="btn">Register</button>
        <div className="nav__lang">Eng ?</div>
      </div>
    </nav>
  );
}
