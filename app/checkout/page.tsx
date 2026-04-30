'use client';

import { useState, useEffect } from 'react';
import { useCartStore } from '@/store/cartStore';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedPage } from '@/components/ui/AnimatedPage';
import Link from 'next/link';

export default function CheckoutPage() {
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState(1);
  const [isComplete, setIsComplete] = useState(false);

  const cart = useCartStore();
  
  // Безпечне отримання даних з кошика
  const items = (cart.items || []) as any[];
  const rawTotalPrice = typeof cart.totalPrice === 'function' ? cart.totalPrice() : 0;

  useEffect(() => {
    setMounted(true);
  }, []);

  // Захист від Hydration Error
  if (!mounted) return null;

  if (items.length === 0 && !isComplete) {
    return (
      <AnimatedPage>
        <div className="min-h-screen flex flex-col items-center justify-center px-6">
          <h2 className="text-3xl font-medium mb-6">Your cart is empty</h2>
          <Link href="/products" className="bg-black text-white px-10 py-4 rounded-full">
            Return to Shop
          </Link>
        </div>
      </AnimatedPage>
    );
  }

  const shipping = rawTotalPrice > 150 ? 0 : 20;
  const total = rawTotalPrice + shipping;

  if (isComplete) {
    return (
      <AnimatedPage>
        <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
          <h2 className="text-4xl font-medium mb-4">Thank you for your order!</h2>
          <Link href="/" className="mt-8 bg-black text-white px-10 py-4 rounded-full">
            Back to Home
          </Link>
        </div>
      </AnimatedPage>
    );
  }

  return (
    <AnimatedPage>
      <div className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* Ліва частина: Форми */}
            <div className="lg:col-span-7">
              <div className="flex gap-4 mb-12">
                {[1, 2, 3].map((num) => (
                  <div key={num} className={`h-1 flex-1 rounded-full ${step >= num ? 'bg-black' : 'bg-neutral-200'}`} />
                ))}
              </div>

              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} key="step1">
                    <h2 className="text-2xl font-medium mb-8">Contact Information</h2>
                    <div className="space-y-4">
                      <input required type="email" placeholder="Email Address" className="w-full p-4 border rounded-xl outline-none focus:border-black" />
                      <div className="grid grid-cols-2 gap-4">
                        <input required type="text" placeholder="First Name" className="p-4 border rounded-xl outline-none focus:border-black" />
                        <input required type="text" placeholder="Last Name" className="p-4 border rounded-xl outline-none focus:border-black" />
                      </div>
                    </div>
                    <button onClick={() => setStep(2)} className="mt-8 w-full bg-black text-white py-5 rounded-full font-medium">
                      Continue to Shipping
                    </button>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} key="step2">
                    <h2 className="text-2xl font-medium mb-8">Shipping Method</h2>
                    <div className="p-5 border-2 border-black rounded-2xl flex justify-between items-center">
                      <span>Standard Shipping (3-5 days)</span>
                      <span className="font-semibold">{shipping === 0 ? 'Free' : `$${shipping}`}</span>
                    </div>
                    <div className="flex gap-4 mt-8">
                      <button onClick={() => setStep(1)} className="flex-1 border py-5 rounded-full">Back</button>
                      <button onClick={() => setStep(3)} className="flex-1 bg-black text-white py-5 rounded-full">Continue to Payment</button>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} key="step3">
                    <h2 className="text-2xl font-medium mb-8">Payment</h2>
                    <button onClick={() => setIsComplete(true)} className="w-full bg-black text-white py-5 rounded-full font-medium">
                      Pay ${total.toFixed(2)}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Права частина: Order Summary */}
            <div className="lg:col-span-5">
              <div className="bg-neutral-50 rounded-[2rem] p-8 border border-neutral-100">
                <h3 className="text-xl font-medium mb-8">Order Summary</h3>
                <div className="space-y-6 mb-8">
                  {items.map((item: any, index: number) => (
                    <div key={item.id || index} className="flex gap-4">
                      <div className="w-20 h-24 bg-white rounded-xl overflow-hidden border">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex flex-col justify-center">
                        <h4 className="text-sm font-medium">{item.name}</h4>
                        <p className="text-xs text-neutral-400">Qty: {item.quantity}</p>
                        {/* Виправлено $NaN */}
                        <p className="text-sm font-semibold mt-2">
                          ${(Number(item.price || 0) * Number(item.quantity || 0)).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-4 border-t pt-6">
                  <div className="flex justify-between text-neutral-500">
                    <span>Subtotal</span>
                    <span>${rawTotalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-neutral-500">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold border-t pt-5">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </AnimatedPage>
  );
}
