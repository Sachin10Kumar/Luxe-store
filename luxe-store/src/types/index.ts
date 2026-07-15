// ─── Product Types ──────────────────────────────────────────────
export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  subcategory: string;
  gender: "men" | "women" | "unisex" | "kids";
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  reviewCount: number;
  images: string[];
  colors: ProductColor[];
  sizes: string[];
  description: string;
  features: string[];
  tags: string[];
  inStock: boolean;
  isNew: boolean;
  isTrending: boolean;
  isBestSeller: boolean;
  createdAt: string;
}

export interface ProductColor {
  name: string;
  hex: string;
}

export interface CartItem extends Product {
  cartId: string;
  selectedColor: ProductColor;
  selectedSize: string;
  quantity: number;
}

export interface WishlistItem {
  productId: string;
  addedAt: string;
}

// ─── Category Types ─────────────────────────────────────────────
export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  count: number;
  description: string;
  subcategories: string[];
}

// ─── Review Types ────────────────────────────────────────────────
export interface Review {
  id: string;
  productId: string;
  author: string;
  avatar: string;
  rating: number;
  title: string;
  body: string;
  verified: boolean;
  helpful: number;
  createdAt: string;
}

// ─── Order Types ─────────────────────────────────────────────────
export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
  shippingAddress: Address;
  paymentMethod: string;
  createdAt: string;
  estimatedDelivery: string;
}

export interface Address {
  fullName: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone: string;
}

// ─── User Types ──────────────────────────────────────────────────
export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  phone?: string;
  addresses: Address[];
  createdAt: string;
}

// ─── Filter Types ────────────────────────────────────────────────
export interface Filters {
  category: string;
  gender: string;
  brand: string;
  minPrice: number;
  maxPrice: number;
  rating: number;
  sizes: string[];
  colors: string[];
  inStock: boolean;
  isNew: boolean;
  sort: SortOption;
}

export type SortOption =
  | "featured"
  | "price-asc"
  | "price-desc"
  | "rating"
  | "newest"
  | "popular";

// ─── Toast Types ─────────────────────────────────────────────────
export type ToastType = "success" | "error" | "info" | "warning";

export interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
}

// ─── Checkout Types ──────────────────────────────────────────────
export type CheckoutStep = "shipping" | "billing" | "payment" | "review" | "confirmed";

export interface CheckoutData {
  shipping: Partial<Address>;
  billing: Partial<Address> & { sameAsShipping: boolean };
  payment: {
    method: "card" | "paypal" | "apple";
    cardNumber?: string;
    expiryDate?: string;
    cvv?: string;
    cardName?: string;
  };
}
