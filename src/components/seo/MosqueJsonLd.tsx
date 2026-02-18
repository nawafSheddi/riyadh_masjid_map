/**
 * MosqueJsonLd Component
 *
 * Renders schema.org Mosque structured data for a masjid.
 */

import { JsonLd } from './JsonLd'
import { getMasjidUrl } from '@/lib/seo'
import type { Masjid } from '@/types'

interface MosqueJsonLdProps {
  masjid: Masjid
}

export function MosqueJsonLd({ masjid }: MosqueJsonLdProps) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'Mosque',
        name: masjid.masjidName,
        url: getMasjidUrl(masjid.id),
        hasMap: masjid.googleMapsUrl,
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'الرياض',
          addressRegion: 'الرياض',
          addressCountry: 'SA',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: masjid.coordinates.lat,
          longitude: masjid.coordinates.lng,
        },
      }}
    />
  )
}
