import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface ComponentShowcaseProps {
  title: string
  titleAr: string
  description?: string
  children: ReactNode
  className?: string
}

export function ComponentShowcase({
  title,
  titleAr,
  description,
  children,
  className,
}: ComponentShowcaseProps) {
  return (
    <div className={cn('mb-8', className)} dir="rtl">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs text-text-muted font-mono">{title}</span>
        <h3 className="text-lg font-semibold text-text-primary">{titleAr}</h3>
      </div>
      {description && (
        <p className="text-sm text-text-secondary text-right mb-4">
          {description}
        </p>
      )}
      <div className="bg-night-deep rounded-xl p-6 border border-border-subtle">
        {children}
      </div>
    </div>
  )
}

interface ComponentVariantProps {
  label: string
  children: ReactNode
  className?: string
}

export function ComponentVariant({ label, children, className }: ComponentVariantProps) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <span className="text-xs text-text-muted">{label}</span>
      <div className="flex flex-wrap gap-3 items-center justify-end">
        {children}
      </div>
    </div>
  )
}
