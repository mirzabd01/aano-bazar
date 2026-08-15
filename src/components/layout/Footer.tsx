import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Globe, Send, MessageCircle, Rss } from 'lucide-react';
import Container from '../ui/Container';

const footerLinks = {
  shop: [
    { label: 'All Products', to: '/products' },
    { label: 'Electronics', to: '/products?category=electronics' },
    { label: 'Fashion', to: '/products?category=fashion' },
    { label: 'Accessories', to: '/products?category=accessories' },
    { label: 'Beauty', to: '/products?category=beauty' },
  ],
  support: [
    { label: 'Help Center', to: '#' },
    { label: 'Track Order', to: '#' },
    { label: 'Returns', to: '#' },
    { label: 'Shipping Info', to: '#' },
    { label: 'FAQ', to: '#' },
  ],
  company: [
    { label: 'About Us', to: '#' },
    { label: 'Careers', to: '#' },
    { label: 'Blog', to: '#' },
    { label: 'Press', to: '#' },
    { label: 'Contact', to: '#' },
  ],
  legal: [
    { label: 'Privacy Policy', to: '#' },
    { label: 'Terms of Service', to: '#' },
    { label: 'Cookie Policy', to: '#' },
    { label: 'Refund Policy', to: '#' },
  ],
};

const socialLinks = [
  { icon: Globe, label: 'Website' },
  { icon: Send, label: 'Telegram' },
  { icon: MessageCircle, label: 'Community' },
  { icon: Rss, label: 'Blog' },
];

export default function Footer() {
  return (
    <footer className="footer">
      <Container className="footer-top">
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            <span className="footer-logo-text">AANO</span>
            <span className="footer-logo-accent">BAZAR</span>
          </Link>
          <p className="footer-tagline">
            Your one-stop marketplace for premium products at unbeatable prices. Shop with
            confidence, delivered with care.
          </p>
          <div className="footer-contact">
            <div className="footer-contact-item">
              <MapPin size={18} strokeWidth={1.5} />
              <span>123 Market Street, Suite 100</span>
            </div>
            <div className="footer-contact-item">
              <Phone size={18} strokeWidth={1.5} />
              <span>+1 (800) 555-0199</span>
            </div>
            <div className="footer-contact-item">
              <Mail size={18} strokeWidth={1.5} />
              <span>support@aanobazar.com</span>
            </div>
          </div>
        </div>

        <div className="footer-links-grid">
          <div className="footer-col">
            <h4 className="footer-col-title">Shop</h4>
            <ul>
              {footerLinks.shop.map((link) => (
                <li key={link.label}>
                  <Link to={link.to}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer-col">
            <h4 className="footer-col-title">Support</h4>
            <ul>
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link to={link.to}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer-col">
            <h4 className="footer-col-title">Company</h4>
            <ul>
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link to={link.to}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer-col">
            <h4 className="footer-col-title">Legal</h4>
            <ul>
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link to={link.to}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>

      <div className="footer-divider" />

      <Container className="footer-bottom">
        <p className="footer-copyright">
          &copy; {new Date().getFullYear()} AANO BAZAR. All rights reserved.
        </p>
        <div className="footer-social">
          {socialLinks.map((social) => (
            <button key={social.label} className="footer-social-btn" aria-label={social.label}>
              <social.icon size={20} strokeWidth={1.5} />
            </button>
          ))}
        </div>
      </Container>
    </footer>
  );
}
