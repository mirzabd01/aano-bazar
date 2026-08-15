import type { ReactNode } from 'react';

type BadgeVariant = 'primary' | 'secondary' | 'accent' | 'success' | 'error' | 'neutral';

interface BadgeProps {
  variant?: BadgeVariant;
  children: ReactNode;
  className?: string;
}

const variantClass: Record<BadgeVariant, string> = {
  primary: 'badge-primary',
  secondary: 'badge-secondary',
  accent: 'badge-accent',
  success: 'badge-success',
  error: 'badge-error',
  neutral: 'badge-neutral',
};

export default function Badge({ variant = 'primary', children, className = '' }: BadgeProps) {
  return <span className={`badge ${variantClass[variant]} ${className}`.trim()}>{children}</span>;
}
