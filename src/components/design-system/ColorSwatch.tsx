import { cn } from '@/lib/utils'

interface ColorSwatchProps {
  name: string
  value: string
  cssVar?: string
  className?: string
}

export function ColorSwatch({ name, value, cssVar, className }: ColorSwatchProps) {
  const isRgba = value.startsWith('rgba')

  return (
    <div className={cn('flex flex-col items-center gap-2', className)}>
      <div
        className={cn(
          'w-16 h-16 rounded-lg shadow-soft border border-border-subtle',
          isRgba && 'bg-night-medium'
        )}
        style={{ backgroundColor: value }}
      />
      <div className="text-center">
        <p className="text-sm font-medium text-text-primary">{name}</p>
        <p className="text-xs text-text-muted font-mono" dir="ltr">{value}</p>
        {cssVar && (
          <p className="text-xs text-text-muted font-mono" dir="ltr">{cssVar}</p>
        )}
      </div>
    </div>
  )
}

interface ColorGroupProps {
  title: string
  colors: Array<{ name: string; value: string; cssVar?: string }>
  className?: string
}

export function ColorGroup({ title, colors, className }: ColorGroupProps) {
  return (
    <div className={cn('mb-8', className)} dir="rtl">
      <h3 className="text-lg font-semibold text-text-primary text-right mb-4">
        {title}
      </h3>
      <div className="flex flex-wrap gap-6">
        {colors.map((color) => (
          <ColorSwatch
            key={color.name}
            name={color.name}
            value={color.value}
            cssVar={color.cssVar}
          />
        ))}
      </div>
    </div>
  )
}
