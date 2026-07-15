import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, ArrowLeft, Check } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/common/Button";
import { Input } from "@/components/common/Input";
import { motion } from "framer-motion";

const schema = z.object({ email: z.string().email("Enter a valid email") });
type FormData = z.infer<typeof schema>;

export default function ForgotPassword() {
  const [sent, setSent] = useState(false);
  const { register, handleSubmit, getValues, formState: { errors, isSubmitting } } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async () => {
    await new Promise(r => setTimeout(r, 1000));
    setSent(true);
  };

  return (
    <div className="space-y-8">
      {!sent ? (
        <>
          <div>
            <h1 className="font-display font-bold text-2xl text-neutral-900 dark:text-white mb-1">Forgot password?</h1>
            <p className="text-sm text-neutral-500">Enter your email and we'll send you a reset link.</p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input label="Email" type="email" placeholder="you@example.com" leftIcon={<Mail size={16} />}
              error={errors.email?.message} fullWidth required {...register("email")} />
            <Button type="submit" loading={isSubmitting} fullWidth size="lg">Send Reset Link</Button>
          </form>
          <Link to="/login" className="flex items-center justify-center gap-1.5 text-sm text-neutral-500 hover:text-accent transition-colors">
            <ArrowLeft size={14} /> Back to sign in
          </Link>
        </>
      ) : (
        <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center space-y-6 py-8">
          <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mx-auto">
            <Check size={28} className="text-emerald-500" />
          </div>
          <div>
            <h2 className="font-bold text-xl text-neutral-900 dark:text-white mb-2">Check your email</h2>
            <p className="text-sm text-neutral-500">We've sent a password reset link to <strong className="text-neutral-900 dark:text-white">{getValues("email")}</strong></p>
          </div>
          <Link to="/login" className="inline-flex items-center gap-1.5 text-sm text-accent hover:underline">
            <ArrowLeft size={14} /> Back to sign in
          </Link>
        </motion.div>
      )}
    </div>
  );
}
