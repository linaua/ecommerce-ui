'use client';

import { useState, useMemo } from 'react';
import { Product } from '@/types';
import { ProductCard } from './ProductCard';
import { motion, AnimatePresence } from 'framer-motion';

interface ProductGridProps {
  products: Product[];
  categories: string[];
}

type SortOption = 'newest' | 'price-asc' | 'price-desc' | 'rating';

export function ProductGrid({ products, categories }: ProductGridProps) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [priceMax, setPriceMax] = useState(500);
  const [inStockOnly, setInStockOnly] = useState(false);

  const filtered = useMemo(() => {
    let result = [...products];

    // Category filter
    if (activeCategory !== 'All') {
      result = result.filter((p) => p.category === activeCategory);
    }

    // Price filter
    result = result.filter((p) => p.price <= priceMax);

    // Stock filter
    if (inStockOnly) {
      result = result.filter((p) => p.inStock);
    }

    // Sort
    switch (sortBy) {
      case 'price-asc':  result.sort((a, b) => a.price - b.price); break;
      case 'price-desc': result.sort((a, b) => b.price - a.price); break;
      case 'rating':     result.sort((a, b) => b.rating - a.rating); break;
      default: break;
    }

    return result;
  }, [products, activeCategory, sortBy, priceMax, inStockOnly]);

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Sidebar Filters */}
      <aside className="lg:w-64 flex-shrink-0">
        <div className="lg:sticky lg:top-24 space-y-8">
          {/* Categories */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest mb-4">Category</h3>
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => setActiveCategory(cat)}
                    className={`text-sm w-full text-left py-1.5 transition-all
                      ${activeCategory === cat
                        ? 'text-neutral-900 font-semibold'
                        : 'text-neutral-500 hover:text-neutral-900'
                      }`}
                  >
                    {activeCategory === cat && (
                      <span className="inline-block w-2 h-2 bg-neutral-900 rounded-full mr-2" />
                    )}
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Price Range */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest mb-4">
              Max Price: ${priceMax}
            </h3>
            <input
              type="range"
              min={0}
              max={500}
              value={priceMax}
              onChange={(e) => setPriceMax(Number(e.target.value))}
              className="w-full accent-neutral-900"
            />
            <div className="flex justify-between text-xs text-neutral-400 mt-1">
              <span>$0</span>
              <span>$500</span>
            </div>
          </div>

          {/* In Stock */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="inStock"
              checked={inStockOnly}
              onChange={(e) => setInStockOnly(e.target.checked)}
              className="w-4 h-4 accent-neutral-900"
            />
            <label htmlFor="inStock" className="text-sm font-medium cursor-pointer">
              In Stock Only
            </label>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1">
        {/* Sort + Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-neutral-500">
            {filtered.length} product{filtered.length !== 1 ? 's' : ''}
          </p>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="text-sm border border-neutral-200 rounded-lg px-3 py-2
                       focus:outline-none focus:ring-2 focus:ring-neutral-900"
          >
            <option value="newest">Newest</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 text-neutral-400"
            >
              <p className="text-5xl mb-4">🔍</p>
              <p className="text-lg font-medium">No products found</p>
              <p className="text-sm mt-2">Try adjusting your filters</p>
            </motion.div>
          ) : (
            <motion.div
              key={activeCategory + sortBy + priceMax}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
            >
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}