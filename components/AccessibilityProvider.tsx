"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

interface AccessibilityContextType {
  highContrast: boolean
  reducedMotion: boolean
  screenReaderOptimized: boolean
  fontSize: "normal" | "large" | "extra-large"
  setHighContrast: (enabled: boolean) => void
  setReducedMotion: (enabled: boolean) => void
  setScreenReaderOptimized: (enabled: boolean) => void
  setFontSize: (size: "normal" | "large" | "extra-large") => void
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined)

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [highContrast, setHighContrast] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [screenReaderOptimized, setScreenReaderOptimized] = useState(false)
  const [fontSize, setFontSize] = useState<"normal" | "large" | "extra-large">("normal")

  useEffect(() => {
    // Check for user's system preferences
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const prefersHighContrast = window.matchMedia("(prefers-contrast: high)").matches

    if (prefersReducedMotion) {
      setReducedMotion(true)
      document.documentElement.classList.add("reduce-motion")
    }

    if (prefersHighContrast) {
      setHighContrast(true)
      document.documentElement.classList.add("high-contrast")
    }

    // Load saved preferences
    const savedPrefs = localStorage.getItem("accessibility-preferences")
    if (savedPrefs) {
      try {
        const prefs = JSON.parse(savedPrefs)
        if (prefs.highContrast) {
          setHighContrast(true)
          document.documentElement.classList.add("high-contrast")
        }
        if (prefs.reducedMotion) {
          setReducedMotion(true)
          document.documentElement.classList.add("reduce-motion")
        }
        if (prefs.screenReaderOptimized) {
          setScreenReaderOptimized(true)
          document.documentElement.classList.add("screen-reader-optimized")
        }
        if (prefs.fontSize) {
          setFontSize(prefs.fontSize)
          document.documentElement.classList.add(`font-size-${prefs.fontSize}`)
        }
      } catch (error) {
        console.error("Failed to load accessibility preferences:", error)
      }
    }
  }, [])

  useEffect(() => {
    // Save preferences to localStorage
    const preferences = {
      highContrast,
      reducedMotion,
      screenReaderOptimized,
      fontSize,
    }
    localStorage.setItem("accessibility-preferences", JSON.stringify(preferences))
  }, [highContrast, reducedMotion, screenReaderOptimized, fontSize])

  const handleHighContrastChange = (enabled: boolean) => {
    setHighContrast(enabled)
    if (enabled) {
      document.documentElement.classList.add("high-contrast")
    } else {
      document.documentElement.classList.remove("high-contrast")
    }
  }

  const handleReducedMotionChange = (enabled: boolean) => {
    setReducedMotion(enabled)
    if (enabled) {
      document.documentElement.classList.add("reduce-motion")
    } else {
      document.documentElement.classList.remove("reduce-motion")
    }
  }

  const handleScreenReaderChange = (enabled: boolean) => {
    setScreenReaderOptimized(enabled)
    if (enabled) {
      document.documentElement.classList.add("screen-reader-optimized")
    } else {
      document.documentElement.classList.remove("screen-reader-optimized")
    }
  }

  const handleFontSizeChange = (size: "normal" | "large" | "extra-large") => {
    // Remove existing font size classes
    document.documentElement.classList.remove("font-size-normal", "font-size-large", "font-size-extra-large")
    setFontSize(size)
    document.documentElement.classList.add(`font-size-${size}`)
  }

  return (
    <AccessibilityContext.Provider
      value={{
        highContrast,
        reducedMotion,
        screenReaderOptimized,
        fontSize,
        setHighContrast: handleHighContrastChange,
        setReducedMotion: handleReducedMotionChange,
        setScreenReaderOptimized: handleScreenReaderChange,
        setFontSize: handleFontSizeChange,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  )
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext)
  if (context === undefined) {
    throw new Error("useAccessibility must be used within an AccessibilityProvider")
  }
  return context
}
