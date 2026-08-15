import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal } from 'lucide-react';
import Container from '../components/ui/Container';
import ProductCard from '../components/ui/ProductCard';
import { products } from '../data/mockData';

export default function Products() {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');
  const heading = category
    ? `${category.charAt(0).toUpperCase()}${category.slice(1)}`
    : 'All Products';

  return (
    <div className="page-products">
      <div className="page-banner">
        <Container>
          <h1 className="page-banner-title">{heading}</h1>
          <p className="page-banner-text">
            Discover our wide range of premium products at unbeatable prices.
          </p>
        </Container>
      </div>
      <Container className="products-page-body">
        <div className="products-toolbar">
          <p className="products-count">{products.length} products</p>
          <button className="products-filter-btn">
            <SlidersHorizontal size={18} strokeWidth={1.5} />
            Filters
          </button>
        </div>
        <div className="products-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Container>
    </div>
  );
}
