import { useState } from 'react'
import { colors } from '@/design-tokens'
import {
  SectionHeading,
  ColorGroup,
  TypographyShowcase,
  SpacingScale,
  RadiusScale,
  IconGrid,
  ComponentPlayground,
  ShadowShowcase,
} from '@/components/design-system'
import { Button, Badge, FilterPill, Card, CardTitle, CardContent, IconButton } from '@/components/ui'
import { RegionBadge, AudioPlayerControls } from '@/components/molecules'
import { BottomSheetPreview } from '@/components/organisms'
import { Play, MapPin, Filter, Navigation } from '@/design-tokens'

export function DesignSystemPage() {
  const [bottomSheetState, setBottomSheetState] = useState<'50%' | '100%'>('50%')

  return (
    <div className="min-h-screen bg-night-deepest" dir="rtl">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-night-deepest/95 backdrop-blur-sm border-b border-border-subtle">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <h1 className="text-3xl font-bold text-gold text-right">نظام التصميم</h1>
          <p className="text-text-secondary text-right mt-1">
            Design System Catalog - Ramadan Masjid Finder
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-8 space-y-12">
        {/* Colors Section */}
        <section>
          <SectionHeading
            title="الألوان"
            subtitle="Ramadan Night Theme - Dark blue night sky with warm gold accents"
          />

          <ColorGroup
            title="ليالي رمضان - Night Sky"
            colors={[
              { name: 'Deepest', value: colors.ramadan.night.deepest, cssVar: '--color-night-deepest' },
              { name: 'Deep', value: colors.ramadan.night.deep, cssVar: '--color-night-deep' },
              { name: 'Medium', value: colors.ramadan.night.medium, cssVar: '--color-night-medium' },
              { name: 'Soft', value: colors.ramadan.night.soft, cssVar: '--color-night-soft' },
            ]}
          />

          <ColorGroup
            title="الذهبي - Gold Accents"
            colors={[
              { name: 'Gold', value: colors.ramadan.gold.DEFAULT, cssVar: '--color-gold' },
              { name: 'Bright', value: colors.ramadan.gold.bright, cssVar: '--color-gold-bright' },
              { name: 'Muted', value: colors.ramadan.gold.muted, cssVar: '--color-gold-muted' },
            ]}
          />

          <ColorGroup
            title="المناطق - Regions"
            colors={[
              { name: 'الشمال (North)', value: colors.region.north, cssVar: '--color-region-north' },
              { name: 'الشرق (East)', value: colors.region.east, cssVar: '--color-region-east' },
              { name: 'الغرب والجنوب (West/South)', value: colors.region.westSouth, cssVar: '--color-region-west-south' },
            ]}
          />

          <ColorGroup
            title="الدلالية - Semantic"
            colors={[
              { name: 'Success', value: colors.semantic.success, cssVar: '--color-success' },
              { name: 'Warning', value: colors.semantic.warning, cssVar: '--color-warning' },
              { name: 'Error', value: colors.semantic.error, cssVar: '--color-error' },
              { name: 'Info', value: colors.semantic.info, cssVar: '--color-info' },
            ]}
          />

          <ColorGroup
            title="النصوص - Text Colors"
            colors={[
              { name: 'Primary', value: colors.ramadan.text.primary, cssVar: '--color-text-primary' },
              { name: 'Secondary', value: colors.ramadan.text.secondary, cssVar: '--color-text-secondary' },
              { name: 'Muted', value: colors.ramadan.text.muted, cssVar: '--color-text-muted' },
            ]}
          />
        </section>

        {/* Typography Section */}
        <section>
          <SectionHeading
            title="الخطوط"
            subtitle="Cairo font family - Arabic-optimized typography scale"
          />
          <TypographyShowcase />
        </section>

        {/* Spacing Section */}
        <section>
          <SectionHeading
            title="المسافات"
            subtitle="Consistent spacing scale based on 4px base unit"
          />
          <SpacingScale />
        </section>

        {/* Border Radius Section */}
        <section>
          <SectionHeading
            title="الزوايا"
            subtitle="Generous rounded corners for the Ramadan night theme"
          />
          <RadiusScale />
        </section>

        {/* Shadows Section */}
        <section>
          <SectionHeading
            title="الظلال"
            subtitle="Soft shadows for depth and elevation"
          />
          <ShadowShowcase />
        </section>

        {/* Icons Section */}
        <section>
          <SectionHeading
            title="الأيقونات"
            subtitle="Lucide React icons - centralized in design tokens"
          />
          <IconGrid />
        </section>

        {/* Components Section */}
        <section>
          <SectionHeading
            title="المكونات"
            subtitle="Reusable UI components with interactive playground"
          />

          {/* Button Playground */}
          <ComponentPlayground
            title="Button"
            titleAr="الأزرار"
            config={{
              variants: ['primary', 'secondary', 'ghost', 'destructive'],
              sizes: ['sm', 'md', 'lg'],
              hasDisabled: true,
              hasLoading: true,
            }}
            renderComponent={({ variant, size, disabled, loading }) => (
              <Button
                variant={variant as any}
                size={size as any}
                disabled={disabled}
                loading={loading}
              >
                {variant === 'primary' && 'زر رئيسي'}
                {variant === 'secondary' && 'زر ثانوي'}
                {variant === 'ghost' && 'زر شفاف'}
                {variant === 'destructive' && 'زر حذف'}
              </Button>
            )}
            className="mb-8"
          />

          {/* Badge Showcase */}
          <div className="bg-night-deep rounded-xl p-6 border border-border-subtle mb-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-text-primary">الشارات</h3>
              <span className="text-xs text-text-muted font-mono">Badge</span>
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-sm text-text-secondary block text-right mb-2">شارات المناطق</span>
                <div className="flex gap-2 flex-wrap">
                  <RegionBadge region="north" />
                  <RegionBadge region="east" />
                  <RegionBadge region="westSouth" />
                </div>
              </div>

              <div>
                <span className="text-sm text-text-secondary block text-right mb-2">شارات الحالة</span>
                <div className="flex gap-2 flex-wrap">
                  <Badge variant="success">متاح</Badge>
                  <Badge variant="warning">معتدل</Badge>
                  <Badge variant="error">مزدحم</Badge>
                  <Badge variant="info">معلومات</Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="bg-night-deep rounded-xl p-6 border border-border-subtle mb-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-text-primary">أقراص الفلترة</h3>
              <span className="text-xs text-text-muted font-mono">FilterPill</span>
            </div>

            <FilterPillsDemo />
          </div>

          {/* Icon Buttons */}
          <div className="bg-night-deep rounded-xl p-6 border border-border-subtle mb-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-text-primary">أزرار الأيقونات</h3>
              <span className="text-xs text-text-muted font-mono">IconButton</span>
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-sm text-text-secondary block text-right mb-2">الأنواع</span>
                <div className="flex gap-3 flex-wrap">
                  <IconButton icon={Play} variant="primary" label="تشغيل" />
                  <IconButton icon={MapPin} variant="default" label="موقع" />
                  <IconButton icon={Filter} variant="ghost" label="فلتر" />
                </div>
              </div>

              <div>
                <span className="text-sm text-text-secondary block text-right mb-2">الأحجام</span>
                <div className="flex gap-3 items-center flex-wrap">
                  <IconButton icon={Navigation} variant="primary" size="sm" label="صغير" />
                  <IconButton icon={Navigation} variant="primary" size="md" label="متوسط" />
                  <IconButton icon={Navigation} variant="primary" size="lg" label="كبير" />
                </div>
              </div>
            </div>
          </div>

          {/* Card */}
          <div className="bg-night-deep rounded-xl p-6 border border-border-subtle mb-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-text-primary">البطاقات</h3>
              <span className="text-xs text-text-muted font-mono">Card</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardTitle>بطاقة عادية</CardTitle>
                <CardContent>
                  محتوى البطاقة يظهر هنا مع النص العربي
                </CardContent>
              </Card>

              <Card elevated>
                <CardTitle>بطاقة مرتفعة</CardTitle>
                <CardContent>
                  بطاقة مع ظل إضافي للارتفاع
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Audio Player Controls */}
          <div className="bg-night-deep rounded-xl p-6 border border-border-subtle mb-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-text-primary">مشغل الصوت</h3>
              <span className="text-xs text-text-muted font-mono">AudioPlayerControls</span>
            </div>

            <AudioPlayerDemo />
          </div>

          {/* Bottom Sheet Preview */}
          <div className="bg-night-deep rounded-xl p-6 border border-border-subtle">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-text-primary">البطاقة السفلية</h3>
              <span className="text-xs text-text-muted font-mono">BottomSheet</span>
            </div>

            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setBottomSheetState('50%')}
                className={`px-3 py-1 text-sm rounded ${
                  bottomSheetState === '50%'
                    ? 'bg-gold text-night-deepest'
                    : 'bg-night-medium text-text-secondary'
                }`}
              >
                50%
              </button>
              <button
                onClick={() => setBottomSheetState('100%')}
                className={`px-3 py-1 text-sm rounded ${
                  bottomSheetState === '100%'
                    ? 'bg-gold text-night-deepest'
                    : 'bg-night-medium text-text-secondary'
                }`}
              >
                100%
              </button>
            </div>

            <div className="bg-night-medium rounded-lg p-4 max-h-[500px] overflow-auto">
              <BottomSheetPreview state={bottomSheetState} />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border-subtle mt-12">
        <div className="max-w-6xl mx-auto px-6 py-6 text-center">
          <p className="text-sm text-text-muted">
            Design System v1.0 - Development Only
          </p>
        </div>
      </footer>
    </div>
  )
}

// Filter Pills Demo Component
function FilterPillsDemo() {
  const [selected, setSelected] = useState<string[]>(['nearest'])

  const filters = [
    { id: 'nearest', label: 'الأقرب' },
    { id: 'popular', label: 'الأكثر شهرة' },
    { id: 'rated', label: 'الأعلى تقييماً' },
    { id: 'parking', label: 'مواقف متاحة' },
  ]

  const toggleFilter = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    )
  }

  return (
    <div className="flex gap-2 flex-wrap">
      {filters.map((filter) => (
        <FilterPill
          key={filter.id}
          selected={selected.includes(filter.id)}
          onClick={() => toggleFilter(filter.id)}
        >
          {filter.label}
        </FilterPill>
      ))}
    </div>
  )
}

// Audio Player Demo Component
function AudioPlayerDemo() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [progress, setProgress] = useState(35)

  return (
    <div className="space-y-4">
      <AudioPlayerControls
        isPlaying={isPlaying}
        isMuted={isMuted}
        progress={progress}
        onPlayPause={() => setIsPlaying(!isPlaying)}
        onMuteToggle={() => setIsMuted(!isMuted)}
      />

      <div className="flex gap-2">
        <button
          onClick={() => setProgress(Math.max(0, progress - 10))}
          className="px-2 py-1 text-xs bg-night-medium text-text-secondary rounded"
        >
          -10%
        </button>
        <button
          onClick={() => setProgress(Math.min(100, progress + 10))}
          className="px-2 py-1 text-xs bg-night-medium text-text-secondary rounded"
        >
          +10%
        </button>
      </div>
    </div>
  )
}

export default DesignSystemPage
