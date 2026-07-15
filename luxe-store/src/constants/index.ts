export const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];
export const SHOE_SIZES = ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45"];

export const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest First" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
  { value: "popular", label: "Most Popular" },
] as const;

export const NAV_LINKS = [
  { label: "Women", href: "/shop?gender=women", subcategories: ["Dresses", "Tops", "Knitwear", "Trousers", "Blazers", "Skirts", "Outerwear", "Loungewear"] },
  { label: "Men", href: "/shop?gender=men", subcategories: ["Shirts", "Trousers", "Knitwear", "Outerwear", "Jeans", "Activewear"] },
  { label: "Accessories", href: "/shop?category=Accessories", subcategories: ["Bags", "Hats", "Scarves", "Jewellery", "Belts"] },
  { label: "Shoes", href: "/shop?category=Shoes", subcategories: ["Boots", "Trainers", "Loafers", "Sandals"] },
  { label: "Sale", href: "/shop?sale=true", subcategories: [] },
] as const;

export const PROMO_CODE_MAP: Record<string, number> = {
  "WELCOME10": 0.10,
  "LUXE20": 0.20,
  "SAVE15": 0.15,
  "NEWUSER": 0.25,
};

export const SHIPPING_OPTIONS = [
  { id: "standard", label: "Standard Delivery", price: 0, days: "5–7 business days" },
  { id: "express", label: "Express Delivery", price: 12.95, days: "2–3 business days" },
  { id: "next-day", label: "Next Day Delivery", price: 24.95, days: "Next business day" },
];

export const INSTAGRAM_IMAGES = [
  "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&q=80",
  "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&q=80",
  "https://images.unsplash.com/photo-1544441893-675973e31985?w=400&q=80",
  "https://images.unsplash.com/photo-1502980426475-b83966705988?w=400&q=80",
  "https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=400&q=80",
  "https://images.unsplash.com/photo-1547949003-9792a18a2601?w=400&q=80",
];

export const BRAND_LOGOS = ["VOGUE", "HARPER'S", "ELLE", "GQ", "MONOCLE", "WALLPAPER"];
