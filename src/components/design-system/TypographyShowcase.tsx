import { cn } from '@/lib/utils'

interface TypographyItemProps {
  label: string
  arabicText: string
  className: string
  specs: string
}

function TypographyItem({ label, arabicText, className, specs }: TypographyItemProps) {
  return (
    <div className="flex flex-col gap-2 py-4 border-b border-border-subtle last:border-0">
      <div className="flex justify-between items-center">
        <span className="text-sm text-text-secondary">{label}</span>
        <span className="text-xs text-text-muted font-mono" dir="ltr">{specs}</span>
      </div>
      <p className={cn('text-text-primary text-right', className)}>
        {arabicText}
      </p>
    </div>
  )
}

export function TypographyShowcase() {
  const typographyItems: TypographyItemProps[] = [
    {
      label: 'عنوان رئيسي - H1',
      arabicText: 'بسم الله الرحمن الرحيم',
      className: 'text-4xl font-bold',
      specs: '36px / Bold / 1.2',
    },
    {
      label: 'عنوان ثانوي - H2',
      arabicText: 'مسجد الراجحي الكبير',
      className: 'text-3xl font-semibold',
      specs: '30px / SemiBold / 1.2',
    },
    {
      label: 'عنوان فرعي - H3',
      arabicText: 'الشيخ عبدالرحمن السديس',
      className: 'text-2xl font-semibold',
      specs: '24px / SemiBold / 1.3',
    },
    {
      label: 'عنوان صغير - H4',
      arabicText: 'حي العليا - شمال الرياض',
      className: 'text-xl font-medium',
      specs: '20px / Medium / 1.3',
    },
    {
      label: 'نص كبير - Body Large',
      arabicText: 'اكتشف أفضل المساجد في الرياض خلال شهر رمضان المبارك',
      className: 'text-lg',
      specs: '18px / Regular / 1.5',
    },
    {
      label: 'نص عادي - Body Base',
      arabicText: 'يُنصح بالحضور قبل ١٥ دقيقة من صلاة التراويح خاصة في العشر الأواخر',
      className: 'text-base',
      specs: '16px / Regular / 1.5',
    },
    {
      label: 'نص صغير - Body Small',
      arabicText: 'مواقف واسعة متاحة على بعد ١٠٠ متر من المسجد',
      className: 'text-sm',
      specs: '14px / Regular / 1.5',
    },
    {
      label: 'نص أصغر - Caption',
      arabicText: '٢٬٨٤٧ شخص أعجب بهذا المسجد',
      className: 'text-xs',
      specs: '12px / Regular / 1.4',
    },
  ]

  return (
    <div className="bg-night-deep rounded-xl p-6" dir="rtl">
      <div className="mb-4 flex justify-between items-center">
        <span className="text-sm text-gold">الخط: كايرو</span>
        <span className="text-xs text-text-muted font-mono" dir="ltr">Cairo, sans-serif</span>
      </div>
      {typographyItems.map((item) => (
        <TypographyItem key={item.label} {...item} />
      ))}
    </div>
  )
}
