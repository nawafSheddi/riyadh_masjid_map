/**
 * Sample Masjid Data
 *
 * 12 sample masjids across 3 regions for MVP demonstration.
 * Real Riyadh coordinates with realistic Arabic names.
 */

import type { Masjid } from '@/types'

export const SAMPLE_MASJIDS: Masjid[] = [
  // ─── North Region (الشمال) ───
  {
    id: 'n-001',
    readerName: 'الشيخ عبدالرحمن السديس',
    masjidName: 'جامع الراجحي الكبير',
    region: 'north',
    coordinates: { lat: 24.8100, lng: 46.6250 },
    googleMapsUrl: 'https://maps.google.com/?q=24.8100,46.6250',
    audioUrl: 'https://example.com/audio/n-001.mp3',
  },
  {
    id: 'n-002',
    readerName: 'الشيخ ماهر المعيقلي',
    masjidName: 'جامع الملك خالد',
    region: 'north',
    coordinates: { lat: 24.8350, lng: 46.6480 },
    googleMapsUrl: 'https://maps.google.com/?q=24.8350,46.6480',
    audioUrl: 'https://example.com/audio/n-002.mp3',
  },
  {
    id: 'n-003',
    readerName: 'الشيخ بندر بليلة',
    masjidName: 'جامع الياسمين الكبير',
    region: 'north',
    coordinates: { lat: 24.8200, lng: 46.6700 },
    googleMapsUrl: 'https://maps.google.com/?q=24.8200,46.6700',
    audioUrl: 'https://example.com/audio/n-003.mp3',
    notes: 'مواقف واسعة متاحة',
  },
  {
    id: 'n-004',
    readerName: 'الشيخ ياسر الدوسري',
    masjidName: 'جامع النخيل',
    region: 'north',
    coordinates: { lat: 24.7900, lng: 46.6100 },
    googleMapsUrl: 'https://maps.google.com/?q=24.7900,46.6100',
    audioUrl: 'https://example.com/audio/n-004.mp3',
  },

  // ─── East Region (الشرق) ───
  {
    id: 'e-001',
    readerName: 'الشيخ عبدالله الجهني',
    masjidName: 'جامع الروضة الكبير',
    region: 'east',
    coordinates: { lat: 24.7250, lng: 46.7500 },
    googleMapsUrl: 'https://maps.google.com/?q=24.7250,46.7500',
    audioUrl: 'https://example.com/audio/e-001.mp3',
  },
  {
    id: 'e-002',
    readerName: 'الشيخ فيصل الغزاوي',
    masjidName: 'جامع النهضة',
    region: 'east',
    coordinates: { lat: 24.7400, lng: 46.7800 },
    googleMapsUrl: 'https://maps.google.com/?q=24.7400,46.7800',
    audioUrl: 'https://example.com/audio/e-002.mp3',
    notes: 'يُنصح بالحضور مبكراً',
  },
  {
    id: 'e-003',
    readerName: 'الشيخ خالد الغامدي',
    masjidName: 'جامع الحمراء',
    region: 'east',
    coordinates: { lat: 24.7100, lng: 46.7600 },
    googleMapsUrl: 'https://maps.google.com/?q=24.7100,46.7600',
    audioUrl: 'https://example.com/audio/e-003.mp3',
  },
  {
    id: 'e-004',
    readerName: 'الشيخ سعود الشريم',
    masjidName: 'جامع الريان',
    region: 'east',
    coordinates: { lat: 24.7350, lng: 46.7300 },
    googleMapsUrl: 'https://maps.google.com/?q=24.7350,46.7300',
    audioUrl: 'https://example.com/audio/e-004.mp3',
  },

  // ─── West & South Region (الغرب والجنوب) ───
  {
    id: 'ws-001',
    readerName: 'الشيخ محمد اللحيدان',
    masjidName: 'جامع الشفا الكبير',
    region: 'westSouth',
    coordinates: { lat: 24.6300, lng: 46.6500 },
    googleMapsUrl: 'https://maps.google.com/?q=24.6300,46.6500',
    audioUrl: 'https://example.com/audio/ws-001.mp3',
  },
  {
    id: 'ws-002',
    readerName: 'الشيخ ناصر القطامي',
    masjidName: 'جامع عرقة',
    region: 'westSouth',
    coordinates: { lat: 24.6800, lng: 46.5900 },
    googleMapsUrl: 'https://maps.google.com/?q=24.6800,46.5900',
    audioUrl: 'https://example.com/audio/ws-002.mp3',
    notes: 'تجربة صوتية مميزة',
  },
  {
    id: 'ws-003',
    readerName: 'الشيخ عادل الكلباني',
    masjidName: 'جامع السويدي الكبير',
    region: 'westSouth',
    coordinates: { lat: 24.6500, lng: 46.6200 },
    googleMapsUrl: 'https://maps.google.com/?q=24.6500,46.6200',
    audioUrl: 'https://example.com/audio/ws-003.mp3',
  },
  {
    id: 'ws-004',
    readerName: 'الشيخ أحمد الحذيفي',
    masjidName: 'جامع السلاي',
    region: 'westSouth',
    coordinates: { lat: 24.6100, lng: 46.6700 },
    googleMapsUrl: 'https://maps.google.com/?q=24.6100,46.6700',
    audioUrl: 'https://example.com/audio/ws-004.mp3',
  },
]
