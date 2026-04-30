'use client';

import { useCartStore } from '@/store/cartStore';
import { CartItem } from '@/components/cart/CartItem';
import { AnimatedPage } from '@/components/ui/AnimatedPage';
import Link from 'next/link';
import { CartSummary } from '@/components/cart/CartSummary';

export default function CartPage() {
  const { items, totalItems, totalPrice } = useCartStore();

  if (items.length === 0) {
    return (
      <AnimatedPage className="pt-24 pb-20">
        <div className="container-custom">
          <div className="text-center py-20">
            <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
            <p className="text-neutral-600 mb-8">
              Add some products to get started.
            </p>
            <Link
              href="/products"
              className="inline-block bg-black text-white px-8 py-3 rounded-lg hover:bg-neutral-800 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </AnimatedPage>
    );
  }

  return (
    <AnimatedPage className="pt-24 pb-20">
      <div className="container-custom">
        <div className="mb-10">
          <h1 className="text-4xl font-bold">Shopping Cart</h1>
          <p className="text-neutral-600 mt-2">
            {totalItems()} item{totalItems() !== 1 ? 's' : ''} in your cart
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {items.map((item) => (
                <CartItem key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`} item={item} />
              ))}
            </div>
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-1">
            <CartSummary />
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
}
