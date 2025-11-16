"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Shield } from "lucide-react"

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-primary" />
            <span className="font-serif text-xl font-bold text-foreground">Guardian Travel Twin</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#solution" className="text-muted-foreground hover:text-foreground transition-colors">
              Solution
            </a>
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#demo" className="text-muted-foreground hover:text-foreground transition-colors">
              Demo
            </a>
            <a href="#team" className="text-muted-foreground hover:text-foreground transition-colors">
              Team
            </a>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline">Download App</Button>
            <Button>Try Demo</Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-4">
              <a href="#solution" className="text-muted-foreground hover:text-foreground transition-colors">
                Solution
              </a>
              <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
                Features
              </a>
              <a href="#demo" className="text-muted-foreground hover:text-foreground transition-colors">
                Demo
              </a>
              <a href="#team" className="text-muted-foreground hover:text-foreground transition-colors">
                Team
              </a>
              <div className="flex flex-col space-y-2 pt-4">
                <Button variant="outline" className="w-full bg-transparent">
                  Download App
                </Button>
                <Button className="w-full">Try Demo</Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile SOS Button */}
      <Button
        className="fixed bottom-6 right-6 md:hidden h-14 w-14 rounded-full bg-destructive hover:bg-destructive/90 shadow-lg z-40"
        size="icon"
        aria-label="Emergency SOS"
      >
        <span className="text-lg font-bold">SOS</span>
      </Button>
    </nav>
  )
}
