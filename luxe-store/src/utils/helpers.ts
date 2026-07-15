import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Filters, Product, SortOption } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(price);
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

export function generateId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

export function slugify(text: string): string {
  return text.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");
}

export function applyFilters(products: Product[], filters: Filters): Product[] {
  let result = [...products];

  if (filters.category) result = result.filter(p => p.category === filters.category || p.subcategory === filters.category || p.gender === filters.category);
  if (filters.gender) result = result.filter(p => p.gender === filters.gender || p.gender === "unisex");
  if (filters.brand) result = result.filter(p => p.brand === filters.brand);
  if (filters.minPrice > 0) result = result.filter(p => p.price >= filters.minPrice);
  if (filters.maxPrice < 9999) result = result.filter(p => p.price <= filters.maxPrice);
  if (filters.rating > 0) result = result.filter(p => p.rating >= filters.rating);
  if (filters.sizes.length > 0) result = result.filter(p => p.sizes.some(s => filters.sizes.includes(s)));
  if (filters.colors.length > 0) result = result.filter(p => p.colors.some(c => filters.colors.includes(c.name)));
  if (filters.inStock) result = result.filter(p => p.inStock);
  if (filters.isNew) result = result.filter(p => p.isNew);

  return sortProducts(result, filters.sort);
}

export function sortProducts(products: Product[], sort: SortOption): Product[] {
  const result = [...products];
  switch (sort) {
    case "price-asc": return result.sort((a, b) => a.price - b.price);
    case "price-desc": return result.sort((a, b) => b.price - a.price);
    case "rating": return result.sort((a, b) => b.rating - a.rating);
    case "newest": return result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    case "popular": return result.sort((a, b) => b.reviewCount - a.reviewCount);
    default: return result.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
  }
}

export function truncate(str: string, length: number): string {
  return str.length > length ? `${str.slice(0, length)}...` : str;
}

export const defaultFilters: Filters = {
  category: "", gender: "", brand: "", minPrice: 0, maxPrice: 9999,
  rating: 0, sizes: [], colors: [], inStock: false, isNew: false, sort: "featured",
};
