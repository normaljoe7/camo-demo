// src/components/ui/AnimatedButton.tsx
'use client';

import { ReactNode, useState } from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AnimatedButtonProps {
  children: ReactNode;
  tooltipText?: string;
  icon?: LucideIcon;
  variant?: 'primary' | 'black' | 'accent' | 'white' | 'solid';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export default function AnimatedButton({
  children,
  tooltipText = '',
  icon: Icon,
  variant = 'black',
  size = 'md',
  className,
  onClick,
  disabled = false,
  type = 'button',
}: AnimatedButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  const baseStyles = 'relative overflow-hidden font-semibold transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed font-sans';

  const variants = {
    primary: 'bg-primary text-white hover:bg-primary/90',
    black: 'bg-gray-900 text-white hover:bg-gray-800',
    accent: 'bg-accent text-white hover:bg-accent/90',
    white: 'bg-white text-gray-900 hover:bg-gray-50',
    solid: 'bg-primary text-white hover:bg-primary/90',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm rounded-lg',
    md: 'px-6 py-3 text-base rounded-xl',
    lg: 'px-8 py-4 text-lg rounded-xl',
  };

  const tooltipColors = {
    primary: 'bg-blue-700',
    black: 'bg-gray-800',
    accent: 'bg-emerald-700',
    white: 'bg-gray-600',
    solid: 'bg-blue-700',
  };

  return (
    <button
      type={type}
      className={cn(
        'group relative',
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      disabled={disabled}
      aria-label={`${children} - ${tooltipText}`}
    >
      {/* Text wrapper */}
      <div className="relative overflow-hidden w-full h-full">
        <span className="flex items-center justify-center w-full h-full transition-transform duration-500 ease-[cubic-bezier(0.68,-0.55,0.265,1.55)] group-hover:-translate-y-full">
          {children}
        </span>

        {/* Icon wrapper */}
        {Icon && (
          <span className="absolute inset-0 flex items-center justify-center w-full h-full transition-transform duration-500 ease-[cubic-bezier(0.68,-0.55,0.265,1.55)] group-hover:translate-y-0 translate-y-full">
            <Icon className="w-5 h-5" />
          </span>
        )}
      </div>

      {/* Tooltip */}
      <div className={cn(
        'absolute -top-12 left-1/2 transform -translate-x-1/2',
        tooltipColors[variant],
        'text-white text-sm py-2 px-4 rounded-lg whitespace-nowrap z-50',
        'opacity-0 invisible group-hover:opacity-100 group-hover:visible',
        'transition-all duration-300 ease-[cubic-bezier(0.68,-0.55,0.265,1.55)]',
        'group-hover:-translate-y-1 translate-y-0',
        'shadow-lg'
      )}>
        {tooltipText}
        {/* Tooltip arrow */}
        <div className={cn(
          'absolute -bottom-2 left-1/2 transform -translate-x-1/2',
          'w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent',
          variant === 'primary' && 'border-t-blue-700',
          variant === 'black' && 'border-t-gray-800',
          variant === 'accent' && 'border-t-emerald-700',
          variant === 'white' && 'border-t-gray-600',
          variant === 'solid' && 'border-t-blue-700'
        )} />
      </div>
    </button>
  );
}