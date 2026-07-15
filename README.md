<!-- Banner -->
<div align="center">
  <h1>✦ LUXE</h1>
  <p><strong>Premium Fashion E-Commerce — React 19 Frontend</strong></p>
  <p>
    <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black" />
    <img src="https://img.shields.io/badge/TypeScript-5.5-3178C6?style=flat-square&logo=typescript&logoColor=white" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" />
    <img src="https://img.shields.io/badge/Framer_Motion-11-FF0055?style=flat-square&logo=framer&logoColor=white" />
    <img src="https://img.shields.io/badge/Vite-6.0-646CFF?style=flat-square&logo=vite&logoColor=white" />
  </p>
  <p>
    <a href="#-quick-start">Quick Start</a> ·
    <a href="#-pages">Pages</a> ·
    <a href="#-features">Features</a> ·
    <a href="#-tech-stack">Tech Stack</a> ·
    <a href="#-project-structure">Structure</a>
  </p>
</div>

---

## 🚀 Quick Start

```bash
git clone https://github.com/yourusername/luxe-store.git
cd luxe-store
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) — no API keys, no backend, no extra setup.

> **Demo credentials:** any email + any password (6+ characters)
> **Promo codes:** `WELCOME10` · `LUXE20` · `SAVE15` · `NEWUSER`

---

## 📸 Preview

> _Add screenshots here after running the project locally. Recommended: Hero section (dark mode), Shop page with filters open, Product Detail, and the Checkout flow._

| Home | Shop | Product Detail |
|---|---|---|
| ![home](https://placehold.co/400x250/111111/6C63FF?text=Home) | ![shop](https://placehold.co/400x250/111111/6C63FF?text=Shop) | ![product](https://placehold.co/400x250/111111/6C63FF?text=Product) |

| Cart | Checkout | Dashboard |
|---|---|---|
| ![cart](https://placehold.co/400x250/111111/6C63FF?text=Cart) | ![checkout](https://placehold.co/400x250/111111/6C63FF?text=Checkout) | ![dashboard](https://placehold.co/400x250/111111/6C63FF?text=Dashboard) |

---

## 📄 Pages

| Route | Page | Description |
|---|---|---|
| `/` | **Home** | Hero slider, featured products, categories, testimonials, newsletter |
| `/shop` | **Shop** | Filter sidebar, sorting, grid/list view, pagination, quick view |
| `/product/:id` | **Product Detail** | Image gallery, colour/size picker, reviews, related products |
| `/cart` | **Cart** | Quantity controls, promo codes, order summary |
| `/wishlist` | **Wishlist** | Saved items, move to cart, remove |
| `/checkout` | **Checkout** | 4-step flow — shipping → payment → review → confirmed |
| `/login` | **Login** | Email/password auth with validation |
| `/register` | **Register** | Full registration with terms acceptance |
| `/forgot-password` | **Forgot Password** | Email confirmation screen |
| `/dashboard` | **Dashboard** | Profile, orders, wishlist, addresses, settings |
| `/about` | **About** | Brand story, timeline, values, team |
| `/contact` | **Contact** | Contact form, cards, social links |
| `/faq` | **FAQ** | Searchable accordion by category |
| `/privacy` | **Privacy Policy** | Full policy page |
| `/terms` | **Terms** | Terms of service |
| `*` | **404** | Animated not-found page |

---

## ✨ Features

### 🛒 Shopping Experience
- 24 curated mock products with real Unsplash images
- **8-dimension filtering** — category, gender, brand, price range, size, colour, rating, availability
- Sort by featured, newest, price (low/high), rating, popularity
- **Quick View modal** — add to cart without leaving the page
- Product image gallery with thumbnail switching
- Colour and size selection with visual feedback
- Related products on every product page

### 🧺 Cart & Checkout
- Cart persists across sessions via `localStorage`
- Working promo codes — `WELCOME10`, `LUXE20`, `SAVE15`, `NEWUSER`
- Free delivery threshold indicator
- **4-step checkout** with React Hook Form + Zod validation
- Multiple shipping options with live price update
- Order confirmation screen with reference number

### 🎨 Design & UX
- **Dark / Light mode** with system preference detection and persistence
- Blurred glass navbar that activates on scroll
- **Search modal** (`Ctrl+K` / `⌘K`) with live product results and recent history
- Smooth Framer Motion page transitions
- Animated hero section with auto-rotating slides
- Scroll progress bar
- Back-to-top button
- Toast notification system (success, error, info)
- Skeleton loading states on every data-heavy page
- Full mobile responsive — mobile menu with slide-in drawer

### 🔐 Auth (UI Only)
- Login / Register / Forgot Password flows
- Session stored in `localStorage` — survives page refresh
- Protected routes redirect to `/login`
- Guest routes redirect to `/dashboard` if already logged in

---

## 🛠 Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| [React](https://react.dev/) | 19 | UI framework |
| [TypeScript](https://www.typescriptlang.org/) | 5.5 | Type safety |
| [Vite](https://vitejs.dev/) | 6.0 | Build tool, dev server |
| [Tailwind CSS](https://tailwindcss.com/) | 3.4 | Styling with custom design tokens |
| [Framer Motion](https://www.framer.com/motion/) | 11 | Animations and transitions |
| [React Router](https://reactrouter.com/) | 6 | Client-side routing |
| [React Hook Form](https://react-hook-form.com/) | 7 | Form state management |
| [Zod](https://zod.dev/) | 3 | Schema validation |
| [Lucide React](https://lucide.dev/) | 0.453 | Icon library |
| Context API | — | Global state (cart, wishlist, auth, theme, toast) |
| localStorage | — | Persistence layer |

---

## 📁 Project Structure

```
luxe-store/
├── public/
├── src/
│   ├── components/
│   │   ├── common/         # Button, Input, Badge, StarRating, Skeleton, EmptyState, BackToTop
│   │   ├── layout/         # Navbar (mega menu + ⌘K search), Footer
│   │   ├── product/        # ProductCard, QuickView modal, FilterSidebar
│   │   └── home/           # Hero slider, all home page sections
│   │
│   ├── context/
│   │   ├── CartContext.tsx      # Pure reducer, localStorage sync
│   │   ├── WishlistContext.tsx  # Toggle with persistence
│   │   ├── AuthContext.tsx      # Mock auth, localStorage session
│   │   ├── ThemeContext.tsx     # Dark/light with system pref
│   │   └── ToastContext.tsx     # Animated notification queue
│   │
│   ├── data/
│   │   ├── products.ts     # 24 mock products with full metadata
│   │   ├── categories.ts   # 6 categories with Unsplash images
│   │   └── reviews.ts      # Product reviews + testimonials
│   │
│   ├── hooks/
│   │   ├── useLocalStorage.ts     # Type-safe localStorage hook
│   │   └── useScrollProgress.ts   # Scroll % and threshold hooks
│   │
│   ├── layouts/
│   │   ├── MainLayout.tsx   # Navbar + Footer + scroll progress + back-to-top
│   │   └── AuthLayout.tsx   # Split-screen auth layout
│   │
│   ├── pages/               # 16 page components (all lazy-loaded)
│   ├── routes/              # Route tree with lazy loading + protected routes
│   ├── types/               # All TypeScript interfaces
│   ├── utils/               # cn(), formatPrice(), applyFilters(), helpers
│   ├── styles/              # globals.css, Tailwind directives
│   ├── constants/           # Nav links, sort options, promo codes
│   ├── App.tsx              # Provider tree
│   └── main.tsx             # React DOM entry point
│
├── index.html
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

---

## 🏗 Architecture Decisions

**Why a pure cart reducer?**
The cart uses `useReducer` with a pure function rather than `useState` + mutations. This makes every state change predictable, testable, and easy to trace. The `useEffect` that syncs to `localStorage` is completely separate — single responsibility.

**Why extract `SettingToggle` as its own component?**
React's Rules of Hooks forbid calling hooks inside `.map()` callbacks. The settings toggles in Dashboard each need their own `useState` — so they live in a dedicated `SettingToggle` component. This is a common mistake in tutorial code; getting it right matters.

**Why lazy-load every page?**
Every page is wrapped in `React.lazy()` with a `Suspense` boundary, so the initial JS bundle only contains the shell. Pages load on demand. For a project this size it may not matter much — but it's the correct production pattern and demonstrates you know it.

**Why five separate context providers?**
Each context has one clear concern. Combining them would save a few lines but make re-renders less predictable and testing harder. The composition at the `App.tsx` root is explicit and easy to read.

---

## 🚀 Deployment

### Vercel (recommended)
1. Push to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project → Import your repo
3. Framework: **Vite** (auto-detected)
4. Click Deploy — done

### Netlify
```bash
npm run build
# Drag and drop the /dist folder to netlify.com/drop
```

### GitHub Pages
```bash
npm run build
# Push /dist to gh-pages branch
```

---

## 🤝 Contributing

Pull requests are welcome. For major changes, open an issue first to discuss what you'd like to change.

```bash
# Fork the repo, then:
git checkout -b feature/your-feature-name
git commit -m "feat: add your feature"
git push origin feature/your-feature-name
# Open a PR
```

---

## 📝 License

MIT — use it freely in your own portfolio or projects.

---

<div align="center">
  <p>Built with care by <strong>Sachin Kumar</strong></p>
  <p>
    <a href="https://github.com/yourusername">GitHub</a> ·
    <a href="https://linkedin.com/in/yourusername">LinkedIn</a> ·
    <a href="https://yourportfolio.com">Portfolio</a>
  </p>
</div>
