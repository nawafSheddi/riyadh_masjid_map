/**
 * SEO Utilities
 *
 * Constants and helper functions for generating SEO metadata
 * (titles, descriptions, URLs, etc.) across pages and the build script.
 */

import { REGION_LABELS } from '@/constants/map'
import type { Masjid, Region } from '@/types'

export const SITE_URL = 'https://masajid.nawaf-alsheddi.com'
export const SITE_NAME = 'خريطة مساجد الرياض'
export const SITE_DESCRIPTION =
  'اكتشف ١٤٨ مسجداً في الرياض مع أسماء القراء وعينات التلاوة الصوتية. خريطة تفاعلية مع التصفية حسب المنطقة'

export function getMasjidUrl(id: string): string {
  return `${SITE_URL}/masjid/${id}`
}

export function getRegionUrl(region: Region): string {
  return `${SITE_URL}/region/${region}`
}

export function getMasjidTitle(masjid: Masjid): string {
  return `${masjid.masjidName} - القارئ ${masjid.readerName} | ${SITE_NAME}`
}

export function getMasjidDescription(masjid: Masjid): string {
  const regionLabel = REGION_LABELS[masjid.region]
  return `${masjid.masjidName} في ${regionLabel} بالرياض - القارئ ${masjid.readerName}. استمع للتلاوة واعرف الموقع على الخريطة.`
}

export function getRegionTitle(region: Region): string {
  return `مساجد ${REGION_LABELS[region]} | ${SITE_NAME}`
}

export function getRegionDescription(region: Region, count: number): string {
  return `اكتشف ${count} مسجد في منطقة ${REGION_LABELS[region]} بالرياض مع معلومات القراء وعينات التلاوة والمواقع على الخريطة.`
}
