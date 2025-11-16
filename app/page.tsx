"use client"

import { useState, useEffect } from "react"
import { Loader } from "@/components/Loader"
import { Hero } from "@/components/Hero"
import { Navigation } from "@/components/Navigation"
import { FeatureStrip } from "@/components/FeatureStrip"
import { SOSDemo } from "@/components/SOSDemo"
import { Footer } from "@/components/Footer"

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [assetsLoaded, setAssetsLoaded] = useState(false)

  useEffect(() => {
    // Minimum loader duration of 600ms as specified
    const minLoadTime = setTimeout(() => {
      if (assetsLoaded) {
        setIsLoading(false)
      }
    }, 600)

    return () => clearTimeout(minLoadTime)
  }, [assetsLoaded])

  const handleAssetsLoaded = () => {
    setAssetsLoaded(true)
    if (Date.now() > 600) {
      // If minimum time has passed
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return <Loader onLoaded={handleAssetsLoaded} />
  }

  return (
    <>
      <div id="navigation">
        <Navigation />
      </div>
      <main id="main-content" role="main" className="min-h-screen bg-background">
        <Hero />
        <FeatureStrip />
        <SOSDemo />
      </main>
      <Footer />
    </>
  )
}
