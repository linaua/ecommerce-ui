import { Hero } from '@/components/home/Hero';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { products } from '@/lib/products';
import { AnimatedPage } from '@/components/ui/AnimatedPage';

export default function HomePage() {
  const featured = products.filter((p) => p.inStock).slice(0, 4);

  return (
    <AnimatedPage>
      <Hero />
      
      {/* Секція товарів з контейнером всередині FeaturedProducts має бути теж обмежена */}
      <div className="max-w-7xl mx-auto px-6 py-20">
         <FeaturedProducts products={featured} />
      </div>

      <section className="py-24 bg-white border-t border-neutral-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {[
              { icon: '🌿', title: 'Sustainably Made', desc: 'Every product is sourced with care for our planet.' },
              { icon: '✦', title: 'Curated Quality', desc: 'We handpick only the finest pieces for you.' },
              { icon: '📦', title: 'Free Shipping', desc: 'Free shipping on all orders over $100.' },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="flex flex-col items-center text-center">
                <div className="text-3xl mb-6">{icon}</div>
                <h3 className="text-sm uppercase tracking-widest font-bold mb-3">{title}</h3>
                <p className="text-neutral-500 text-sm leading-relaxed max-w-xs">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </AnimatedPage>
  );
}
