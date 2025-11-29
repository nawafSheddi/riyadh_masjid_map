import { cn } from '@/lib/utils'
import { Card, CardTitle, CardContent, Badge, IconButton } from '@/components/ui'
import { RegionBadge, AudioPlayerControls } from '@/components/molecules'
import { Navigation, MapPin } from '@/design-tokens'

interface BottomSheetPreviewProps {
  state: '50%' | '100%'
  className?: string
}

export function BottomSheetPreview({ state, className }: BottomSheetPreviewProps) {
  const isExpanded = state === '100%'

  return (
    <div
      className={cn(
        'bg-night-deep rounded-t-2xl border-t border-x border-border-subtle',
        'shadow-elevated',
        className
      )}
      dir="rtl"
    >
      {/* Drag Handle */}
      <div className="flex justify-center py-3">
        <div className="w-10 h-1 bg-night-soft rounded-full" />
      </div>

      {/* Content */}
      <div className="px-6 pb-6 space-y-4">
        {/* Primary: Imam Name + Audio */}
        <div className="flex items-start gap-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-text-primary">
              الشيخ عبدالرحمن السديس
            </h3>
            <p className="text-sm text-text-secondary">القارئ</p>
          </div>
          <IconButton
            icon={Navigation}
            variant="primary"
            size="md"
            label="تشغيل الصوت"
          />
        </div>

        {/* Secondary: Masjid + Navigate */}
        <div className="flex items-start gap-4">
          <div className="flex-1">
            <h4 className="text-lg font-semibold text-text-primary">
              مسجد الراجحي الكبير
            </h4>
            <p className="text-sm text-text-secondary flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              حي العليا
            </p>
          </div>
          <IconButton
            icon={MapPin}
            variant="default"
            size="md"
            label="فتح في الخرائط"
          />
        </div>

        {/* Quick Info Badges */}
        <div className="flex gap-2 flex-wrap">
          <RegionBadge region="north" />
          <Badge variant="success">مواقف متاحة</Badge>
          <Badge variant="warning">معتدل الازدحام</Badge>
        </div>

        {/* Audio Player */}
        <AudioPlayerControls
          isPlaying={false}
          progress={35}
          className="pt-2"
        />

        {/* Expanded Content */}
        {isExpanded && (
          <div className="space-y-4 pt-4 border-t border-border-subtle">
            {/* Parking Info */}
            <div>
              <h5 className="text-sm font-semibold text-gold mb-1">
                معلومات المواقف
              </h5>
              <p className="text-sm text-text-secondary">
                مواقف واسعة متاحة، يوجد موقف متعدد الطوابق على بعد ١٠٠ متر من المسجد
              </p>
            </div>

            {/* Crowding Info */}
            <div>
              <h5 className="text-sm font-semibold text-gold mb-1">
                معلومات الازدحام
              </h5>
              <p className="text-sm text-text-secondary">
                يُنصح بالحضور قبل ١٥ دقيقة من صلاة التراويح خاصة في العشر الأواخر من رمضان
              </p>
            </div>

            {/* Likes */}
            <div>
              <p className="text-sm text-text-muted">
                ٢٬٨٤٧ شخص أعجب بهذا المسجد
              </p>
            </div>
          </div>
        )}

        {/* Hint text */}
        <p className="text-xs text-text-muted text-center pt-2">
          {isExpanded ? '↓ اسحب للأسفل للإغلاق' : '↑ اسحب للأعلى لمزيد من التفاصيل'}
        </p>
      </div>
    </div>
  )
}
