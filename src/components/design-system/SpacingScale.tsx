import { cn } from '@/lib/utils'
import { spacing, radius } from '@/design-tokens'

interface SpacingItemProps {
  name: string
  value: string
}

function SpacingItem({ name, value }: SpacingItemProps) {
  const numericValue = parseInt(value, 10)

  return (
    <div className="flex items-center gap-4 py-2">
      <span className="text-sm text-text-secondary w-12">{name}</span>
      <div
        className="h-4 bg-gold rounded-sm"
        style={{ width: `${numericValue}px` }}
      />
      <div className="w-16">
        <span className="text-xs text-text-muted font-mono" dir="ltr">{value}</span>
      </div>
    </div>
  )
}

export function SpacingScale() {
  const spacingItems = Object.entries(spacing.base).map(([name, value]) => ({
    name,
    value,
  }))

  return (
    <div className="bg-night-deep rounded-xl p-6" dir="rtl">
      <div className="flex flex-col-reverse">
        {spacingItems.map((item) => (
          <SpacingItem key={item.name} {...item} />
        ))}
      </div>
    </div>
  )
}

interface RadiusItemProps {
  name: string
  value: string
}

function RadiusItem({ name, value }: RadiusItemProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="w-16 h-16 bg-gold/20 border-2 border-gold"
        style={{ borderRadius: value }}
      />
      <div className="text-center">
        <p className="text-sm font-medium text-text-primary">{name}</p>
        <p className="text-xs text-text-muted font-mono">{value}</p>
      </div>
    </div>
  )
}

export function RadiusScale() {
  const radiusItems = Object.entries(radius).map(([name, value]) => ({
    name,
    value,
  }))

  return (
    <div className="bg-night-deep rounded-xl p-6" dir="rtl">
      <div className="flex flex-wrap gap-6">
        {radiusItems.map((item) => (
          <RadiusItem key={item.name} {...item} />
        ))}
      </div>
    </div>
  )
}
