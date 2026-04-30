'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Product } from '@/types';
import { useCartStore } from '@/store/cartStore';
import { formatPrice } from '@/lib/utils';
import { ProductCard } from './ProductCard';
import { AnimatedPage } from '@/components/ui/AnimatedPage';

interface ProductDetailProps {
  product: Product;
  related: Product[];
}

export function ProductDetail({ product, related }: ProductDetailProps) {
  const addItem   = useCartStore((s) => s.addItem);
  const openCart  = useCartStore((s) => s.openCart);
  const [selectedSize,  setSelectedSize]  = useState(product.sizes?.[1] || '');
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || '');
  const [activeImage,   setActiveImage]   = useState(0);
  const [isAdded,       setIsAdded]       = useState(false);

  const handleAddToCart = () => {
    addItem(product, { size: selectedSize, color: selectedColor });
    openCart();
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <AnimatedPage className="pt-24 pb-20">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">

          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-neutral-100">
              <Image
                src={product.images[activeImage]}
                alt={product.name}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-colors
                      ${activeImage === i ? 'border-neutral-900' : 'border-transparent'}`}
                  >
                    <Image src={img} alt="" fill className="object-cover" sizes="80px" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <p className="text-sm text-neutral-400 font-medium uppercase tracking-widest mb-2">
              {product.category}
            </p>
            <h1 className="text-3xl font-bold mb-3">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-neutral-200'}>
                    ★
                  </span>
                ))}
              </div>
              <span className="text-sm text-neutral-500">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-8">
              <span className="text-3xl font-bold">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <span className="text-lg text-neutral-400 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            {/* Colors */}
            {product.colors && (
              <div className="mb-6">
                <p className="text-sm font-semibold mb-3">
                  Color: <span className="font-normal text-neutral-500">{selectedColor}</span>
                </p>
                <div className="flex gap-2 flex-wrap">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 text-sm rounded-full border-2 transition-all
                        ${selectedColor === color
                          ? 'border-neutral-900 bg-neutral-900 text-white'
                          : 'border-neutral-200 hover:border-neutral-400'
                        }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            {product.sizes && (
              <div className="mb-8">
                <p className="text-sm font-semibold mb-3">
                  Size: <span className="font-normal text-neutral-500">{selectedSize}</span>
                </p>
                <div className="flex gap-2 flex-wrap">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 text-sm rounded-xl border-2 font-medium transition-all
                        ${selectedSize === size
                          ? 'border-neutral-900 bg-neutral-900 text-white'
                          : 'border-neutral-200 hover:border-neutral-400'
                        }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Add to Cart */}
            <motion.button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              whileTap={{ scale: 0.98 }}
              className={`w-full py-4 rounded-full text-base font-bold transition-all
                ${product.inStock
                  ? isAdded
                    ? 'bg-green-600 text-white'
                    : 'bg-neutral-900 text-white hover:bg-neutral-700'
                  : 'bg-neutral-100 text-neutral-400 cursor-not-allowed'
                }`}
            >
              {!product.inStock ? 'Out of Stock'
                : isAdded ? '✓ Added to Cart!'
                : 'Add to Cart'}
            </motion.button>

            {/* Description */}
            <div className="mt-10 pt-8 border-t border-neutral-100">
              <h3 className="font-semibold mb-3">Description</h3>
              <p className="text-neutral-500 leading-relaxed text-sm">{product.description}</p>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-8">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </section>
        )}
      </div>
    </AnimatedPage>
  );
}