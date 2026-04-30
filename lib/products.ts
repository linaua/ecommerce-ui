import { Product } from '@/types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Minimal Leather Bag',
    price: 189.99,
    originalPrice: 249.99,
    description: 'Premium full-grain leather bag with clean minimalist design. Perfect for everyday use.',
    category: 'Bags',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80',
    ],
    rating: 4.8,
    reviewCount: 124,
    inStock: true,
    tags: ['leather', 'minimal', 'premium'],
    colors: ['Black', 'Brown', 'Tan'],
  },
  {
    id: '2',
    name: 'Classic White Sneakers',
    price: 129.99,
    description: 'Timeless white sneakers crafted for comfort and style.',
    category: 'Shoes',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80',
    images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80'],
    rating: 4.6,
    reviewCount: 89,
    inStock: true,
    tags: ['sneakers', 'classic', 'white'],
    sizes: ['38', '39', '40', '41', '42', '43', '44'],
    colors: ['White', 'Black'],
  },
  {
    id: '3',
    name: 'Merino Wool Sweater',
    price: 159.99,
    originalPrice: 199.99,
    description: 'Luxuriously soft merino wool sweater, naturally temperature-regulating.',
    category: 'Clothing',
    image: 'https://images.unsplash.com/photo-1620799139507-2a76f79a2f4d?w=600&q=80',
    images: ['https://images.unsplash.com/photo-1620799139507-2a76f79a2f4d?w=600&q=80'],
    rating: 4.9,
    reviewCount: 67,
    inStock: true,
    tags: ['wool', 'luxury', 'winter'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Cream', 'Navy', 'Forest Green'],
  },
  {
    id: '4',
    name: 'Ceramic Pour-Over Set',
    price: 79.99,
    description: 'Handcrafted ceramic pour-over coffee set for the perfect brew.',
    category: 'Home',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80',
    images: ['https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80'],
    rating: 4.7,
    reviewCount: 203,
    inStock: true,
    tags: ['coffee', 'ceramic', 'handmade'],
    colors: ['White', 'Matte Black'],
  },
  {
    id: '5',
    name: 'Linen Trousers',
    price: 119.99,
    description: 'Breathable linen trousers with a relaxed fit.',
    category: 'Clothing',
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&q=80',
    images: ['https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&q=80'],
    rating: 4.5,
    reviewCount: 45,
    inStock: false,
    tags: ['linen', 'summer', 'casual'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Beige', 'White', 'Olive'],
  },
  {
    id: '6',
    name: 'Scented Soy Candle',
    price: 39.99,
    description: 'Hand-poured soy wax candle with natural essential oils.',
    category: 'Home',
    image: 'https://images.unsplash.com/photo-1602028915047-37269d1a73f7?w=600&q=80',
    images: ['https://images.unsplash.com/photo-1602028915047-37269d1a73f7?w=600&q=80'],
    rating: 4.9,
    reviewCount: 312,
    inStock: true,
    tags: ['candle', 'soy', 'aromatherapy'],
    colors: ['Vanilla', 'Eucalyptus', 'Lavender'],
  },
];

export const categories = ['All', 'Bags', 'Shoes', 'Clothing', 'Home'];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, limit);
}