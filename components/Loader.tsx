"use client"

import { useEffect, useRef, useState } from "react"
import { Canvas } from "@react-three/fiber"
import { Suspense } from "react"
import { gsap } from "gsap"
import { Scene3D } from "./Scene3D"
import { LoaderFallback } from "./LoaderFallback"

interface LoaderProps {
  onLoaded: () => void
}

export function Loader({ onLoaded }: LoaderProps) {
  const [progress, setProgress] = useState(0)
  const [isWebGLSupported, setIsWebGLSupported] = useState(true)
  const loaderRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLSpanElement>(null)
  const captionRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    // Check WebGL support
    const canvas = document.createElement("canvas")
    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl")
    if (!gl) {
      setIsWebGLSupported(false)
    }

    // GSAP entrance animation timeline
    const tl = gsap.timeline()

    if (loaderRef.current) {
      // Initial state
      gsap.set(loaderRef.current, { scale: 0.6, opacity: 0 })
      gsap.set(captionRef.current, { opacity: 0, y: 20 })

      // Entrance animation (t=0: emblem scales from 0.6 → 1.0, duration 0.9s)
      tl.to(loaderRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.9,
        ease: "power3.out",
      })
        // Caption fade in (t=0.2)
        .to(
          captionRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
          },
          0.2,
        )

      // Progress animation
      const progressTl = gsap.timeline({ repeat: -1 })
      progressTl.to(progressRef.current, {
        opacity: 0.5,
        duration: 0.8,
        ease: "power2.inOut",
        yoyo: true,
        repeat: 1,
      })
    }

    // Simulate asset loading progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = Math.min(prev + Math.random() * 15, 100)
        if (newProgress >= 100) {
          clearInterval(progressInterval)
          // Run exit animation after a brief delay
          setTimeout(() => {
            runExitAnimation()
          }, 200)
        }
        return newProgress
      })
    }, 150)

    // Cleanup
    return () => {
      clearInterval(progressInterval)
      tl.kill()
    }
  }, [])

  const runExitAnimation = () => {
    if (!loaderRef.current) return

    // Exit timeline: emblem scale to 0.9 + move to hero position
    const exitTl = gsap.timeline({
      onComplete: () => {
        onLoaded()
      },
    })

    exitTl
      .to(loaderRef.current, {
        scale: 0.9,
        y: -50,
        duration: 0.8,
        ease: "power2.inOut",
      })
      .to(
        [captionRef.current, progressRef.current],
        {
          opacity: 0,
          y: -20,
          duration: 0.4,
          ease: "power2.in",
        },
        0.2,
      )
      .to(
        loaderRef.current,
        {
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
        },
        0.6,
      )
  }

  // Handle keyboard skip (Escape key)
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        runExitAnimation()
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [])

  return (
    <div className="fixed inset-0 z-50 bg-background flex items-center justify-center">
      {/* Accessibility announcements */}
      <div aria-live="polite" className="sr-only">
        Loading Guardian Travel Twin: {Math.round(progress)}% complete
      </div>

      <div ref={loaderRef} className="flex flex-col items-center">
        {/* 3D Scene or Fallback */}
        <div className="w-32 h-32 mb-8">
          {isWebGLSupported ? (
            <Suspense fallback={<LoaderFallback />}>
              <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                <Scene3D progress={progress} />
              </Canvas>
            </Suspense>
          ) : (
            <LoaderFallback />
          )}
        </div>

        {/* Caption */}
        <p ref={captionRef} className="text-muted-foreground text-lg mb-4 text-center">
          Securing your journey…
        </p>

        {/* Progress */}
        <div className="flex items-center space-x-2">
          <div className="w-32 h-1 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-primary transition-all duration-300 ease-out" style={{ width: `${progress}%` }} />
          </div>
          <span ref={progressRef} className="text-sm text-muted-foreground min-w-[3ch]">
            {Math.round(progress)}%
          </span>
        </div>

        {/* Skip instruction */}
        <p className="text-xs text-muted-foreground mt-4 opacity-60">Press Escape to skip</p>
      </div>
    </div>
  )
}
