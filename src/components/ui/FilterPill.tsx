import { cn } from '@/lib/utils'
import { ButtonHTMLAttributes, forwardRef } from 'react'

interface FilterPillProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean
}

export const FilterPill = forwardRef<HTMLButtonElement, FilterPillProps>(
  ({ selected = false, className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        role="checkbox"
        aria-checked={selected}
        className={cn(
          // Base styles
          'inline-flex items-center justify-center gap-2',
          'px-4 py-2 text-sm font-medium',
          'rounded-full border',
          'transition-all duration-200',
          'min-h-touch',
          // Focus styles
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-night-deepest',
          // State styles
          selected
            ? 'bg-gold/20 border-gold text-gold'
            : 'bg-transparent border-border text-text-secondary hover:bg-state-hover hover:border-border-strong',
          className
        )}
        {...props}
      >
        {/* Selection indicator */}
        <span
          className={cn(
            'w-2 h-2 rounded-full transition-colors',
            selected ? 'bg-gold' : 'bg-text-muted'
          )}
        />
        {children}
      </button>
    )
  }
)

FilterPill.displayName = 'FilterPill'
