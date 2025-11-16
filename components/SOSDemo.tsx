"use client"

import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { AlertTriangle, MapPin, Clock, Phone, FileText, Navigation, Shield } from "lucide-react"
import { SafetyScore } from "./SafetyScore"
import { LiveLocationToggle } from "./LiveLocationToggle"

export function SOSDemo() {
  const [isSOSActive, setIsSOSActive] = useState(false)
  const [demoStep, setDemoStep] = useState(0)
  const [routeProgress, setRouteProgress] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)
  const sosButtonRef = useRef<HTMLButtonElement>(null)

  // Mock route data for the last 10 minutes
  const mockRoute = [
    { time: "14:50", location: "Tourist Information Center", lat: 25.276987, lng: 55.296249 },
    { time: "14:52", location: "Heritage Village", lat: 25.277123, lng: 55.296891 },
    { time: "14:55", location: "Traditional Market", lat: 25.277456, lng: 55.297234 },
    { time: "14:57", location: "Spice Souk", lat: 25.277789, lng: 55.297567 },
    { time: "15:00", location: "Current Location - Emergency", lat: 25.278012, lng: 55.29789 },
  ]

  useEffect(() => {
    if (isSOSActive && demoStep === 1) {
      // Animate route progress
      const interval = setInterval(() => {
        setRouteProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            setDemoStep(2)
            return 100
          }
          return prev + 2
        })
      }, 50)

      return () => clearInterval(interval)
    }
  }, [isSOSActive, demoStep])

  useEffect(() => {
    if (sosButtonRef.current) {
      // Pulsing animation for SOS button
      gsap.to(sosButtonRef.current, {
        scale: 1.05,
        duration: 1,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
      })
    }
  }, [])

  const handleSOSClick = () => {
    setIsSOSActive(true)
    setDemoStep(1)
    setRouteProgress(0)

    // Simulate emergency response timeline
    setTimeout(() => setDemoStep(2), 3000)
    setTimeout(() => setDemoStep(3), 5000)
  }

  const resetDemo = () => {
    setIsSOSActive(false)
    setDemoStep(0)
    setRouteProgress(0)
  }

  return (
    <section ref={sectionRef} id="demo" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="destructive" className="mb-4">
            Live Demo
          </Badge>
          <h2 className="text-4xl font-serif font-bold mb-4">Experience Emergency Response</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
            See how Guardian Travel Twin responds to emergency situations with real-time tracking, instant alerts, and
            coordinated response.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Demo Controls */}
          <div className="space-y-6">
            <Card className="border-destructive/20 bg-destructive/5">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                  <span>Emergency Simulation</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-4">
                    Press the SOS button to simulate an emergency situation
                  </p>
                  <Button
                    ref={sosButtonRef}
                    onClick={handleSOSClick}
                    disabled={isSOSActive}
                    size="lg"
                    className="w-32 h-32 rounded-full bg-destructive hover:bg-destructive/90 text-white text-xl font-bold shadow-lg"
                  >
                    SOS
                  </Button>
                  <p className="text-xs text-muted-foreground mt-2">Simulated Panic — Demo only</p>
                </div>

                {isSOSActive && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Emergency Response Status</span>
                      <Badge variant={demoStep >= 3 ? "secondary" : "destructive"}>
                        {demoStep === 1 && "Analyzing..."}
                        {demoStep === 2 && "Responding..."}
                        {demoStep >= 3 && "Authorities Notified"}
                      </Badge>
                    </div>

                    <Progress value={(demoStep / 3) * 100} className="h-2" />

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <div
                          className={`w-2 h-2 rounded-full ${demoStep >= 1 ? "bg-secondary animate-pulse" : "bg-muted"}`}
                        />
                        <span>Location captured and secured</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div
                          className={`w-2 h-2 rounded-full ${demoStep >= 2 ? "bg-secondary animate-pulse" : "bg-muted"}`}
                        />
                        <span>Emergency contacts notified</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div
                          className={`w-2 h-2 rounded-full ${demoStep >= 3 ? "bg-secondary animate-pulse" : "bg-muted"}`}
                        />
                        <span>Local authorities dispatched</span>
                      </div>
                    </div>

                    <Button onClick={resetDemo} variant="outline" className="w-full bg-transparent">
                      Reset Demo
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Safety Dashboard */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-primary" />
                  <span>Safety Dashboard</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <SafetyScore score={isSOSActive ? 15 : 92} />
                  <div className="text-right">
                    <div className="text-2xl font-bold text-secondary">Safe</div>
                    <div className="text-sm text-muted-foreground">Current Status</div>
                  </div>
                </div>

                <LiveLocationToggle />

                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <div className="text-lg font-semibold text-primary">2.3km</div>
                    <div className="text-xs text-muted-foreground">To Safe Zone</div>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <div className="text-lg font-semibold text-secondary">4 min</div>
                    <div className="text-xs text-muted-foreground">Response Time</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Emergency Response Modal Content */}
          <div className="space-y-6">
            {isSOSActive && (
              <>
                {/* Route Replay */}
                <Card className="border-primary/20 bg-primary/5">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Navigation className="h-5 w-5 text-primary" />
                      <span>Last 10 Minutes Route</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Progress value={routeProgress} className="h-2 mb-4" />
                      {mockRoute.map((point, index) => (
                        <div
                          key={index}
                          className={`flex items-center space-x-3 p-2 rounded-lg transition-all duration-300 ${
                            routeProgress >= (index / (mockRoute.length - 1)) * 100
                              ? "bg-primary/10 border border-primary/20"
                              : "bg-muted/30"
                          }`}
                        >
                          <div
                            className={`w-3 h-3 rounded-full ${
                              routeProgress >= (index / (mockRoute.length - 1)) * 100
                                ? index === mockRoute.length - 1
                                  ? "bg-destructive animate-pulse"
                                  : "bg-primary"
                                : "bg-muted"
                            }`}
                          />
                          <div className="flex-1">
                            <div className="text-sm font-medium">{point.location}</div>
                            <div className="text-xs text-muted-foreground">{point.time}</div>
                          </div>
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Live Location Card */}
                <Card className="border-secondary/20 bg-secondary/5">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <MapPin className="h-5 w-5 text-secondary" />
                      <span>Live Location</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Spice Souk, Heritage District</div>
                        <div className="text-sm text-muted-foreground">25.278012, 55.297890</div>
                      </div>
                      <Badge variant="secondary" className="animate-pulse">
                        Live
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>15:00:23</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>Signal: Strong</span>
                      </div>
                    </div>

                    <div className="p-3 bg-muted/50 rounded-lg">
                      <div className="text-xs text-muted-foreground mb-1">Nearest Emergency Services</div>
                      <div className="text-sm font-medium">Dubai Police Station - 1.2km (3 min)</div>
                    </div>
                  </CardContent>
                </Card>

                {/* e-FIR Generation */}
                {demoStep >= 3 && (
                  <Card className="border-chart-4/20 bg-chart-4/5">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <FileText className="h-5 w-5 text-chart-4" />
                        <span>e-FIR Generation</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-sm text-muted-foreground">
                        Electronic First Information Report is being generated automatically based on the emergency
                        data.
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Report ID:</span>
                          <span className="font-mono">GTT-2024-001234</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Timestamp:</span>
                          <span>2024-01-15 15:00:23 UTC</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Status:</span>
                          <Badge variant="secondary">Processing</Badge>
                        </div>
                      </div>

                      <Button disabled className="w-full bg-transparent" variant="outline">
                        <FileText className="h-4 w-4 mr-2" />
                        Generate e-FIR (Demo Mode)
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </>
            )}

            {!isSOSActive && (
              <Card className="border-muted bg-muted/20">
                <CardContent className="flex items-center justify-center h-64">
                  <div className="text-center">
                    <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Press the SOS button to see the emergency response demo</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
