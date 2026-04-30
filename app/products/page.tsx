import { Suspense } from 'react';
import { products, categories } from '@/lib/products';
import { ProductGrid } from '@/components/products/ProductGrid';
import { AnimatedPage } from '@/components/ui/AnimatedPage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shop',
  description: 'Browse our curated collection of minimal fashion and lifestyle products.',
};

export default function ProductsPage() {
  return (
    <AnimatedPage className="pt-24 pb-20">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-10">
          <p className="text-sm text-neutral-500 tracking-widest uppercase mb-2">Our Collection</p>
          <h1 className="text-4xl font-bold">Shop All</h1>
        </div>

        <Suspense fallback={<div className="text-center py-20">Loading...</div>}>
          <ProductGrid products={products} categories={categories} />
        </Suspense>
      </div>
    </AnimatedPage>
  );
}