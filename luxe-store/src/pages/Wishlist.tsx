import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingBag, Trash2 } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { formatPrice } from "@/utils/helpers";
import { Button } from "@/components/common/Button";
import { EmptyState, StarRating, Badge } from "@/components/common/index";
import { Link } from "react-router-dom";

export default function Wishlist() {
  const { items, toggle } = useWishlist();
  const { addItem } = useCart();
  const { success } = useToast();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-20">
        <EmptyState type="wishlist" title="Your wishlist is empty"
          description="Save your favourite pieces here to revisit them later."
          action={<Button onClick={() => navigate("/shop")} icon={<Heart size={16} />}>Explore Products</Button>} />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display font-bold text-3xl text-neutral-900 dark:text-white">
          Wishlist <span className="text-neutral-400 font-normal text-xl">({items.length})</span>
        </h1>
        <Button variant="accent" onClick={() => { items.forEach(p => addItem(p, p.colors[0], p.sizes[0])); success("All items added", "All wishlisted items added to your bag."); }}
          icon={<ShoppingBag size={16} />} size="sm">
          Add All to Bag
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        <AnimatePresence>
          {items.map((product, i) => (
            <motion.div key={product.id} layout
              initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }} transition={{ delay: i * 0.05 }}
              className="bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-3xl overflow-hidden shadow-card group">
              <Link to={`/product/${product.id}`} className="block relative aspect-[3/4] overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                <img src={product.images[0]} alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                  {product.isNew && <Badge variant="new">NEW</Badge>}
                  {product.discount > 0 && <Badge variant="sale">−{product.discount}%</Badge>}
                </div>
                <button onClick={(e) => { e.preventDefault(); toggle(product.id); success("Removed from wishlist", product.name); }}
                  className="absolute top-3 right-3 w-9 h-9 rounded-2xl bg-white/90 dark:bg-neutral-800/90 text-red-500 flex items-center justify-center shadow-soft hover:scale-110 transition-transform">
                  <Heart size={16} fill="currentColor" />
                </button>
              </Link>

              <div className="p-4 space-y-3">
                <div>
                  <p className="text-xs text-neutral-500 mb-0.5">{product.brand}</p>
                  <Link to={`/product/${product.id}`} className="font-semibold text-sm text-neutral-900 dark:text-white hover:text-accent transition-colors line-clamp-2">{product.name}</Link>
                  <StarRating rating={product.rating} count={product.reviewCount} size={11} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-bold text-neutral-900 dark:text-white">{formatPrice(product.price)}</span>
                    {product.discount > 0 && <span className="text-xs text-neutral-400 line-through ml-2">{formatPrice(product.originalPrice)}</span>}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => { addItem(product, product.colors[0], product.sizes[0]); success("Added to bag", product.name); }}
                    className="flex-1 h-9 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-2xl text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-neutral-700 dark:hover:bg-neutral-100 transition-colors">
                    <ShoppingBag size={13} /> Add to Bag
                  </button>
                  <button onClick={() => { toggle(product.id); success("Removed", product.name); }}
                    className="w-9 h-9 rounded-2xl border border-neutral-200 dark:border-neutral-700 flex items-center justify-center text-neutral-400 hover:text-red-500 hover:border-red-200 transition-colors">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
