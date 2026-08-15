import { Link } from 'react-router-dom';
import { Trash2, ArrowRight, ShoppingBag } from 'lucide-react';
import Container from '../components/ui/Container';
import Button from '../components/ui/Button';
import { products } from '../data/mockData';

function formatPrice(price: number): string {
  return price.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

const cartItems = [
  { product: products[0], quantity: 1 },
  { product: products[4], quantity: 2 },
  { product: products[3], quantity: 1 },
];

export default function Cart() {
  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = subtotal > 50 ? 0 : 9.99;
  const total = subtotal + shipping;

  return (
    <div className="page-cart">
      <Container className="cart-body">
        <h1 className="cart-title">Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <div className="cart-empty">
            <ShoppingBag size={64} strokeWidth={1} />
            <p>Your cart is empty</p>
            <Button to="/products">Start Shopping</Button>
          </div>
        ) : (
          <div className="cart-grid">
            <div className="cart-items">
              {cartItems.map(({ product, quantity }) => (
                <div key={product.id} className="cart-item">
                  <Link to={`/product/${product.slug}`} className="cart-item-image-wrap">
                    <img src={product.image} alt={product.name} className="cart-item-image" />
                  </Link>
                  <div className="cart-item-info">
                    <span className="cart-item-category">{product.category}</span>
                    <Link to={`/product/${product.slug}`} className="cart-item-name">
                      {product.name}
                    </Link>
                    <span className="cart-item-price">{formatPrice(product.price)}</span>
                  </div>
                  <div className="cart-item-qty">
                    <button aria-label="Decrease">-</button>
                    <span>{quantity}</span>
                    <button aria-label="Increase">+</button>
                  </div>
                  <span className="cart-item-total">{formatPrice(product.price * quantity)}</span>
                  <button className="cart-item-remove" aria-label="Remove item">
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
            <div className="cart-summary">
              <h3 className="cart-summary-title">Order Summary</h3>
              <div className="cart-summary-row">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="cart-summary-row">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
              </div>
              <div className="cart-summary-divider" />
              <div className="cart-summary-row cart-summary-total">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
              <Button size="lg" className="cart-checkout-btn">
                Checkout <ArrowRight size={20} />
              </Button>
              <Link to="/products" className="cart-continue-shopping">
                Continue Shopping
              </Link>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}
