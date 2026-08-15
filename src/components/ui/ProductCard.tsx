import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
import Badge from './Badge';
import Rating from './Rating';
import type { Product } from '../../data/mockData';

interface ProductCardProps {
  product: Product;
}

function formatPrice(price: number): string {
  return price.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

export default function ProductCard({ product }: ProductCardProps) {
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="product-card">
      <div className="product-card-image-wrap">
        <Link to={`/product/${product.slug}`}>
          <img src={product.image} alt={product.name} className="product-card-image" loading="lazy" />
        </Link>
        <div className="product-card-badges">
          {product.badge === 'Sale' && discount > 0 && (
            <Badge variant="accent">-{discount}%</Badge>
          )}
          {product.badge === 'New' && <Badge variant="primary">New</Badge>}
        </div>
        <div className="product-card-actions">
          <button className="product-card-action-btn" aria-label="Add to wishlist">
            <Heart size={18} strokeWidth={1.5} />
          </button>
          <button className="product-card-action-btn" aria-label="Quick view">
            <Eye size={18} strokeWidth={1.5} />
          </button>
          <button className="product-card-action-btn primary" aria-label="Add to cart">
            <ShoppingBag size={18} strokeWidth={1.5} />
          </button>
        </div>
      </div>
      <div className="product-card-body">
        <span className="product-card-category">{product.category}</span>
        <Link to={`/product/${product.slug}`} className="product-card-name">
          {product.name}
        </Link>
        <Rating value={product.rating} reviewCount={product.reviewCount} />
        <div className="product-card-prices">
          <span className="product-card-price">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="product-card-original-price">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
