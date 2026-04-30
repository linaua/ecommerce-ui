'use client';

import { useCartStore } from '@/store/cartStore';
import { motion, AnimatePresence } from 'framer-motion';
import { CartItem } from './CartItem';
import { formatPrice } from '@/lib/utils';
import Link from 'next/link';

export function CartDrawer() {
  const { items, isOpen, closeCart, totalPrice, clearCart } = useCartStore();
  const total = totalPrice();
  const shipping = total >= 100 ? 0 : 12;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            key="drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 35 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md
                       bg-white flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-lg font-bold">
                Your Cart ({items.length})
              </h2>
              <div className="flex items-center gap-3">
                {items.length > 0 && (
                  <button
                    onClick={clearCart}
                    className="text-xs text-neutral-400 hover:text-red-500 transition-colors"
                  >
                    Clear all
                  </button>
                )}
                <button
                  onClick={closeCart}
                  className="p-2 hover:bg-neutral-100 rounded-full transition-colors"
                  aria-label="Close cart"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <p className="text-5xl mb-4">🛍️</p>
                  <p className="font-semibold text-lg mb-2">Your cart is empty</p>
                  <p className="text-neutral-400 text-sm mb-8">
                    Add some items to get started
                  </p>
                  <button onClick={closeCart} className="btn-outline">
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <AnimatePresence>
                  {items.map((item) => (
                    <CartItem key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`} item={item} />
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t p-6 space-y-4">
                {/* Free shipping progress */}
                {total < 100 && (
                  <div>
                    <p className="text-xs text-neutral-500 mb-2">
                      Add {formatPrice(100 - total)} more for free shipping
                    </p>
                    <div className="h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-neutral-900 rounded-full"
                        animate={{ width: `${(total / 100) * 100}%` }}
                        transition={{ duration: 0.4 }}
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-neutral-500">
                    <span>Subtotal</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                  <div className="flex justify-between text-neutral-500">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-base pt-2 border-t">
                    <span>Total</span>
                    <span>{formatPrice(total + shipping)}</span>
                  </div>
                </div>

                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="btn-primary block text-center w-full"
                >
                  Checkout → {formatPrice(total + shipping)}
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

