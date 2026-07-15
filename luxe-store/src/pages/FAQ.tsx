import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Search } from "lucide-react";
import { Link } from "react-router-dom";

const FAQ_SECTIONS = [
  {
    id: "orders", title: "Orders & Shipping",
    questions: [
      { q: "How long does standard delivery take?", a: "Standard delivery takes 5–7 business days. Express delivery (2–3 days) and next-day options are also available at checkout for an additional fee." },
      { q: "Do you offer free shipping?", a: "Yes — orders over £150 qualify for free standard delivery. There's no minimum for express or next-day delivery." },
      { q: "Can I track my order?", a: "Absolutely. Once your order ships, you'll receive a confirmation email with a tracking link. You can also view tracking information in your account dashboard." },
      { q: "Do you ship internationally?", a: "We currently ship to the UK, EU, USA, Canada, and Australia. International delivery times vary by destination (typically 7–14 business days)." },
    ],
  },
  {
    id: "returns", title: "Returns & Exchanges",
    questions: [
      { q: "What is your returns policy?", a: "We offer free returns within 30 days of delivery for all items in their original condition with tags attached. Simply use the prepaid returns label included in your parcel." },
      { q: "How do I return an item?", a: "Log into your account, go to Order History, select the item you wish to return, and follow the prompts. You'll receive a prepaid returns label by email." },
      { q: "How long do refunds take?", a: "Once we receive your return (typically 3–5 days after you post it), your refund will be processed within 5–10 business days to your original payment method." },
      { q: "Can I exchange for a different size?", a: "Yes — if your item is available in another size, we'll exchange it for free. Select 'Exchange' rather than 'Return' when initiating the process in your account." },
    ],
  },
  {
    id: "sizing", title: "Sizing & Fit",
    questions: [
      { q: "How do I find my size?", a: "Each product page includes a detailed size guide with measurements in both UK/EU and US sizing. If you're between sizes, we generally recommend sizing up for a more relaxed fit." },
      { q: "Are your sizes true to size?", a: "Most pieces are true to size. Where a style runs large or small, we note this on the product page under the size selector." },
      { q: "Do you offer petite or plus sizes?", a: "We're actively expanding our size range. Currently our sizes run XS–XXL for most pieces, with some styles available in extended sizing — check the size options on each product." },
    ],
  },
  {
    id: "products", title: "Products & Care",
    questions: [
      { q: "Are your products sustainably made?", a: "We only partner with producers who meet our environmental and social standards. All partners must disclose their manufacturing practices, materials sourcing, and labour policies." },
      { q: "How should I care for my items?", a: "Care instructions are on the label of every garment and on each product page. As a general rule, washing at lower temperatures and air-drying will extend the life of your clothes significantly." },
      { q: "Do you offer gift wrapping?", a: "Yes — you can add our signature gift wrapping at checkout for £5. This includes tissue paper, a ribbon, and a handwritten note card." },
    ],
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-neutral-100 dark:border-neutral-800 last:border-0">
      <button onClick={() => setOpen(o => !o)}
        className="flex items-center justify-between w-full py-4 text-left gap-4">
        <span className={`text-sm font-medium transition-colors ${open ? "text-accent" : "text-neutral-900 dark:text-white"}`}>{question}</span>
        <ChevronDown size={16} className={`shrink-0 text-neutral-400 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed pb-4">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [search, setSearch] = useState("");
  const [activeSection, setActiveSection] = useState("orders");

  const filtered = search
    ? FAQ_SECTIONS.map(s => ({
        ...s,
        questions: s.questions.filter(q =>
          q.q.toLowerCase().includes(search.toLowerCase()) || q.a.toLowerCase().includes(search.toLowerCase())
        ),
      })).filter(s => s.questions.length > 0)
    : FAQ_SECTIONS;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <p className="text-xs text-accent font-semibold tracking-[0.2em] uppercase mb-3">Help Centre</p>
        <h1 className="font-display font-bold text-4xl text-neutral-900 dark:text-white mb-3">Frequently Asked Questions</h1>
        <p className="text-neutral-500">Can't find your answer? <Link to="/contact" className="text-accent hover:underline">Contact us</Link></p>
      </div>

      {/* Search */}
      <div className="relative mb-10">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
        <input value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search questions…"
          className="w-full h-12 pl-12 pr-4 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all" />
      </div>

      {!search && (
        <div className="flex flex-wrap gap-2 mb-8">
          {FAQ_SECTIONS.map(s => (
            <button key={s.id} onClick={() => setActiveSection(s.id)}
              className={`px-4 py-2 rounded-2xl text-sm font-medium transition-colors ${activeSection === s.id ? "bg-accent text-white" : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700"}`}>
              {s.title}
            </button>
          ))}
        </div>
      )}

      <div className="space-y-8">
        {(search ? filtered : filtered.filter(s => s.id === activeSection)).map(section => (
          <div key={section.id} className="bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-3xl p-6">
            <h2 className="font-bold text-lg text-neutral-900 dark:text-white mb-4">{section.title}</h2>
            {section.questions.map((item, i) => (
              <FAQItem key={i} question={item.q} answer={item.a} />
            ))}
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="text-neutral-500">No results for "{search}"</p>
            <Link to="/contact" className="text-accent text-sm hover:underline mt-2 block">Ask us directly →</Link>
          </div>
        )}
      </div>

      <div className="mt-12 bg-accent/5 border border-accent/20 rounded-3xl p-8 text-center">
        <h3 className="font-bold text-xl text-neutral-900 dark:text-white mb-2">Still need help?</h3>
        <p className="text-neutral-500 text-sm mb-4">Our team is available Monday to Saturday, 9am–6pm GMT.</p>
        <Link to="/contact" className="inline-flex items-center gap-2 h-11 px-6 bg-accent text-white rounded-2xl text-sm font-semibold hover:bg-accent-dark transition-colors">
          Contact Support
        </Link>
      </div>
    </div>
  );
}
