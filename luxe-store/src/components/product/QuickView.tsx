import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Heart, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import type { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useToast } from "@/context/ToastContext";
import { formatPrice } from "@/utils/helpers";
import { Badge, StarRating } from "@/components/common/index";
import { Button } from "@/components/common/Button";

interface QuickViewProps {
  product: Product | null;
  onClose: () => void;
}

export function QuickView({ product, onClose }: QuickViewProps) {
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [imgIdx, setImgIdx] = useState(0);
  const { addItem } = useCart();
  const { toggle, isWishlisted } = useWishlist();
  const { success, error } = useToast();

  if (!product) return null;

  const handleAddToCart = () => {
    if (!selectedSize) { error("Please select a size", "Choose your size before adding to cart"); return; }
    addItem(product, product.colors[selectedColor], selectedSize);
    success("Added to bag", product.name);
    onClose();
  };

  return (
    <AnimatePresence>
      {product && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 24 }}
            className="fixed z-50 inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[800px] md:max-h-[90vh] bg-white dark:bg-neutral-900 rounded-3xl shadow-soft-lg overflow-hidden flex flex-col"
          >
            <div className="flex-1 overflow-y-auto">
              <div className="grid md:grid-cols-2">
                {/* Images */}
                <div className="relative bg-neutral-100 dark:bg-neutral-800 aspect-square">
                  <img src={product.images[imgIdx]} alt={product.name} className="w-full h-full object-cover" />
                  <div className="absolute bottom-3 left-3 flex gap-2">
                    {product.images.map((img, i) => (
                      <button key={i} onClick={() => setImgIdx(i)}
                        className={`w-12 h-12 rounded-xl overflow-hidden border-2 transition-all ${i === imgIdx ? "border-accent" : "border-white/50"}`}>
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col gap-4">
                  <div>
                    <p className="text-xs text-accent font-semibold tracking-widest uppercase mb-1">{product.brand}</p>
                    <h2 className="text-xl font-bold text-neutral-900 dark:text-white">{product.name}</h2>
                    <StarRating rating={product.rating} count={product.reviewCount} size={13} />
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-bold">{formatPrice(product.price)}</span>
                    {product.discount > 0 && (
                      <>
                        <span className="text-neutral-400 line-through">{formatPrice(product.originalPrice)}</span>
                        <Badge variant="sale">−{product.discount}%</Badge>
                      </>
                    )}
                  </div>

                  {/* Colors */}
                  <div>
                    <p className="text-sm font-semibold mb-2">Color: <span className="font-normal text-neutral-600 dark:text-neutral-400">{product.colors[selectedColor].name}</span></p>
                    <div className="flex gap-2">
                      {product.colors.map((c, i) => (
                        <button key={c.name} onClick={() => setSelectedColor(i)} title={c.name}
                          className={`w-8 h-8 rounded-full border-2 transition-all ${i === selectedColor ? "border-accent scale-110" : "border-neutral-200 dark:border-neutral-700"}`}
                          style={{ backgroundColor: c.hex }} />
                      ))}
                    </div>
                  </div>

                  {/* Sizes */}
                  <div>
                    <p className="text-sm font-semibold mb-2">Size</p>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map(s => (
                        <button key={s} onClick={() => setSelectedSize(s)}
                          className={`h-9 px-3 rounded-xl border text-sm font-medium transition-all ${s === selectedSize ? "border-accent bg-accent text-white" : "border-neutral-200 dark:border-neutral-700 hover:border-neutral-400"}`}>
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2">{product.description}</p>

                  <div className="flex flex-col gap-2 mt-auto">
                    <Button onClick={handleAddToCart} icon={<ShoppingBag size={16} />} fullWidth size="lg">
                      Add to Bag
                    </Button>
                    <div className="flex gap-2">
                      <button onClick={() => { toggle(product.id); success(isWishlisted(product.id) ? "Removed from wishlist" : "Added to wishlist", product.name); }}
                        className="flex-1 h-11 rounded-2xl border border-neutral-200 dark:border-neutral-700 flex items-center justify-center gap-2 text-sm font-medium hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors">
                        <Heart size={16} className={isWishlisted(product.id) ? "fill-red-500 text-red-500" : ""} />
                        {isWishlisted(product.id) ? "Wishlisted" : "Wishlist"}
                      </button>
                      <Link to={`/product/${product.id}`} onClick={onClose}
                        className="flex-1 h-11 rounded-2xl border border-neutral-200 dark:border-neutral-700 flex items-center justify-center gap-2 text-sm font-medium hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors">
                        <ExternalLink size={16} /> Full Details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button onClick={onClose} className="absolute top-4 right-4 w-9 h-9 rounded-2xl bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm flex items-center justify-center hover:scale-110 transition-transform shadow-soft">
              <X size={16} />
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
