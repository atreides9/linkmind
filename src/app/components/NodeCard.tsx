import { motion } from "motion/react";
import { Tag } from "./Tag";
import { useState } from "react";

interface NodeCardProps {
  title: string;
  preview: string;
  tags?: string[];
  date: string;
  selected?: boolean;
  editing?: boolean;
  dragging?: boolean;
  onSelect?: () => void;
  x?: number;
  y?: number;
  className?: string;
}

export function NodeCard({
  title,
  preview,
  tags = [],
  date,
  selected = false,
  editing = false,
  dragging = false,
  onSelect,
  x = 0,
  y = 0,
  className = ""
}: NodeCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const visibleTags = tags.slice(0, 3);
  const overflowCount = tags.length > 3 ? tags.length - 3 : 0;

  return (
    <motion.div
      style={{ position: 'absolute', left: x, top: y }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{
        opacity: dragging ? 0.85 : 1,
        scale: dragging ? 1.02 : 1
      }}
      whileHover={{ scale: 1.02 }}
      onClick={onSelect}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`w-[220px] min-h-[80px] max-h-[240px] bg-node-bg rounded-[var(--radius-lg)] p-4 cursor-pointer transition-all
        ${selected ? 'border-[1.5px] border-node-border-selected shadow-[var(--shadow-glow-primary)]' : 'border border-node-border'}
        ${isHovered && !selected ? 'border-border-focus shadow-[var(--shadow-lg)]' : 'shadow-[var(--node-shadow)]'}
        ${editing ? 'border-brand-default' : ''}
        ${className}`}
    >
      {/* Connection Port */}
      {isHovered && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-2 h-2 rounded-full bg-gray-700 hover:bg-brand-default transition-colors"
        />
      )}

      {/* Title */}
      <h3 className="font-semibold text-[14px] leading-[1.5] text-text-primary truncate mb-2">
        {title}
      </h3>

      {/* Preview */}
      <p className="text-[12px] font-light leading-[1.5] text-text-secondary line-clamp-3 mb-3">
        {preview}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between gap-2">
        {/* Tags */}
        <div className="flex items-center gap-1 flex-wrap flex-1 min-w-0">
          {visibleTags.map((tag, index) => (
            <Tag key={index} label={tag} />
          ))}
          {overflowCount > 0 && (
            <span className="text-[12px] text-text-disabled">+{overflowCount}</span>
          )}
        </div>

        {/* Date */}
        <span className="text-[12px] font-light text-text-disabled whitespace-nowrap">
          {date}
        </span>
      </div>
    </motion.div>
  );
}
