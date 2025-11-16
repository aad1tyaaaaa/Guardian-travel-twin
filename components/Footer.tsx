"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Shield, Globe, Accessibility, Eye, Volume2, Keyboard } from "lucide-react"

export function Footer() {
  const [selectedLanguage, setSelectedLanguage] = useState("en")
  const [highContrast, setHighContrast] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [screenReader, setScreenReader] = useState(false)

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "ar", name: "العربية", flag: "🇦🇪" },
    { code: "hi", name: "हिन्दी", flag: "🇮🇳" },
    { code: "ur", name: "اردو", flag: "🇵🇰" },
    { code: "bn", name: "বাংলা", flag: "🇧🇩" },
    { code: "ta", name: "தமிழ்", flag: "🇮🇳" },
    { code: "te", name: "తెలుగు", flag: "🇮🇳" },
    { code: "ml", name: "മലയാളം", flag: "🇮🇳" },
    { code: "fr", name: "Français", flag: "🇫🇷" },
    { code: "es", name: "Español", flag: "🇪🇸" },
    { code: "de", name: "Deutsch", flag: "🇩🇪" },
    { code: "ru", name: "Русский", flag: "🇷🇺" },
  ]

  const handleHighContrastToggle = (enabled: boolean) => {
    setHighContrast(enabled)
    if (enabled) {
      document.documentElement.classList.add("high-contrast")
    } else {
      document.documentElement.classList.remove("high-contrast")
    }
  }

  const handleReducedMotionToggle = (enabled: boolean) => {
    setReducedMotion(enabled)
    if (enabled) {
      document.documentElement.classList.add("reduce-motion")
    } else {
      document.documentElement.classList.remove("reduce-motion")
    }
  }

  const handleScreenReaderToggle = (enabled: boolean) => {
    setScreenReader(enabled)
    if (enabled) {
      document.documentElement.classList.add("screen-reader-optimized")
    } else {
      document.documentElement.classList.remove("screen-reader-optimized")
    }
  }

  return (
    <footer className="bg-muted/50 border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-6 w-6 text-primary" />
              <span className="font-serif text-lg font-bold">Guardian Travel Twin</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              AI-powered tourist safety with real-time protection, blockchain security, and emergency response
              coordination.
            </p>
            <div className="flex space-x-4">
              <Button variant="outline" size="sm" className="bg-transparent">
                Privacy Policy
              </Button>
              <Button variant="outline" size="sm" className="bg-transparent">
                Terms of Service
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              <a
                href="#features"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
              >
                Features
              </a>
              <a
                href="#demo"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
              >
                Live Demo
              </a>
              <a
                href="#contact"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
              >
                Contact Support
              </a>
              <a
                href="#help"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
              >
                Help Center
              </a>
            </nav>
          </div>

          {/* Language Selector */}
          <div className="space-y-4">
            <h3 className="font-semibold flex items-center space-x-2">
              <Globe className="h-4 w-4" />
              <span>Language</span>
            </h3>
            <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
              <SelectTrigger className="w-full" aria-label="Select language">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>
                    <span className="flex items-center space-x-2">
                      <span>{lang.flag}</span>
                      <span>{lang.name}</span>
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              Guardian Travel Twin supports 12+ languages for global accessibility
            </p>
          </div>

          {/* Accessibility Controls */}
          <div className="space-y-4">
            <h3 className="font-semibold flex items-center space-x-2">
              <Accessibility className="h-4 w-4" />
              <span>Accessibility</span>
            </h3>
            <Card className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="high-contrast" className="text-sm flex items-center space-x-2">
                  <Eye className="h-4 w-4" />
                  <span>High Contrast</span>
                </Label>
                <Switch
                  id="high-contrast"
                  checked={highContrast}
                  onCheckedChange={handleHighContrastToggle}
                  aria-describedby="high-contrast-desc"
                />
              </div>
              <p id="high-contrast-desc" className="text-xs text-muted-foreground">
                Increases color contrast for better visibility
              </p>

              <div className="flex items-center justify-between">
                <Label htmlFor="reduced-motion" className="text-sm flex items-center space-x-2">
                  <Volume2 className="h-4 w-4" />
                  <span>Reduce Motion</span>
                </Label>
                <Switch
                  id="reduced-motion"
                  checked={reducedMotion}
                  onCheckedChange={handleReducedMotionToggle}
                  aria-describedby="reduced-motion-desc"
                />
              </div>
              <p id="reduced-motion-desc" className="text-xs text-muted-foreground">
                Minimizes animations and transitions
              </p>

              <div className="flex items-center justify-between">
                <Label htmlFor="screen-reader" className="text-sm flex items-center space-x-2">
                  <Keyboard className="h-4 w-4" />
                  <span>Screen Reader</span>
                </Label>
                <Switch
                  id="screen-reader"
                  checked={screenReader}
                  onCheckedChange={handleScreenReaderToggle}
                  aria-describedby="screen-reader-desc"
                />
              </div>
              <p id="screen-reader-desc" className="text-xs text-muted-foreground">
                Optimizes interface for screen readers
              </p>
            </Card>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-muted-foreground">
              © 2024 Guardian Travel Twin. Built for Ministry of Development (North Eastern Region).
            </div>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span>Emergency Hotline: 999</span>
              <span>•</span>
              <span>Tourist Police: +971-4-609-6999</span>
            </div>
          </div>
        </div>
      </div>

      {/* Skip to top link */}
      <a
        href="#top"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded-md z-50"
      >
        Skip to top
      </a>
    </footer>
  )
}
