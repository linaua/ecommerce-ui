'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { CartItem as CartItemType } from '@/types';
import { useCartStore } from '@/store/cartStore';
import { formatPrice } from '@/lib/utils';

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem     = useCartStore((s) => s.removeItem);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex gap-4 py-4 border-b border-neutral-100 last:border-0"
    >
      <div className="relative w-20 h-24 flex-shrink-0 rounded-xl overflow-hidden bg-neutral-100">
        <Image
          src={item.product.image}
          alt={item.product.name}
          fill
          className="object-cover"
          sizes="80px"
        />
      </div>

      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm truncate">{item.product.name}</p>
        {(item.selectedSize || item.selectedColor) && (
          <p className="text-xs text-neutral-400 mt-0.5">
            {[item.selectedSize, item.selectedColor].filter(Boolean).join(' · ')}
          </p>
        )}

        <div className="flex items-center justify-between mt-3">
          {/* Quantity */}
          <div className="flex items-center gap-3 bg-neutral-100 rounded-full px-2 py-1">
            <button
              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
              className="w-6 h-6 flex items-center justify-center hover:opacity-60 text-lg"
            >
              −
            </button>
            <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
              className="w-6 h-6 flex items-center justify-center hover:opacity-60 text-lg"
            >
              +
            </button>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-bold text-sm">
              {formatPrice(item.product.price * item.quantity)}
            </span>
            <button
              onClick={() => removeItem(item.product.id)}
              className="text-neutral-300 hover:text-red-500 transition-colors text-lg"
              aria-label="Remove item"
            >
              ✕
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}