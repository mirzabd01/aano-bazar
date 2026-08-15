import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, Heart, Menu, X, User } from 'lucide-react';
import Container from '../ui/Container';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Shop', to: '/products' },
  { label: 'Electronics', to: '/products?category=electronics' },
  { label: 'Fashion', to: '/products?category=fashion' },
  { label: 'Accessories', to: '/products?category=accessories' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="header">
      <Container className="header-inner">
        <div className="header-left">
          <button
            className="header-mobile-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <Link to="/" className="header-logo">
            <span className="header-logo-text">AANO</span>
            <span className="header-logo-accent">BAZAR</span>
          </Link>
        </div>

        <nav className="header-nav">
          {navLinks.map((link) => {
            const isActive =
              link.to === '/'
                ? location.pathname === '/'
                : location.pathname.startsWith('/products') && link.to.startsWith('/products');
            return (
              <Link
                key={link.label}
                to={link.to}
                className={`header-nav-link ${isActive ? 'active' : ''}`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="header-actions">
          <button
            className="header-icon-btn"
            onClick={() => setSearchOpen(!searchOpen)}
            aria-label="Search"
          >
            <Search size={22} strokeWidth={1.5} />
          </button>
          <button className="header-icon-btn header-desktop-only" aria-label="Wishlist">
            <Heart size={22} strokeWidth={1.5} />
          </button>
          <button className="header-icon-btn header-desktop-only" aria-label="Account">
            <User size={22} strokeWidth={1.5} />
          </button>
          <Link to="/cart" className="header-cart-btn" aria-label="Cart">
            <ShoppingBag size={22} strokeWidth={1.5} />
            <span className="header-cart-count">3</span>
          </Link>
        </div>
      </Container>

      {searchOpen && (
        <div className="header-search-bar">
          <Container>
            <div className="header-search-wrap">
              <Search size={20} strokeWidth={1.5} className="header-search-icon" />
              <input
                type="text"
                placeholder="Search for products, brands, and more..."
                className="header-search-input"
                autoFocus
              />
              <button
                className="header-search-close"
                onClick={() => setSearchOpen(false)}
                aria-label="Close search"
              >
                <X size={20} />
              </button>
            </div>
          </Container>
        </div>
      )}

      {mobileOpen && (
        <div className="header-mobile-menu" onClick={() => setMobileOpen(false)}>
          <div className="header-mobile-menu-inner" onClick={(e) => e.stopPropagation()}>
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="header-mobile-link"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="header-mobile-divider" />
            <Link
              to="/cart"
              className="header-mobile-link"
              onClick={() => setMobileOpen(false)}
            >
              Wishlist
            </Link>
            <Link
              to="/cart"
              className="header-mobile-link"
              onClick={() => setMobileOpen(false)}
            >
              My Account
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
