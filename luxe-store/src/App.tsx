import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@/context/ThemeContext";
import { ToastProvider } from "@/context/ToastContext";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { AppRoutes } from "@/routes/index";

/**
 * Provider order matters:
 * ThemeProvider — applies dark/light class to <html>, must be outermost
 * ToastProvider — renders the toast portal, needs to be above everything
 * AuthProvider  — user session, used by Cart, Wishlist, protected routes
 * CartProvider  — cart state, persisted to localStorage
 * WishlistProvider — wishlist ids, persisted to localStorage
 * BrowserRouter — must wrap all route-aware components
 */
export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <BrowserRouter>
                <AppRoutes />
              </BrowserRouter>
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
