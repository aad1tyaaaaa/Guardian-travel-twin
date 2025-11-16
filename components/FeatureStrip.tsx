"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, MapPin, Brain, AlertTriangle, Monitor, ArrowRight, CheckCircle } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

export function FeatureStrip() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const flowchartRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !cardsRef.current || !flowchartRef.current) return

    // Feature cards staggered animation on scroll
    gsap.fromTo(
      cardsRef.current.children,
      {
        opacity: 0,
        y: 60,
        scale: 0.9,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      },
    )

    // Flowchart animation
    gsap.fromTo(
      flowchartRef.current.children,
      {
        opacity: 0,
        x: -30,
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.6,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: flowchartRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      },
    )

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  const features = [
    {
      icon: Shield,
      title: "Digital Tourist ID",
      description: "Blockchain-secured identity verification with encrypted personal data and travel credentials.",
      benefits: ["Instant verification", "Privacy protected", "Tamper-proof records"],
      color: "text-primary",
      bgColor: "bg-primary/5",
      borderColor: "border-primary/20",
    },
    {
      icon: MapPin,
      title: "Smart Geo-Fencing",
      description: "AI-powered location monitoring with customizable safety zones and real-time alerts.",
      benefits: ["Custom safety zones", "Real-time tracking", "Automatic alerts"],
      color: "text-secondary",
      bgColor: "bg-secondary/5",
      borderColor: "border-secondary/20",
    },
    {
      icon: Brain,
      title: "AI Anomaly Detection",
      description: "Machine learning algorithms that identify unusual patterns and potential safety risks.",
      benefits: ["Pattern recognition", "Risk assessment", "Predictive alerts"],
      color: "text-chart-4",
      bgColor: "bg-chart-4/5",
      borderColor: "border-chart-4/20",
    },
    {
      icon: AlertTriangle,
      title: "Emergency SOS System",
      description: "One-touch emergency response with automatic location sharing and authority notification.",
      benefits: ["Instant response", "Location sharing", "Multi-channel alerts"],
      color: "text-destructive",
      bgColor: "bg-destructive/5",
      borderColor: "border-destructive/20",
    },
    {
      icon: Monitor,
      title: "Authority Dashboard",
      description: "Comprehensive monitoring interface for tourism officials and emergency responders.",
      benefits: ["Real-time monitoring", "Analytics dashboard", "Response coordination"],
      color: "text-chart-5",
      bgColor: "bg-chart-5/5",
      borderColor: "border-chart-5/20",
    },
  ]

  const flowSteps = [
    {
      title: "Tourist KYC",
      description: "Identity verification and registration",
      icon: Shield,
      color: "text-primary",
    },
    {
      title: "Blockchain ID",
      description: "Secure digital identity creation",
      icon: CheckCircle,
      color: "text-secondary",
    },
    {
      title: "AI Monitor",
      description: "Continuous safety monitoring",
      icon: Brain,
      color: "text-chart-4",
    },
    {
      title: "Normal / SOS",
      description: "Safe travel or emergency response",
      icon: AlertTriangle,
      color: "text-destructive",
    },
  ]

  return (
    <section ref={sectionRef} id="features" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            Core Features
          </Badge>
          <h2 className="text-4xl font-serif font-bold mb-4">Comprehensive Safety Ecosystem</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
            Our integrated platform combines cutting-edge technology with human-centered design to create the ultimate
            travel safety solution.
          </p>
        </div>

        {/* Feature Cards */}
        <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-20">
          {features.map((feature, index) => (
            <Card
              key={feature.title}
              className={`group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${feature.bgColor} ${feature.borderColor} border-2`}
            >
              <CardHeader className="pb-4">
                <div className={`w-12 h-12 rounded-lg ${feature.bgColor} flex items-center justify-center mb-4`}>
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.benefits.map((benefit, benefitIndex) => (
                    <li key={benefitIndex} className="flex items-center text-sm">
                      <CheckCircle className={`h-4 w-4 ${feature.color} mr-2 flex-shrink-0`} />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Process Flowchart */}
        <div className="bg-card rounded-2xl p-8 shadow-sm border">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-serif font-semibold mb-4">How Guardian Travel Twin Works</h3>
            <p className="text-muted-foreground">
              A simplified view of our end-to-end safety process from registration to response
            </p>
          </div>

          <div
            ref={flowchartRef}
            className="flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0"
          >
            {flowSteps.map((step, index) => (
              <div key={step.title} className="flex flex-col md:flex-row items-center">
                {/* Step */}
                <div className="flex flex-col items-center text-center max-w-xs">
                  <div
                    className={`w-16 h-16 rounded-full bg-background border-2 ${step.color.replace("text-", "border-")} flex items-center justify-center mb-4`}
                  >
                    <step.icon className={`h-8 w-8 ${step.color}`} />
                  </div>
                  <h4 className="font-semibold mb-2">{step.title}</h4>
                  <p className="text-sm text-muted-foreground text-balance">{step.description}</p>
                </div>

                {/* Arrow (except for last item) */}
                {index < flowSteps.length - 1 && (
                  <ArrowRight className="h-6 w-6 text-muted-foreground mx-8 mt-4 md:mt-0 rotate-90 md:rotate-0" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 text-center">
          <div>
            <div className="text-3xl font-bold text-primary mb-2">99.9%</div>
            <div className="text-sm text-muted-foreground">System Uptime</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-secondary mb-2">&lt;30s</div>
            <div className="text-sm text-muted-foreground">Emergency Response</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-chart-4 mb-2">24/7</div>
            <div className="text-sm text-muted-foreground">AI Monitoring</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-destructive mb-2">256-bit</div>
            <div className="text-sm text-muted-foreground">Encryption</div>
          </div>
        </div>
      </div>
    </section>
  )
}
