import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Hero } from "@/components/home/Hero";
import { CategoryGrid, PromoBanner, Testimonials, InstagramGrid, Newsletter, ValueProps, SectionHeader } from "@/components/home/sections";
import { ProductCard } from "@/components/product/ProductCard";
import { QuickView } from "@/components/product/QuickView";
import { ProductCardSkeleton } from "@/components/common/index";
import { getFeaturedProducts, getTrendingProducts, getNewArrivals } from "@/data/products";
import type { Product } from "@/types";

function ProductRow({ title, eyebrow, products, link, linkLabel }: {
  title: string; eyebrow: string; products: Product[]; link: string; linkLabel: string;
}) {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  return (
    <section className="py-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-10">
          <SectionHeader eyebrow={eyebrow} title={title} centered={false} />
          <Link to={link} className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-accent hover:underline shrink-0">
            {linkLabel} <ArrowRight size={15} />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.map(p => (
            <ProductCard key={p.id} product={p} onQuickView={setQuickViewProduct} />
          ))}
        </div>

        <div className="sm:hidden mt-8 text-center">
          <Link to={link} className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline">
            {linkLabel} <ArrowRight size={15} />
          </Link>
        </div>
      </div>
      <QuickView product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
    </section>
  );
}

export default function Home() {
  const featured = getFeaturedProducts();
  const trending = getTrendingProducts();
  const newArrivals = getNewArrivals();

  return (
    <>
      <Hero />
      <ValueProps />
      <ProductRow title="Best Sellers" eyebrow="Fan Favourites" products={featured} link="/shop?sort=popular" linkLabel="View all" />
      <CategoryGrid />
      <ProductRow title="New Arrivals" eyebrow="Just Landed" products={newArrivals} link="/shop?sort=newest" linkLabel="See all new" />
      <PromoBanner />
      <ProductRow title="Trending Now" eyebrow="What's Hot" products={trending} link="/shop?sort=featured" linkLabel="Shop all" />
      <Testimonials />
      <InstagramGrid />
      <Newsletter />
    </>
  );
}
