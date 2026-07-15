# LUXE — Premium Fashion E-Commerce Frontend

A production-quality clothing e-commerce frontend built with React 19, TypeScript, Tailwind CSS, Framer Motion, and React Router. Designed to look and feel like a top-tier fashion brand — inspired by COS, Zara, and Apple.

## Quick Start

```bash
npm install
npm run dev
# → http://localhost:5173
```

No API keys. No backend. Runs immediately.

---

## Tech Stack

| Tool | Purpose |
|---|---|
| React 19 + Vite | Core framework, fast HMR |
| TypeScript | Full type safety across all 44 files |
| Tailwind CSS | Utility-first styling with custom design tokens |
| Framer Motion | Page transitions, hover effects, stagger animations |
| React Router v6 | Lazy-loaded code-split routes |
| React Hook Form + Zod | Form validation on all auth + checkout pages |
| Context API | Cart, Wishlist, Auth, Theme, Toast — all global state |
| localStorage | Persistent cart, wishlist, user session, theme |

---

## Pages (20 total)

| Route | Page |
|---|---|
| `/` | Home — hero slider, product rows, categories, testimonials |
| `/shop` | Shop — filter sidebar, sort, grid/list, search, pagination |
| `/product/:id` | Product Detail — gallery, colour/size picker, reviews, related |
| `/cart` | Cart — quantity controls, promo codes, order summary |
| `/wishlist` | Wishlist — saved items, move to cart |
| `/checkout` | Checkout — 4-step (shipping → payment → review → confirmed) |
| `/login` | Login — email/password with Zod validation |
| `/register` | Register — full validation, terms acceptance |
| `/forgot-password` | Forgot Password — email sent confirmation screen |
| `/dashboard` | Dashboard — profile, orders, wishlist, addresses, settings |
| `/about` | About — brand story, timeline, values, team |
| `/contact` | Contact — form, contact cards |
| `/faq` | FAQ — searchable accordion by category |
| `/privacy` | Privacy Policy |
| `/terms` | Terms of Service |
| `*` | 404 — animated not-found page |

---

## Key Features

**Shopping**
- 24 realistic mock products with real Unsplash images
- Filter by category, gender, brand, price range, size, colour, rating
- Sort by featured, newest, price, rating, popularity
- Quick View modal — add to cart without leaving the page
- Product image gallery with thumbnail navigation

**Cart & Checkout**
- Persistent cart via localStorage — survives page refresh
- Promo codes: `WELCOME10`, `LUXE20`, `SAVE15`, `NEWUSER`
- Multi-step checkout with form validation
- Multiple shipping options
- Order confirmation with reference number

**UX Polish**
- Blurred sticky navbar that becomes glass on scroll
- Search modal (`Ctrl+K` / `⌘K`) with live product results
- Dark / Light mode with system preference detection
- Scroll progress bar
- Back-to-top button
- Toast notification system
- Skeleton loading states
- Page transition animations
- `"/"` keyboard shortcut to focus search

**Auth (UI only)**
- Any email + password (6+ chars) works as login
- Session persisted to localStorage
- Protected routes redirect to `/login`

---

## Project Structure

```
src/
├── components/
│   ├── common/       Button, Input, Badge, StarRating, Skeleton, EmptyState, BackToTop
│   ├── layout/       Navbar (with mega menu + search modal), Footer
│   ├── product/      ProductCard, QuickView, FilterSidebar
│   └── home/         Hero (auto-rotating slider), all home sections
├── context/          Cart, Wishlist, Auth, Theme, Toast
├── data/             24 products, 6 categories, reviews, testimonials
├── hooks/            useLocalStorage, useScrollProgress, useScrollTop
├── layouts/          MainLayout, AuthLayout
├── pages/            All 16 pages
├── routes/           Lazy-loaded route tree with protected routes
├── types/            Complete TypeScript type definitions
└── utils/            cn(), formatPrice(), applyFilters(), helpers
```

## Deploy to Vercel

```bash
npm run build
# Push to GitHub → import on vercel.com → framework: Vite → done
```

## Resume Description

> **LUXE Fashion Store** — Full-featured React 19 e-commerce SPA with TypeScript, Tailwind CSS, and Framer Motion. Built 20 pages including a multi-step checkout, real-time product filtering, animated search modal, and dark mode. Used Context API + localStorage for cart, wishlist, and auth persistence. Implemented code splitting via React.lazy and route-level Suspense. No backend — all state client-side.
