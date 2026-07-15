import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { ArrowRight, ShieldCheck, Truck, RefreshCw, Headphones, Quote } from "lucide-react";
import { categories } from "@/data/categories";
import { testimonials } from "@/data/reviews";
import { INSTAGRAM_IMAGES } from "@/constants";
import { StarRating } from "@/components/common/index";
import { useToast } from "@/context/ToastContext";
import { useState } from "react";

// ─── Section Header ──────────────────────────────────────────────
export function SectionHeader({ eyebrow, title, sub, centered = true }: { eyebrow?: string; title: string; sub?: string; centered?: boolean }) {
  return (
    <div className={centered ? "text-center" : ""}>
      {eyebrow && <p className="text-xs text-accent font-semibold tracking-[0.2em] uppercase mb-2">{eyebrow}</p>}
      <h2 className="font-display font-bold text-3xl sm:text-4xl text-neutral-900 dark:text-white mb-3">{title}</h2>
      {sub && <p className="text-neutral-500 dark:text-neutral-400 max-w-lg mx-auto text-base leading-relaxed">{sub}</p>}
    </div>
  );
}

// ─── CategoryGrid ────────────────────────────────────────────────
export function CategoryGrid() {
  return (
    <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
      <SectionHeader eyebrow="Explore" title="Shop by Category" sub="From everyday essentials to investment pieces — everything you need, curated." />

      <div className="mt-12 grid grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat, i) => (
          <motion.div key={cat.id}
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.4 }}
            className={i === 0 ? "col-span-2 lg:col-span-1 lg:row-span-2" : ""}>
            <Link to={`/shop?category=${encodeURIComponent(cat.name)}`}
              className="group relative block overflow-hidden rounded-3xl bg-neutral-100 dark:bg-neutral-800"
              style={{ aspectRatio: i === 0 ? "3/4" : "4/3" }}>
              <img src={cat.image} alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/70 via-neutral-950/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-5">
                <p className="text-xs text-white/70 mb-1">{cat.count} items</p>
                <h3 className="font-display font-bold text-white text-xl mb-1">{cat.name}</h3>
                <span className="text-xs text-white/80 flex items-center gap-1 group-hover:gap-2 transition-all">
                  Shop now <ArrowRight size={12} />
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ─── PromoBanner ─────────────────────────────────────────────────
export function PromoBanner() {
  return (
    <section className="py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-neutral-900 dark:bg-neutral-950 border border-neutral-800">
          {/* Background gradient */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-accent/20 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-purple-500/15 blur-3xl" />
          </div>

          <div className="relative z-10 grid lg:grid-cols-2 items-center gap-8 p-8 sm:p-12">
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-accent/20 text-accent text-xs font-semibold tracking-widest uppercase mb-4">
                Limited Time
              </span>
              <h2 className="font-display font-bold text-white text-4xl sm:text-5xl leading-tight mb-4">
                Up to <span className="gradient-text">30% off</span><br />New Arrivals
              </h2>
              <p className="text-neutral-400 mb-6 text-base leading-relaxed">
                Our biggest seasonal sale is here. Discover premium pieces at exceptional prices, for a limited time only.
              </p>
              <div className="flex items-center gap-3">
                <Link to="/shop?sale=true"
                  className="inline-flex items-center gap-2 h-12 px-6 bg-accent text-white rounded-2xl font-semibold text-sm hover:bg-accent-dark transition-all shadow-accent">
                  Shop the Sale <ArrowRight size={16} />
                </Link>
                <Link to="/shop"
                  className="inline-flex items-center h-12 px-6 border border-neutral-700 text-neutral-300 rounded-2xl text-sm font-medium hover:bg-neutral-800 transition-all">
                  All Products
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&q=80",
                "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&q=80",
                "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80",
                "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&q=80",
              ].map((src, i) => (
                <motion.div key={i} whileHover={{ scale: 1.04 }} transition={{ type: "spring", stiffness: 400 }}
                  className={`rounded-2xl overflow-hidden aspect-square bg-neutral-800 ${i === 1 ? "mt-6" : i === 3 ? "-mt-6" : ""}`}>
                  <img src={src} alt="" className="w-full h-full object-cover" />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Value Props (Trust Badges) ───────────────────────────────────
export function ValueProps() {
  const items = [
    { icon: Truck, title: "Free Delivery", body: "On all orders over £150. Standard 5-7 days." },
    { icon: RefreshCw, title: "Free Returns", body: "30-day no-hassle returns on everything." },
    { icon: ShieldCheck, title: "Secure Payment", body: "256-bit SSL encryption. Your data is safe." },
    { icon: Headphones, title: "Expert Support", body: "Mon–Sat, 9am–6pm. Real humans, real help." },
  ];

  return (
    <section className="border-y border-neutral-100 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 lg:grid-cols-4 gap-8">
        {items.map(({ icon: Icon, title, body }, i) => (
          <motion.div key={title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: i * 0.08 }}
            className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-2xl bg-accent/10 flex items-center justify-center shrink-0">
              <Icon size={18} className="text-accent" />
            </div>
            <div>
              <p className="font-semibold text-neutral-900 dark:text-white text-sm">{title}</p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5 leading-relaxed">{body}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ─── Testimonials ────────────────────────────────────────────────
export function Testimonials() {
  return (
    <section className="py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeader eyebrow="Reviews" title="What our customers say"
          sub="Over 40,000 customers trust LUXE for their wardrobe. Here's what some of them have to say." />

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div key={t.id} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-3xl p-6 shadow-card">
              <Quote size={24} className="text-accent/40 mb-4" />
              <p className="text-neutral-700 dark:text-neutral-300 text-sm leading-relaxed mb-6 italic">"{t.quote}"</p>
              <div className="flex items-center gap-3 pt-4 border-t border-neutral-100 dark:border-neutral-800">
                <img src={t.avatar} alt={t.author} className="w-10 h-10 rounded-full" />
                <div>
                  <p className="font-semibold text-neutral-900 dark:text-white text-sm">{t.author}</p>
                  <p className="text-xs text-neutral-500">{t.role}</p>
                </div>
                <div className="ml-auto">
                  <StarRating rating={t.rating} showCount={false} size={12} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Instagram Grid ───────────────────────────────────────────────
export function InstagramGrid() {
  return (
    <section className="py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeader eyebrow="@luxe.store" title="Follow the Edit"
          sub="Tag us in your LUXE looks for a chance to be featured here." />
        <div className="mt-10 grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3">
          {INSTAGRAM_IMAGES.map((src, i) => (
            <motion.a key={i} href="#" initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }} transition={{ delay: i * 0.06 }} whileHover={{ scale: 1.04, zIndex: 10 }}
              className="block aspect-square rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-800 relative group">
              <img src={src} alt="" className="w-full h-full object-cover group-hover:opacity-90 transition-opacity" />
              <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/10 transition-all" />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Newsletter ───────────────────────────────────────────────────
export function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const { success } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    await new Promise(r => setTimeout(r, 600));
    success("Subscribed!", "You're now part of the LUXE community.");
    setDone(true);
    setEmail("");
  };

  return (
    <section className="py-20 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="bg-gradient-to-br from-accent/5 via-purple-500/5 to-accent/5 border border-accent/20 rounded-3xl p-10 sm:p-14">
          <p className="text-xs text-accent font-semibold tracking-[0.2em] uppercase mb-3">Newsletter</p>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-neutral-900 dark:text-white mb-3">
            Get early access
          </h2>
          <p className="text-neutral-500 dark:text-neutral-400 mb-8 max-w-md mx-auto">
            Be first to hear about new collections, exclusive events, and members-only offers. No spam, just the good stuff.
          </p>

          {done ? (
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }}
              className="flex items-center justify-center gap-2 text-emerald-600 font-semibold">
              <ShieldCheck size={20} /> You're subscribed! Welcome to LUXE.
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-2 max-w-md mx-auto">
              <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 h-12 px-5 rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all" />
              <button type="submit"
                className="h-12 px-6 bg-accent text-white rounded-2xl text-sm font-semibold hover:bg-accent-dark transition-colors shadow-accent/30 shadow-md shrink-0">
                Subscribe
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
