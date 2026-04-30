'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useCartStore } from '@/store/cartStore';
import { Product } from '@/types';
import { formatPrice } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem  = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);
  const [isAdding, setIsAdding] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsAdding(true);
    addItem(product);
    openCart();
    setTimeout(() => setIsAdding(false), 1000);
  };

  return (
    <Link href={`/products/${product.id}`} className="group block">
      <div className="relative overflow-hidden rounded-2xl bg-neutral-100 aspect-[3/4]">
        {/* Product Image */}
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {discount && (
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              -{discount}%
            </span>
          )}
          {!product.inStock && (
            <span className="bg-neutral-900 text-white text-xs font-bold px-2 py-1 rounded-full">
              Sold Out
            </span>
          )}
        </div>

        {/* Wishlist */}
        <button
          onClick={(e) => { e.preventDefault(); setIsWishlisted(!isWishlisted); }}
          className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center
                     justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Add to wishlist"
        >
          <motion.span
            animate={{ scale: isWishlisted ? [1, 1.3, 1] : 1 }}
            className="text-sm"
          >
            {isWishlisted ? '❤️' : '🤍'}
          </motion.span>
        </button>

        {/* Quick Add */}
        {product.inStock && (
          <motion.button
            onClick={handleAddToCart}
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            className="absolute bottom-3 left-3 right-3 bg-white text-neutral-900
                       text-sm font-semibold py-2.5 rounded-xl shadow-lg
                       opacity-0 group-hover:opacity-100 transition-all duration-300
                       hover:bg-neutral-900 hover:text-white"
          >
            {isAdding ? '✓ Added!' : 'Quick Add'}
          </motion.button>
        )}
      </div>

      {/* Info */}
      <div className="mt-4 space-y-1">
        <p className="text-xs text-neutral-400 font-medium uppercase tracking-wide">
          {product.category}
        </p>
        <h3 className="font-semibold text-neutral-900 group-hover:opacity-60 transition-opacity">
          {product.name}
        </h3>
        <div className="flex items-center gap-2">
          <span className="font-bold">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="text-neutral-400 text-sm line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1 text-sm">
          <span className="text-yellow-400">★</span>
          <span className="font-medium">{product.rating}</span>
          <span className="text-neutral-400">({product.reviewCount})</span>
        </div>
      </div>
    </Link>
  );
}