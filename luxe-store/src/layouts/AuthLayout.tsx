import { Link, Outlet } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export function AuthLayout() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left: Form */}
      <div className="flex flex-col min-h-screen">
        <div className="p-6 flex items-center justify-between">
          <Link to="/" className="font-display font-bold text-lg tracking-[0.15em]">LUXE</Link>
          <Link to="/" className="flex items-center gap-1.5 text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors">
            <ArrowLeft size={15} /> Back to store
          </Link>
        </div>
        <div className="flex-1 flex items-center justify-center px-6 py-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm">
            <Outlet />
          </motion.div>
        </div>
      </div>

      {/* Right: Visual */}
      <div className="hidden lg:block relative overflow-hidden">
        <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&q=85"
          alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-950/50 to-transparent" />
        <div className="absolute bottom-12 left-12 text-white">
          <p className="font-display font-bold text-4xl mb-2">Style is a</p>
          <p className="font-display font-bold text-4xl gradient-text">way of life.</p>
        </div>
      </div>
    </div>
  );
}
