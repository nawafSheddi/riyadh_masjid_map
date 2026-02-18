/**
 * NotFoundPage
 *
 * 404 page with link back to the homepage.
 */

import { Link } from 'react-router-dom'
import { PageHead } from '@/components/seo'
import { SITE_URL, SITE_NAME } from '@/lib/seo'
import { ArrowRight } from '@/design-tokens'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-night-deepest flex items-center justify-center" dir="rtl">
      <PageHead
        title={`الصفحة غير موجودة | ${SITE_NAME}`}
        description="الصفحة المطلوبة غير موجودة"
        canonicalUrl={SITE_URL}
      />
      <div className="text-center space-y-6 px-6">
        <p className="text-6xl font-bold text-gold">٤٠٤</p>
        <h1 className="text-2xl font-bold text-text-primary">
          الصفحة غير موجودة
        </h1>
        <p className="text-text-secondary">
          الصفحة التي تبحث عنها غير موجودة أو تم نقلها.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-gold text-night-deepest px-6 py-3 rounded-lg font-medium hover:bg-gold-bright transition-colors"
        >
          <ArrowRight className="w-4 h-4" />
          العودة للخريطة
        </Link>
      </div>
    </div>
  )
}
