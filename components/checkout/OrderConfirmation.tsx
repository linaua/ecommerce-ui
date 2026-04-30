'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useCartStore } from '@/store/cartStore';
import { useEffect } from 'react';

export function OrderConfirmation() {
  const clearCart = useCartStore((s) => s.clearCart);

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
        className="text-center max-w-md"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 300 }}
          className="text-7xl mb-6"
        >
          ✅
        </motion.div>
        <h1 className="text-3xl font-bold mb-3">Order Confirmed!</h1>
        <p className="text-neutral-500 mb-2">
          Thank you for your order. A confirmation email has been sent.
        </p>
        <p className="text-sm text-neutral-400 mb-10">
          Order #EL-{Math.floor(Math.random() * 90000) + 10000}
        </p>
        <Link href="/products" className="btn-primary inline-block">
          Continue Shopping
        </Link>
      </motion.div>
    </div>
  );
}