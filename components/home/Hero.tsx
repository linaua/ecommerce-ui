'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';

// Явно вказуємо тип Variants для TypeScript
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15, // Час затримки між появою елементів
    },
  },
};

// Явно вказуємо тип Variants для TypeScript
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      // Вказуємо масив чисел для bezier curve, щоб TypeScript не сварився
      ease: [0.22, 1, 0.36, 1], 
    },
  },
};

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center bg-neutral-50 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1600&q=75"
          alt="Hero background"
          fill
          priority // Важливо для Lighthouse
          className="object-cover object-center opacity-30"
          sizes="100vw"
        />
      </div>

      {/* Головний контейнер з обмеженням ширини (max-w-7xl) та центруванням (mx-auto) */}
      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 relative z-10 pt-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl" // Обмежуємо ширину текстового блоку, щоб він не розповзався
        >
          <motion.p
            variants={itemVariants}
            className="text-xs font-bold tracking-[0.3em] text-neutral-500 uppercase mb-4"
          >
            New Collection — Spring 2026
          </motion.p>

          <motion.h1
            variants={itemVariants}
            className="text-6xl md:text-8xl font-medium tracking-tighter leading-[0.9] mb-8"
          >
            Refined.<br />
            <span className="text-neutral-300">Minimal.</span><br />
            Timeless.
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg text-neutral-600 mb-10 max-w-lg leading-relaxed"
          >
            Curated essentials for a life lived with intention. Each piece is crafted to stand the test of time.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-4"
          >
            <Link href="/products" className="btn-primary">
              Shop Collection
            </Link>
            <Link href="/products" className="btn-outline">
              Explore Lookbook
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
