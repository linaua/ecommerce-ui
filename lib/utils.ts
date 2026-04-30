import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Утиліта для об'єднання Tailwind класів
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
  }).format(price);
}