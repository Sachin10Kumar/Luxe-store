import { motion } from "framer-motion";

function LegalPage({ title, sections }: { title: string; sections: { heading: string; body: string }[] }) {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display font-bold text-4xl text-neutral-900 dark:text-white mb-2">{title}</h1>
        <p className="text-sm text-neutral-400 mb-10">Last updated: 1 November 2024</p>
        <div className="space-y-8">
          {sections.map(({ heading, body }) => (
            <div key={heading}>
              <h2 className="font-bold text-lg text-neutral-900 dark:text-white mb-3">{heading}</h2>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed text-sm">{body}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export function Privacy() {
  return (
    <LegalPage title="Privacy Policy" sections={[
      { heading: "1. Information We Collect", body: "We collect information you provide directly to us, including name, email address, postal address, and payment information when you place an order or create an account. We also collect information about your browsing behaviour on our site to improve your experience." },
      { heading: "2. How We Use Your Information", body: "We use your information to process orders, send order confirmations and shipping updates, provide customer support, send marketing communications (with your consent), improve our website and services, and comply with legal obligations." },
      { heading: "3. Sharing Your Information", body: "We do not sell your personal information. We share information with service providers who assist in our operations (payment processors, shipping companies), and with law enforcement where required by law." },
      { heading: "4. Data Retention", body: "We retain your personal information for as long as necessary to fulfil the purposes outlined in this policy, or as required by law. You may request deletion of your account and associated data at any time." },
      { heading: "5. Your Rights", body: "You have the right to access, correct, or delete your personal information; object to certain processing; request data portability; and withdraw consent at any time. Contact us at privacy@luxe.com to exercise these rights." },
      { heading: "6. Cookies", body: "We use essential cookies to make our site work, performance cookies to understand usage, and (with consent) marketing cookies to show relevant ads. You can manage your cookie preferences in our Cookie Centre." },
      { heading: "7. Contact", body: "For any privacy-related queries, please contact our Data Protection Officer at privacy@luxe.com or write to us at LUXE Ltd, 12 Marylebone Lane, London, W1U 2QX, United Kingdom." },
    ]} />
  );
}

export function Terms() {
  return (
    <LegalPage title="Terms of Service" sections={[
      { heading: "1. Acceptance of Terms", body: "By accessing and using the LUXE website and services, you accept and agree to be bound by these Terms of Service. If you do not agree, please do not use our services." },
      { heading: "2. Products and Pricing", body: "All prices are shown in British Pounds (GBP) and are inclusive of VAT where applicable. We reserve the right to change prices without notice. We make every effort to ensure pricing accuracy but reserve the right to cancel orders in the event of a pricing error." },
      { heading: "3. Orders and Availability", body: "Placing an order constitutes an offer to purchase. We reserve the right to decline any order. Once confirmed, you will receive an order confirmation email. All orders are subject to stock availability." },
      { heading: "4. Payment", body: "We accept major credit and debit cards, PayPal, and Apple Pay. All transactions are encrypted and processed securely. Your payment details are never stored on our servers." },
      { heading: "5. Delivery", body: "We aim to dispatch all orders within 1–2 business days. Delivery times and costs are as stated at checkout. We are not liable for delays caused by third-party couriers or circumstances beyond our control." },
      { heading: "6. Returns", body: "We offer a 30-day returns policy for items in their original, unused condition. Some items (underwear, pierced jewellery, customised products) are non-returnable for hygiene reasons." },
      { heading: "7. Intellectual Property", body: "All content on this website, including text, images, logos, and designs, is the property of LUXE Ltd and is protected by copyright law. Reproduction without written permission is prohibited." },
      { heading: "8. Governing Law", body: "These terms are governed by and construed in accordance with English law. Any disputes are subject to the exclusive jurisdiction of the courts of England and Wales." },
    ]} />
  );
}
