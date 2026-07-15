import { useState } from "react";
import { Link } from "react-router-dom";
import { Instagram, Twitter, Youtube, Facebook, ArrowRight, Heart } from "lucide-react";
import { useToast } from "@/context/ToastContext";
import { BRAND_LOGOS } from "@/constants";
import { motion } from "framer-motion";

const LINKS = {
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Careers", href: "#" },
    { label: "Press", href: "#" },
    { label: "Contact", href: "/contact" },
  ],
  Shop: [
    { label: "Women", href: "/shop?gender=women" },
    { label: "Men", href: "/shop?gender=men" },
    { label: "Accessories", href: "/shop?category=Accessories" },
    { label: "Sale", href: "/shop?sale=true" },
  ],
  Support: [
    { label: "FAQ", href: "/faq" },
    { label: "Shipping Info", href: "/faq#shipping" },
    { label: "Returns", href: "/faq#returns" },
    { label: "Size Guide", href: "/faq#sizing" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "#" },
  ],
};

const SOCIALS = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Youtube, href: "#", label: "YouTube" },
  { icon: Facebook, href: "#", label: "Facebook" },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { success } = useToast();

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    success("You're subscribed!", "Welcome to the LUXE community. Expect the occasional email of beauty.");
    setEmail("");
    setLoading(false);
  };

  return (
    <footer className="bg-neutral-950 text-white">
      {/* Brand logos strip */}
      <div className="border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <p className="text-xs text-neutral-500 text-center mb-4 tracking-widest uppercase">As seen in</p>
          <div className="flex items-center justify-center flex-wrap gap-8">
            {BRAND_LOGOS.map(b => (
              <span key={b} className="text-neutral-600 text-sm font-bold tracking-[0.2em] hover:text-neutral-400 transition-colors cursor-default">{b}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Brand + Newsletter */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="font-display font-bold text-2xl tracking-[0.15em] mb-2">LUXE</h2>
              <p className="text-neutral-400 text-sm leading-relaxed max-w-xs">
                Premium fashion for those who believe clothing is a form of self-expression. Curated with intention, crafted with care.
              </p>
            </div>

            <div>
              <p className="text-sm font-semibold mb-3">Join the community</p>
              <form onSubmit={handleNewsletter} className="flex gap-2">
                <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="flex-1 h-11 px-4 rounded-2xl bg-neutral-900 border border-neutral-800 text-sm text-white placeholder:text-neutral-600 outline-none focus:border-accent transition-colors" />
                <button type="submit" disabled={loading}
                  className="h-11 w-11 rounded-2xl bg-accent flex items-center justify-center hover:bg-accent-dark transition-colors disabled:opacity-50 shrink-0">
                  <ArrowRight size={18} />
                </button>
              </form>
              <p className="text-xs text-neutral-600 mt-2">No spam, ever. Unsubscribe at any time.</p>
            </div>

            <div className="flex items-center gap-3">
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} aria-label={label}
                  className="w-9 h-9 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-500 hover:text-white hover:border-accent hover:bg-accent/10 transition-all">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(LINKS).map(([section, links]) => (
            <div key={section}>
              <h3 className="text-xs font-semibold text-neutral-400 tracking-widest uppercase mb-4">{section}</h3>
              <ul className="space-y-3">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link to={href} className="text-sm text-neutral-500 hover:text-white transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-neutral-800 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-neutral-600">
            © {new Date().getFullYear()} LUXE Ltd. All rights reserved.
          </p>
          <p className="text-xs text-neutral-600 flex items-center gap-1">
            Made with <Heart size={10} className="fill-red-500 text-red-500" /> for the love of fashion
          </p>
          <div className="flex items-center gap-2">
            {["visa", "mastercard", "amex", "paypal"].map(m => (
              <div key={m} className="h-6 px-2 rounded bg-neutral-900 border border-neutral-800 flex items-center justify-center">
                <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider">{m}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
