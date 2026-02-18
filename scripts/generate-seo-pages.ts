/**
 * Build-Time SEO Page Generator
 *
 * Runs after `vite build` to generate static HTML files for every
 * masjid and region page. Each HTML file has full SEO content visible
 * to crawlers, plus the SPA bundle for interactive user experience.
 *
 * Generates:
 *   - 148 masjid pages at dist/masjid/{id}/index.html
 *   - 3 region pages at dist/region/{region}/index.html
 *   - 1 sitemap at dist/sitemap.xml
 *   - Updates dist/index.html with seo-content div
 *
 * Usage: tsx scripts/generate-seo-pages.ts
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs'
import { resolve, dirname } from 'path'

// ── Data (duplicated from src to avoid TS path alias issues in scripts) ──

interface Masjid {
  id: string
  readerName: string
  masjidName: string
  region: 'north' | 'east' | 'westSouth'
  coordinates: { lat: number; lng: number }
  googleMapsUrl: string
  audioUrl: string
  notes?: string
}

const SITE_URL = 'https://masajid.nawaf-alsheddi.com'
const SITE_NAME = 'خريطة مساجد الرياض'

const REGION_LABELS: Record<string, string> = {
  north: 'الشمال',
  east: 'الشرق',
  westSouth: 'الغرب والجنوب',
}

const DIST_DIR = resolve(globalThis.process.cwd(), 'dist')

// ── Load masjid data from the source file ──

function loadMasjids(): Masjid[] {
  const dataFile = resolve(globalThis.process.cwd(), 'src/data/masjids.ts')
  const content = readFileSync(dataFile, 'utf-8')

  // Extract the array content between the first [ and last ]
  const arrayStart = content.indexOf('[')
  const arrayEnd = content.lastIndexOf(']') + 1
  const arrayStr = content.slice(arrayStart, arrayEnd)

  // Convert TypeScript object literals to valid JSON:
  // - Remove single-line comments
  // - Quote unquoted keys
  // - Remove trailing commas
  // - Convert single-quoted strings to double-quoted
  let jsonStr = arrayStr
    // Remove single-line comments
    .replace(/\/\/[^\n]*/g, '')
    // Quote unquoted object keys (word characters followed by colon)
    .replace(/(\s)(\w+)\s*:/g, '$1"$2":')
    // Remove trailing commas before } or ]
    .replace(/,\s*([\]}])/g, '$1')
    // Handle 'single-quoted' strings to "double-quoted"
    .replace(/'([^']*)'/g, '"$1"')

  try {
    return JSON.parse(jsonStr)
  } catch {
    console.error('Failed to parse masjid data. Falling back to regex extraction.')
    return extractMasjidsViaRegex(content)
  }
}

/** Fallback: extract masjid data via regex if JSON parse fails */
function extractMasjidsViaRegex(content: string): Masjid[] {
  const masjids: Masjid[] = []
  const entryRegex = /\{[^}]*id:\s*'([^']+)'[^}]*readerName:\s*'([^']+)'[^}]*masjidName:\s*'([^']+)'[^}]*region:\s*'([^']+)'[^}]*coordinates:\s*\{\s*lat:\s*([\d.]+),\s*lng:\s*([\d.]+)\s*\}[^}]*googleMapsUrl:\s*'([^']+)'[^}]*audioUrl:\s*'([^']+)'[^}]*(?:notes:\s*'([^']*)')?[^}]*\}/g

  let match
  while ((match = entryRegex.exec(content)) !== null) {
    masjids.push({
      id: match[1],
      readerName: match[2],
      masjidName: match[3],
      region: match[4] as Masjid['region'],
      coordinates: { lat: parseFloat(match[5]), lng: parseFloat(match[6]) },
      googleMapsUrl: match[7],
      audioUrl: match[8],
      notes: match[9] || undefined,
    })
  }

  return masjids
}

// ── HTML Template helpers ──

function extractAssetTags(html: string): { cssTags: string; jsTags: string } {
  const cssMatches = html.match(/<link[^>]*rel="stylesheet"[^>]*>/g) || []
  const jsMatches = html.match(/<script[^>]*src="[^"]*"[^>]*><\/script>/g) || []
  return {
    cssTags: cssMatches.join('\n    '),
    jsTags: jsMatches.join('\n    '),
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function generatePageHtml(options: {
  title: string
  description: string
  canonicalUrl: string
  jsonLd: object[]
  bodyContent: string
  cssTags: string
  jsTags: string
}): string {
  const { title, description, canonicalUrl, jsonLd, bodyContent, cssTags, jsTags } = options

  const jsonLdScripts = jsonLd
    .map((data) => `    <script type="application/ld+json">${JSON.stringify(data)}</script>`)
    .join('\n')

  return `<!DOCTYPE html>
<html lang="ar" dir="rtl">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/assets/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <link rel="canonical" href="${canonicalUrl}" />
    <meta name="theme-color" content="#0a0f1a" />
    <!-- Open Graph -->
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta property="og:locale" content="ar_SA" />
    <meta property="og:site_name" content="${escapeHtml(SITE_NAME)}" />
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(title)}" />
    <meta name="twitter:description" content="${escapeHtml(description)}" />
    <!-- Structured Data -->
${jsonLdScripts}
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700&display=swap" rel="stylesheet">
    <!-- Assets -->
    ${cssTags}
  </head>
  <body>
    <div id="seo-content" style="font-family: Cairo, sans-serif; background: #0a0f1a; color: #f8fafc; min-height: 100vh;">
${bodyContent}
    </div>
    <div id="root"></div>
    ${jsTags}
  </body>
</html>`
}

// ── Masjid Page Generator ──

function generateMasjidPage(masjid: Masjid, allData: Masjid[], cssTags: string, jsTags: string): string {
  const regionLabel = REGION_LABELS[masjid.region]
  const title = `${masjid.masjidName} - القارئ ${masjid.readerName} | ${SITE_NAME}`
  const description = `${masjid.masjidName} في ${regionLabel} بالرياض - القارئ ${masjid.readerName}. استمع للتلاوة واعرف الموقع على الخريطة.`
  const canonicalUrl = `${SITE_URL}/masjid/${masjid.id}`

  // Get related masjids (same region, different id)
  const related = allData
    .filter((m) => m.region === masjid.region && m.id !== masjid.id)
    .slice(0, 4)

  const relatedHtml = related
    .map(
      (r) =>
        `        <a href="/masjid/${r.id}" style="display:block; padding:16px; background:#0f172a; border:1px solid rgba(255,255,255,0.08); border-radius:12px; text-decoration:none; color:inherit;">
          <p style="font-weight:600; color:#f8fafc; margin:0 0 4px 0;">${escapeHtml(r.masjidName)}</p>
          <p style="font-size:14px; color:#d4a853; margin:0;">القارئ ${escapeHtml(r.readerName)}</p>
        </a>`
    )
    .join('\n')

  const bodyContent = `      <div style="max-width:896px; margin:0 auto; padding:32px 24px;">
        <!-- Breadcrumbs -->
        <nav style="font-size:14px; margin-bottom:32px; color:#64748b;">
          <a href="/" style="color:#d4a853; text-decoration:none;">الرئيسية</a>
          <span> / </span>
          <a href="/region/${masjid.region}" style="color:#d4a853; text-decoration:none;">${escapeHtml(regionLabel)}</a>
          <span> / </span>
          <span style="color:#cbd5e1;">${escapeHtml(masjid.masjidName)}</span>
        </nav>
        <!-- Hero -->
        <h1 style="font-size:28px; font-weight:700; margin:0 0 8px 0;">${escapeHtml(masjid.masjidName)}</h1>
        <h2 style="font-size:20px; color:#d4a853; font-weight:400; margin:0 0 24px 0;">القارئ ${escapeHtml(masjid.readerName)}</h2>
        <!-- Location -->
        <section style="margin-bottom:24px;">
          <h3 style="font-size:18px; font-weight:600; margin:0 0 12px 0;">الموقع</h3>
          <p style="color:#cbd5e1; margin:0 0 12px 0;">الإحداثيات: ${masjid.coordinates.lat.toFixed(6)}, ${masjid.coordinates.lng.toFixed(6)}</p>
          <a href="${escapeHtml(masjid.googleMapsUrl)}" target="_blank" rel="noopener noreferrer" style="display:inline-block; background:#d4a853; color:#0a0f1a; padding:8px 16px; border-radius:8px; text-decoration:none; font-weight:500;">فتح في خرائط جوجل</a>
        </section>
        <!-- Audio -->
        <section style="margin-bottom:24px;">
          <h3 style="font-size:18px; font-weight:600; margin:0 0 12px 0;">التلاوة</h3>
          <a href="${escapeHtml(masjid.audioUrl)}" target="_blank" rel="noopener noreferrer" style="color:#d4a853; text-decoration:none;">استماع للتلاوة</a>
        </section>${masjid.notes ? `
        <!-- Notes -->
        <section style="margin-bottom:24px;">
          <h3 style="font-size:18px; font-weight:600; margin:0 0 12px 0;">ملاحظات</h3>
          <p style="color:#cbd5e1;">${escapeHtml(masjid.notes)}</p>
        </section>` : ''}
        <!-- CTA -->
        <div style="text-align:center; margin:32px 0;">
          <a href="/?masjid=${masjid.id}" style="display:inline-block; background:#1e293b; color:#f8fafc; padding:12px 24px; border-radius:12px; text-decoration:none; border:1px solid rgba(255,255,255,0.08);">عرض على الخريطة</a>
        </div>
        <!-- Related -->
        ${related.length > 0 ? `<section>
          <h3 style="font-size:18px; font-weight:600; margin:0 0 16px 0;">مساجد أخرى في ${escapeHtml(regionLabel)}</h3>
          <div style="display:grid; grid-template-columns:repeat(auto-fill,minmax(250px,1fr)); gap:16px;">
${relatedHtml}
          </div>
        </section>` : ''}
      </div>`

  const mosqueSchema = {
    '@context': 'https://schema.org',
    '@type': 'Mosque',
    name: masjid.masjidName,
    url: canonicalUrl,
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
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'الرئيسية', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: regionLabel, item: `${SITE_URL}/region/${masjid.region}` },
      { '@type': 'ListItem', position: 3, name: masjid.masjidName },
    ],
  }

  return generatePageHtml({
    title,
    description,
    canonicalUrl,
    jsonLd: [mosqueSchema, breadcrumbSchema],
    bodyContent,
    cssTags,
    jsTags,
  })
}

// ── Region Page Generator ──

function generateRegionPage(
  region: string,
  masjids: Masjid[],
  cssTags: string,
  jsTags: string
): string {
  const regionLabel = REGION_LABELS[region]
  const title = `مساجد ${regionLabel} | ${SITE_NAME}`
  const description = `اكتشف ${masjids.length} مسجد في منطقة ${regionLabel} بالرياض مع معلومات القراء وعينات التلاوة والمواقع على الخريطة.`
  const canonicalUrl = `${SITE_URL}/region/${region}`

  const masjidListHtml = masjids
    .map(
      (m) =>
        `          <a href="/masjid/${m.id}" style="display:block; padding:16px; background:#0f172a; border:1px solid rgba(255,255,255,0.08); border-radius:12px; text-decoration:none; color:inherit;">
            <h2 style="font-size:16px; font-weight:600; color:#f8fafc; margin:0 0 4px 0;">${escapeHtml(m.masjidName)}</h2>
            <p style="font-size:14px; color:#d4a853; margin:0;">القارئ ${escapeHtml(m.readerName)}</p>${m.notes ? `
            <p style="font-size:12px; color:#64748b; margin:4px 0 0 0;">${escapeHtml(m.notes)}</p>` : ''}
          </a>`
    )
    .join('\n')

  const bodyContent = `      <div style="max-width:896px; margin:0 auto; padding:32px 24px;">
        <!-- Breadcrumbs -->
        <nav style="font-size:14px; margin-bottom:32px; color:#64748b;">
          <a href="/" style="color:#d4a853; text-decoration:none;">الرئيسية</a>
          <span> / </span>
          <span style="color:#cbd5e1;">${escapeHtml(regionLabel)}</span>
        </nav>
        <!-- Hero -->
        <h1 style="font-size:28px; font-weight:700; margin:0 0 8px 0;">مساجد ${escapeHtml(regionLabel)}</h1>
        <p style="color:#cbd5e1; margin:0 0 32px 0;">${masjids.length} مسجد في منطقة ${escapeHtml(regionLabel)} بالرياض</p>
        <!-- Masjid List -->
        <div style="display:grid; grid-template-columns:repeat(auto-fill,minmax(250px,1fr)); gap:16px;">
${masjidListHtml}
        </div>
        <!-- CTA -->
        <div style="text-align:center; margin:32px 0;">
          <a href="/?region=${region}" style="display:inline-block; background:#1e293b; color:#f8fafc; padding:12px 24px; border-radius:12px; text-decoration:none; border:1px solid rgba(255,255,255,0.08);">عرض على الخريطة</a>
        </div>
      </div>`

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'الرئيسية', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: regionLabel },
    ],
  }

  return generatePageHtml({
    title,
    description,
    canonicalUrl,
    jsonLd: [breadcrumbSchema],
    bodyContent,
    cssTags,
    jsTags,
  })
}

// ── Sitemap Generator ──

function generateSitemap(masjids: Masjid[]): string {
  const today = new Date().toISOString().split('T')[0]
  const regions = ['north', 'east', 'westSouth']

  const urls = [
    { loc: '/', priority: '1.0', changefreq: 'weekly' },
    ...regions.map((r) => ({
      loc: `/region/${r}`,
      priority: '0.8',
      changefreq: 'weekly',
    })),
    ...masjids.map((m) => ({
      loc: `/masjid/${m.id}`,
      priority: '0.6',
      changefreq: 'monthly',
    })),
  ]

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${SITE_URL}${u.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`
}

// ── Homepage Enhancement ──

function enhanceHomepage(html: string): string {
  // Add seo-content div with links to regions before the root div
  const seoContent = `    <div id="seo-content" style="font-family: Cairo, sans-serif; background: #0a0f1a; color: #f8fafc; padding: 32px 24px; text-align: center;">
      <h2 style="font-size: 20px; font-weight: 600; margin: 0 0 16px 0;">تصفح حسب المنطقة</h2>
      <nav style="display: flex; justify-content: center; gap: 16px; flex-wrap: wrap;">
        <a href="/region/north" style="color: #10b981; text-decoration: none; padding: 8px 16px; border: 1px solid #10b981; border-radius: 8px;">الشمال</a>
        <a href="/region/east" style="color: #3b82f6; text-decoration: none; padding: 8px 16px; border: 1px solid #3b82f6; border-radius: 8px;">الشرق</a>
        <a href="/region/westSouth" style="color: #f59e0b; text-decoration: none; padding: 8px 16px; border: 1px solid #f59e0b; border-radius: 8px;">الغرب والجنوب</a>
      </nav>
      <p style="color: #cbd5e1; margin: 16px 0 0 0; font-size: 14px;">١٤٨ مسجد في ٣ مناطق بالرياض</p>
    </div>
`

  return html.replace('<div id="root"></div>', seoContent + '    <div id="root"></div>')
}

// ── Write helper ──

function writeFile(filePath: string, content: string): void {
  const dir = dirname(filePath)
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true })
  }
  writeFileSync(filePath, content, 'utf-8')
}

// ── Main ──

function main() {
  console.log('Generating SEO pages...\n')

  // Load masjid data
  const allMasjids = loadMasjids()
  console.log(`  Loaded ${allMasjids.length} masjids`)

  if (allMasjids.length === 0) {
    console.error('  ERROR: No masjid data found. Aborting.')
    throw new Error('No masjid data found')
  }

  // Read the built index.html to extract asset tags
  const indexHtml = readFileSync(resolve(DIST_DIR, 'index.html'), 'utf-8')
  const { cssTags, jsTags } = extractAssetTags(indexHtml)

  // Enhance homepage with seo-content
  const enhancedIndex = enhanceHomepage(indexHtml)
  writeFile(resolve(DIST_DIR, 'index.html'), enhancedIndex)
  console.log('  Enhanced homepage with SEO content')

  // Generate masjid pages
  let masjidCount = 0
  for (const masjid of allMasjids) {
    const html = generateMasjidPage(masjid, allMasjids, cssTags, jsTags)
    writeFile(resolve(DIST_DIR, 'masjid', masjid.id, 'index.html'), html)
    masjidCount++
  }
  console.log(`  Generated ${masjidCount} masjid pages`)

  // Generate region pages
  const regions = ['north', 'east', 'westSouth'] as const
  for (const region of regions) {
    const regionMasjids = allMasjids.filter((m) => m.region === region)
    const html = generateRegionPage(region, regionMasjids, cssTags, jsTags)
    writeFile(resolve(DIST_DIR, 'region', region, 'index.html'), html)
  }
  console.log(`  Generated ${regions.length} region pages`)

  // Generate sitemap
  const sitemap = generateSitemap(allMasjids)
  writeFile(resolve(DIST_DIR, 'sitemap.xml'), sitemap)
  const totalUrls = 1 + regions.length + allMasjids.length
  console.log(`  Generated sitemap.xml with ${totalUrls} URLs`)

  console.log(`\n  Total: ${1 + masjidCount + regions.length} HTML pages + sitemap`)
  console.log('  Done!')
}

main()
