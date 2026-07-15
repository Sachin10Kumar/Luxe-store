import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Plus, Minus, Tag, ArrowRight, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { formatPrice } from "@/utils/helpers";
import { Button } from "@/components/common/Button";
import { EmptyState } from "@/components/common/index";
import { Input } from "@/components/common/Input";

export default function Cart() {
  const { items, removeItem, updateQuantity, subtotal, discountAmount, total, promoCode, discount, applyPromo, clearCart } = useCart();
  const { success, error } = useToast();
  const [code, setCode] = useState("");
  const [applying, setApplying] = useState(false);
  const navigate = useNavigate();

  const handlePromo = async () => {
    setApplying(true);
    await new Promise(r => setTimeout(r, 500));
    const ok = applyPromo(code);
    setApplying(false);
    if (ok) success("Promo applied!", `${Math.round(discount * 100)}% discount has been applied.`);
    else error("Invalid code", "This promo code doesn't exist or has expired.");
  };

  const shipping = subtotal >= 150 ? 0 : 9.95;

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-20">
        <EmptyState type="cart" title="Your bag is empty"
          description="Looks like you haven't added anything to your bag yet. Discover our curated collections."
          action={<Button onClick={() => navigate("/shop")} icon={<ShoppingBag size={16} />}>Start Shopping</Button>} />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display font-bold text-3xl text-neutral-900 dark:text-white">Your Bag <span className="text-neutral-400 font-normal text-xl">({items.length})</span></h1>
        <button onClick={() => { clearCart(); success("Cart cleared", "All items removed from your bag."); }}
          className="text-sm text-neutral-500 hover:text-red-500 transition-colors">
          Clear all
        </button>
      </div>

      <div className="grid lg:grid-cols-[1fr,380px] gap-8">
        {/* Items */}
        <div className="space-y-3">
          <AnimatePresence>
            {items.map(item => (
              <motion.div key={item.cartId} layout
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -24, scale: 0.97 }} transition={{ duration: 0.25 }}
                className="flex gap-4 bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-3xl p-4 sm:p-5">
                <Link to={`/product/${item.id}`} className="shrink-0">
                  <img src={item.images[0]} alt={item.name}
                    className="w-24 h-32 sm:w-28 sm:h-36 rounded-2xl object-cover bg-neutral-100 dark:bg-neutral-800" />
                </Link>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-xs text-neutral-500 mb-0.5">{item.brand}</p>
                      <Link to={`/product/${item.id}`} className="font-semibold text-neutral-900 dark:text-white hover:text-accent transition-colors line-clamp-2 text-sm">
                        {item.name}
                      </Link>
                      <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                        <span className="text-xs text-neutral-500 flex items-center gap-1">
                          <span className="w-3 h-3 rounded-full border border-neutral-200 inline-block" style={{ backgroundColor: item.selectedColor.hex }} />
                          {item.selectedColor.name}
                        </span>
                        <span className="text-neutral-300">·</span>
                        <span className="text-xs text-neutral-500">Size {item.selectedSize}</span>
                      </div>
                    </div>
                    <button onClick={() => { removeItem(item.cartId); success("Removed", `${item.name} removed from your bag.`); }}
                      className="text-neutral-400 hover:text-red-500 transition-colors p-1 shrink-0">
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    {/* Quantity */}
                    <div className="flex items-center border border-neutral-200 dark:border-neutral-700 rounded-xl overflow-hidden">
                      <button onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
                        <Minus size={12} />
                      </button>
                      <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
                        <Plus size={12} />
                      </button>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <p className="font-bold text-neutral-900 dark:text-white">{formatPrice(item.price * item.quantity)}</p>
                      {item.quantity > 1 && <p className="text-xs text-neutral-400">{formatPrice(item.price)} each</p>}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Summary */}
        <div className="space-y-4">
          <div className="bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-3xl p-6 sticky top-24">
            <h2 className="font-bold text-lg text-neutral-900 dark:text-white mb-5">Order Summary</h2>

            {/* Promo code */}
            <div className="mb-5">
              <p className="text-sm font-medium mb-2.5">Have a promo code?</p>
              {promoCode ? (
                <div className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800">
                  <Tag size={15} className="text-emerald-600" />
                  <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">{promoCode}</span>
                  <span className="text-sm text-emerald-600 ml-auto">−{Math.round(discount * 100)}%</span>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Input value={code} onChange={e => setCode(e.target.value.toUpperCase())}
                    placeholder="WELCOME10" className="flex-1 !h-10 text-xs" />
                  <Button onClick={handlePromo} loading={applying} size="sm" variant="outline">Apply</Button>
                </div>
              )}
              <p className="text-xs text-neutral-400 mt-1.5">Try: WELCOME10 · LUXE20 · SAVE15</p>
            </div>

            {/* Price breakdown */}
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-neutral-600 dark:text-neutral-400">Subtotal</span>
                <span className="font-medium">{formatPrice(subtotal)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600">
                  <span>Discount ({Math.round(discount * 100)}%)</span>
                  <span>−{formatPrice(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-neutral-600 dark:text-neutral-400">Shipping</span>
                <span className={shipping === 0 ? "text-emerald-600 font-medium" : "font-medium"}>
                  {shipping === 0 ? "FREE" : formatPrice(shipping)}
                </span>
              </div>
              {shipping > 0 && (
                <p className="text-xs text-neutral-400">
                  Add {formatPrice(150 - subtotal)} more for free delivery
                </p>
              )}
              <div className="flex justify-between font-bold text-lg pt-3 border-t border-neutral-100 dark:border-neutral-800">
                <span>Total</span>
                <span>{formatPrice(total + shipping)}</span>
              </div>
            </div>

            <Button onClick={() => navigate("/checkout")} fullWidth size="lg"
              icon={<ArrowRight size={18} />} iconPosition="right" className="mt-6">
              Proceed to Checkout
            </Button>

            <p className="text-xs text-center text-neutral-400 mt-3">
              Secure checkout · Free returns · All major cards accepted
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
