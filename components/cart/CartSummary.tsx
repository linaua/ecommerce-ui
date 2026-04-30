'use client';

import { useCartStore } from '@/store/cartStore';
import Link from 'next/link';

export function CartSummary() {
  // Викликаємо функції зі стору, щоб отримати числа
  const totalPrice = useCartStore((state) => state.totalPrice());
  const totalItems = useCartStore((state) => state.totalItems());

  // Розрахунок податку та доставки
  const tax = totalPrice * 0.13;
  const shipping = totalPrice > 100 ? 0 : 15;
  const finalTotal = totalPrice + tax + shipping;

  return (
    <div className="bg-neutral-50 rounded-xl p-6 sticky top-24">
      <h2 className="text-xl font-bold mb-6">Order Summary</h2>
      
      <div className="space-y-4 text-sm">
        <div className="flex justify-between text-neutral-600">
          <span>Subtotal ({totalItems} items)</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between text-neutral-600">
          <span>Estimated Tax (13%)</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between text-neutral-600">
          <span>Shipping</span>
          <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
        </div>
        
        <div className="border-t border-neutral-200 pt-4 flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>${finalTotal.toFixed(2)}</span>
        </div>
      </div>

      <Link 
        href="/checkout"
        className="w-full bg-black text-white text-center py-4 rounded-full mt-8 block hover:bg-neutral-800 transition-colors"
      >
        Proceed to Checkout
      </Link>
    </div>
  );
}
