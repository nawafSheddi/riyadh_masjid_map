import { cn } from '@/lib/utils'

interface ShadowItemProps {
  name: string
  nameAr: string
  className: string
}

function ShadowItem({ name, nameAr, className }: ShadowItemProps) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className={cn(
          'w-24 h-24 bg-night-medium rounded-lg',
          className
        )}
      />
      <div className="text-center">
        <p className="text-sm font-medium text-text-primary">{nameAr}</p>
        <p className="text-xs text-text-muted font-mono">{name}</p>
      </div>
    </div>
  )
}

export function ShadowShowcase() {
  const shadows: ShadowItemProps[] = [
    { name: 'shadow-soft', nameAr: 'ناعم', className: 'shadow-soft' },
    { name: 'shadow-card', nameAr: 'بطاقة', className: 'shadow-card' },
    { name: 'shadow-elevated', nameAr: 'مرتفع', className: 'shadow-elevated' },
    { name: 'shadow-glow-gold', nameAr: 'توهج ذهبي', className: 'shadow-glow-gold' },
  ]

  return (
    <div className="bg-night-deep rounded-xl p-6" dir="rtl">
      <div className="flex flex-wrap gap-8">
        {shadows.map((shadow) => (
          <ShadowItem key={shadow.name} {...shadow} />
        ))}
      </div>
    </div>
  )
}
