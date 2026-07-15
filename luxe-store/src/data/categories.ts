import type { Category } from "@/types";

export const categories: Category[] = [
  {
    id: "c1", name: "Women", slug: "women",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=80",
    count: 142, description: "Curated collections for the modern woman",
    subcategories: ["Dresses", "Tops", "Knitwear", "Trousers", "Skirts", "Outerwear", "Blazers", "Loungewear"],
  },
  {
    id: "c2", name: "Men", slug: "men",
    image: "https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=600&q=80",
    count: 98, description: "Refined essentials for the discerning man",
    subcategories: ["Shirts", "Trousers", "Knitwear", "Outerwear", "Jeans", "Activewear"],
  },
  {
    id: "c3", name: "Accessories", slug: "accessories",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80",
    count: 65, description: "The finishing touch to every outfit",
    subcategories: ["Bags", "Scarves", "Hats", "Jewellery", "Belts", "Sunglasses"],
  },
  {
    id: "c4", name: "Shoes", slug: "shoes",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
    count: 54, description: "From everyday comfort to occasion-ready",
    subcategories: ["Boots", "Trainers", "Loafers", "Sandals", "Heels", "Flats"],
  },
  {
    id: "c5", name: "Outerwear", slug: "outerwear",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80",
    count: 38, description: "Premium coats and jackets for every season",
    subcategories: ["Coats", "Jackets", "Puffers", "Blazers", "Raincoats"],
  },
  {
    id: "c6", name: "Activewear", slug: "activewear",
    image: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=600&q=80",
    count: 47, description: "Performance and style in equal measure",
    subcategories: ["Leggings", "Shorts", "Sports Bras", "Tops", "Jackets"],
  },
];
