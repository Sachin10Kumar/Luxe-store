import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, ArrowLeft, Search } from "lucide-react";
import { Button } from "@/components/common/Button";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md">
        <motion.div
          animate={{ rotate: [0, -5, 5, -3, 3, 0] }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-8xl mb-6">✦</motion.div>
        <h1 className="font-display font-bold text-7xl text-neutral-900 dark:text-white mb-2">404</h1>
        <h2 className="font-display font-bold text-2xl text-neutral-700 dark:text-neutral-300 mb-3">Page not found</h2>
        <p className="text-neutral-500 dark:text-neutral-400 text-base leading-relaxed mb-10">
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={() => window.history.back()} variant="outline" icon={<ArrowLeft size={16} />}>
            Go Back
          </Button>
          <Link to="/">
            <Button icon={<Home size={16} />} fullWidth>Back to Home</Button>
          </Link>
          <Link to="/shop">
            <Button variant="accent" icon={<Search size={16} />} fullWidth>Shop All</Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
