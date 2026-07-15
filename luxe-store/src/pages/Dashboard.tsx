import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Package, Heart, MapPin, Settings, LogOut, ChevronRight, Star, ShoppingBag, Edit2, Camera } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useWishlist } from "@/context/WishlistContext";
import { useToast } from "@/context/ToastContext";
import { formatDate, formatPrice } from "@/utils/helpers";
import { Button } from "@/components/common/Button";
import { Badge, StarRating } from "@/components/common/index";
import { products } from "@/data/products";

type Tab = "profile" | "orders" | "wishlist" | "addresses" | "settings";

const MOCK_ORDERS = [
  { id: "LUXE-3A9B2C", date: "2024-11-05", total: 624, status: "delivered" as const, items: [products[0], products[2]] },
  { id: "LUXE-7D1E4F", date: "2024-10-28", total: 245, status: "shipped" as const, items: [products[1]] },
  { id: "LUXE-2G8H5I", date: "2024-10-14", total: 375, status: "confirmed" as const, items: [products[5], products[12]] },
];

const STATUS_COLORS: Record<string, string> = {
  pending: "warning", confirmed: "info", shipped: "accent", delivered: "success", cancelled: "danger",
};


// Extracted into its own component to obey Rules of Hooks (no hooks inside .map callbacks)
function SettingToggle({ label, sub, defaultOn, onToggle }: {
  label: string; sub: string; defaultOn: boolean; onToggle: (on: boolean) => void;
}) {
  const [on, setOn] = useState(defaultOn);
  const toggle = () => { const next = !on; setOn(next); onToggle(next); };
  return (
    <div className="flex items-center justify-between p-4 border border-neutral-100 dark:border-neutral-800 rounded-2xl">
      <div>
        <p className="font-medium text-sm text-neutral-900 dark:text-white">{label}</p>
        <p className="text-xs text-neutral-500 mt-0.5">{sub}</p>
      </div>
      <button onClick={toggle}
        className={`w-11 h-6 rounded-full relative transition-colors ${on ? "bg-accent" : "bg-neutral-200 dark:bg-neutral-700"}`}>
        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all ${on ? "left-6" : "left-1"}`} />
      </button>
    </div>
  );
}

export default function Dashboard() {
  const [tab, setTab] = useState<Tab>("profile");
  const { user, logout, updateProfile } = useAuth();
  const { items: wishlistItems } = useWishlist();
  const { success } = useToast();
  const navigate = useNavigate();

  if (!user) { navigate("/login"); return null; }

  const handleLogout = () => { logout(); success("Signed out", "You've been signed out successfully."); navigate("/"); };

  const TABS = [
    { id: "profile" as Tab, label: "Profile", icon: User },
    { id: "orders" as Tab, label: "Orders", icon: Package, count: MOCK_ORDERS.length },
    { id: "wishlist" as Tab, label: "Wishlist", icon: Heart, count: wishlistItems.length },
    { id: "addresses" as Tab, label: "Addresses", icon: MapPin },
    { id: "settings" as Tab, label: "Settings", icon: Settings },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 min-h-screen">
      <h1 className="font-display font-bold text-3xl text-neutral-900 dark:text-white mb-8">My Account</h1>

      <div className="grid lg:grid-cols-[260px,1fr] gap-8">
        {/* Sidebar */}
        <div className="space-y-4">
          {/* Avatar Card */}
          <div className="bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-3xl p-5 text-center">
            <div className="relative inline-block mb-3">
              <img src={user.avatar} alt={user.name} className="w-16 h-16 rounded-full mx-auto" />
              <button className="absolute bottom-0 right-0 w-6 h-6 bg-accent rounded-full flex items-center justify-center shadow-md">
                <Camera size={11} className="text-white" />
              </button>
            </div>
            <p className="font-bold text-neutral-900 dark:text-white">{user.name}</p>
            <p className="text-xs text-neutral-500 mt-0.5">{user.email}</p>
            <p className="text-xs text-neutral-400 mt-1">Member since {formatDate(user.createdAt)}</p>
          </div>

          {/* Nav */}
          <nav className="bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-3xl overflow-hidden">
            {TABS.map(({ id, label, icon: Icon, count }) => (
              <button key={id} onClick={() => setTab(id)}
                className={`w-full flex items-center gap-3 px-5 py-3.5 text-sm font-medium transition-all ${tab === id ? "bg-accent/10 text-accent border-l-2 border-accent" : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800"}`}>
                <Icon size={16} />
                {label}
                {count !== undefined && count > 0 && (
                  <span className="ml-auto w-5 h-5 bg-neutral-200 dark:bg-neutral-700 rounded-full text-xs flex items-center justify-center">{count}</span>
                )}
              </button>
            ))}
            <button onClick={handleLogout}
              className="w-full flex items-center gap-3 px-5 py-3.5 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors">
              <LogOut size={16} /> Sign Out
            </button>
          </nav>
        </div>

        {/* Content */}
        <motion.div key={tab} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}
          className="bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-3xl p-6 sm:p-8">

          {/* Profile Tab */}
          {tab === "profile" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="font-bold text-xl text-neutral-900 dark:text-white">Personal Information</h2>
                <Button variant="outline" size="sm" icon={<Edit2 size={14} />}>Edit</Button>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { label: "Full Name", value: user.name },
                  { label: "Email", value: user.email },
                  { label: "Phone", value: user.phone ?? "Not set" },
                  { label: "Member Since", value: formatDate(user.createdAt) },
                ].map(({ label, value }) => (
                  <div key={label} className="p-4 bg-neutral-50 dark:bg-neutral-800 rounded-2xl">
                    <p className="text-xs text-neutral-500 mb-1">{label}</p>
                    <p className="font-medium text-neutral-900 dark:text-white">{value}</p>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-neutral-100 dark:border-neutral-800">
                {[
                  { label: "Total Orders", value: MOCK_ORDERS.length },
                  { label: "Wishlist Items", value: wishlistItems.length },
                  { label: "Saved Addresses", value: 1 },
                ].map(({ label, value }) => (
                  <div key={label} className="text-center p-4 bg-accent/5 rounded-2xl">
                    <p className="font-bold text-2xl text-accent">{value}</p>
                    <p className="text-xs text-neutral-500 mt-1">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Orders Tab */}
          {tab === "orders" && (
            <div className="space-y-4">
              <h2 className="font-bold text-xl text-neutral-900 dark:text-white">Order History</h2>
              {MOCK_ORDERS.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingBag size={40} className="text-neutral-300 mx-auto mb-3" />
                  <p className="text-neutral-500">No orders yet</p>
                  <Link to="/shop" className="text-accent text-sm hover:underline mt-2 block">Start Shopping</Link>
                </div>
              ) : (
                MOCK_ORDERS.map(order => (
                  <div key={order.id} className="border border-neutral-100 dark:border-neutral-800 rounded-2xl p-5">
                    <div className="flex items-start justify-between flex-wrap gap-3 mb-4">
                      <div>
                        <p className="font-mono font-bold text-sm text-neutral-900 dark:text-white">{order.id}</p>
                        <p className="text-xs text-neutral-500">{formatDate(order.date)}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant={STATUS_COLORS[order.status] as "success" | "warning" | "danger" | "accent" | "default"}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </Badge>
                        <span className="font-bold text-neutral-900 dark:text-white">{formatPrice(order.total)}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {order.items.map(item => (
                        <img key={item.id} src={item.images[0]} alt={item.name}
                          className="w-14 h-14 rounded-xl object-cover bg-neutral-100 dark:bg-neutral-800" />
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Wishlist Tab */}
          {tab === "wishlist" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-bold text-xl text-neutral-900 dark:text-white">Saved Items</h2>
                <Link to="/wishlist" className="text-sm text-accent hover:underline">View all</Link>
              </div>
              {wishlistItems.length === 0 ? (
                <div className="text-center py-12">
                  <Heart size={40} className="text-neutral-300 mx-auto mb-3" />
                  <p className="text-neutral-500 text-sm">Your wishlist is empty</p>
                  <Link to="/shop" className="text-accent text-sm hover:underline mt-2 block">Explore products</Link>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 gap-4">
                  {wishlistItems.slice(0, 4).map(p => (
                    <Link key={p.id} to={`/product/${p.id}`}
                      className="flex gap-3 p-3 border border-neutral-100 dark:border-neutral-800 rounded-2xl hover:border-accent transition-colors">
                      <img src={p.images[0]} alt={p.name} className="w-16 h-16 rounded-xl object-cover" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-neutral-900 dark:text-white truncate">{p.name}</p>
                        <StarRating rating={p.rating} showCount={false} size={11} />
                        <p className="font-bold text-sm mt-1">{formatPrice(p.price)}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Addresses Tab */}
          {tab === "addresses" && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <h2 className="font-bold text-xl text-neutral-900 dark:text-white">Saved Addresses</h2>
                <Button variant="outline" size="sm">Add Address</Button>
              </div>
              <div className="border border-accent/40 bg-accent/5 rounded-2xl p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <p className="font-semibold text-neutral-900 dark:text-white">{user.name}</p>
                      <Badge variant="accent">Default</Badge>
                    </div>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      123 Fashion Street<br />London, W1 2AB<br />United Kingdom<br />+44 7700 900123
                    </p>
                  </div>
                  <Button variant="ghost" size="sm" icon={<Edit2 size={14} />}>Edit</Button>
                </div>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {tab === "settings" && (
            <div className="space-y-6">
              <h2 className="font-bold text-xl text-neutral-900 dark:text-white">Account Settings</h2>
              <div className="space-y-3">
                 {[
                   { label: "Email Notifications", sub: "Order updates and promotional emails", defaultOn: true },
                   { label: "SMS Notifications", sub: "Delivery updates via text message", defaultOn: false },
                   { label: "Marketing Emails", sub: "New collections and exclusive offers", defaultOn: true },
                   { label: "Two-Factor Authentication", sub: "Add an extra layer of security", defaultOn: false },
                 ].map(({ label, sub, defaultOn }) => (
                   <SettingToggle key={label} label={label} sub={sub} defaultOn={defaultOn}
                     onToggle={(on) => success("Updated", `${label} ${on ? "enabled" : "disabled"}.`)} />
                 ))}
              </div>
              <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 space-y-3">
                <Button variant="outline" fullWidth>Change Password</Button>
                <Button variant="danger" fullWidth onClick={() => { if (confirm("Delete your account? This cannot be undone.")) { logout(); navigate("/"); } }}>
                  Delete Account
                </Button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
