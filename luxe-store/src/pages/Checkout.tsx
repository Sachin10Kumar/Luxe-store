import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Check, CreditCard, ShoppingBag, Truck, User, ChevronRight, Package, Sparkles } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { formatPrice } from "@/utils/helpers";
import { Button } from "@/components/common/Button";
import { Input } from "@/components/common/Input";
import { SHIPPING_OPTIONS } from "@/constants";

type Step = "shipping" | "payment" | "review" | "confirmed";

const addressSchema = z.object({
  fullName: z.string().min(2, "Full name required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(6, "Phone number required"),
  line1: z.string().min(3, "Address required"),
  line2: z.string().optional(),
  city: z.string().min(2, "City required"),
  state: z.string().min(2, "County required"),
  zip: z.string().min(3, "Postcode required"),
  country: z.string().min(2, "Country required"),
});

type AddressForm = z.infer<typeof addressSchema>;

const STEPS: { id: Step; label: string; icon: typeof Truck }[] = [
  { id: "shipping", label: "Shipping", icon: Truck },
  { id: "payment", label: "Payment", icon: CreditCard },
  { id: "review", label: "Review", icon: Package },
  { id: "confirmed", label: "Done", icon: Check },
];

export default function Checkout() {
  const [step, setStep] = useState<Step>("shipping");
  const [shippingOption, setShippingOption] = useState("standard");
  const [paymentMethod, setPaymentMethod] = useState<"card" | "paypal">("card");
  const [placing, setPlacing] = useState(false);
  const [orderId] = useState(() => `LUXE-${Date.now().toString(36).toUpperCase()}`);

  const { items, subtotal, discountAmount, total, clearCart } = useCart();
  const { success } = useToast();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors }, getValues } = useForm<AddressForm>({
    resolver: zodResolver(addressSchema),
    defaultValues: { country: "United Kingdom" },
  });

  const selectedShipping = SHIPPING_OPTIONS.find(o => o.id === shippingOption)!;
  const orderTotal = total + selectedShipping.price;
  const currentStepIdx = STEPS.findIndex(s => s.id === step);

  const onShippingSubmit = () => setStep("payment");

  const handlePlaceOrder = async () => {
    setPlacing(true);
    await new Promise(r => setTimeout(r, 1800));
    clearCart();
    setStep("confirmed");
    setPlacing(false);
    success("Order placed! 🎉", `Your order ${orderId} is confirmed.`);
  };

  if (items.length === 0 && step !== "confirmed") {
    navigate("/cart");
    return null;
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 py-10 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <h1 className="font-display font-bold text-2xl text-neutral-900 dark:text-white">Checkout</h1>
          {step !== "confirmed" && (
            <button onClick={() => navigate("/cart")} className="text-sm text-neutral-500 hover:text-accent transition-colors">← Back to bag</button>
          )}
        </div>

        {/* Step Progress */}
        <div className="flex items-center gap-2 mb-10">
          {STEPS.map((s, i) => {
            const isCompleted = i < currentStepIdx;
            const isCurrent = s.id === step;
            const Icon = s.icon;
            return (
              <div key={s.id} className="flex items-center gap-2 flex-1">
                <div className={`flex items-center gap-2 ${i === STEPS.length - 1 ? "" : "flex-1"}`}>
                  <div className={`w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 transition-all ${isCompleted ? "bg-emerald-500 text-white" : isCurrent ? "bg-accent text-white" : "bg-neutral-200 dark:bg-neutral-800 text-neutral-400"}`}>
                    {isCompleted ? <Check size={16} /> : <Icon size={16} />}
                  </div>
                  <span className={`text-xs font-medium hidden sm:block ${isCurrent ? "text-neutral-900 dark:text-white" : "text-neutral-400"}`}>{s.label}</span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className={`flex-1 h-px mx-2 ${i < currentStepIdx ? "bg-emerald-400" : "bg-neutral-200 dark:bg-neutral-800"}`} />
                )}
              </div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-[1fr,360px] gap-8">
          {/* Main Step Content */}
          <AnimatePresence mode="wait">
            <motion.div key={step}
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-100 dark:border-neutral-800 p-6 sm:p-8">

              {/* SHIPPING */}
              {step === "shipping" && (
                <form onSubmit={handleSubmit(onShippingSubmit)} className="space-y-5">
                  <h2 className="font-bold text-xl text-neutral-900 dark:text-white mb-6">Shipping Details</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Input label="Full Name" error={errors.fullName?.message} {...register("fullName")} required fullWidth />
                    <Input label="Email" type="email" error={errors.email?.message} {...register("email")} required fullWidth />
                    <Input label="Phone" type="tel" error={errors.phone?.message} {...register("phone")} required fullWidth />
                    <Input label="Country" error={errors.country?.message} {...register("country")} required fullWidth />
                    <div className="sm:col-span-2">
                      <Input label="Address Line 1" error={errors.line1?.message} {...register("line1")} required fullWidth placeholder="Street address" />
                    </div>
                    <div className="sm:col-span-2">
                      <Input label="Address Line 2" error={errors.line2?.message} {...register("line2")} fullWidth placeholder="Flat, suite, etc. (optional)" />
                    </div>
                    <Input label="City" error={errors.city?.message} {...register("city")} required fullWidth />
                    <Input label="County / State" error={errors.state?.message} {...register("state")} required fullWidth />
                    <Input label="Postcode" error={errors.zip?.message} {...register("zip")} required fullWidth />
                  </div>

                  {/* Shipping Options */}
                  <div className="pt-2">
                    <p className="text-sm font-semibold mb-3">Delivery Method</p>
                    <div className="space-y-2">
                      {SHIPPING_OPTIONS.map(opt => (
                        <label key={opt.id} className={`flex items-center gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${shippingOption === opt.id ? "border-accent bg-accent/5" : "border-neutral-200 dark:border-neutral-700 hover:border-neutral-400"}`}>
                          <input type="radio" name="shipping" value={opt.id} checked={shippingOption === opt.id}
                            onChange={() => setShippingOption(opt.id)} className="accent-accent" />
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-neutral-900 dark:text-white">{opt.label}</p>
                            <p className="text-xs text-neutral-500">{opt.days}</p>
                          </div>
                          <span className={`text-sm font-bold ${opt.price === 0 ? "text-emerald-600" : "text-neutral-900 dark:text-white"}`}>
                            {opt.price === 0 ? "FREE" : formatPrice(opt.price)}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <Button type="submit" fullWidth size="lg" icon={<ChevronRight size={18} />} iconPosition="right">Continue to Payment</Button>
                </form>
              )}

              {/* PAYMENT */}
              {step === "payment" && (
                <div className="space-y-6">
                  <h2 className="font-bold text-xl text-neutral-900 dark:text-white">Payment</h2>
                  <div className="flex gap-3">
                    {(["card", "paypal"] as const).map(m => (
                      <button key={m} onClick={() => setPaymentMethod(m)}
                        className={`flex-1 h-12 rounded-2xl border text-sm font-semibold capitalize transition-all ${paymentMethod === m ? "border-accent bg-accent text-white" : "border-neutral-200 dark:border-neutral-700 hover:border-neutral-400"}`}>
                        {m === "card" ? "Credit / Debit Card" : "PayPal"}
                      </button>
                    ))}
                  </div>

                  {paymentMethod === "card" ? (
                    <div className="space-y-4">
                      <Input label="Name on Card" placeholder="Alex Morgan" fullWidth />
                      <Input label="Card Number" placeholder="4242 4242 4242 4242" fullWidth
                        leftIcon={<CreditCard size={16} />} />
                      <div className="grid grid-cols-2 gap-4">
                        <Input label="Expiry Date" placeholder="MM / YY" fullWidth />
                        <Input label="CVV" placeholder="123" fullWidth type="password" maxLength={4} />
                      </div>
                      <div className="flex items-center gap-2 p-4 bg-neutral-50 dark:bg-neutral-800 rounded-2xl text-sm text-neutral-600 dark:text-neutral-400">
                        <Check size={16} className="text-emerald-500 shrink-0" />
                        This is a demo checkout. No real payment will be taken.
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-10 gap-4">
                      <div className="w-16 h-16 rounded-3xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                        <span className="font-bold text-blue-600 text-xl">PP</span>
                      </div>
                      <p className="text-sm text-neutral-500 text-center max-w-xs">In a real implementation, you'd be redirected to PayPal to complete your purchase securely.</p>
                    </div>
                  )}

                  <div className="flex gap-3">
                    <Button variant="outline" onClick={() => setStep("shipping")} className="flex-1">Back</Button>
                    <Button onClick={() => setStep("review")} className="flex-1" icon={<ChevronRight size={18} />} iconPosition="right">Review Order</Button>
                  </div>
                </div>
              )}

              {/* REVIEW */}
              {step === "review" && (
                <div className="space-y-6">
                  <h2 className="font-bold text-xl text-neutral-900 dark:text-white">Review Order</h2>

                  <div className="space-y-3">
                    {items.map(item => (
                      <div key={item.cartId} className="flex gap-3 items-center">
                        <img src={item.images[0]} alt={item.name} className="w-14 h-14 rounded-xl object-cover bg-neutral-100 dark:bg-neutral-800" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-neutral-900 dark:text-white truncate">{item.name}</p>
                          <p className="text-xs text-neutral-500">{item.selectedColor.name} · Size {item.selectedSize} · Qty {item.quantity}</p>
                        </div>
                        <p className="font-bold text-sm shrink-0">{formatPrice(item.price * item.quantity)}</p>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-neutral-100 dark:border-neutral-800 pt-4 space-y-2 text-sm">
                    <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
                      <span>Subtotal</span><span>{formatPrice(subtotal)}</span>
                    </div>
                    {discountAmount > 0 && (
                      <div className="flex justify-between text-emerald-600">
                        <span>Discount</span><span>−{formatPrice(discountAmount)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
                      <span>{selectedShipping.label}</span>
                      <span>{selectedShipping.price === 0 ? "FREE" : formatPrice(selectedShipping.price)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-base pt-2 border-t border-neutral-100 dark:border-neutral-800">
                      <span>Total</span><span>{formatPrice(orderTotal)}</span>
                    </div>
                  </div>

                  <div className="bg-neutral-50 dark:bg-neutral-800 rounded-2xl p-4 text-sm">
                    <p className="font-semibold mb-1 text-neutral-900 dark:text-white">Shipping to:</p>
                    <p className="text-neutral-600 dark:text-neutral-400">
                      {getValues("fullName")} · {getValues("line1")}, {getValues("city")}, {getValues("zip")}
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <Button variant="outline" onClick={() => setStep("payment")} className="flex-1">Back</Button>
                    <Button onClick={handlePlaceOrder} loading={placing} className="flex-1" variant="accent">
                      Place Order · {formatPrice(orderTotal)}
                    </Button>
                  </div>
                </div>
              )}

              {/* CONFIRMED */}
              {step === "confirmed" && (
                <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                  className="text-center py-10 space-y-6">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring", stiffness: 400 }}
                    className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mx-auto">
                    <Check size={36} className="text-emerald-500" />
                  </motion.div>
                  <div>
                    <h2 className="font-display font-bold text-2xl text-neutral-900 dark:text-white mb-2">Order Confirmed!</h2>
                    <p className="text-neutral-500">Thank you for your order. We'll send you a confirmation email shortly.</p>
                  </div>
                  <div className="bg-neutral-50 dark:bg-neutral-800 rounded-2xl p-5 inline-block text-left mx-auto">
                    <p className="text-xs text-neutral-500 mb-1">Order reference</p>
                    <p className="font-mono font-bold text-accent text-lg">{orderId}</p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button onClick={() => navigate("/")} variant="outline" icon={<ShoppingBag size={16} />}>Continue Shopping</Button>
                    <Button onClick={() => navigate("/dashboard")} icon={<Sparkles size={16} />}>View My Orders</Button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Order Summary Sidebar */}
          {step !== "confirmed" && (
            <div className="bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-100 dark:border-neutral-800 p-6 h-fit sticky top-24">
              <h3 className="font-bold text-base text-neutral-900 dark:text-white mb-4">Order Summary</h3>
              <div className="space-y-3 mb-4">
                {items.map(item => (
                  <div key={item.cartId} className="flex items-center gap-3">
                    <div className="relative">
                      <img src={item.images[0]} alt={item.name} className="w-12 h-12 rounded-xl object-cover bg-neutral-100" />
                      <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-full text-[10px] font-bold flex items-center justify-center">{item.quantity}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-neutral-900 dark:text-white truncate">{item.name}</p>
                      <p className="text-[10px] text-neutral-500">{item.selectedSize}</p>
                    </div>
                    <p className="text-xs font-bold shrink-0">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                ))}
              </div>
              <div className="border-t border-neutral-100 dark:border-neutral-800 pt-3 space-y-1.5 text-xs">
                <div className="flex justify-between text-neutral-500"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
                {discountAmount > 0 && <div className="flex justify-between text-emerald-600"><span>Discount</span><span>−{formatPrice(discountAmount)}</span></div>}
                <div className="flex justify-between text-neutral-500"><span>Shipping</span><span>{selectedShipping.price === 0 ? "FREE" : formatPrice(selectedShipping.price)}</span></div>
                <div className="flex justify-between font-bold text-sm pt-2 border-t border-neutral-100 dark:border-neutral-800 text-neutral-900 dark:text-white">
                  <span>Total</span><span>{formatPrice(orderTotal)}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
