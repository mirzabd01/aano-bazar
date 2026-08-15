export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  itemCount: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviewCount: number;
  badge?: string;
  inStock: boolean;
}

export const categories: Category[] = [
  {
    id: '1',
    name: 'Electronics',
    slug: 'electronics',
    image: 'https://images.pexels.com/photos/8346914/pexels-photo-8346914.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    itemCount: 124,
  },
  {
    id: '2',
    name: 'Fashion',
    slug: 'fashion',
    image: 'https://images.pexels.com/photos/8743972/pexels-photo-8743972.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    itemCount: 348,
  },
  {
    id: '3',
    name: 'Home & Living',
    slug: 'home-living',
    image: 'https://images.pexels.com/photos/20573189/pexels-photo-20573189.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    itemCount: 96,
  },
  {
    id: '4',
    name: 'Beauty',
    slug: 'beauty',
    image: 'https://images.pexels.com/photos/36339062/pexels-photo-36339062.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    itemCount: 72,
  },
  {
    id: '5',
    name: 'Accessories',
    slug: 'accessories',
    image: 'https://images.pexels.com/photos/27046146/pexels-photo-27046146.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    itemCount: 153,
  },
  {
    id: '6',
    name: 'Footwear',
    slug: 'footwear',
    image: 'https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    itemCount: 87,
  },
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Wireless Noise-Cancelling Headphones',
    slug: 'wireless-noise-cancelling-headphones',
    price: 249.99,
    originalPrice: 329.99,
    image: 'https://images.pexels.com/photos/9058883/pexels-photo-9058883.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    category: 'Electronics',
    rating: 4.8,
    reviewCount: 342,
    badge: 'Sale',
    inStock: true,
  },
  {
    id: '2',
    name: 'Premium Leather Handbag',
    slug: 'premium-leather-handbag',
    price: 189.0,
    image: 'https://images.pexels.com/photos/27046146/pexels-photo-27046146.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    category: 'Accessories',
    rating: 4.9,
    reviewCount: 128,
    badge: 'New',
    inStock: true,
  },
  {
    id: '3',
    name: 'Classic Chronograph Watch',
    slug: 'classic-chronograph-watch',
    price: 459.0,
    originalPrice: 599.0,
    image: 'https://images.pexels.com/photos/8839887/pexels-photo-8839887.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    category: 'Accessories',
    rating: 4.7,
    reviewCount: 89,
    badge: 'Sale',
    inStock: true,
  },
  {
    id: '4',
    name: 'Minimalist Sneakers',
    slug: 'minimalist-sneakers',
    price: 129.99,
    image: 'https://images.pexels.com/photos/27204251/pexels-photo-27204251.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    category: 'Footwear',
    rating: 4.6,
    reviewCount: 214,
    inStock: true,
  },
  {
    id: '5',
    name: 'Luxury Skincare Set',
    slug: 'luxury-skincare-set',
    price: 89.5,
    originalPrice: 120.0,
    image: 'https://images.pexels.com/photos/33538457/pexels-photo-33538457.png?auto=compress&cs=tinysrgb&h=650&w=940',
    category: 'Beauty',
    rating: 4.9,
    reviewCount: 456,
    badge: 'Sale',
    inStock: true,
  },
  {
    id: '6',
    name: 'Modern Table Lamp',
    slug: 'modern-table-lamp',
    price: 79.0,
    image: 'https://images.pexels.com/photos/20557088/pexels-photo-20557088.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    category: 'Home & Living',
    rating: 4.5,
    reviewCount: 67,
    badge: 'New',
    inStock: true,
  },
  {
    id: '7',
    name: 'Slim Laptop Stand',
    slug: 'slim-laptop-stand',
    price: 49.99,
    image: 'https://images.pexels.com/photos/18311089/pexels-photo-18311089.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    category: 'Electronics',
    rating: 4.4,
    reviewCount: 178,
    inStock: true,
  },
  {
    id: '8',
    name: 'Designer Leather Boots',
    slug: 'designer-leather-boots',
    price: 219.0,
    originalPrice: 289.0,
    image: 'https://images.pexels.com/photos/26587311/pexels-photo-26587311.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    category: 'Footwear',
    rating: 4.8,
    reviewCount: 93,
    badge: 'Sale',
    inStock: true,
  },
];

export const heroImage =
  'https://images.pexels.com/photos/5585841/pexels-photo-5585841.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';

export const promoImage =
  'https://images.pexels.com/photos/6567204/pexels-photo-6567204.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
