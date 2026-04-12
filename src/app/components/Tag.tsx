import { motion } from "motion/react";
import { Sparkles } from "lucide-react";

interface TagProps {
  label: string;
  className?: string;
}

export function Tag({ label, className = "" }: TagProps) {
  return (
    <span className={`inline-flex items-center px-[10px] py-1 bg-brand-subtle text-brand-default font-semibold text-[12px] leading-[1.5] rounded-[var(--radius-full)] ${className}`}>
      {label}
    </span>
  );
}

interface AITagChipProps {
  label: string;
  loading?: boolean;
  delay?: number;
  className?: string;
}

export function AITagChip({ label, loading = false, delay = 0, className = "" }: AITagChipProps) {
  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0.3 }}
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className={`inline-flex items-center gap-1 px-[10px] py-1 bg-brand-subtle rounded-[var(--radius-full)] ${className}`}
      >
        <div className="w-3 h-3 bg-brand-default/30 rounded-sm" />
        <div className="w-16 h-3 bg-brand-default/30 rounded-sm" />
      </motion.div>
    );
  }

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay }}
      className={`inline-flex items-center gap-1 px-[10px] py-1 bg-brand-subtle text-brand-default font-semibold text-[12px] leading-[1.5] rounded-[var(--radius-full)] ${className}`}
    >
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <Sparkles className="w-3 h-3" />
      </motion.div>
      {label}
    </motion.span>
  );
}
