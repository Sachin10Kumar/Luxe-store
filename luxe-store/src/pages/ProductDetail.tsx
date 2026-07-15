import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingBag, Share2, ChevronLeft, ChevronRight, Truck, RefreshCw, ShieldCheck, Plus, Minus, Star } from "lucide-react";
import { getProductById, getRelatedProducts } from "@/data/products";
import { reviews } from "@/data/reviews";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useToast } from "@/context/ToastContext";
import { formatPrice, formatDate } from "@/utils/helpers";
import { Badge, StarRating } from "@/components/common/index";
import { Button } from "@/components/common/Button";
import { ProductCard } from "@/components/product/ProductCard";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = getProductById(id ?? "");

  const [imgIdx, setImgIdx] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [qty, setQty] = useState(1);
  const [adding, setAdding] = useState(false);
  const [activeTab, setActiveTab] = useState<"description" | "features" | "reviews">("description");

  const { addItem } = useCart();
  const { toggle, isWishlisted } = useWishlist();
  const { success, error } = useToast();

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-neutral-500 mb-4">Product not found</p>
          <Button onClick={() => navigate("/shop")}>Back to Shop</Button>
        </div>
      </div>
    );
  }

  const related = getRelatedProducts(product);
  const productReviews = reviews.filter(r => r.productId === product.id);
  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = async () => {
    if (!selectedSize) { error("Select a size", "Please choose your size before adding to bag."); return; }
    setAdding(true);
    await new Promise(r => setTimeout(r, 500));
    addItem(product, product.colors[selectedColor], selectedSize, qty);
    success("Added to bag", `${product.name} · ${product.colors[selectedColor].name} · ${selectedSize}`);
    setAdding(false);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    success("Link copied!", "Share this product with a friend.");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-neutral-500 mb-8">
        <Link to="/" className="hover:text-neutral-900 dark:hover:text-white transition-colors">Home</Link>
        <span>/</span>
        <Link to="/shop" className="hover:text-neutral-900 dark:hover:text-white transition-colors">Shop</Link>
        <span>/</span>
        <Link to={`/shop?category=${product.category}`} className="hover:text-neutral-900 dark:hover:text-white transition-colors">{product.category}</Link>
        <span>/</span>
        <span className="text-neutral-900 dark:text-white truncate max-w-[160px]">{product.name}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
        {/* Image Gallery */}
        <div className="space-y-3">
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-neutral-100 dark:bg-neutral-800">
            <AnimatePresence mode="wait">
              <motion.img key={imgIdx} src={product.images[imgIdx]} alt={product.name}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full object-cover" />
            </AnimatePresence>

            {product.images.length > 1 && (
              <>
                <button onClick={() => setImgIdx(i => Math.max(0, i - 1))} disabled={imgIdx === 0}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-2xl bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm flex items-center justify-center shadow-soft disabled:opacity-30 hover:scale-105 transition-transform">
                  <ChevronLeft size={18} />
                </button>
                <button onClick={() => setImgIdx(i => Math.min(product.images.length - 1, i + 1))} disabled={imgIdx === product.images.length - 1}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-2xl bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm flex items-center justify-center shadow-soft disabled:opacity-30 hover:scale-105 transition-transform">
                  <ChevronRight size={18} />
                </button>
              </>
            )}

            <div className="absolute top-3 left-3 flex flex-col gap-1.5">
              {product.isNew && <Badge variant="new">NEW</Badge>}
              {product.discount > 0 && <Badge variant="sale">−{product.discount}%</Badge>}
            </div>
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-2">
              {product.images.map((img, i) => (
                <button key={i} onClick={() => setImgIdx(i)}
                  className={`w-20 aspect-square rounded-2xl overflow-hidden border-2 transition-all ${i === imgIdx ? "border-accent" : "border-transparent"}`}>
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <p className="text-xs text-accent font-semibold tracking-[0.2em] uppercase mb-1">{product.brand}</p>
            <h1 className="font-display font-bold text-2xl sm:text-3xl text-neutral-900 dark:text-white leading-tight mb-3">{product.name}</h1>
            <div className="flex items-center gap-3 flex-wrap">
              <StarRating rating={product.rating} count={product.reviewCount} size={14} />
              <span className="text-neutral-300 dark:text-neutral-700">·</span>
              <span className="text-sm text-neutral-500">{product.category}</span>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3">
            <span className="font-bold text-3xl text-neutral-900 dark:text-white">{formatPrice(product.price)}</span>
            {product.discount > 0 && (
              <>
                <span className="text-neutral-400 line-through text-lg">{formatPrice(product.originalPrice)}</span>
                <Badge variant="sale" className="text-sm px-3 py-1">Save {product.discount}%</Badge>
              </>
            )}
          </div>

          {/* Colors */}
          <div>
            <p className="text-sm font-semibold mb-3">
              Colour: <span className="font-normal text-neutral-600 dark:text-neutral-400">{product.colors[selectedColor].name}</span>
            </p>
            <div className="flex flex-wrap gap-2">
              {product.colors.map((c, i) => (
                <button key={c.name} title={c.name} onClick={() => setSelectedColor(i)}
                  className={`w-10 h-10 rounded-2xl border-2 transition-all ${i === selectedColor ? "border-accent scale-110 shadow-md" : "border-neutral-200 dark:border-neutral-700 hover:scale-105"}`}
                  style={{ backgroundColor: c.hex }} />
              ))}
            </div>
          </div>

          {/* Sizes */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-semibold">Size</p>
              <button className="text-xs text-accent hover:underline">Size guide</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map(s => (
                <button key={s} onClick={() => setSelectedSize(s)}
                  className={`h-10 px-4 rounded-2xl border text-sm font-medium transition-all ${s === selectedSize ? "border-accent bg-accent text-white" : "border-neutral-200 dark:border-neutral-700 hover:border-accent text-neutral-700 dark:text-neutral-300"}`}>
                  {s}
                </button>
              ))}
            </div>
            {!selectedSize && <p className="text-xs text-neutral-400 mt-2">Please select a size</p>}
          </div>

          {/* Qty + Add to Cart */}
          <div className="flex gap-3">
            <div className="flex items-center border border-neutral-200 dark:border-neutral-700 rounded-2xl overflow-hidden">
              <button onClick={() => setQty(q => Math.max(1, q - 1))}
                className="w-11 h-11 flex items-center justify-center hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
                <Minus size={14} />
              </button>
              <span className="w-10 text-center text-sm font-semibold">{qty}</span>
              <button onClick={() => setQty(q => Math.min(10, q + 1))}
                className="w-11 h-11 flex items-center justify-center hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
                <Plus size={14} />
              </button>
            </div>
            <Button onClick={handleAddToCart} loading={adding} size="lg" icon={<ShoppingBag size={18} />} className="flex-1">
              Add to Bag
            </Button>
            <button onClick={() => { toggle(product.id); success(wishlisted ? "Removed from wishlist" : "Saved to wishlist", product.name); }}
              className={`w-12 h-12 rounded-2xl border flex items-center justify-center transition-all hover:scale-105 ${wishlisted ? "border-red-300 bg-red-50 dark:bg-red-900/20 text-red-500" : "border-neutral-200 dark:border-neutral-700"}`}>
              <Heart size={18} fill={wishlisted ? "currentColor" : "none"} />
            </button>
            <button onClick={handleShare}
              className="w-12 h-12 rounded-2xl border border-neutral-200 dark:border-neutral-700 flex items-center justify-center hover:scale-105 transition-transform">
              <Share2 size={16} />
            </button>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-col gap-2 p-4 bg-neutral-50 dark:bg-neutral-900 rounded-2xl">
            {[
              { icon: Truck, text: "Free delivery on orders over £150" },
              { icon: RefreshCw, text: "Free returns within 30 days" },
              { icon: ShieldCheck, text: "Secure checkout guaranteed" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3 text-sm text-neutral-600 dark:text-neutral-400">
                <Icon size={15} className="text-accent shrink-0" /> {text}
              </div>
            ))}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {product.tags.map(tag => (
              <Link key={tag} to={`/shop?q=${tag}`}
                className="text-xs px-3 py-1.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-accent hover:text-white transition-colors">
                #{tag}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs: Description / Features / Reviews */}
      <div className="mt-16">
        <div className="flex gap-1 border-b border-neutral-100 dark:border-neutral-800 mb-8">
          {(["description", "features", "reviews"] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 text-sm font-semibold capitalize transition-all ${activeTab === tab ? "border-b-2 border-accent text-accent" : "text-neutral-500 hover:text-neutral-900 dark:hover:text-white"}`}>
              {tab} {tab === "reviews" && `(${productReviews.length})`}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={activeTab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
            {activeTab === "description" && (
              <div className="max-w-2xl">
                <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed text-base">{product.description}</p>
              </div>
            )}
            {activeTab === "features" && (
              <ul className="space-y-3 max-w-md">
                {product.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                    <span className="text-neutral-700 dark:text-neutral-300">{f}</span>
                  </li>
                ))}
              </ul>
            )}
            {activeTab === "reviews" && (
              <div className="space-y-6">
                {productReviews.length === 0 ? (
                  <p className="text-neutral-500 text-sm">No reviews yet — be the first to review this product.</p>
                ) : (
                  productReviews.map(r => (
                    <div key={r.id} className="border border-neutral-100 dark:border-neutral-800 rounded-2xl p-5">
                      <div className="flex items-center gap-3 mb-3">
                        <img src={r.avatar} alt={r.author} className="w-9 h-9 rounded-full" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className="font-semibold text-sm text-neutral-900 dark:text-white">{r.author}</p>
                            {r.verified && <span className="text-xs text-emerald-600 font-medium">Verified purchase</span>}
                          </div>
                          <p className="text-xs text-neutral-400">{formatDate(r.createdAt)}</p>
                        </div>
                        <StarRating rating={r.rating} showCount={false} size={13} />
                      </div>
                      <p className="font-semibold text-sm text-neutral-900 dark:text-white mb-1">{r.title}</p>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">{r.body}</p>
                    </div>
                  ))
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="font-display font-bold text-2xl text-neutral-900 dark:text-white mb-8">You might also like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {related.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </div>
  );
}
