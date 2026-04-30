'use client';

import { Product } from '@/types';
import { ProductCard } from '@/components/products/ProductCard';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface FeaturedProductsProps {
  products: Product[];
}

export function FeaturedProducts({ products }: FeaturedProductsProps) {
  return (
    <section className="py-20">
      <div className="container-custom">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-sm text-neutral-500 font-medium tracking-widest uppercase mb-2">
              Handpicked
            </p>
            <h2 className="text-3xl md:text-4xl font-bold">Featured Pieces</h2>
          </div>
          <Link
            href="/products"
            className="hidden md:flex items-center gap-2 text-sm font-semibold
                       hover:opacity-60 transition-opacity"
          >
            View All
            <span className="text-lg">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>

        <div className="mt-10 text-center md:hidden">
          <Link href="/products" className="btn-outline">
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}