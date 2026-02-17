/**
 * SettingsSheet Organism
 *
 * Bottom sheet overlay for app settings.
 */

import { cn } from '@/lib/utils'
import { IconButton } from '@/components/ui'
import { X } from '@/design-tokens'
import { UI_CONSTANTS } from '@/constants/ui'

interface SettingsSheetProps {
  isOpen: boolean
  onClose: () => void
}

export function SettingsSheet({ isOpen, onClose }: SettingsSheetProps) {
  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          'fixed inset-0 bg-black/40 transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        style={{ zIndex: UI_CONSTANTS.Z_INDEX.MODAL_BACKDROP }}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sheet */}
      <div
        className={cn(
          'fixed bottom-0 left-0 right-0',
          'bg-night-deep rounded-t-2xl border-t border-x border-border-subtle',
          'shadow-elevated',
          'transition-transform duration-300 ease-out',
          isOpen ? 'translate-y-0' : 'translate-y-full'
        )}
        style={{ zIndex: UI_CONSTANTS.Z_INDEX.MODAL }}
        dir="rtl"
        role="dialog"
        aria-label="الإعدادات"
        aria-hidden={!isOpen}
      >
        {/* Drag Handle */}
        <div className="flex justify-center py-3">
          <div className="w-10 h-1 bg-night-soft rounded-full" />
        </div>

        <div className="px-6 pb-6 space-y-4">
          {/* Header */}
          <div className="flex items-center gap-4">
            <h3 className="flex-1 text-xl font-bold text-text-primary text-right">
              الإعدادات
            </h3>
            <IconButton
              icon={X}
              variant="ghost"
              size="sm"
              label="إغلاق"
              onClick={onClose}
            />
          </div>

          {/* About */}
          <div className="space-y-2 pt-2 border-t border-border-subtle">
            <h4 className="text-sm font-semibold text-gold text-right">عن التطبيق</h4>
            <p className="text-sm text-text-secondary text-right">
              خريطة تفاعلية لمساجد الرياض مع معلومات القراء وعينات صوتية لتراويح رمضان.
            </p>
            <p className="text-sm text-text-secondary text-right">
              يضم التطبيق ١٤٨ مسجداً في ٣ مناطق.
            </p>
          </div>

          {/* Version */}
          <div className="pt-2 border-t border-border-subtle">
            <p className="text-xs text-text-muted text-center">
              الإصدار ١.٠.٠
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
