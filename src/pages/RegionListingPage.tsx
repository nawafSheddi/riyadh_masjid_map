/**
 * RegionListingPage
 *
 * Region listing page for programmatic SEO.
 * Route: /region/:region
 * Generates 3 pages (north, east, westSouth) listing all masjids in the region.
 */

import { useParams, Link } from 'react-router-dom'
import { getMasjidsByRegion } from '@/lib/masjid-utils'
import { getRegionTitle, getRegionDescription, getRegionUrl, SITE_URL } from '@/lib/seo'
import { REGION_LABELS } from '@/constants/map'
import { PageHead, BreadcrumbJsonLd } from '@/components/seo'
import { RegionBadge } from '@/components/molecules'
import { Card, CardContent } from '@/components/ui'
import { ArrowRight, MapPin } from '@/design-tokens'
import type { Region } from '@/types'

export default function RegionListingPage() {
  const { region } = useParams<{ region: string }>()
  const typedRegion = region as Region

  if (!REGION_LABELS[typedRegion]) {
    return (
      <div className="min-h-screen bg-night-deepest flex items-center justify-center" dir="rtl">
        <div className="text-center space-y-4">
          <p className="text-text-primary text-xl font-bold">المنطقة غير موجودة</p>
          <Link to="/" className="text-gold hover:text-gold-bright underline">
            العودة للخريطة
          </Link>
        </div>
      </div>
    )
  }

  const masjids = getMasjidsByRegion(typedRegion)

  return (
    <div className="min-h-screen bg-night-deepest" dir="rtl">
      <PageHead
        title={getRegionTitle(typedRegion)}
        description={getRegionDescription(typedRegion, masjids.length)}
        canonicalUrl={getRegionUrl(typedRegion)}
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'الرئيسية', url: '/' },
          { name: REGION_LABELS[typedRegion] },
        ]}
      />

      {/* Navigation bar */}
      <nav className="bg-night-deep border-b border-border-subtle">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-2 text-sm">
          <Link to="/" className="text-gold hover:text-gold-bright">الرئيسية</Link>
          <span className="text-text-muted">/</span>
          <span className="text-text-secondary">{REGION_LABELS[typedRegion]}</span>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* Hero */}
        <header className="mb-8">
          <div className="mb-4">
            <RegionBadge region={typedRegion} />
          </div>
          <h1 className="text-3xl font-bold text-text-primary text-right">
            مساجد {REGION_LABELS[typedRegion]}
          </h1>
          <p className="text-text-secondary mt-2 text-right">
            {masjids.length} مسجد في منطقة {REGION_LABELS[typedRegion]} بالرياض
          </p>
        </header>

        {/* Masjid grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {masjids.map((masjid) => (
            <Link key={masjid.id} to={`/masjid/${masjid.id}`}>
              <Card className="h-full hover:border-gold-muted transition-colors">
                <CardContent className="space-y-2">
                  <h2 className="font-semibold text-text-primary text-right">
                    {masjid.masjidName}
                  </h2>
                  <p className="text-sm text-gold text-right">
                    القارئ {masjid.readerName}
                  </p>
                  {masjid.notes && (
                    <p className="text-xs text-text-muted text-right">{masjid.notes}</p>
                  )}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Back to map CTA */}
        <div className="text-center pt-8">
          <Link
            to={`/?region=${typedRegion}`}
            className="inline-flex items-center gap-2 bg-night-medium text-text-primary px-6 py-3 rounded-lg hover:bg-night-soft transition-colors border border-border-subtle"
          >
            <MapPin className="w-4 h-4" />
            عرض على الخريطة
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border-subtle mt-8">
        <div className="max-w-4xl mx-auto px-6 py-6 flex items-center gap-2">
          <Link to="/" className="text-gold hover:text-gold-bright text-sm flex items-center gap-1">
            <ArrowRight className="w-3 h-3" />
            العودة للخريطة
          </Link>
        </div>
      </footer>
    </div>
  )
}
