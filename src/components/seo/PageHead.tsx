/**
 * PageHead Component
 *
 * Manages document title and meta tags for client-side navigation.
 * On initial page load, the build-time generated HTML already has correct
 * meta tags. This component updates them when navigating within the SPA.
 */

import { useEffect } from 'react'

interface PageHeadProps {
  title: string
  description: string
  canonicalUrl: string
}

export function PageHead({ title, description, canonicalUrl }: PageHeadProps) {
  useEffect(() => {
    document.title = title

    setMetaTag('name', 'description', description)
    setMetaTag('property', 'og:title', title)
    setMetaTag('property', 'og:description', description)
    setMetaTag('property', 'og:url', canonicalUrl)

    setMetaTag('name', 'twitter:title', title)
    setMetaTag('name', 'twitter:description', description)

    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
    if (!link) {
      link = document.createElement('link')
      link.rel = 'canonical'
      document.head.appendChild(link)
    }
    link.href = canonicalUrl
  }, [title, description, canonicalUrl])

  return null
}

function setMetaTag(attr: 'name' | 'property', key: string, content: string) {
  let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.content = content
}
