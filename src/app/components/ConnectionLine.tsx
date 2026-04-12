import { motion } from "motion/react";

interface ConnectionLineProps {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  active?: boolean;
  className?: string;
}

export function ConnectionLine({ x1, y1, x2, y2, active = false, className = "" }: ConnectionLineProps) {
  // Calculate control points for bezier curve
  const dx = x2 - x1;
  const dy = y2 - y1;
  const controlX1 = x1 + dx * 0.5;
  const controlY1 = y1;
  const controlX2 = x2 - dx * 0.5;
  const controlY2 = y2;

  const path = `M ${x1} ${y1} C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${x2} ${y2}`;

  return (
    <motion.path
      d={path}
      stroke={active ? "var(--connection-active)" : "var(--connection-line)"}
      strokeWidth={active ? 2 : 1.5}
      strokeOpacity={active ? 1 : 0.6}
      fill="none"
      className={`transition-all ${className}`}
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: active ? 1 : 0.6 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    />
  );
}
