'use client';

import Image from 'next/image';
import { useCartStore } from '@/store/cartStore';
import { formatPrice } from '@/lib/utils';

export function OrderSummary() {
  const items      = useCartStore((s) => s.items);
  const totalPrice = useCartStore((s) => s.totalPrice());
  const shipping   = totalPrice >= 100 ? 0 : 12;

  return (
    <div className="bg-neutral-50 rounded-2xl p-6 sticky top-24">
      <h3 className="font-bold text-lg mb-6">Order Summary</h3>

      <div className="space-y-4 mb-6">
        {items.map((item) => (
          <div key={`${item.product.id}-${item.selectedSize}`}
               className="flex gap-3 items-center">
            <div className="relative w-14 h-16 rounded-xl overflow-hidden bg-neutral-100 flex-shrink-0">
              <Image
                src={item.product.image}
                alt={item.product.name}
                fill
                className="object-cover"
                sizes="56px"
              />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-neutral-900 text-white
                               text-xs rounded-full flex items-center justify-center font-bold">
                {item.quantity}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{item.product.name}</p>
              {item.selectedSize && (
                <p className="text-xs text-neutral-400">{item.selectedSize}</p>
              )}
            </div>
            <span className="text-sm font-semibold flex-shrink-0">
              {formatPrice(item.product.price * item.quantity)}
            </span>
          </div>
        ))}
      </div>

      <div className="border-t pt-4 space-y-2 text-sm">
        <div className="flex justify-between text-neutral-500">
          <span>Subtotal</span>
          <span>{formatPrice(totalPrice)}</span>
        </div>
        <div className="flex justify-between text-neutral-500">
          <span>Shipping</span>
          <span>{shipping === 0 ? '🎉 FREE' : formatPrice(shipping)}</span>
        </div>
        <div className="flex justify-between font-bold text-base pt-2 border-t">
          <span>Total</span>
          <span>{formatPrice(totalPrice + shipping)}</span>
        </div>
      </div>
    </div>
  );
}