import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { Button } from "@/components/common/Button";
import { Input } from "@/components/common/Input";

const schema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
type FormData = z.infer<typeof schema>;

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const { success, error } = useToast();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    const ok = await login(data.email, data.password);
    if (ok) {
      success("Welcome back!", "You've been signed in successfully.");
      navigate("/dashboard");
    } else {
      error("Sign in failed", "Please check your email and password.");
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display font-bold text-2xl text-neutral-900 dark:text-white mb-1">Welcome back</h1>
        <p className="text-sm text-neutral-500">Sign in to access your account, orders, and wishlist.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input label="Email" type="email" placeholder="you@example.com" leftIcon={<Mail size={16} />}
          error={errors.email?.message} fullWidth required {...register("email")} />
        <Input label="Password" type={showPassword ? "text" : "password"} placeholder="••••••••"
          leftIcon={<Lock size={16} />}
          rightIcon={
            <button type="button" onClick={() => setShowPassword(s => !s)} className="hover:text-neutral-700 transition-colors">
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          }
          error={errors.password?.message} fullWidth required {...register("password")} />

        <div className="flex justify-end">
          <Link to="/forgot-password" className="text-xs text-accent hover:underline">Forgot password?</Link>
        </div>

        <Button type="submit" loading={isSubmitting} fullWidth size="lg">Sign In</Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-neutral-200 dark:border-neutral-700" /></div>
        <div className="relative flex justify-center text-xs text-neutral-400 bg-white dark:bg-neutral-950 px-2">or continue with</div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {["Google", "Apple"].map(provider => (
          <button key={provider} onClick={() => { success(`${provider} sign-in`, "In a real app, OAuth would open here."); }}
            className="h-11 rounded-2xl border border-neutral-200 dark:border-neutral-700 text-sm font-medium hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2">
            <span className="text-base">{provider === "Google" ? "G" : ""}</span> {provider}
          </button>
        ))}
      </div>

      <p className="text-sm text-center text-neutral-500">
        Don't have an account?{" "}
        <Link to="/register" className="text-accent font-semibold hover:underline">Create one</Link>
      </p>

      <p className="text-xs text-center text-neutral-400 border border-neutral-100 dark:border-neutral-800 rounded-2xl p-3 bg-neutral-50 dark:bg-neutral-900">
        <span className="font-semibold">Demo account:</span> any email + password (6+ chars)
      </p>
    </div>
  );
}
