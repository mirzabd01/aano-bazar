import { useParams, Link } from 'react-router-dom';
import { Minus, Plus, ShoppingBag, Heart, Truck, ShieldCheck, RotateCcw } from 'lucide-react';
import Container from '../components/ui/Container';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Rating from '../components/ui/Rating';
import ProductCard from '../components/ui/ProductCard';
import SectionHeading from '../components/ui/SectionHeading';
import { products } from '../data/mockData';

function formatPrice(price: number): string {
  return price.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

export default function ProductDetail() {
  const { slug } = useParams();
  const product = products.find((p) => p.slug === slug) ?? products[0];
  const related = products.filter((p) => p.id !== product.id).slice(0, 4);
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="page-product-detail">
      <Container className="product-detail-breadcrumb">
        <Link to="/">Home</Link>
        <span className="breadcrumb-sep">/</span>
        <Link to="/products">Shop</Link>
        <span className="breadcrumb-sep">/</span>
        <span className="breadcrumb-current">{product.name}</span>
      </Container>

      <div className="product-detail-grid">
        <div className="product-detail-image-wrap">
          <img src={product.image} alt={product.name} className="product-detail-image" />
          {discount > 0 && (
            <div className="product-detail-discount-badge">
              <Badge variant="accent">-{discount}%</Badge>
            </div>
          )}
        </div>

        <div className="product-detail-info">
          <span className="product-detail-category">{product.category}</span>
          <h1 className="product-detail-name">{product.name}</h1>
          <div className="product-detail-rating">
            <Rating value={product.rating} reviewCount={product.reviewCount} size="md" />
          </div>
          <div className="product-detail-prices">
            <span className="product-detail-price">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="product-detail-original-price">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          <p className="product-detail-desc">
            Experience premium quality with this carefully crafted product. Designed for those who
            appreciate both style and functionality, it's built to last and delivers exceptional
            value. Perfect for everyday use or as a thoughtful gift.
          </p>
          <div className="product-detail-stock">
            <span className="stock-dot" />
            In Stock
          </div>
          <div className="product-detail-actions">
            <div className="product-detail-qty">
              <button aria-label="Decrease quantity">
                <Minus size={18} />
              </button>
              <span>1</span>
              <button aria-label="Increase quantity">
                <Plus size={18} />
              </button>
            </div>
            <Button size="lg" className="product-detail-add-btn">
              <ShoppingBag size={20} /> Add to Cart
            </Button>
            <button className="product-detail-wishlist" aria-label="Add to wishlist">
              <Heart size={22} />
            </button>
          </div>
          <div className="product-detail-features">
            <div className="product-detail-feature">
              <Truck size={20} />
              <span>Free shipping over $50</span>
            </div>
            <div className="product-detail-feature">
              <ShieldCheck size={20} />
              <span>2-year warranty</span>
            </div>
            <div className="product-detail-feature">
              <RotateCcw size={20} />
              <span>30-day returns</span>
            </div>
          </div>
        </div>
      </div>

      <section className="section section-related">
        <Container>
          <SectionHeading title="Related Products" />
          <div className="products-grid">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
