import { cn } from '@/lib/utils'

interface PlaygroundControlsProps {
  label: string
  options: string[]
  selected: string
  onSelect: (value: string) => void
  className?: string
}

export function PlaygroundControls({
  label,
  options,
  selected,
  onSelect,
  className,
}: PlaygroundControlsProps) {
  return (
    <div className={cn('flex items-center gap-3', className)} dir="rtl">
      <span className="text-sm text-text-secondary">{label}:</span>
      <div className="flex gap-2">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => onSelect(option)}
            className={cn(
              'px-3 py-1.5 text-sm rounded-full border transition-colors',
              selected === option
                ? 'bg-gold/20 border-gold text-gold'
                : 'border-border text-text-secondary hover:bg-state-hover'
            )}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  )
}

interface ToggleControlProps {
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
  className?: string
}

export function ToggleControl({
  label,
  checked,
  onChange,
  className,
}: ToggleControlProps) {
  return (
    <label className={cn('flex items-center gap-3 cursor-pointer', className)} dir="rtl">
      <span className="text-sm text-text-secondary">{label}</span>
      <button
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={cn(
          'relative w-11 h-6 rounded-full transition-colors',
          checked ? 'bg-gold' : 'bg-night-soft'
        )}
      >
        <span
          className={cn(
            'absolute top-1 w-4 h-4 rounded-full bg-white transition-transform',
            checked ? 'right-1' : 'right-6'
          )}
        />
      </button>
    </label>
  )
}
