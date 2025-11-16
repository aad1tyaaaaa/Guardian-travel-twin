"use client"

import { useEffect, useRef, useState } from "react"
import { Canvas } from "@react-three/fiber"
import { Suspense } from "react"
import { gsap } from "gsap"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, MapPin, Zap, AlertTriangle } from "lucide-react"
import { HeroScene } from "./HeroScene"

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subheadlineRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Hero reveal animation (triggered after loader completes)
    const tl = gsap.timeline()

    // Set initial states
    gsap.set([headlineRef.current, subheadlineRef.current, ctaRef.current], {
      opacity: 0,
      y: 30,
    })
    gsap.set(cardsRef.current, { opacity: 0, scale: 0.9 })

    // Reveal animation sequence
    tl.to(headlineRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
    })
      .to(
        subheadlineRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        0.2,
      )
      .to(
        ctaRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        0.4,
      )
      .to(
        cardsRef.current,
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.7)",
        },
        0.6,
      )

    setIsVisible(true)

    return () => {
      tl.kill()
    }
  }, [])

  const contextCards = [
    {
      icon: Shield,
      title: "Digital ID",
      description: "Blockchain-secured tourist identity",
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      icon: AlertTriangle,
      title: "SOS Alert",
      description: "Instant emergency response system",
      color: "text-destructive",
      bgColor: "bg-destructive/10",
    },
    {
      icon: MapPin,
      title: "Geo-Fence",
      description: "Smart location monitoring",
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
    {
      icon: Zap,
      title: "AI Monitor",
      description: "Real-time anomaly detection",
      color: "text-chart-4",
      bgColor: "bg-chart-4/10",
    },
  ]

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-primary/5"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-30">
        <svg width="100%" height="100%" className="text-primary/10">
          <defs>
            <pattern id="hero-grid" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M60 0H0v60h60V0zM30 30m-2 0a2 2 0 1 1 4 0 2 2 0 1 1-4 0" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <div className="text-center lg:text-left space-y-8">
            {/* Badge */}
            <Badge variant="secondary" className="inline-flex items-center space-x-2 px-4 py-2">
              <Shield className="h-4 w-4" />
              <span>Smart Tourism Technology</span>
            </Badge>

            {/* Headlines */}
            <div className="space-y-4">
              <h1
                ref={headlineRef}
                className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-balance leading-tight"
              >
                Guardian Travel Twin
                <span className="block text-primary">The AI That Plans, Protects, and Responds</span>
              </h1>

              <p ref={subheadlineRef} className="text-xl text-muted-foreground text-pretty max-w-2xl">
                Smart Tourism. Safer Journeys. Real-time protection with AI, blockchain, and geo-fencing technology for
                the modern traveler.
              </p>
            </div>

            {/* CTAs */}
            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" className="text-lg px-8 py-6">
                Experience the Guardian
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 bg-transparent">
                Watch Demo
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
                <span>AI-Powered Protection</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span>Blockchain Secured</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-destructive rounded-full animate-pulse" />
                <span>24/7 Emergency Response</span>
              </div>
            </div>
          </div>

          {/* Right side - 3D Scene */}
          <div className="relative h-96 lg:h-[600px]">
            {/* 3D Canvas */}
            <div className="absolute inset-0 rounded-2xl overflow-hidden">
              {isVisible && (
                <Suspense fallback={<div className="w-full h-full bg-muted animate-pulse rounded-2xl" />}>
                  <Canvas
                    camera={{ position: [0, 0, 8], fov: 45 }}
                    className="bg-gradient-to-br from-primary/5 to-secondary/5"
                  >
                    <HeroScene />
                  </Canvas>
                </Suspense>
              )}
            </div>

            {/* Floating context cards */}
            <div ref={cardsRef} className="absolute inset-0 pointer-events-none">
              {contextCards.map((card, index) => {
                const positions = [
                  "top-4 left-4", // Digital ID
                  "top-4 right-4", // SOS Alert
                  "bottom-4 left-4", // Geo-Fence
                  "bottom-4 right-4", // AI Monitor
                ]

                return (
                  <Card
                    key={card.title}
                    className={`absolute ${positions[index]} w-40 pointer-events-auto hover:scale-105 transition-transform duration-200 ${card.bgColor} border-0 shadow-lg backdrop-blur-sm`}
                  >
                    <CardContent className="p-3">
                      <div className="flex items-center space-x-2 mb-2">
                        <card.icon className={`h-4 w-4 ${card.color}`} />
                        <h3 className="font-semibold text-sm">{card.title}</h3>
                      </div>
                      <p className="text-xs text-muted-foreground">{card.description}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Glow effects */}
            <div className="absolute inset-0 bg-gradient-radial from-primary/20 via-transparent to-transparent opacity-50 rounded-2xl" />
            <div className="absolute inset-0 bg-gradient-radial from-secondary/10 via-transparent to-transparent opacity-30 rounded-2xl animate-pulse" />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center">
          <div className="w-1 h-3 bg-muted-foreground rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  )
}
