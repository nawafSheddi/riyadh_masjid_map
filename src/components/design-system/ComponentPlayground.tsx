import { cn } from '@/lib/utils'
import { ReactNode, useState } from 'react'
import { PlaygroundControls, ToggleControl } from './PlaygroundControls'

interface PlaygroundConfig {
  variants?: string[]
  sizes?: string[]
  hasDisabled?: boolean
  hasLoading?: boolean
}

interface ComponentPlaygroundProps {
  title: string
  titleAr: string
  config: PlaygroundConfig
  renderComponent: (props: {
    variant: string
    size: string
    disabled: boolean
    loading: boolean
  }) => ReactNode
  className?: string
}

export function ComponentPlayground({
  title,
  titleAr,
  config,
  renderComponent,
  className,
}: ComponentPlaygroundProps) {
  const [variant, setVariant] = useState(config.variants?.[0] ?? 'default')
  const [size, setSize] = useState(config.sizes?.[0] ?? 'md')
  const [disabled, setDisabled] = useState(false)
  const [loading, setLoading] = useState(false)

  return (
    <div className={cn('bg-night-deep rounded-xl p-6 border border-border-subtle', className)} dir="rtl">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-text-primary">{titleAr}</h3>
        <span className="text-xs text-text-muted font-mono">{title}</span>
      </div>

      {/* Preview Area */}
      <div className="bg-night-medium rounded-lg p-8 mb-6 flex items-center justify-center min-h-[120px]">
        {renderComponent({ variant, size, disabled, loading })}
      </div>

      {/* Controls */}
      <div className="space-y-4 border-t border-border-subtle pt-4">
        {config.variants && config.variants.length > 0 && (
          <PlaygroundControls
            label="النوع"
            options={config.variants}
            selected={variant}
            onSelect={setVariant}
          />
        )}

        {config.sizes && config.sizes.length > 0 && (
          <PlaygroundControls
            label="الحجم"
            options={config.sizes}
            selected={size}
            onSelect={setSize}
          />
        )}

        <div className="flex gap-6">
          {config.hasDisabled && (
            <ToggleControl
              label="معطل"
              checked={disabled}
              onChange={setDisabled}
            />
          )}

          {config.hasLoading && (
            <ToggleControl
              label="جاري التحميل"
              checked={loading}
              onChange={setLoading}
            />
          )}
        </div>
      </div>
    </div>
  )
}
