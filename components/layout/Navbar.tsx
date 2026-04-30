'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ShoppingBagIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const navLinks = [
  { href: '/',         label: 'Home'     },
  { href: '/products', label: 'Shop'     },
];

export function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  
  // Виправляємо гідратацію: показуємо стан лише після завантаження в браузері
  useEffect(() => {
    setMounted(true);
  }, []);

  const totalItems = useCartStore((s) => typeof s.totalItems === 'function' ? s.totalItems() : s.totalItems);
  const openCart = useCartStore((s) => s.openCart);
  const { scrollY } = useScroll();

  // Анімація прозорості фону при скролі
  const navBg = useTransform(
    scrollY,
    [0, 80],
    ['rgba(255,255,255,0)', 'rgba(255,255,255,0.95)']
  );

  return (
    <>
      <motion.header
        style={{ backgroundColor: navBg }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm transition-colors duration-300"
      >
        {/* Контейнер для центрування, такий самий як у Hero */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
          <nav className="flex items-center justify-between h-20">
            
            {/* Logo */}
            <Link
              href="/"
              className="text-2xl font-bold tracking-tighter hover:opacity-70 transition-opacity"
            >
              Élume
            </Link>

            {/* Desktop Links */}
            <ul className="hidden md:flex items-center gap-10">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-xs uppercase tracking-[0.2em] font-medium text-neutral-600 hover:text-neutral-900 transition-colors relative group"
                  >
                    {label}
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-black group-hover:w-full transition-all duration-300" />
                  </Link>
                </li>
              ))}
            </ul>

            {/* Cart & Mobile Toggle */}
            <div className="flex items-center gap-4">
              <button
                onClick={openCart}
                className="relative p-2 hover:opacity-70 transition-opacity"
                aria-label="Open cart"
              >
                <ShoppingBagIcon className="w-6 h-6" />
                {/* Відображаємо цифру ТІЛЬКИ після mounted */}
                {mounted && totalItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-0 right-0 w-4 h-4 bg-black text-white text-[10px] rounded-full flex items-center justify-center font-bold"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </button>

              {/* Mobile Button */}
              <button
                className="md:hidden p-2 text-neutral-900"
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                {mobileOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-0 right-0 z-40 bg-white border-b border-neutral-100 md:hidden shadow-xl"
          >
            <ul className="px-6 py-10 flex flex-col gap-8">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    className="text-2xl font-medium tracking-tight text-neutral-900"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

