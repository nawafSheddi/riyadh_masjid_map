import { cn } from '@/lib/utils'
import { IconButton } from '@/components/ui'
import { Play, Pause, Volume2, VolumeX } from '@/design-tokens'

interface AudioPlayerControlsProps {
  isPlaying?: boolean
  isMuted?: boolean
  progress?: number // 0-100
  onPlayPause?: () => void
  onMuteToggle?: () => void
  className?: string
}

export function AudioPlayerControls({
  isPlaying = false,
  isMuted = false,
  progress = 0,
  onPlayPause,
  onMuteToggle,
  className,
}: AudioPlayerControlsProps) {
  return (
    <div className={cn('flex items-center gap-3', className)} dir="rtl">
      {/* Play/Pause button */}
      <IconButton
        icon={isPlaying ? Pause : Play}
        variant="primary"
        size="md"
        label={isPlaying ? 'إيقاف' : 'تشغيل'}
        onClick={onPlayPause}
      />

      {/* Progress bar - fills from right in RTL */}
      <div className="flex-1 h-1.5 bg-night-soft rounded-full overflow-hidden" dir="ltr">
        <div
          className="h-full bg-gold rounded-full transition-all duration-200"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Mute button */}
      <IconButton
        icon={isMuted ? VolumeX : Volume2}
        variant="ghost"
        size="sm"
        label={isMuted ? 'إلغاء كتم الصوت' : 'كتم الصوت'}
        onClick={onMuteToggle}
      />
    </div>
  )
}

// Waveform visualization for mini player
interface WaveformProps {
  isPlaying?: boolean
  className?: string
}

export function Waveform({ isPlaying = false, className }: WaveformProps) {
  return (
    <div className={cn('flex items-center gap-0.5 h-6', className)}>
      {[...Array(7)].map((_, i) => (
        <div
          key={i}
          className={cn(
            'w-1 bg-gold rounded-full transition-all duration-200',
            isPlaying && 'animate-pulse'
          )}
          style={{
            height: `${Math.random() * 100}%`,
            animationDelay: `${i * 100}ms`,
          }}
        />
      ))}
    </div>
  )
}
