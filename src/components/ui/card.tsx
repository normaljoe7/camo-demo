import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export default function Card({ children, className }: CardProps) {
  return (
    <div className={cn(
      "bg-secondary/30 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-white/10 animate-float hover:shadow-[0_0_50px_0px_hsl(var(--primary)/0.25)] transition-all duration-500",
      className
    )}>
      {children}
    </div>
  );
}