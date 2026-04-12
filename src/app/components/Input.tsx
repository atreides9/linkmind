import { forwardRef } from "react";

interface InputProps {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  error?: boolean;
  className?: string;
  type?: string;
  borderless?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ placeholder, value, onChange, disabled, error, className = "", type = "text", borderless = false }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`w-full px-4 py-3 bg-bg-elevated rounded-[var(--radius-md)] font-medium text-[14px] leading-[1.5] text-text-primary placeholder:text-text-disabled transition-all
          ${borderless ? 'border-0 focus:border-b-2' : 'border border-border-default focus:border-2'}
          ${error ? 'border-status-error' : 'focus:border-border-focus'}
          focus:outline-none focus:shadow-[var(--shadow-glow-primary)]
          disabled:opacity-50 disabled:cursor-not-allowed
          ${className}`}
      />
    );
  }
);

Input.displayName = "Input";

interface TextareaProps {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  disabled?: boolean;
  error?: boolean;
  className?: string;
  rows?: number;
  borderless?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ placeholder, value, onChange, disabled, error, className = "", rows = 4, borderless = false }, ref) => {
    return (
      <textarea
        ref={ref}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        rows={rows}
        className={`w-full px-4 py-3 bg-bg-elevated rounded-[var(--radius-md)] font-medium text-[14px] leading-[1.5] text-text-primary placeholder:text-text-disabled transition-all resize-y
          ${borderless ? 'border-0 bg-transparent px-0 focus:border-0' : 'border border-border-default focus:border-2'}
          ${error ? 'border-status-error' : 'focus:border-border-focus'}
          ${borderless ? '' : 'focus:shadow-[var(--shadow-glow-primary)]'}
          focus:outline-none
          disabled:opacity-50 disabled:cursor-not-allowed
          ${className}`}
      />
    );
  }
);

Textarea.displayName = "Textarea";
