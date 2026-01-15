// src/components/ui/TooltipButton.tsx
'use client';

import { ReactNode, useState } from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import './TooltipButton.css'; // We'll create this next

interface TooltipButtonProps {
  children: ReactNode;
  tooltipText: string;
  icon?: LucideIcon;
  variant?: 'primary' | 'black' | 'accent' | 'white';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export default function TooltipButton({
  children,
  tooltipText,
  icon: Icon,
  variant = 'black',
  size = 'md',
  className,
  onClick,
  disabled = false,
}: TooltipButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  const baseStyles = 'relative overflow-hidden font-semibold transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed font-["Arial"]';
  
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary/90',
    black: 'bg-gray-900 text-white hover:bg-gray-800',
    accent: 'bg-accent text-white hover:bg-accent/90',
    white: 'bg-white text-gray-900 hover:bg-gray-50',
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-sm rounded-lg',
    md: 'px-6 py-3 text-base rounded-xl',
    lg: 'px-8 py-4 text-lg rounded-xl',
  };

  return (
    <button
      className={cn(
        'tooltip-button', // Base class for CSS animations
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      data-tooltip={tooltipText}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      disabled={disabled}
      aria-label={`${children} - ${tooltipText}`}
    >
      {/* Text wrapper */}
      <div className="button-wrapper">
        <span className="text flex items-center justify-center w-full h-full">
          {children}
        </span>
        {/* Icon wrapper */}
        {Icon && (
          <span className="icon flex items-center justify-center w-full h-full">
            <Icon className="w-5 h-5" />
          </span>
        )}
      </div>
      
      {/* Tooltip (for non-CSS approach) */}
      {isHovered && (
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-sm py-2 px-4 rounded-lg whitespace-nowrap z-50 animate-fade-in">
          {tooltipText}
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-gray-800" />
        </div>
      )}
    </button>
  );
}