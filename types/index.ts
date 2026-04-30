export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  category: string;
  image: string;
  images: string[];
  rating: number;
  reviewCount: number;
  inStock: boolean;
  tags: string[];
  sizes?: string[];
  colors?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export interface FilterState {
  category: string[];
  priceRange: [number, number];
  rating: number | null;
  inStockOnly: boolean;
  sortBy: 'newest' | 'price-asc' | 'price-desc' | 'rating';
}

export interface CheckoutStep {
  id: number;
  label: string;
  completed: boolean;
}

export interface ShippingInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}