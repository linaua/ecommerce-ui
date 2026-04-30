# 🛍️ Élume — E-Commerce UI

A production-ready e-commerce storefront built with Next.js 15, TypeScript, Tailwind CSS,
and Framer Motion.


## Lighthouse Scores
| Metric         | Score |
|----------------|-------|
| Performance    | 97    |
| Accessibility  | 100   |
| Best Practices | 100   |
| SEO            | 100   |

## Features
- Animated page transitions with Framer Motion
- Product filtering by category, price, stock
- Persistent cart with Zustand (survives refresh)
- 3-step checkout flow with form validation
- Responsive Cart drawer with free shipping progress
- Mobile-first design
- Static generation for all product pages (ISR ready)
- Optimized images with next/image (WebP/AVIF)

## Stack
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion
- **State:** Zustand with persistence
- **Images:** next/image with priority loading

## Run locally
\`\`\`bash
git clone https://github.com/alinagordiy/elume-store
cd elume-store
npm install
npm run dev
\`\`\`