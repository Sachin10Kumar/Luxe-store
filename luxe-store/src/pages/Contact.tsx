import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Phone, MapPin, Clock, Check, MessageSquare, Instagram, Twitter } from "lucide-react";
import { Button } from "@/components/common/Button";
import { Input } from "@/components/common/Input";
import { useToast } from "@/context/ToastContext";

const schema = z.object({
  name: z.string().min(2, "Name required"),
  email: z.string().email("Valid email required"),
  subject: z.string().min(3, "Subject required"),
  message: z.string().min(20, "Please write at least 20 characters"),
});
type FormData = z.infer<typeof schema>;

const CONTACT_CARDS = [
  { icon: Mail, title: "Email Us", body: "hello@luxe.com", sub: "We reply within 24 hours" },
  { icon: Phone, title: "Call Us", body: "+44 20 7946 0958", sub: "Mon–Sat, 9am–6pm GMT" },
  { icon: MapPin, title: "Visit Us", body: "12 Marylebone Lane, London W1U 2QX", sub: "By appointment only" },
  { icon: Clock, title: "Business Hours", body: "Monday – Saturday", sub: "9:00 AM – 6:00 PM GMT" },
];

export default function Contact() {
  const [sent, setSent] = useState(false);
  const { success } = useToast();

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async () => {
    await new Promise(r => setTimeout(r, 1000));
    setSent(true);
    success("Message sent!", "We'll get back to you within 24 hours.");
    reset();
  };

  return (
    <div className="bg-white dark:bg-neutral-950 min-h-screen">
      {/* Hero */}
      <section className="bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-100 dark:border-neutral-800 py-16 px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-xs text-accent font-semibold tracking-[0.2em] uppercase mb-3">Get in Touch</p>
          <h1 className="font-display font-bold text-4xl text-neutral-900 dark:text-white mb-3">We'd love to hear from you</h1>
          <p className="text-neutral-500 text-base max-w-md mx-auto">Questions about sizing, returns, or just want to say hi? We're here to help.</p>
        </motion.div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        {/* Contact Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {CONTACT_CARDS.map(({ icon: Icon, title, body, sub }, i) => (
            <motion.div key={title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-3xl p-5 text-center">
              <div className="w-11 h-11 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-3">
                <Icon size={18} className="text-accent" />
              </div>
              <p className="font-semibold text-sm text-neutral-900 dark:text-white mb-1">{title}</p>
              <p className="text-xs text-neutral-700 dark:text-neutral-300 mb-0.5 font-medium">{body}</p>
              <p className="text-xs text-neutral-500">{sub}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Form */}
          <div>
            <h2 className="font-display font-bold text-2xl text-neutral-900 dark:text-white mb-6">Send a message</h2>
            {sent ? (
              <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }}
                className="flex flex-col items-center justify-center py-16 gap-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-3xl border border-emerald-200 dark:border-emerald-800">
                <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center">
                  <Check size={28} className="text-emerald-500" />
                </div>
                <div className="text-center">
                  <p className="font-bold text-lg text-neutral-900 dark:text-white">Message sent!</p>
                  <p className="text-sm text-neutral-500 mt-1">We'll get back to you within 24 hours.</p>
                </div>
                <button onClick={() => setSent(false)} className="text-sm text-accent hover:underline">Send another</button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input label="Your Name" error={errors.name?.message} {...register("name")} required fullWidth />
                  <Input label="Email Address" type="email" error={errors.email?.message} {...register("email")} required fullWidth />
                </div>
                <Input label="Subject" error={errors.subject?.message} {...register("subject")} required fullWidth />
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">Message <span className="text-red-500">*</span></label>
                  <textarea rows={6} {...register("message")} placeholder="Tell us how we can help…"
                    className="w-full px-4 py-3 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-2xl text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all resize-none" />
                  {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message.message}</p>}
                </div>
                <Button type="submit" loading={isSubmitting} fullWidth size="lg" icon={<MessageSquare size={16} />}>
                  Send Message
                </Button>
              </form>
            )}
          </div>

          {/* Map + Social */}
          <div className="space-y-6">
            <div className="aspect-video bg-neutral-100 dark:bg-neutral-800 rounded-3xl overflow-hidden flex items-center justify-center">
              <div className="text-center">
                <MapPin size={32} className="text-accent mx-auto mb-3" />
                <p className="font-semibold text-neutral-900 dark:text-white">12 Marylebone Lane</p>
                <p className="text-sm text-neutral-500">London, W1U 2QX</p>
              </div>
            </div>

            <div className="bg-neutral-50 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-3xl p-6">
              <h3 className="font-bold text-neutral-900 dark:text-white mb-4">Follow us</h3>
              <div className="flex items-center gap-3">
                {[{ icon: Instagram, label: "@luxe.store", href: "#" }, { icon: Twitter, label: "@luxestore", href: "#" }].map(({ icon: Icon, label, href }) => (
                  <a key={label} href={href} className="flex items-center gap-2 px-4 py-2.5 rounded-2xl border border-neutral-200 dark:border-neutral-700 text-sm text-neutral-600 dark:text-neutral-400 hover:border-accent hover:text-accent transition-colors">
                    <Icon size={15} /> {label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
