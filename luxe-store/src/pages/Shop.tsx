import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, LayoutGrid, LayoutList, ChevronDown } from "lucide-react";
import { products } from "@/data/products";
import { FilterSidebar } from "@/components/product/FilterSidebar";
import { ProductCard } from "@/components/product/ProductCard";
import { QuickView } from "@/components/product/QuickView";
import { EmptyState, ProductCardSkeleton } from "@/components/common/index";
import { applyFilters, defaultFilters } from "@/utils/helpers";
import { SORT_OPTIONS } from "@/constants";
import type { Filters, Product, SortOption } from "@/types";
import { Button } from "@/components/common/Button";

const PAGE_SIZE = 12;

export default function Shop() {
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState<Filters>(() => ({
    ...defaultFilters,
    category: searchParams.get("category") ?? "",
    gender: searchParams.get("gender") ?? "",
    sort: (searchParams.get("sort") as SortOption) ?? "featured",
  }));
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [page, setPage] = useState(1);
  const [gridView, setGridView] = useState<"grid" | "list">("grid");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(t);
  }, [filters, query]);

  useEffect(() => { setPage(1); }, [filters, query]);

  const filtered = useMemo(() => {
    let result = applyFilters(products, filters);
    if (query) {
      const q = query.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) || p.tags.some(t => t.includes(q))
      );
    }
    if (searchParams.get("sale") === "true") result = result.filter(p => p.discount > 0);
    return result;
  }, [filters, query, searchParams]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const activeFilterCount = Object.entries(filters).filter(([k, v]) => {
    if (k === "sort") return false;
    if (Array.isArray(v)) return v.length > 0;
    if (k === "maxPrice") return v < 9999;
    return v !== "" && v !== 0 && v !== false;
  }).length;

  const resetFilters = () => { setFilters(defaultFilters); setQuery(""); };

  const currentSortLabel = SORT_OPTIONS.find(o => o.value === filters.sort)?.label ?? "Featured";

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950">
      {/* Page Header */}
      <div className="bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-100 dark:border-neutral-800 py-10 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.h1 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            className="font-display font-bold text-3xl sm:text-4xl text-neutral-900 dark:text-white mb-2">
            {filters.gender ? `${filters.gender.charAt(0).toUpperCase() + filters.gender.slice(1)}'s Collection` :
              filters.category ? filters.category :
              searchParams.get("sale") === "true" ? "Sale" : "All Products"}
          </motion.h1>
          <p className="text-neutral-500 dark:text-neutral-400 text-sm">
            {filtered.length} {filtered.length === 1 ? "product" : "products"}
            {query && ` for "${query}"`}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Mobile filter bar */}
        <div className="flex items-center gap-3 mb-6 lg:hidden">
          <Button variant="outline" size="sm" icon={<SlidersHorizontal size={15} />}
            onClick={() => setMobileFiltersOpen(true)}>
            Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
          </Button>
          <div className="relative">
            <Button variant="outline" size="sm" onClick={() => setSortOpen(o => !o)}
              icon={<ChevronDown size={14} />} iconPosition="right">
              {currentSortLabel}
            </Button>
            <AnimatePresence>
              {sortOpen && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
                  className="absolute left-0 top-full mt-2 w-48 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-2xl shadow-soft-lg z-20 overflow-hidden">
                  {SORT_OPTIONS.map(opt => (
                    <button key={opt.value} onClick={() => { setFilters(f => ({ ...f, sort: opt.value as SortOption })); setSortOpen(false); }}
                      className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${filters.sort === opt.value ? "bg-accent text-white" : "hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300"}`}>
                      {opt.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <button onClick={() => setGridView("grid")} className={`p-2 rounded-xl transition-colors ${gridView === "grid" ? "bg-neutral-100 dark:bg-neutral-800" : "text-neutral-400"}`}>
              <LayoutGrid size={16} />
            </button>
            <button onClick={() => setGridView("list")} className={`p-2 rounded-xl transition-colors ${gridView === "list" ? "bg-neutral-100 dark:bg-neutral-800" : "text-neutral-400"}`}>
              <LayoutList size={16} />
            </button>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar */}
          <FilterSidebar filters={filters} onChange={setFilters} onReset={resetFilters}
            activeCount={activeFilterCount} isMobileOpen={mobileFiltersOpen}
            onMobileClose={() => setMobileFiltersOpen(false)} />

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Desktop toolbar */}
            <div className="hidden lg:flex items-center justify-between mb-6">
              <p className="text-sm text-neutral-500">{filtered.length} results</p>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <button onClick={() => setSortOpen(o => !o)}
                    className="flex items-center gap-2 h-9 px-4 rounded-2xl border border-neutral-200 dark:border-neutral-700 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors">
                    Sort: {currentSortLabel} <ChevronDown size={14} className={`transition-transform ${sortOpen ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {sortOpen && (
                      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
                        className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-2xl shadow-soft-lg z-20 overflow-hidden">
                        {SORT_OPTIONS.map(opt => (
                          <button key={opt.value} onClick={() => { setFilters(f => ({ ...f, sort: opt.value as SortOption })); setSortOpen(false); }}
                            className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${filters.sort === opt.value ? "bg-accent text-white" : "hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300"}`}>
                            {opt.label}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <button onClick={() => setGridView("grid")} className={`p-2 rounded-xl transition-colors ${gridView === "grid" ? "bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white" : "text-neutral-400"}`}>
                  <LayoutGrid size={16} />
                </button>
                <button onClick={() => setGridView("list")} className={`p-2 rounded-xl transition-colors ${gridView === "list" ? "bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white" : "text-neutral-400"}`}>
                  <LayoutList size={16} />
                </button>
              </div>
            </div>

            {/* Product Grid */}
            {loading ? (
              <div className={`grid gap-4 sm:gap-6 ${gridView === "grid" ? "grid-cols-2 md:grid-cols-3" : "grid-cols-1"}`}>
                {Array.from({ length: PAGE_SIZE }).map((_, i) => <ProductCardSkeleton key={i} />)}
              </div>
            ) : paginated.length === 0 ? (
              <EmptyState type="search" title="No products found"
                description="Try adjusting your filters or search for something different."
                action={<Button onClick={resetFilters} variant="outline">Clear Filters</Button>} />
            ) : (
              <div className={`grid gap-4 sm:gap-6 ${gridView === "grid" ? "grid-cols-2 md:grid-cols-3" : "grid-cols-1 sm:grid-cols-2"}`}>
                {paginated.map(p => (
                  <ProductCard key={p.id} product={p} onQuickView={setQuickViewProduct} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-12">
                <button disabled={page === 1} onClick={() => setPage(p => p - 1)}
                  className="h-9 px-4 rounded-2xl border border-neutral-200 dark:border-neutral-700 text-sm disabled:opacity-40 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors">
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                  <button key={p} onClick={() => setPage(p)}
                    className={`w-9 h-9 rounded-2xl text-sm font-medium transition-colors ${p === page ? "bg-accent text-white" : "border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800"}`}>
                    {p}
                  </button>
                ))}
                <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)}
                  className="h-9 px-4 rounded-2xl border border-neutral-200 dark:border-neutral-700 text-sm disabled:opacity-40 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors">
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <QuickView product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
    </div>
  );
}
