"use client"

import { useState, useEffect } from 'react'

interface UseExitIntentProps {
  enabled?: boolean
  delay?: number // minimum time on page before showing
  cooldown?: number // cooldown period in localStorage
}

export function useExitIntent({ 
  enabled = true, 
  delay = 10000, // 10 seconds
  cooldown = 24 * 60 * 60 * 1000 // 24 hours
}: UseExitIntentProps = {}) {
  const [shouldShow, setShouldShow] = useState(false)
  const [hasBeenShown, setHasBeenShown] = useState(false)

  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return

    // Check if we've shown this recently
    const lastShown = localStorage.getItem('exitIntentLastShown')
    const now = Date.now()
    
    if (lastShown && now - parseInt(lastShown) < cooldown) {
      return // Still in cooldown period
    }

    let timeoutId: NodeJS.Timeout
    let hasMinTimeElapsed = false

    // Set minimum time delay
    const minTimeTimeout = setTimeout(() => {
      hasMinTimeElapsed = true
    }, delay)

    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger if cursor leaves through the top of viewport
      if (e.clientY <= 0 && hasMinTimeElapsed && !hasBeenShown) {
        setShouldShow(true)
        setHasBeenShown(true)
        localStorage.setItem('exitIntentLastShown', now.toString())
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      // Trigger on Alt+Tab or Ctrl/Cmd+W
      if ((e.altKey && e.key === 'Tab') || 
          ((e.ctrlKey || e.metaKey) && e.key === 'w') && 
          hasMinTimeElapsed && !hasBeenShown) {
        e.preventDefault()
        setShouldShow(true)
        setHasBeenShown(true)
        localStorage.setItem('exitIntentLastShown', now.toString())
      }
    }

    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('keydown', handleKeyDown)
      clearTimeout(minTimeTimeout)
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [enabled, delay, cooldown, hasBeenShown])

  const dismiss = () => {
    setShouldShow(false)
  }

  const reset = () => {
    setHasBeenShown(false)
    setShouldShow(false)
    localStorage.removeItem('exitIntentLastShown')
  }

  return {
    shouldShow,
    dismiss,
    reset,
    hasBeenShown
  }
}