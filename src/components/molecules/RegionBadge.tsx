import { Badge, type BadgeVariant } from '@/components/ui'
import type { RegionKey } from '@/design-tokens'

interface RegionBadgeProps {
  region: RegionKey
  className?: string
}

const regionLabels: Record<RegionKey, string> = {
  north: 'الشمال',
  east: 'الشرق',
  westSouth: 'الغرب والجنوب',
}

const regionVariants: Record<RegionKey, BadgeVariant> = {
  north: 'region-north',
  east: 'region-east',
  westSouth: 'region-westSouth',
}

export function RegionBadge({ region, className }: RegionBadgeProps) {
  return (
    <Badge variant={regionVariants[region]} className={className}>
      {regionLabels[region]}
    </Badge>
  )
}
