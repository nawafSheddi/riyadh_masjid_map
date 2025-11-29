import { cn } from '@/lib/utils'
import { type LucideIcon } from '@/design-tokens'
import { ButtonHTMLAttributes, forwardRef } from 'react'

export type IconButtonVariant = 'default' | 'ghost' | 'primary'
export type IconButtonSize = 'sm' | 'md' | 'lg'

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: LucideIcon
  variant?: IconButtonVariant
  size?: IconButtonSize
  label: string // Required for accessibility
}

const variantStyles: Record<IconButtonVariant, string> = {
  default: 'bg-night-medium border border-border text-text-primary hover:bg-state-hover active:bg-state-active',
  ghost: 'bg-transparent text-text-primary hover:bg-state-hover active:bg-state-active',
  primary: 'bg-gold text-night-deepest hover:bg-gold-bright active:bg-gold-muted',
}

const sizeStyles: Record<IconButtonSize, { button: string; icon: string }> = {
  sm: { button: 'w-9 h-9', icon: 'w-4 h-4' },
  md: { button: 'w-11 h-11', icon: 'w-5 h-5' },
  lg: { button: 'w-14 h-14', icon: 'w-6 h-6' },
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      icon: Icon,
      variant = 'default',
      size = 'md',
      label,
      disabled,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        aria-label={label}
        className={cn(
          // Base styles
          'inline-flex items-center justify-center',
          'rounded-full',
          'transition-colors duration-200',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-night-deepest',
          // Variant styles
          variantStyles[variant],
          // Size styles
          sizeStyles[size].button,
          // Disabled styles
          disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
          className
        )}
        {...props}
      >
        <Icon className={sizeStyles[size].icon} />
      </button>
    )
  }
)

IconButton.displayName = 'IconButton'
