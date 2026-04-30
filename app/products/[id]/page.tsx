import { getProductById, getRelatedProducts, products } from '@/lib/products';
import { notFound } from 'next/navigation';
import { ProductDetail } from '@/components/products/ProductDetail';
import type { Metadata } from 'next';

interface Props {
  params: { id: string };
}

// Lighthouse: Static generation для всіх продуктів
export async function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = getProductById(params.id);
  if (!product) return { title: 'Not Found' };
  return {
    title: product.name,
    description: product.description,
    openGraph: {
      images: [{ url: product.image }],
    },
  };
}

export default function ProductPage({ params }: Props) {
  const product = getProductById(params.id);
  if (!product) notFound();

  const related = getRelatedProducts(product);

  return <ProductDetail product={product} related={related} />;
}