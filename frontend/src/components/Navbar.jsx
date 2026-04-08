import { useState } from 'react';

const solutionItems = [
  { id: 'link', label: 'Link to QR Code' },
  { id: 'pdf', label: 'PDF to QR Code' },
  { id: 'instagram', label: 'QR Code for Instagram' },
  { id: 'location', label: 'Location QR Code Generator' },
  { id: 'youtube', label: 'YouTube QR Code' }
];

export default function Navbar({ onSelectSolution, onOpenPricing }) {
  const [openMenu, setOpenMenu] = useState(null);
  const toggleMenu = (menu) => setOpenMenu((prev) => (prev === menu ? null : menu));
  const homeHref = import.meta.env.BASE_URL || '/';

  return (
    <nav className="nav">
      <a href={homeHref} className="nav__logo">
        <span className="logo-mark">S</span>
        <span>smartQR</span>
      </a>
      <div className="nav__links">
        <div className={openMenu === 'solutions' ? 'nav__menu-item nav__menu-item--dropdown nav__menu-item--open' : 'nav__menu-item nav__menu-item--dropdown'}>
          <button
            type="button"
            className={openMenu === 'solutions' ? 'nav__menu-btn nav__menu-btn--active' : 'nav__menu-btn'}
            onClick={() => toggleMenu('solutions')}
            aria-expanded={openMenu === 'solutions'}
          >
            Solutions <span className={openMenu === 'solutions' ? 'nav__arrow nav__arrow--open' : 'nav__arrow'}>{openMenu === 'solutions' ? '▴' : '▾'}</span>
          </button>
          <div className="nav__dropdown">
            <h4>RESOURCES</h4>
            <div className="nav__dropdown-grid">
              {solutionItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className="nav__dropdown-link"
                  onClick={() => {
                    onSelectSolution?.(item.id, { openInNewTab: true });
                    setOpenMenu(null);
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
        <button type="button" className="nav__menu-btn" onClick={onOpenPricing}>Pricing</button>
        <a href="#faq">FAQ</a>
      </div>
      <div className="nav__actions">
        <button className="ghost">Log in</button>
        <button className="btn">Register</button>
      </div>
    </nav>
  );
}
