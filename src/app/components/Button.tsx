import { motion } from "motion/react";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
}

export function ButtonPrimary({ children, onClick, disabled, loading, className = "", type = "button" }: ButtonProps) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`px-5 py-[10px] min-h-[44px] min-w-[44px] bg-brand-default text-text-inverse font-semibold text-[14px] leading-[1.5] rounded-[var(--radius-md)] transition-colors hover:bg-brand-hover active:bg-brand-active disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
    >
      {loading ? "..." : children}
    </motion.button>
  );
}

export function ButtonSecondary({ children, onClick, disabled, loading, className = "", type = "button" }: ButtonProps) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`px-5 py-[10px] min-h-[44px] min-w-[44px] bg-transparent border border-border-default text-text-primary font-semibold text-[14px] leading-[1.5] rounded-[var(--radius-md)] transition-colors hover:bg-bg-elevated active:bg-bg-surface disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
    >
      {loading ? "..." : children}
    </motion.button>
  );
}

export function ButtonGhost({ children, onClick, disabled, loading, className = "", type = "button" }: ButtonProps) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`px-5 py-[10px] min-h-[44px] min-w-[44px] bg-transparent text-text-secondary font-semibold text-[14px] leading-[1.5] rounded-[var(--radius-md)] transition-colors hover:text-text-primary disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
    >
      {loading ? "..." : children}
    </motion.button>
  );
}

interface ButtonIconProps {
  icon: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  ariaLabel?: string;
}

export function ButtonIcon({ icon, onClick, disabled, className = "", ariaLabel }: ButtonIconProps) {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={`w-[44px] h-[44px] bg-transparent flex items-center justify-center rounded-[var(--radius-md)] transition-colors hover:bg-bg-elevated disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
    >
      <div className="w-5 h-5">{icon}</div>
    </motion.button>
  );
}
