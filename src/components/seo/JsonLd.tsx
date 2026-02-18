/**
 * JsonLd Component
 *
 * Renders a JSON-LD structured data script tag.
 * Safe: data is always application-controlled (masjid data, not user input).
 */

interface JsonLdProps {
  data: Record<string, unknown>
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
