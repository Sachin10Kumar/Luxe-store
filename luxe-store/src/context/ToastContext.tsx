import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, Info, AlertTriangle, X } from "lucide-react";
import type { Toast, ToastType } from "@/types";
import { generateId, cn } from "@/utils/helpers";

interface ToastContextValue {
  toast: (type: ToastType, title: string, message?: string, duration?: number) => void;
  success: (title: string, message?: string) => void;
  error: (title: string, message?: string) => void;
  info: (title: string, message?: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const ICONS: Record<ToastType, typeof CheckCircle2> = {
  success: CheckCircle2, error: XCircle, info: Info, warning: AlertTriangle,
};

const COLORS: Record<ToastType, string> = {
  success: "text-emerald-500",
  error: "text-red-500",
  info: "text-accent",
  warning: "text-amber-500",
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const toast = useCallback((type: ToastType, title: string, message?: string, duration = 4000) => {
    const id = generateId();
    setToasts(prev => [...prev.slice(-4), { id, type, title, message, duration }]);
    if (duration > 0) setTimeout(() => dismiss(id), duration);
  }, [dismiss]);

  const success = useCallback((title: string, message?: string) => toast("success", title, message), [toast]);
  const error = useCallback((title: string, message?: string) => toast("error", title, message), [toast]);
  const info = useCallback((title: string, message?: string) => toast("info", title, message), [toast]);

  return (
    <ToastContext.Provider value={{ toast, success, error, info }}>
      {children}
      <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 pointer-events-none" aria-live="polite">
        <AnimatePresence>
          {toasts.map(t => {
            const Icon = ICONS[t.type];
            return (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, x: 64, scale: 0.96 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 64, scale: 0.96 }}
                transition={{ type: "spring", stiffness: 500, damping: 40 }}
                className="pointer-events-auto w-80 glass rounded-2xl p-4 shadow-soft-lg flex gap-3 items-start"
              >
                <Icon size={20} className={cn("shrink-0 mt-0.5", COLORS[t.type])} />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-neutral-900 dark:text-white">{t.title}</p>
                  {t.message && <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">{t.message}</p>}
                </div>
                <button onClick={() => dismiss(t.id)} className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 transition-colors shrink-0">
                  <X size={14} />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside ToastProvider");
  return ctx;
}
