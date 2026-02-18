/**
 * MasjidDetailPage
 *
 * Individual masjid page for programmatic SEO.
 * Route: /masjid/:id
 * Generates 148 unique pages with reader info, location, and audio.
 */

import { useParams, Link } from 'react-router-dom'
import { getMasjidById, getRelatedMasjids } from '@/lib/masjid-utils'
import {
  getMasjidTitle,
  getMasjidDescription,
  getMasjidUrl,
  SITE_URL,
} from '@/lib/seo'
import { REGION_LABELS } from '@/constants/map'
import { PageHead, MosqueJsonLd, BreadcrumbJsonLd } from '@/components/seo'
import { RegionBadge, AudioPlayerControls } from '@/components/molecules'
import { Card, CardContent } from '@/components/ui'
import { useAudioPlayer } from '@/hooks/useAudioPlayer'
import { MapPin, ExternalLink, ArrowRight } from '@/design-tokens'

/** Check if a URL is a direct audio file (R2-hosted) */
function isDirectAudioUrl(url: string): boolean {
  return url.includes('masjid.nawaf-alsheddi.com')
}

export default function MasjidDetailPage() {
  const { id } = useParams<{ id: string }>()
  const masjid = getMasjidById(id!)

  if (!masjid) {
    return (
      <div className="min-h-screen bg-night-deepest flex items-center justify-center" dir="rtl">
        <div className="text-center space-y-4">
          <p className="text-text-primary text-xl font-bold">المسجد غير موجود</p>
          <Link to="/" className="text-gold hover:text-gold-bright underline">
            العودة للخريطة
          </Link>
        </div>
      </div>
    )
  }

  const relatedMasjids = getRelatedMasjids(masjid)
  const isAudioFile = isDirectAudioUrl(masjid.audioUrl)

  return (
    <div className="min-h-screen bg-night-deepest" dir="rtl">
      <PageHead
        title={getMasjidTitle(masjid)}
        description={getMasjidDescription(masjid)}
        canonicalUrl={getMasjidUrl(masjid.id)}
      />
      <MosqueJsonLd masjid={masjid} />
      <BreadcrumbJsonLd
        items={[
          { name: 'الرئيسية', url: '/' },
          { name: REGION_LABELS[masjid.region], url: `/region/${masjid.region}` },
          { name: masjid.masjidName },
        ]}
      />

      {/* Navigation bar */}
      <nav className="bg-night-deep border-b border-border-subtle">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-2 text-sm">
          <Link to="/" className="text-gold hover:text-gold-bright">الرئيسية</Link>
          <span className="text-text-muted">/</span>
          <Link
            to={`/region/${masjid.region}`}
            className="text-gold hover:text-gold-bright"
          >
            {REGION_LABELS[masjid.region]}
          </Link>
          <span className="text-text-muted">/</span>
          <span className="text-text-secondary">{masjid.masjidName}</span>
        </div>
      </nav>

      {/* Main content */}
      <main className="max-w-4xl mx-auto px-6 py-8 space-y-8">
        {/* Hero */}
        <header>
          <div className="mb-4">
            <RegionBadge region={masjid.region} />
          </div>
          <h1 className="text-3xl font-bold text-text-primary text-right">
            {masjid.masjidName}
          </h1>
          <h2 className="text-xl text-gold mt-2 text-right">
            القارئ {masjid.readerName}
          </h2>
        </header>

        {/* Location section */}
        <section aria-labelledby="location-heading">
          <h3
            id="location-heading"
            className="text-lg font-semibold text-text-primary mb-4 text-right"
          >
            الموقع
          </h3>
          <Card>
            <CardContent className="space-y-3">
              <p className="flex items-center gap-2 text-text-secondary">
                <MapPin className="w-4 h-4 flex-shrink-0 text-gold" />
                <span>
                  {masjid.coordinates.lat.toFixed(6)}, {masjid.coordinates.lng.toFixed(6)}
                </span>
              </p>
              <a
                href={masjid.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gold text-night-deepest px-4 py-2 rounded-md font-medium hover:bg-gold-bright transition-colors"
              >
                فتح في خرائط جوجل
                <ExternalLink className="w-4 h-4" />
              </a>
            </CardContent>
          </Card>
        </section>

        {/* Audio section */}
        <section aria-labelledby="audio-heading">
          <h3
            id="audio-heading"
            className="text-lg font-semibold text-text-primary mb-4 text-right"
          >
            التلاوة
          </h3>
          <Card>
            <CardContent>
              {isAudioFile ? (
                <AudioPlayerSection audioUrl={masjid.audioUrl} />
              ) : (
                <a
                  href={masjid.audioUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-gold hover:text-gold-bright transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>استماع للتلاوة (رابط خارجي)</span>
                </a>
              )}
            </CardContent>
          </Card>
        </section>

        {/* Notes section */}
        {masjid.notes && (
          <section aria-labelledby="notes-heading">
            <h3
              id="notes-heading"
              className="text-lg font-semibold text-text-primary mb-4 text-right"
            >
              ملاحظات
            </h3>
            <Card>
              <CardContent>
                <p className="text-text-secondary">{masjid.notes}</p>
              </CardContent>
            </Card>
          </section>
        )}

        {/* Back to map CTA */}
        <div className="text-center pt-4">
          <Link
            to={`/?masjid=${masjid.id}`}
            className="inline-flex items-center gap-2 bg-night-medium text-text-primary px-6 py-3 rounded-lg hover:bg-night-soft transition-colors border border-border-subtle"
          >
            <MapPin className="w-4 h-4" />
            عرض على الخريطة
          </Link>
        </div>

        {/* Related masjids */}
        {relatedMasjids.length > 0 && (
          <section aria-labelledby="related-heading">
            <h3
              id="related-heading"
              className="text-lg font-semibold text-text-primary mb-4 text-right"
            >
              مساجد أخرى في {REGION_LABELS[masjid.region]}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedMasjids.map((related) => (
                <Link key={related.id} to={`/masjid/${related.id}`}>
                  <Card className="h-full hover:border-gold-muted transition-colors">
                    <CardContent className="space-y-1">
                      <p className="font-semibold text-text-primary text-right">
                        {related.masjidName}
                      </p>
                      <p className="text-sm text-gold text-right">
                        القارئ {related.readerName}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}
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

/** Audio player wrapper that uses the useAudioPlayer hook */
function AudioPlayerSection({ audioUrl }: { audioUrl: string }) {
  const { isPlaying, isMuted, progress, togglePlayPause, toggleMute } =
    useAudioPlayer(audioUrl)

  return (
    <AudioPlayerControls
      isPlaying={isPlaying}
      isMuted={isMuted}
      progress={progress}
      onPlayPause={togglePlayPause}
      onMuteToggle={toggleMute}
    />
  )
}
