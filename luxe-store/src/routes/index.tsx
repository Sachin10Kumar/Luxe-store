import { lazy, Suspense } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { MainLayout } from "@/layouts/MainLayout";
import { AuthLayout } from "@/layouts/AuthLayout";
import { useAuth } from "@/context/AuthContext";
import { Skeleton } from "@/components/common/index";

// ── Lazy-loaded pages ──────────────────────────────────────────
const Home           = lazy(() => import("@/pages/Home"));
const Shop           = lazy(() => import("@/pages/Shop"));
const ProductDetail  = lazy(() => import("@/pages/ProductDetail"));
const Cart           = lazy(() => import("@/pages/Cart"));
const Wishlist       = lazy(() => import("@/pages/Wishlist"));
const Checkout       = lazy(() => import("@/pages/Checkout"));
const Login          = lazy(() => import("@/pages/Login"));
const Register       = lazy(() => import("@/pages/Register"));
const ForgotPassword = lazy(() => import("@/pages/ForgotPassword"));
const Dashboard      = lazy(() => import("@/pages/Dashboard"));
const About          = lazy(() => import("@/pages/About"));
const Contact        = lazy(() => import("@/pages/Contact"));
const FAQ            = lazy(() => import("@/pages/FAQ"));
const NotFound       = lazy(() => import("@/pages/NotFound"));
const PrivacyLazy    = lazy(() => import("@/pages/Legal").then(m => ({ default: m.Privacy })));
const TermsLazy      = lazy(() => import("@/pages/Legal").then(m => ({ default: m.Terms })));

// ── Page-level loading shimmer ─────────────────────────────────
function PageLoader() {
  return (
    <div className="min-h-[60vh] p-8 space-y-6 max-w-7xl mx-auto animate-pulse">
      <Skeleton className="h-10 w-1/3" />
      <Skeleton className="h-56 w-full" />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="aspect-[3/4] w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        ))}
      </div>
    </div>
  );
}

function Wrap({ element }: { element: React.ReactNode }) {
  return <Suspense fallback={<PageLoader />}>{element}</Suspense>;
}

// ── Route guards ───────────────────────────────────────────────
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return <>{children}</>;
}

function GuestRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) return <Navigate to="/dashboard" replace />;
  return <>{children}</>;
}

// ── Route tree ─────────────────────────────────────────────────
export function AppRoutes() {
  return (
    <Routes>
      {/* Main layout — Navbar + Footer */}
      <Route element={<MainLayout />}>
        <Route index element={<Wrap element={<Home />} />} />
        <Route path="shop" element={<Wrap element={<Shop />} />} />
        <Route path="product/:id" element={<Wrap element={<ProductDetail />} />} />
        <Route path="cart" element={<Wrap element={<Cart />} />} />
        <Route path="wishlist" element={<Wrap element={<Wishlist />} />} />
        <Route path="about" element={<Wrap element={<About />} />} />
        <Route path="contact" element={<Wrap element={<Contact />} />} />
        <Route path="faq" element={<Wrap element={<FAQ />} />} />
        <Route path="privacy" element={<Wrap element={<PrivacyLazy />} />} />
        <Route path="terms" element={<Wrap element={<TermsLazy />} />} />
        <Route path="checkout" element={<Wrap element={<Checkout />} />} />
        <Route path="dashboard" element={
          <ProtectedRoute>
            <Wrap element={<Dashboard />} />
          </ProtectedRoute>
        } />
      </Route>

      {/* Auth layout — split-screen */}
      <Route element={<AuthLayout />}>
        <Route path="login" element={
          <GuestRoute><Wrap element={<Login />} /></GuestRoute>
        } />
        <Route path="register" element={
          <GuestRoute><Wrap element={<Register />} /></GuestRoute>
        } />
        <Route path="forgot-password" element={<Wrap element={<ForgotPassword />} />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<Wrap element={<NotFound />} />} />
    </Routes>
  );
}
