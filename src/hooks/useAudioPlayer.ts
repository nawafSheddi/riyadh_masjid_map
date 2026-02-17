/**
 * useAudioPlayer Hook
 *
 * Wraps the HTML5 Audio API for masjid audio playback.
 */

import { useRef, useState, useEffect, useCallback } from 'react'

interface UseAudioPlayerReturn {
  isPlaying: boolean
  isMuted: boolean
  progress: number
  togglePlayPause: () => void
  toggleMute: () => void
}

export function useAudioPlayer(audioUrl: string): UseAudioPlayerReturn {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [progress, setProgress] = useState(0)

  // Initialize and manage audio element
  useEffect(() => {
    const audio = new Audio(audioUrl)
    audioRef.current = audio

    const handleTimeUpdate = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100)
      }
    }

    const handleEnded = () => {
      setIsPlaying(false)
      setProgress(0)
    }

    const handleError = () => {
      setIsPlaying(false)
      setProgress(0)
    }

    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('ended', handleEnded)
    audio.addEventListener('error', handleError)

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('ended', handleEnded)
      audio.removeEventListener('error', handleError)
      audio.pause()
      audio.src = ''
    }
  }, [audioUrl])

  const togglePlayPause = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      audio.play().catch(() => {
        setIsPlaying(false)
      })
      setIsPlaying(true)
    }
  }, [isPlaying])

  const toggleMute = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.muted = !audio.muted
    setIsMuted(audio.muted)
  }, [])

  return { isPlaying, isMuted, progress, togglePlayPause, toggleMute }
}
