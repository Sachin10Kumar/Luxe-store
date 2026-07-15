import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { Button } from "@/components/common/Button";
import { Input } from "@/components/common/Input";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
  agreed: z.literal(true, { errorMap: () => ({ message: "You must accept the terms" }) }),
}).refine(d => d.password === d.confirmPassword, {
  message: "Passwords do not match", path: ["confirmPassword"],
});

type FormData = z.infer<typeof schema>;

export default function Register() {
  const [showPass, setShowPass] = useState(false);
  const { register: authRegister } = useAuth();
  const { success, error } = useToast();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    const ok = await authRegister(data.name, data.email, data.password);
    if (ok) {
      success("Account created!", "Welcome to LUXE. Your account is ready.");
      navigate("/dashboard");
    } else {
      error("Registration failed", "Please check your details and try again.");
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display font-bold text-2xl text-neutral-900 dark:text-white mb-1">Create an account</h1>
        <p className="text-sm text-neutral-500">Join thousands of customers who trust LUXE.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input label="Full Name" placeholder="Alex Morgan" leftIcon={<User size={16} />}
          error={errors.name?.message} fullWidth required {...register("name")} />
        <Input label="Email" type="email" placeholder="you@example.com" leftIcon={<Mail size={16} />}
          error={errors.email?.message} fullWidth required {...register("email")} />
        <Input label="Password" type={showPass ? "text" : "password"} placeholder="Min. 6 characters"
          leftIcon={<Lock size={16} />}
          rightIcon={
            <button type="button" onClick={() => setShowPass(s => !s)} className="hover:text-neutral-700">
              {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          }
          error={errors.password?.message} fullWidth required {...register("password")} />
        <Input label="Confirm Password" type={showPass ? "text" : "password"} placeholder="Repeat password"
          leftIcon={<Lock size={16} />} error={errors.confirmPassword?.message}
          fullWidth required {...register("confirmPassword")} />

        <label className="flex items-start gap-2 cursor-pointer">
          <input type="checkbox" {...register("agreed")} className="mt-0.5 accent-accent rounded" />
          <span className="text-xs text-neutral-500 leading-relaxed">
            I agree to the{" "}
            <Link to="/terms" className="text-accent hover:underline">Terms of Service</Link> and{" "}
            <Link to="/privacy" className="text-accent hover:underline">Privacy Policy</Link>
          </span>
        </label>
        {errors.agreed && <p className="text-xs text-red-500">{errors.agreed.message}</p>}

        <Button type="submit" loading={isSubmitting} fullWidth size="lg">Create Account</Button>
      </form>

      <p className="text-sm text-center text-neutral-500">
        Already have an account?{" "}
        <Link to="/login" className="text-accent font-semibold hover:underline">Sign in</Link>
      </p>
    </div>
  );
}
