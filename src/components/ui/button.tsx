// src/components/ui/Button.tsx
import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ButtonProps {
  children: ReactNode;
  variant?: 'solid' | 'outline' | 'ghost';
  color?: 'primary' | 'black' | 'accent' | 'white' | 'custom';
  customColor?: string; // For truly custom colors
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export default function Button({
  children,
  variant = 'solid',
  color = 'primary',
  customColor,
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  className,
  onClick,
  disabled = false,
  type = 'button',
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  // Color classes based on variant and color
  const getColorClasses = () => {
    if (customColor && variant === 'solid') {
      return `bg-[${customColor}] text-white hover:opacity-90 focus:ring-[${customColor}]`;
    }
    
    if (customColor && variant === 'outline') {
      return `border-2 border-[${customColor}] text-[${customColor}] hover:bg-[${customColor}] hover:text-white`;
    }
    
    const colorMap: Record<Exclude<typeof color, 'custom'>, Record<typeof variant, string>> = {
      primary: {
        solid: 'bg-primary text-white hover:bg-primary/90 focus:ring-primary',
        outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white focus:ring-primary',
        ghost: 'text-primary hover:bg-primary/10 focus:ring-primary',
      },
      black: {
        solid: 'bg-gray-900 text-white hover:bg-gray-800 focus:ring-gray-900',
        outline: 'border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white focus:ring-gray-900',
        ghost: 'text-gray-900 hover:bg-gray-100 focus:ring-gray-300',
      },
      accent: {
        solid: 'bg-accent text-white hover:bg-accent/90 focus:ring-accent',
        outline: 'border-2 border-accent text-accent hover:bg-accent hover:text-white focus:ring-accent',
        ghost: 'text-accent hover:bg-accent/10 focus:ring-accent',
      },
      white: {
        solid: 'bg-white text-gray-900 hover:bg-gray-50 focus:ring-white',
        outline: 'border-2 border-white text-white hover:bg-white hover:text-gray-900 focus:ring-white',
        ghost: 'text-white hover:bg-white/10 focus:ring-white',
      },
    };
    
    const mappedColor = color === 'custom' ? 'primary' : color;
    return colorMap[mappedColor]?.[variant] || colorMap.primary.solid;
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };
  
  return (
    <button
      type={type}
      className={cn(
        baseStyles,
        getColorClasses(),
        sizes[size],
        className
      )}
      onClick={onClick}
      disabled={disabled}
      style={customColor && variant === 'solid' ? { backgroundColor: customColor } : {}}
    >
      {Icon && iconPosition === 'left' && <Icon className="mr-2 h-5 w-5" />}
      {children}
      {Icon && iconPosition === 'right' && <Icon className="ml-2 h-5 w-5" />}
    </button>
  );
}