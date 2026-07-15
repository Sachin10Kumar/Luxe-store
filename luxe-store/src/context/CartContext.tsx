import { createContext, useContext, useReducer, useEffect, type ReactNode } from "react";
import type { CartItem, Product, ProductColor } from "@/types";
import { generateId } from "@/utils/helpers";
import { PROMO_CODE_MAP } from "@/constants";

interface CartState {
  items: CartItem[];
  promoCode: string;
  discount: number;
}

type CartAction =
  | { type: "ADD"; product: Product; color: ProductColor; size: string; quantity?: number }
  | { type: "REMOVE"; cartId: string }
  | { type: "UPDATE_QTY"; cartId: string; quantity: number }
  | { type: "APPLY_PROMO"; code: string }
  | { type: "CLEAR" }
  | { type: "LOAD"; state: CartState };

interface CartContextValue {
  items: CartItem[];
  promoCode: string;
  discount: number;
  subtotal: number;
  discountAmount: number;
  total: number;
  count: number;
  addItem: (product: Product, color: ProductColor, size: string, quantity?: number) => boolean;
  removeItem: (cartId: string) => void;
  updateQuantity: (cartId: string, quantity: number) => void;
  applyPromo: (code: string) => boolean;
  clearCart: () => void;
  hasItem: (productId: string, color: string, size: string) => boolean;
}

const CartContext = createContext<CartContextValue | null>(null);

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD": {
      const existing = state.items.find(
        i => i.id === action.product.id && i.selectedColor.name === action.color.name && i.selectedSize === action.size
      );
      if (existing) {
        return {
          ...state,
          items: state.items.map(i =>
            i.cartId === existing.cartId
              ? { ...i, quantity: i.quantity + (action.quantity ?? 1) }
              : i
          ),
        };
      }
      const newItem: CartItem = {
        ...action.product,
        cartId: generateId(),
        selectedColor: action.color,
        selectedSize: action.size,
        quantity: action.quantity ?? 1,
      };
      return { ...state, items: [...state.items, newItem] };
    }
    case "REMOVE":
      return { ...state, items: state.items.filter(i => i.cartId !== action.cartId) };
    case "UPDATE_QTY":
      return {
        ...state,
        items: action.quantity <= 0
          ? state.items.filter(i => i.cartId !== action.cartId)
          : state.items.map(i => i.cartId === action.cartId ? { ...i, quantity: action.quantity } : i),
      };
    case "APPLY_PROMO": {
      const rate = PROMO_CODE_MAP[action.code.toUpperCase()];
      return rate !== undefined ? { ...state, promoCode: action.code.toUpperCase(), discount: rate } : state;
    }
    case "CLEAR":
      return { items: [], promoCode: "", discount: 0 };
    case "LOAD":
      return action.state;
    default:
      return state;
  }
}

const STORAGE_KEY = "luxe-cart";
const initial: CartState = { items: [], promoCode: "", discount: 0 };

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initial, () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? (JSON.parse(saved) as CartState) : initial;
    } catch { return initial; }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const subtotal = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const discountAmount = subtotal * state.discount;
  const total = subtotal - discountAmount;
  const count = state.items.reduce((sum, i) => sum + i.quantity, 0);

  const addItem = (product: Product, color: ProductColor, size: string, quantity = 1): boolean => {
    dispatch({ type: "ADD", product, color, size, quantity });
    return true;
  };
  const removeItem = (cartId: string) => dispatch({ type: "REMOVE", cartId });
  const updateQuantity = (cartId: string, quantity: number) => dispatch({ type: "UPDATE_QTY", cartId, quantity });
  const applyPromo = (code: string): boolean => {
    const rate = PROMO_CODE_MAP[code.toUpperCase()];
    if (rate !== undefined) { dispatch({ type: "APPLY_PROMO", code }); return true; }
    return false;
  };
  const clearCart = () => dispatch({ type: "CLEAR" });
  const hasItem = (productId: string, color: string, size: string) =>
    state.items.some(i => i.id === productId && i.selectedColor.name === color && i.selectedSize === size);

  return (
    <CartContext.Provider value={{
      ...state, subtotal, discountAmount, total, count,
      addItem, removeItem, updateQuantity, applyPromo, clearCart, hasItem,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
