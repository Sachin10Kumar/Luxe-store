import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShoppingBag, Heart, User, Menu, X, Sun, Moon, ChevronDown, ArrowRight, Command } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext";
import { useScrollTop } from "@/hooks/useScrollProgress";
import { NAV_LINKS } from "@/constants";
import { products } from "@/data/products";
import { cn } from "@/utils/helpers";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [megaMenu, setMegaMenu] = useState<string | null>(null);
  const scrolled = useScrollTop(20);
  const { count } = useCart();
  const { count: wishCount } = useWishlist();
  const { toggleTheme, isDark } = useTheme();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const searchRef = useRef<HTMLInputElement>(null);
  const megaRef = useRef<HTMLDivElement>(null);

  const searchResults = searchQuery.length > 1
    ? products.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 6)
    : [];

  useEffect(() => { setMobileOpen(false); setMegaMenu(null); }, [location.pathname]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); setSearchOpen(true); }
      if (e.key === "Escape") { setSearchOpen(false); setMobileOpen(false); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    if (searchOpen) setTimeout(() => searchRef.current?.focus(), 100);
  }, [searchOpen]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen || searchOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen, searchOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <>
      <header className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
        scrolled ? "glass shadow-soft" : "bg-transparent"
      )}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* Logo */}
            <Link to="/" className="font-display font-bold text-xl tracking-[0.15em] text-neutral-900 dark:text-white shrink-0">
              LUXE
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1" ref={megaRef}>
              {NAV_LINKS.map(link => (
                <div key={link.label} className="relative"
                  onMouseEnter={() => link.subcategories.length > 0 && setMegaMenu(link.label)}
                  onMouseLeave={() => setMegaMenu(null)}>
                  <Link to={link.href}
                    className={cn(
                      "flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-xl transition-colors",
                      link.label === "Sale" ? "text-red-500 font-semibold" : "text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800"
                    )}>
                    {link.label}
                    {link.subcategories.length > 0 && (
                      <ChevronDown size={14} className={cn("transition-transform", megaMenu === link.label && "rotate-180")} />
                    )}
                  </Link>

                  {/* Mega Menu */}
                  <AnimatePresence>
                    {megaMenu === link.label && link.subcategories.length > 0 && (
                      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 mt-2 w-56 glass rounded-2xl shadow-soft-lg p-3">
                        {link.subcategories.map(sub => (
                          <Link key={sub} to={`/shop?category=${encodeURIComponent(sub)}`}
                            className="flex items-center justify-between px-3 py-2 rounded-xl text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-accent transition-colors group">
                            {sub}
                            <ArrowRight size={13} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-1">
              <button onClick={() => setSearchOpen(true)} aria-label="Search"
                className="w-9 h-9 rounded-xl flex items-center justify-center text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-white transition-colors">
                <Search size={18} />
              </button>

              <button onClick={toggleTheme} aria-label="Toggle theme"
                className="hidden sm:flex w-9 h-9 rounded-xl items-center justify-center text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              <Link to="/wishlist" aria-label="Wishlist" className="relative w-9 h-9 rounded-xl flex items-center justify-center text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-white transition-colors">
                <Heart size={18} />
                {wishCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-accent text-white text-[10px] font-bold rounded-full flex items-center justify-center">{wishCount > 9 ? "9+" : wishCount}</span>
                )}
              </Link>

              <Link to="/cart" aria-label="Cart" className="relative w-9 h-9 rounded-xl flex items-center justify-center text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-white transition-colors">
                <ShoppingBag size={18} />
                {count > 0 && (
                  <motion.span key={count} initial={{ scale: 1.5 }} animate={{ scale: 1 }}
                    className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-accent text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {count > 9 ? "9+" : count}
                  </motion.span>
                )}
              </Link>

              <Link to={isAuthenticated ? "/dashboard" : "/login"} aria-label="Account"
                className="hidden sm:flex w-9 h-9 rounded-xl items-center justify-center text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-white transition-colors">
                <User size={18} />
              </Link>

              <button onClick={() => setMobileOpen(true)} aria-label="Menu"
                className="lg:hidden w-9 h-9 rounded-xl flex items-center justify-center text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors ml-1">
                <Menu size={18} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Search Modal */}
      <AnimatePresence>
        {searchOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-md" onClick={() => setSearchOpen(false)} />
            <motion.div initial={{ opacity: 0, y: -24, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -24, scale: 0.97 }}
              className="fixed top-24 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl px-4">
              <div className="bg-white dark:bg-neutral-900 rounded-3xl shadow-soft-lg overflow-hidden">
                <form onSubmit={handleSearch} className="flex items-center gap-3 px-5 py-4 border-b border-neutral-100 dark:border-neutral-800">
                  <Search size={20} className="text-neutral-400 shrink-0" />
                  <input ref={searchRef} value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search products, brands, categories…"
                    className="flex-1 bg-transparent text-neutral-900 dark:text-white placeholder:text-neutral-400 text-base outline-none" />
                  <kbd className="hidden sm:flex items-center gap-1 px-2 py-1 text-xs bg-neutral-100 dark:bg-neutral-800 text-neutral-400 rounded-lg">
                    <Command size={10} /> K
                  </kbd>
                  <button type="button" onClick={() => setSearchOpen(false)} className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200">
                    <X size={18} />
                  </button>
                </form>

                {searchResults.length > 0 ? (
                  <div className="p-3">
                    <p className="text-xs text-neutral-400 px-3 py-1 mb-1">PRODUCTS</p>
                    {searchResults.map(p => (
                      <Link key={p.id} to={`/product/${p.id}`} onClick={() => { setSearchOpen(false); setSearchQuery(""); }}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-2xl hover:bg-neutral-100 dark:hover:bg-neutral-800 group transition-colors">
                        <img src={p.images[0]} alt={p.name} className="w-12 h-12 rounded-xl object-cover" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-neutral-900 dark:text-white truncate">{p.name}</p>
                          <p className="text-xs text-neutral-500">{p.brand} · £{p.price}</p>
                        </div>
                        <ArrowRight size={14} className="text-neutral-300 group-hover:text-accent transition-colors" />
                      </Link>
                    ))}
                    {searchQuery.length > 1 && (
                      <button onClick={() => { navigate(`/shop?q=${encodeURIComponent(searchQuery)}`); setSearchOpen(false); setSearchQuery(""); }}
                        className="w-full text-center py-3 text-sm text-accent font-medium hover:underline">
                        See all results for "{searchQuery}"
                      </button>
                    )}
                  </div>
                ) : searchQuery.length > 1 ? (
                  <div className="p-6 text-center text-neutral-500 text-sm">No results for "{searchQuery}"</div>
                ) : (
                  <div className="p-5">
                    <p className="text-xs text-neutral-400 mb-3 font-medium tracking-wider">POPULAR SEARCHES</p>
                    <div className="flex flex-wrap gap-2">
                      {["Cashmere Sweater", "Silk Dress", "Chelsea Boots", "Oversized Blazer", "Linen Trousers"].map(t => (
                        <button key={t} onClick={() => setSearchQuery(t)}
                          className="px-3 py-1.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-accent hover:text-white transition-colors">
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm lg:hidden" onClick={() => setMobileOpen(false)} />
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 400, damping: 40 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-80 bg-white dark:bg-neutral-900 shadow-soft-lg lg:hidden flex flex-col">
              <div className="flex items-center justify-between p-5 border-b border-neutral-100 dark:border-neutral-800">
                <span className="font-display font-bold text-lg tracking-wider">LUXE</span>
                <button onClick={() => setMobileOpen(false)} className="w-9 h-9 rounded-xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
                  <X size={16} />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto p-4 space-y-1">
                {NAV_LINKS.map(link => (
                  <div key={link.label}>
                    <Link to={link.href}
                      className={cn("flex items-center px-4 py-3 rounded-2xl text-base font-medium transition-colors",
                        link.label === "Sale" ? "text-red-500" : "text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800")}>
                      {link.label}
                    </Link>
                    {link.subcategories.length > 0 && (
                      <div className="pl-4 mt-1 space-y-0.5">
                        {link.subcategories.map(sub => (
                          <Link key={sub} to={`/shop?category=${encodeURIComponent(sub)}`}
                            className="flex items-center px-4 py-2 rounded-xl text-sm text-neutral-500 dark:text-neutral-400 hover:text-accent hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors">
                            {sub}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>

              <div className="p-4 border-t border-neutral-100 dark:border-neutral-800 space-y-2">
                <Link to={isAuthenticated ? "/dashboard" : "/login"} className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
                  <User size={18} className="text-neutral-500" />
                  <span className="text-sm font-medium">{isAuthenticated ? "My Account" : "Sign In"}</span>
                </Link>
                <button onClick={toggleTheme} className="flex items-center gap-3 w-full px-4 py-3 rounded-2xl hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
                  {isDark ? <Sun size={18} className="text-neutral-500" /> : <Moon size={18} className="text-neutral-500" />}
                  <span className="text-sm font-medium">{isDark ? "Light Mode" : "Dark Mode"}</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
