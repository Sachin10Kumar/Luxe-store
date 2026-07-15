import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, ShoppingBag, Eye, Star } from "lucide-react";
import type { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useToast } from "@/context/ToastContext";
import { formatPrice, cn } from "@/utils/helpers";
import { Badge } from "@/components/common/index";

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
  className?: string;
}

export function ProductCard({ product, onQuickView, className }: ProductCardProps) {
  const [imgIdx, setImgIdx] = useState(0);
  const [addingToCart, setAddingToCart] = useState(false);
  const { addItem } = useCart();
  const { toggle, isWishlisted } = useWishlist();
  const { success } = useToast();
  const wishlisted = isWishlisted(product.id);

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    toggle(product.id);
    success(wishlisted ? "Removed from wishlist" : "Added to wishlist", product.name);
  };

  const handleQuickAdd = async (e: React.MouseEvent) => {
    e.preventDefault();
    setAddingToCart(true);
    await new Promise(r => setTimeout(r, 400));
    addItem(product, product.colors[0], product.sizes[0]);
    success("Added to cart", product.name);
    setAddingToCart(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className={cn("group relative", className)}
    >
      <Link to={`/product/${product.id}`} className="block">
        {/* Image Container */}
        <div className="relative overflow-hidden rounded-3xl bg-neutral-100 dark:bg-neutral-800 aspect-[3/4]">
          <motion.img
            src={product.images[imgIdx]}
            alt={product.name}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.06 }}
            transition={{ duration: 0.5 }}
            onMouseEnter={() => product.images[1] && setImgIdx(1)}
            onMouseLeave={() => setImgIdx(0)}
            loading="lazy"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.isNew && <Badge variant="new">NEW</Badge>}
            {product.discount > 0 && <Badge variant="sale">−{product.discount}%</Badge>}
            {product.isBestSeller && <Badge variant="accent">BESTSELLER</Badge>}
          </div>

          {/* Action Buttons */}
          <div className="absolute top-3 right-3 flex flex-col gap-2">
            <motion.button
              initial={{ opacity: 0, x: 12 }} whileHover={{ scale: 1.1 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={handleWishlist}
              className={cn(
                "w-9 h-9 rounded-2xl flex items-center justify-center transition-all shadow-soft",
                wishlisted
                  ? "bg-red-500 text-white"
                  : "bg-white/90 dark:bg-neutral-900/90 text-neutral-700 dark:text-neutral-300 opacity-0 group-hover:opacity-100"
              )}
              aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Heart size={16} fill={wishlisted ? "currentColor" : "none"} />
            </motion.button>
            {onQuickView && (
              <motion.button
                initial={{ opacity: 0, x: 12 }} whileHover={{ scale: 1.1 }}
                animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 }}
                onClick={(e) => { e.preventDefault(); onQuickView(product); }}
                className="w-9 h-9 rounded-2xl bg-white/90 dark:bg-neutral-900/90 text-neutral-700 dark:text-neutral-300 flex items-center justify-center shadow-soft opacity-0 group-hover:opacity-100 transition-all"
                aria-label="Quick view"
              >
                <Eye size={16} />
              </motion.button>
            )}
          </div>

          {/* Quick Add */}
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-all duration-300"
          >
            <button
              onClick={handleQuickAdd}
              disabled={addingToCart}
              className="w-full h-11 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-2xl text-sm font-semibold flex items-center justify-center gap-2 hover:bg-neutral-700 dark:hover:bg-neutral-100 transition-colors disabled:opacity-70"
            >
              <ShoppingBag size={15} />
              {addingToCart ? "Adding…" : "Quick Add"}
            </button>
          </motion.div>
        </div>

        {/* Info */}
        <div className="mt-3 space-y-1">
          <p className="text-xs text-neutral-500 dark:text-neutral-400 font-medium tracking-wider uppercase">{product.brand}</p>
          <h3 className="font-semibold text-neutral-900 dark:text-white text-sm leading-snug group-hover:text-accent transition-colors line-clamp-2">{product.name}</h3>

          <div className="flex items-center gap-1.5">
            {Array.from({ length: 5 }, (_, i) => (
              <Star key={i} size={11} className={i < Math.floor(product.rating) ? "fill-amber-400 text-amber-400" : "fill-neutral-200 dark:fill-neutral-700 text-neutral-200 dark:text-neutral-700"} />
            ))}
            <span className="text-xs text-neutral-400">({product.reviewCount})</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-bold text-neutral-900 dark:text-white">{formatPrice(product.price)}</span>
            {product.discount > 0 && (
              <span className="text-sm text-neutral-400 line-through">{formatPrice(product.originalPrice)}</span>
            )}
          </div>

          {/* Color Dots */}
          <div className="flex items-center gap-1.5 pt-0.5">
            {product.colors.slice(0, 4).map(c => (
              <span key={c.name} title={c.name} className="w-4 h-4 rounded-full border border-neutral-200 dark:border-neutral-700 shrink-0" style={{ backgroundColor: c.hex }} />
            ))}
            {product.colors.length > 4 && (
              <span className="text-xs text-neutral-400">+{product.colors.length - 4}</span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
