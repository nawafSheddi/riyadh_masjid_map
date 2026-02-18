/**
 * BreadcrumbJsonLd Component
 *
 * Renders schema.org BreadcrumbList structured data.
 */

import { JsonLd } from './JsonLd'
import { SITE_URL } from '@/lib/seo'

export interface BreadcrumbItem {
  name: string
  url?: string
}

interface BreadcrumbJsonLdProps {
  items: BreadcrumbItem[]
}

export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          ...(item.url ? { item: `${SITE_URL}${item.url}` } : {}),
        })),
      }}
    />
  )
}
