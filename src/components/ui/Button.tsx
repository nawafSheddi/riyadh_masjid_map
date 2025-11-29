import { cn } from '@/lib/utils'
import { Loader2 } from '@/design-tokens'
import { ButtonHTMLAttributes, forwardRef } from 'react'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive'
export type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-gold text-night-deepest hover:bg-gold-bright active:bg-gold-muted',
  secondary: 'bg-transparent border border-border text-text-primary hover:bg-state-hover active:bg-state-active',
  ghost: 'bg-transparent text-text-primary hover:bg-state-hover active:bg-state-active',
  destructive: 'bg-error text-white hover:bg-error/90 active:bg-error/80',
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm min-h-[36px]',
  md: 'px-4 py-2 text-base min-h-touch',
  lg: 'px-6 py-3 text-lg min-h-touch-lg',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      disabled,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={cn(
          // Base styles
          'inline-flex items-center justify-center gap-2',
          'font-medium rounded-md',
          'transition-colors duration-200',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-night-deepest',
          // Variant styles
          variantStyles[variant],
          // Size styles
          sizeStyles[size],
          // Disabled styles
          isDisabled && 'opacity-50 cursor-not-allowed pointer-events-none',
          className
        )}
        {...props}
      >
        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
