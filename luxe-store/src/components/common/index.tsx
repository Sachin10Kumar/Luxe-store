import { motion, AnimatePresence } from "framer-motion";
import { Star, ArrowUp, ShoppingBag, Heart, Search, Package } from "lucide-react";
import { cn } from "@/utils/helpers";
import { useScrollTop } from "@/hooks/useScrollProgress";

// ─── Badge ──────────────────────────────────────────────────────
interface BadgeProps { children: React.ReactNode; variant?: "default" | "accent" | "success" | "warning" | "danger" | "new" | "sale"; className?: string; }

const badgeVariants: Record<string, string> = {
  default: "bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300",
  accent: "bg-accent/10 text-accent",
  success: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400",
  warning: "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400",
  danger: "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400",
  new: "bg-emerald-500 text-white",
  sale: "bg-red-500 text-white",
};

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span className={cn("inline-flex items-center px-2 py-0.5 rounded-lg text-xs font-semibold", badgeVariants[variant], className)}>
      {children}
    </span>
  );
}

// ─── StarRating ──────────────────────────────────────────────────
export function StarRating({ rating, count, size = 14, showCount = true }: { rating: number; count?: number; size?: number; showCount?: boolean }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center">
        {Array.from({ length: 5 }, (_, i) => (
          <Star key={i} size={size} className={i < Math.floor(rating) ? "fill-amber-400 text-amber-400" : i < rating ? "fill-amber-200 text-amber-400" : "fill-neutral-200 dark:fill-neutral-700 text-neutral-200 dark:text-neutral-700"} />
        ))}
      </div>
      {showCount && count !== undefined && (
        <span className="text-xs text-neutral-500 dark:text-neutral-400">({count})</span>
      )}
    </div>
  );
}

// ─── Skeleton ───────────────────────────────────────────────────
export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("shimmer rounded-2xl", className)} />;
}

export function ProductCardSkeleton() {
  return (
    <div className="space-y-3">
      <Skeleton className="aspect-[3/4] w-full" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-3 w-1/2" />
      <Skeleton className="h-4 w-1/3" />
    </div>
  );
}

// ─── EmptyState ─────────────────────────────────────────────────
const EMPTY_ICONS = {
  cart: ShoppingBag, wishlist: Heart, search: Search, orders: Package, default: Package,
};

interface EmptyStateProps {
  type?: keyof typeof EMPTY_ICONS;
  title?: string;
  description?: string;
  action?: React.ReactNode;
}

export function EmptyState({ type = "default", title = "Nothing here yet", description, action }: EmptyStateProps) {
  const Icon = EMPTY_ICONS[type];
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-20 text-center gap-4">
      <div className="w-20 h-20 rounded-3xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
        <Icon size={32} className="text-neutral-400" />
      </div>
      <div>
        <h3 className="font-semibold text-neutral-900 dark:text-white text-lg">{title}</h3>
        {description && <p className="text-neutral-500 dark:text-neutral-400 text-sm mt-1 max-w-xs mx-auto">{description}</p>}
      </div>
      {action}
    </motion.div>
  );
}

// ─── BackToTop ───────────────────────────────────────────────────
export function BackToTop() {
  const visible = useScrollTop(400);
  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 left-6 z-50 w-11 h-11 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-2xl shadow-soft-lg flex items-center justify-center hover:scale-110 transition-transform"
          aria-label="Back to top"
        >
          <ArrowUp size={18} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

// ─── ScrollProgressBar ───────────────────────────────────────────
export function ScrollProgressBar({ progress }: { progress: number }) {
  return (
    <div className="fixed top-0 left-0 right-0 z-[9998] h-0.5 bg-transparent pointer-events-none">
      <motion.div className="h-full bg-accent" style={{ width: `${progress}%` }} />
    </div>
  );
}
