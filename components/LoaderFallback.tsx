"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Shield, MapPin } from "lucide-react"

export function LoaderFallback() {
  const containerRef = useRef<HTMLDivElement>(null)
  const shieldRef = useRef<HTMLDivElement>(null)
  const circuitRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // GSAP animation for SVG fallback
    const tl = gsap.timeline({ repeat: -1 })

    // Shield gentle pulse
    tl.to(shieldRef.current, {
      scale: 1.1,
      duration: 1.5,
      ease: "power2.inOut",
      yoyo: true,
      repeat: 1,
    })

    // Circuit lines glow animation
    tl.to(
      circuitRef.current,
      {
        opacity: 0.3,
        duration: 0.8,
        ease: "power2.inOut",
        yoyo: true,
        repeat: 1,
      },
      0,
    )

    // Rotation animation
    gsap.to(containerRef.current, {
      rotation: 360,
      duration: 8,
      ease: "none",
      repeat: -1,
    })

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <div ref={containerRef} className="w-full h-full flex items-center justify-center relative">
      {/* Shield background */}
      <div
        ref={shieldRef}
        className="absolute inset-0 flex items-center justify-center text-primary"
        style={{ filter: "drop-shadow(0 0 10px rgba(30, 58, 138, 0.3))" }}
      >
        <Shield size={80} strokeWidth={1.5} />
      </div>

      {/* Map pin in center */}
      <div className="absolute inset-0 flex items-center justify-center text-secondary z-10">
        <MapPin size={32} strokeWidth={2} fill="currentColor" />
      </div>

      {/* Circuit pattern overlay */}
      <div ref={circuitRef} className="absolute inset-0 opacity-60">
        <svg width="100%" height="100%" viewBox="0 0 128 128" className="text-secondary">
          <defs>
            <pattern id="circuit" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
              <path
                d="M8 8h16v16H8V8zm0 16h16v16H8V24z"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                opacity="0.3"
              />
              <circle cx="16" cy="16" r="1" fill="currentColor" opacity="0.6" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit)" />
        </svg>
      </div>

      {/* Outer glow ring */}
      <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-pulse" />
    </div>
  )
}
