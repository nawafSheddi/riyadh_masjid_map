import { cn } from '@/lib/utils'
import { HTMLAttributes, forwardRef } from 'react'

export type BadgeVariant =
  | 'default'
  | 'region-north'
  | 'region-east'
  | 'region-westSouth'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-night-soft text-text-primary border-border',
  'region-north': 'bg-region-north/20 text-region-north border-region-north/30',
  'region-east': 'bg-region-east/20 text-region-east border-region-east/30',
  'region-westSouth': 'bg-region-westSouth/20 text-region-westSouth border-region-westSouth/30',
  success: 'bg-success/20 text-success border-success/30',
  warning: 'bg-warning/20 text-warning border-warning/30',
  error: 'bg-error/20 text-error border-error/30',
  info: 'bg-info/20 text-info border-info/30',
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = 'default', className, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center',
          'px-2.5 py-0.5 text-xs font-medium',
          'rounded-full border',
          variantStyles[variant],
          className
        )}
        {...props}
      >
        {children}
      </span>
    )
  }
)

Badge.displayName = 'Badge'
