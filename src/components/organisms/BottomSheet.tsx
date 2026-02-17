/**
 * BottomSheet Organism
 *
 * Interactive, data-driven bottom sheet that slides up when a masjid is selected.
 * Shows reader info, audio controls, and navigation.
 */

import { cn } from '@/lib/utils'
import { IconButton } from '@/components/ui'
import { RegionBadge, AudioPlayerControls } from '@/components/molecules'
import { X, Navigation, MapPin, ExternalLink } from '@/design-tokens'
import { useAudioPlayer } from '@/hooks/useAudioPlayer'
import { UI_CONSTANTS } from '@/constants/ui'
import type { Masjid } from '@/types'

/** Check if a URL is a direct audio file (R2-hosted) vs an external page link */
function isDirectAudioUrl(url: string): boolean {
  return url.includes('masjid.nawaf-alsheddi.com')
}

interface BottomSheetProps {
  masjid: Masjid | null
  isOpen: boolean
  onClose: () => void
}

export function BottomSheet({ masjid, isOpen, onClose }: BottomSheetProps) {
  const isVisible = isOpen && masjid !== null

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          'fixed inset-0 bg-black/40 transition-opacity duration-300',
          isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
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
          isVisible ? 'translate-y-0' : 'translate-y-full'
        )}
        style={{ zIndex: UI_CONSTANTS.Z_INDEX.MODAL }}
        dir="rtl"
        role="dialog"
        aria-label="تفاصيل المسجد"
        aria-hidden={!isVisible}
      >
        {/* Drag Handle */}
        <div className="flex justify-center py-3">
          <div className="w-10 h-1 bg-night-soft rounded-full" />
        </div>

        {masjid && <BottomSheetContent masjid={masjid} onClose={onClose} />}
      </div>
    </>
  )
}

function BottomSheetContent({
  masjid,
  onClose,
}: {
  masjid: Masjid
  onClose: () => void
}) {
  const isAudioFile = isDirectAudioUrl(masjid.audioUrl)
  const { isPlaying, isMuted, progress, togglePlayPause, toggleMute } =
    useAudioPlayer(isAudioFile ? masjid.audioUrl : '')

  const handleNavigate = () => {
    window.open(masjid.googleMapsUrl, '_blank', 'noopener,noreferrer')
  }

  const handleOpenAudioLink = () => {
    window.open(masjid.audioUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="px-6 pb-6 space-y-4">
      {/* Header: Reader Name + Close */}
      <div className="flex items-start gap-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-text-primary text-right">
            {masjid.readerName}
          </h3>
          <p className="text-sm text-text-secondary text-right">القارئ</p>
        </div>
        <IconButton
          icon={X}
          variant="ghost"
          size="sm"
          label="إغلاق"
          onClick={onClose}
        />
      </div>

      {/* Masjid Name + Navigate */}
      <div className="flex items-start gap-4">
        <div className="flex-1">
          <h4 className="text-lg font-semibold text-text-primary text-right">
            {masjid.masjidName}
          </h4>
          <p className="text-sm text-text-secondary flex items-center gap-1">
            <MapPin className="w-3 h-3 flex-shrink-0" />
            <span>{masjid.masjidName}</span>
          </p>
        </div>
        <IconButton
          icon={Navigation}
          variant="primary"
          size="md"
          label="فتح في الخرائط"
          onClick={handleNavigate}
        />
      </div>

      {/* Region Badge */}
      <div className="flex gap-2 flex-wrap">
        <RegionBadge region={masjid.region} />
      </div>

      {/* Audio: inline player for R2 files, external link button for others */}
      {isAudioFile ? (
        <AudioPlayerControls
          isPlaying={isPlaying}
          isMuted={isMuted}
          progress={progress}
          onPlayPause={togglePlayPause}
          onMuteToggle={toggleMute}
          className="pt-2"
        />
      ) : (
        <div className="flex items-center gap-3 pt-2" dir="rtl">
          <IconButton
            icon={ExternalLink}
            variant="primary"
            size="md"
            label="استماع للتلاوة"
            onClick={handleOpenAudioLink}
          />
          <span className="text-sm text-text-secondary">استماع للتلاوة (رابط خارجي)</span>
        </div>
      )}

      {/* Notes */}
      {masjid.notes && (
        <p className="text-sm text-text-secondary text-right pt-2 border-t border-border-subtle">
          {masjid.notes}
        </p>
      )}
    </div>
  )
}
