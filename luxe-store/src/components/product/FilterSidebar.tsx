import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, X, SlidersHorizontal } from "lucide-react";
import type { Filters } from "@/types";
import { getAllBrands, getAllCategories } from "@/data/products";
import { cn } from "@/utils/helpers";
import { Button } from "@/components/common/Button";

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];
const COLORS = [
  { name: "Black", hex: "#111111" }, { name: "White", hex: "#FAFAFA" },
  { name: "Navy", hex: "#1B2A4A" }, { name: "Camel", hex: "#C19A6B" },
  { name: "Ivory", hex: "#F5F0E8" }, { name: "Sage", hex: "#87AE73" },
  { name: "Dusty Rose", hex: "#DCAE96" }, { name: "Slate", hex: "#708090" },
];

interface FilterSidebarProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
  onReset: () => void;
  activeCount: number;
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
}

function Section({ title, children, defaultOpen = true }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-neutral-100 dark:border-neutral-800 pb-4">
      <button onClick={() => setOpen(o => !o)}
        className="flex items-center justify-between w-full py-3 text-sm font-semibold text-neutral-900 dark:text-white">
        {title}
        <ChevronDown size={16} className={cn("transition-transform text-neutral-400", open && "rotate-180")} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FilterSidebar({ filters, onChange, onReset, activeCount, isMobileOpen, onMobileClose }: FilterSidebarProps) {
  const categories = getAllCategories();
  const brands = getAllBrands();

  const set = <K extends keyof Filters>(key: K, value: Filters[K]) => onChange({ ...filters, [key]: value });

  const toggleArray = (key: "sizes" | "colors", val: string) => {
    const arr = filters[key] as string[];
    set(key, arr.includes(val) ? arr.filter(v => v !== val) : [...arr, val]);
  };

  const sidebar = (
    <div className="space-y-1">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={16} className="text-accent" />
          <span className="font-bold text-neutral-900 dark:text-white">Filters</span>
          {activeCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-accent text-white text-xs flex items-center justify-center font-bold">{activeCount}</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {activeCount > 0 && (
            <button onClick={onReset} className="text-xs text-accent hover:underline font-medium">Clear all</button>
          )}
          {onMobileClose && (
            <button onClick={onMobileClose} className="lg:hidden w-8 h-8 rounded-xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Category */}
      <Section title="Category">
        <div className="space-y-1 pt-1">
          {["", ...categories].map(cat => (
            <button key={cat} onClick={() => set("category", cat)}
              className={cn("w-full text-left px-3 py-2 rounded-xl text-sm transition-colors",
                filters.category === cat
                  ? "bg-accent text-white font-medium"
                  : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800")}>
              {cat || "All Categories"}
            </button>
          ))}
        </div>
      </Section>

      {/* Gender */}
      <Section title="Gender">
        <div className="flex flex-wrap gap-2 pt-2">
          {["", "women", "men", "unisex"].map(g => (
            <button key={g} onClick={() => set("gender", g)}
              className={cn("px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors",
                filters.gender === g
                  ? "border-accent bg-accent text-white"
                  : "border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 hover:border-neutral-400")}>
              {g ? g.charAt(0).toUpperCase() + g.slice(1) : "All"}
            </button>
          ))}
        </div>
      </Section>

      {/* Price */}
      <Section title="Price Range">
        <div className="pt-2 space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-neutral-500">£{filters.minPrice}</span>
            <span className="text-neutral-500">£{filters.maxPrice === 9999 ? "1000+" : filters.maxPrice}</span>
          </div>
          <input type="range" min={0} max={1000} step={25} value={filters.maxPrice === 9999 ? 1000 : filters.maxPrice}
            onChange={e => set("maxPrice", Number(e.target.value) === 1000 ? 9999 : Number(e.target.value))}
            className="w-full accent-accent" />
          <div className="flex gap-2">
            {[0, 100, 200, 500].map(p => (
              <button key={p} onClick={() => set("maxPrice", p === 500 ? 9999 : p === 0 ? 9999 : p)}
                className="flex-1 py-1 rounded-lg text-xs border border-neutral-200 dark:border-neutral-700 hover:border-accent hover:text-accent transition-colors">
                {p === 0 ? "All" : p === 500 ? "£500+" : `£${p}`}
              </button>
            ))}
          </div>
        </div>
      </Section>

      {/* Brand */}
      <Section title="Brand" defaultOpen={false}>
        <div className="space-y-1 pt-1">
          {["", ...brands].map(b => (
            <button key={b} onClick={() => set("brand", b)}
              className={cn("w-full text-left px-3 py-2 rounded-xl text-sm transition-colors",
                filters.brand === b
                  ? "bg-accent text-white font-medium"
                  : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800")}>
              {b || "All Brands"}
            </button>
          ))}
        </div>
      </Section>

      {/* Sizes */}
      <Section title="Size">
        <div className="flex flex-wrap gap-2 pt-2">
          {SIZES.map(s => (
            <button key={s} onClick={() => toggleArray("sizes", s)}
              className={cn("w-12 h-9 rounded-xl border text-sm font-medium transition-all",
                filters.sizes.includes(s)
                  ? "border-accent bg-accent text-white"
                  : "border-neutral-200 dark:border-neutral-700 hover:border-accent")}>
              {s}
            </button>
          ))}
        </div>
      </Section>

      {/* Colors */}
      <Section title="Colour" defaultOpen={false}>
        <div className="flex flex-wrap gap-2 pt-2">
          {COLORS.map(c => (
            <button key={c.name} title={c.name} onClick={() => toggleArray("colors", c.name)}
              className={cn("w-8 h-8 rounded-full border-2 transition-all",
                filters.colors.includes(c.name) ? "border-accent scale-110" : "border-neutral-200 dark:border-neutral-700")}
              style={{ backgroundColor: c.hex }} />
          ))}
        </div>
      </Section>

      {/* Rating */}
      <Section title="Minimum Rating" defaultOpen={false}>
        <div className="space-y-1 pt-1">
          {[0, 3, 4, 4.5].map(r => (
            <button key={r} onClick={() => set("rating", r)}
              className={cn("w-full text-left px-3 py-2 rounded-xl text-sm flex items-center gap-2 transition-colors",
                filters.rating === r ? "bg-accent text-white" : "hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-400")}>
              {r === 0 ? "All ratings" : `${r}+ ★`}
            </button>
          ))}
        </div>
      </Section>

      {/* Toggles */}
      <Section title="More Options" defaultOpen={false}>
        <div className="space-y-3 pt-2">
          {[
            { key: "inStock" as const, label: "In Stock Only" },
            { key: "isNew" as const, label: "New Arrivals Only" },
          ].map(({ key, label }) => (
            <label key={key} className="flex items-center gap-3 cursor-pointer">
              <div onClick={() => set(key, !filters[key])}
                className={cn("w-10 h-6 rounded-full transition-colors relative",
                  filters[key] ? "bg-accent" : "bg-neutral-200 dark:bg-neutral-700")}>
                <div className={cn("absolute top-1 w-4 h-4 rounded-full bg-white transition-all",
                  filters[key] ? "left-5" : "left-1")} />
              </div>
              <span className="text-sm text-neutral-700 dark:text-neutral-300">{label}</span>
            </label>
          ))}
        </div>
      </Section>

      {activeCount > 0 && (
        <Button onClick={onReset} variant="outline" fullWidth className="mt-4">
          Clear All Filters ({activeCount})
        </Button>
      )}
    </div>
  );

  // Mobile overlay
  return (
    <>
      {/* Desktop */}
      <div className="hidden lg:block w-64 shrink-0">{sidebar}</div>

      {/* Mobile */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/40 lg:hidden" onClick={onMobileClose} />
            <motion.div initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 400, damping: 40 }}
              className="fixed left-0 top-0 bottom-0 z-50 w-80 bg-white dark:bg-neutral-900 p-6 overflow-y-auto shadow-soft-lg lg:hidden">
              {sidebar}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
