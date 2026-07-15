import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";

const HERO_SLIDES = [
  {
    headline: ["The New", "Season", "Collection"],
    sub: "Elevated essentials for the considered wardrobe.",
    cta: "Shop Women",
    ctaLink: "/shop?gender=women",
    accent: "New In",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&q=85",
    tint: "from-neutral-950/60 via-neutral-950/30 to-transparent",
  },
  {
    headline: ["Refined", "Menswear", "Essentials"],
    sub: "Precision tailoring for the modern man.",
    cta: "Shop Men",
    ctaLink: "/shop?gender=men",
    accent: "Trending",
    image: "https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=1200&q=85",
    tint: "from-neutral-950/70 via-neutral-950/30 to-transparent",
  },
  {
    headline: ["Curated", "Accessories", "Collection"],
    sub: "The perfect finishing touch, every time.",
    cta: "Explore Now",
    ctaLink: "/shop?category=Accessories",
    accent: "Limited",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=1200&q=85",
    tint: "from-neutral-950/60 via-neutral-950/20 to-transparent",
  },
];

const FLOAT_IMAGES = [
  { src: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=300&q=80", className: "top-32 right-[12%] w-36 h-44 rotate-3", delay: 0 },
  { src: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=300&q=80", className: "top-48 right-[28%] w-28 h-36 -rotate-2", delay: 0.15 },
  { src: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&q=80", className: "bottom-40 right-[18%] w-24 h-32 rotate-1", delay: 0.3 },
];

export function Hero() {
  const [idx, setIdx] = useState(0);
  const slide = HERO_SLIDES[idx];

  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % HERO_SLIDES.length), 5500);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative h-screen min-h-[600px] overflow-hidden">
      {/* Background */}
      {HERO_SLIDES.map((s, i) => (
        <motion.div key={i} initial={false} animate={{ opacity: i === idx ? 1 : 0 }}
          transition={{ duration: 0.8 }} className="absolute inset-0">
          <img src={s.image} alt="" className="w-full h-full object-cover" />
          <div className={`absolute inset-0 bg-gradient-to-r ${s.tint}`} />
        </motion.div>
      ))}

      {/* Floating Product Images */}
      <div className="absolute inset-0 hidden lg:block pointer-events-none">
        {FLOAT_IMAGES.map((img, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotate: img.className.includes("rotate-3") ? 3 : img.className.includes("-rotate-2") ? -2 : 1 }}
            transition={{ delay: img.delay + 0.6, duration: 0.7, type: "spring" }}
            className={`absolute ${img.className} rounded-2xl overflow-hidden shadow-soft-lg`}
            style={{ animation: `float ${3 + i * 0.5}s ease-in-out ${i * 0.4}s infinite` }}>
            <img src={img.src} alt="" className="w-full h-full object-cover" />
          </motion.div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <motion.div key={idx} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }} className="max-w-xl">
            {/* Tag */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
              <Star size={12} className="fill-amber-400 text-amber-400" />
              <span className="text-xs font-semibold text-white tracking-widest uppercase">{slide.accent}</span>
            </motion.div>

            {/* Headline */}
            <div className="space-y-0 mb-6">
              {slide.headline.map((line, i) => (
                <motion.h1 key={`${idx}-${i}`}
                  initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.1, duration: 0.5 }}
                  className={`font-display font-bold leading-none text-white ${i === 1 ? "text-6xl sm:text-7xl lg:text-8xl gradient-text" : "text-5xl sm:text-6xl lg:text-7xl"}`}>
                  {line}
                </motion.h1>
              ))}
            </div>

            {/* Sub */}
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
              className="text-white/80 text-lg max-w-sm mb-8 leading-relaxed">
              {slide.sub}
            </motion.p>

            {/* CTAs */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}
              className="flex items-center gap-3">
              <Link to={slide.ctaLink}
                className="group inline-flex items-center gap-2 h-12 px-7 bg-white text-neutral-900 rounded-2xl font-semibold text-sm hover:bg-neutral-100 transition-all shadow-soft-lg">
                {slide.cta}
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/shop"
                className="inline-flex items-center gap-2 h-12 px-7 border border-white/40 text-white rounded-2xl text-sm font-medium hover:bg-white/10 transition-all backdrop-blur-sm">
                All Collections
              </Link>
            </motion.div>

            {/* Trust badges */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
              className="flex items-center gap-6 mt-10">
              {[
                { v: "40k+", l: "Happy Customers" },
                { v: "4.9★", l: "Average Rating" },
                { v: "Free", l: "Returns Always" },
              ].map(({ v, l }) => (
                <div key={l} className="text-white/80">
                  <p className="font-bold text-white text-sm">{v}</p>
                  <p className="text-xs opacity-70">{l}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {HERO_SLIDES.map((_, i) => (
          <button key={i} onClick={() => setIdx(i)}
            className={`rounded-full transition-all duration-300 ${i === idx ? "w-8 h-2 bg-white" : "w-2 h-2 bg-white/40 hover:bg-white/60"}`} />
        ))}
      </div>

      {/* Scroll hint */}
      <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}
        className="absolute bottom-8 right-8 text-white/50 text-xs font-medium tracking-widest uppercase rotate-90 hidden lg:block">
        Scroll
      </motion.div>
    </section>
  );
}
