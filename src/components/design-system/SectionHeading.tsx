import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  title: string
  subtitle?: string
  className?: string
}

export function SectionHeading({ title, subtitle, className }: SectionHeadingProps) {
  return (
    <div className={cn('mb-8', className)} dir="rtl">
      <h2 className="text-2xl font-bold text-text-primary text-right mb-2">
        {title}
      </h2>
      {subtitle && (
        <p className="text-text-secondary text-right">
          {subtitle}
        </p>
      )}
      <div className="mt-4 h-px bg-border-subtle" />
    </div>
  )
}
