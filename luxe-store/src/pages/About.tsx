import { motion } from "framer-motion";
import { Heart, Leaf, Globe, Award, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const STATS = [
  { value: "2014", label: "Founded" },
  { value: "40k+", label: "Customers" },
  { value: "120+", label: "Premium Brands" },
  { value: "4.9★", label: "Average Rating" },
];

const TEAM = [
  { name: "Elena Marchetti", role: "Founder & Creative Director", img: "https://i.pravatar.cc/200?img=20" },
  { name: "James Okafor", role: "Head of Buying", img: "https://i.pravatar.cc/200?img=21" },
  { name: "Sophie Chen", role: "Design Lead", img: "https://i.pravatar.cc/200?img=22" },
  { name: "Marcus Webb", role: "Head of Customer Experience", img: "https://i.pravatar.cc/200?img=23" },
];

const TIMELINE = [
  { year: "2014", title: "The Beginning", body: "LUXE launched as a small boutique in London's Marylebone with just 40 curated pieces." },
  { year: "2016", title: "Going Digital", body: "We launched our online store, bringing our curation to customers across the UK." },
  { year: "2019", title: "European Expansion", body: "LUXE began shipping across Europe, partnering with artisans from Italy, France, and Denmark." },
  { year: "2022", title: "B Corp Certified", body: "We became B Corp certified, cementing our commitment to people and planet." },
  { year: "2024", title: "40,000 Customers", body: "A decade in, we're proud to serve a global community of thoughtful dressers." },
];

export default function About() {
  return (
    <div className="bg-white dark:bg-neutral-950">
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <img src="https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=1400&q=85" alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/80 to-neutral-950/20" />
        <div className="absolute inset-0 flex items-center px-6 sm:px-16">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="max-w-xl">
            <p className="text-accent text-xs font-semibold tracking-[0.2em] uppercase mb-3">Est. 2014 · London</p>
            <h1 className="font-display font-bold text-white text-5xl sm:text-6xl leading-tight mb-4">
              Dressing<br />the world <br /><span className="gradient-text">thoughtfully.</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="text-xs text-accent font-semibold tracking-[0.2em] uppercase mb-4">Our Mission</p>
          <p className="font-display font-bold text-3xl sm:text-4xl text-neutral-900 dark:text-white leading-snug mb-6">
            "We believe that buying less but better is the most radical act in modern fashion."
          </p>
          <p className="text-neutral-500 dark:text-neutral-400 text-base leading-relaxed max-w-2xl mx-auto">
            LUXE was founded on the idea that a considered wardrobe — built on quality, longevity, and intention — is better for you and for the world. We curate only pieces that earn a permanent place in your life.
          </p>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="bg-neutral-950 py-16 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map(({ value, label }, i) => (
            <motion.div key={label} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
              <p className="font-display font-bold text-4xl text-white mb-1">{value}</p>
              <p className="text-sm text-neutral-500">{label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <p className="text-xs text-accent font-semibold tracking-[0.2em] uppercase mb-4 text-center">Our Values</p>
        <h2 className="font-display font-bold text-3xl text-neutral-900 dark:text-white text-center mb-12">What we stand for</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Heart, title: "Craftsmanship", body: "Every piece we carry meets rigorous standards of construction. We prioritise skill, quality, and durability above all else." },
            { icon: Leaf, title: "Sustainability", body: "We partner only with producers who demonstrate a genuine commitment to environmental responsibility." },
            { icon: Globe, title: "Transparency", body: "We tell you where everything comes from, who made it, and why we chose it. No vague promises." },
            { icon: Award, title: "Longevity", body: "We curate pieces intended to last decades, not seasons. Timeless design, lasting quality." },
          ].map(({ icon: Icon, title, body }, i) => (
            <motion.div key={title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="bg-neutral-50 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-3xl p-6">
              <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center mb-4">
                <Icon size={22} className="text-accent" />
              </div>
              <h3 className="font-bold text-neutral-900 dark:text-white mb-2">{title}</h3>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">{body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="max-w-3xl mx-auto px-6 py-16">
        <p className="text-xs text-accent font-semibold tracking-[0.2em] uppercase mb-4 text-center">Our Story</p>
        <h2 className="font-display font-bold text-3xl text-neutral-900 dark:text-white text-center mb-12">A decade of intention</h2>
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-neutral-200 dark:bg-neutral-800" />
          <div className="space-y-10 pl-12">
            {TIMELINE.map(({ year, title, body }, i) => (
              <motion.div key={year} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="relative">
                <div className="absolute -left-12 w-8 h-8 rounded-full bg-accent flex items-center justify-center text-white text-xs font-bold">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <p className="text-accent text-xs font-bold tracking-widest mb-1">{year}</p>
                <h3 className="font-bold text-neutral-900 dark:text-white mb-1">{title}</h3>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">{body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-neutral-50 dark:bg-neutral-900 py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs text-accent font-semibold tracking-[0.2em] uppercase mb-4 text-center">The People</p>
          <h2 className="font-display font-bold text-3xl text-neutral-900 dark:text-white text-center mb-12">Meet the team</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {TEAM.map(({ name, role, img }, i) => (
              <motion.div key={name} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
                <img src={img} alt={name} className="w-24 h-24 rounded-full mx-auto mb-3 object-cover" />
                <p className="font-semibold text-sm text-neutral-900 dark:text-white">{name}</p>
                <p className="text-xs text-neutral-500 mt-0.5">{role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-2xl mx-auto px-6 py-20 text-center">
        <h2 className="font-display font-bold text-3xl text-neutral-900 dark:text-white mb-4">Ready to shop differently?</h2>
        <p className="text-neutral-500 mb-8">Join 40,000+ customers who've chosen quality over quantity.</p>
        <Link to="/shop" className="inline-flex items-center gap-2 h-12 px-8 bg-accent text-white rounded-2xl font-semibold hover:bg-accent-dark transition-colors shadow-accent">
          Explore the Collection <ArrowRight size={18} />
        </Link>
      </section>
    </div>
  );
}
