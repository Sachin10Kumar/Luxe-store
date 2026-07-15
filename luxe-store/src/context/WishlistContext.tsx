import { createContext, useContext, type ReactNode } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { products } from "@/data/products";
import type { Product } from "@/types";

interface WishlistContextValue {
  ids: string[];
  items: Product[];
  toggle: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  count: number;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useLocalStorage<string[]>("luxe-wishlist", []);

  const toggle = (productId: string) => {
    setIds(prev =>
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  const isWishlisted = (productId: string) => ids.includes(productId);
  const items = products.filter(p => ids.includes(p.id));

  return (
    <WishlistContext.Provider value={{ ids, items, toggle, isWishlisted, count: ids.length }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used inside WishlistProvider");
  return ctx;
}
