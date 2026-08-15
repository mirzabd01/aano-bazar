import { Link } from 'react-router-dom';
import {
  Truck,
  ShieldCheck,
  RotateCcw,
  Headphones,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import Container from '../components/ui/Container';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import ProductCard from '../components/ui/ProductCard';
import SectionHeading from '../components/ui/SectionHeading';
import { categories, products, heroImage, promoImage } from '../data/mockData';

const features = [
  { icon: Truck, title: 'Free Shipping', desc: 'On orders over $50' },
  { icon: ShieldCheck, title: 'Secure Payment', desc: '100% protected checkout' },
  { icon: RotateCcw, title: 'Easy Returns', desc: '30-day return policy' },
  { icon: Headphones, title: '24/7 Support', desc: 'Dedicated customer care' },
];

export default function Home() {
  const featuredProducts = products.slice(0, 8);

  return (
    <div className="home">
      {/* ===== Hero ===== */}
      <section className="hero">
        <Container className="hero-inner">
          <div className="hero-content">
            <Badge variant="secondary" className="hero-badge">
              <Sparkles size={14} /> New Season Arrivals
            </Badge>
            <h1 className="hero-title">
              Discover Premium Products at <span className="hero-title-accent">Unbeatable Prices</span>
            </h1>
            <p className="hero-subtitle">
              Shop from thousands of products across electronics, fashion, home decor, and more.
              Quality you trust, prices you'll love, delivered right to your door.
            </p>
            <div className="hero-actions">
              <Button to="/products" size="lg">
                Shop Now <ArrowRight size={20} />
              </Button>
              <Button to="/products" variant="outline" size="lg">
                Browse Categories
              </Button>
            </div>
            <div className="hero-stats">
              <div className="hero-stat">
                <span className="hero-stat-value">10K+</span>
                <span className="hero-stat-label">Products</span>
              </div>
              <div className="hero-stat-divider" />
              <div className="hero-stat">
                <span className="hero-stat-value">50K+</span>
                <span className="hero-stat-label">Happy Customers</span>
              </div>
              <div className="hero-stat-divider" />
              <div className="hero-stat">
                <span className="hero-stat-value">4.8</span>
                <span className="hero-stat-label">Average Rating</span>
              </div>
            </div>
          </div>
          <div className="hero-image-wrap">
            <img src={heroImage} alt="Shopping lifestyle" className="hero-image" />
            <div className="hero-image-card hero-image-card-1">
              <div className="hero-image-card-icon">
                <Truck size={20} />
              </div>
              <div>
                <p className="hero-image-card-title">Fast Delivery</p>
                <p className="hero-image-card-text">2-3 business days</p>
              </div>
            </div>
            <div className="hero-image-card hero-image-card-2">
              <div className="hero-image-card-icon">
                <ShieldCheck size={20} />
              </div>
              <div>
                <p className="hero-image-card-title">Buyer Protection</p>
                <p className="hero-image-card-text">Secure & guaranteed</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ===== Features Bar ===== */}
      <section className="features-bar">
        <Container className="features-bar-inner">
          {features.map((feature) => (
            <div key={feature.title} className="feature-item">
              <div className="feature-icon">
                <feature.icon size={24} strokeWidth={1.5} />
              </div>
              <div>
                <p className="feature-title">{feature.title}</p>
                <p className="feature-desc">{feature.desc}</p>
              </div>
            </div>
          ))}
        </Container>
      </section>

      {/* ===== Categories ===== */}
      <section className="section section-categories">
        <Container>
          <SectionHeading
            title="Shop by Category"
            subtitle="Find exactly what you're looking for across our curated collections"
            center
          />
          <div className="categories-grid">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/products?category=${category.slug}`}
                className="category-card"
              >
                <div className="category-card-image-wrap">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="category-card-image"
                    loading="lazy"
                  />
                  <div className="category-card-overlay" />
                </div>
                <div className="category-card-body">
                  <h3 className="category-card-name">{category.name}</h3>
                  <p className="category-card-count">{category.itemCount} items</p>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* ===== Featured Products ===== */}
      <section className="section section-featured">
        <Container>
          <SectionHeading
            title="Featured Products"
            subtitle="Hand-picked favorites our customers love"
            action={
              <Button to="/products" variant="outline" size="sm">
                View All <ArrowRight size={16} />
              </Button>
            }
          />
          <div className="products-grid">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </Container>
      </section>

      {/* ===== Promo Banner ===== */}
      <section className="section section-promo">
        <Container>
          <div className="promo-banner">
            <div className="promo-banner-content">
              <Badge variant="accent" className="promo-badge">
                Limited Time Offer
              </Badge>
              <h2 className="promo-title">Up to 50% Off Summer Collection</h2>
              <p className="promo-text">
                Refresh your wardrobe with our latest summer arrivals. From casual tees to premium
                footwear, find your style at prices you'll love. Hurry, offer ends soon!
              </p>
              <Button to="/products" size="lg" variant="secondary">
                Shop the Sale <ArrowRight size={20} />
              </Button>
            </div>
            <div className="promo-banner-image-wrap">
              <img src={promoImage} alt="Summer sale" className="promo-banner-image" />
            </div>
          </div>
        </Container>
      </section>

      {/* ===== Newsletter ===== */}
      <section className="section section-newsletter">
        <Container>
          <div className="newsletter-card">
            <div className="newsletter-content">
              <h2 className="newsletter-title">Stay in the Loop</h2>
              <p className="newsletter-text">
                Subscribe to our newsletter for exclusive deals, new arrivals, and insider updates.
                No spam, just great offers.
              </p>
            </div>
            <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email address"
                className="newsletter-input"
                required
              />
              <Button type="submit" size="lg">
                Subscribe
              </Button>
            </form>
          </div>
        </Container>
      </section>
    </div>
  );
}
