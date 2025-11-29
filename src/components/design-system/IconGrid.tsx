import { cn } from '@/lib/utils'
import {
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
  ArrowRight,
  MapPin,
  Navigation,
  Locate,
  ZoomIn,
  ZoomOut,
  Layers,
  Play,
  Pause,
  Volume2,
  VolumeX,
  ExternalLink,
  Search,
  Filter,
  Share2,
  Copy,
  Check,
  Info,
  AlertCircle,
  HelpCircle,
  Loader2,
  Settings,
  Moon,
  Sun,
  type LucideIcon,
} from '@/design-tokens'

interface IconItemProps {
  Icon: LucideIcon
  name: string
}

function IconItem({ Icon, name }: IconItemProps) {
  return (
    <div className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-state-hover transition-colors">
      <Icon className="w-6 h-6 text-text-primary" />
      <span className="text-xs text-text-muted">{name}</span>
    </div>
  )
}

interface IconCategoryProps {
  title: string
  titleAr: string
  icons: Array<{ Icon: LucideIcon; name: string }>
  className?: string
}

function IconCategory({ title, titleAr, icons, className }: IconCategoryProps) {
  return (
    <div className={cn('mb-6', className)}>
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm text-text-secondary">{titleAr}</span>
        <span className="text-xs text-text-muted">{title}</span>
      </div>
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
        {icons.map(({ Icon, name }) => (
          <IconItem key={name} Icon={Icon} name={name} />
        ))}
      </div>
    </div>
  )
}

export function IconGrid() {
  const categories: IconCategoryProps[] = [
    {
      title: 'Navigation',
      titleAr: 'التنقل',
      icons: [
        { Icon: Menu, name: 'Menu' },
        { Icon: X, name: 'X' },
        { Icon: ChevronLeft, name: 'ChevronLeft' },
        { Icon: ChevronRight, name: 'ChevronRight' },
        { Icon: ChevronDown, name: 'ChevronDown' },
        { Icon: ChevronUp, name: 'ChevronUp' },
        { Icon: ArrowLeft, name: 'ArrowLeft' },
        { Icon: ArrowRight, name: 'ArrowRight' },
      ],
    },
    {
      title: 'Map',
      titleAr: 'الخريطة',
      icons: [
        { Icon: MapPin, name: 'MapPin' },
        { Icon: Navigation, name: 'Navigation' },
        { Icon: Locate, name: 'Locate' },
        { Icon: ZoomIn, name: 'ZoomIn' },
        { Icon: ZoomOut, name: 'ZoomOut' },
        { Icon: Layers, name: 'Layers' },
      ],
    },
    {
      title: 'Media',
      titleAr: 'الوسائط',
      icons: [
        { Icon: Play, name: 'Play' },
        { Icon: Pause, name: 'Pause' },
        { Icon: Volume2, name: 'Volume2' },
        { Icon: VolumeX, name: 'VolumeX' },
        { Icon: ExternalLink, name: 'ExternalLink' },
      ],
    },
    {
      title: 'Actions',
      titleAr: 'الإجراءات',
      icons: [
        { Icon: Search, name: 'Search' },
        { Icon: Filter, name: 'Filter' },
        { Icon: Share2, name: 'Share2' },
        { Icon: Copy, name: 'Copy' },
        { Icon: Check, name: 'Check' },
      ],
    },
    {
      title: 'Info & UI',
      titleAr: 'المعلومات',
      icons: [
        { Icon: Info, name: 'Info' },
        { Icon: AlertCircle, name: 'AlertCircle' },
        { Icon: HelpCircle, name: 'HelpCircle' },
        { Icon: Loader2, name: 'Loader2' },
        { Icon: Settings, name: 'Settings' },
        { Icon: Moon, name: 'Moon' },
        { Icon: Sun, name: 'Sun' },
      ],
    },
  ]

  return (
    <div className="bg-night-deep rounded-xl p-6" dir="rtl">
      {categories.map((category) => (
        <IconCategory key={category.title} {...category} />
      ))}
    </div>
  )
}
