"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"

interface SafetyScoreProps {
  score: number
  size?: number
  strokeWidth?: number
}

export function SafetyScore({ score, size = 120, strokeWidth = 8 }: SafetyScoreProps) {
  const circleRef = useRef<SVGCircleElement>(null)
  const [animatedScore, setAnimatedScore] = useState(0)

  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (score / 100) * circumference

  useEffect(() => {
    if (!circleRef.current) return

    // Animate the circle stroke
    gsap.fromTo(
      circleRef.current,
      {
        strokeDashoffset: circumference,
      },
      {
        strokeDashoffset: offset,
        duration: 2,
        ease: "power2.out",
      },
    )

    // Animate the score number
    gsap.to(
      { value: 0 },
      {
        value: score,
        duration: 2,
        ease: "power2.out",
        onUpdate: function () {
          setAnimatedScore(Math.round(this.targets()[0].value))
        },
      },
    )
  }, [score, offset, circumference])

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-secondary" // Green for high safety
    if (score >= 60) return "text-chart-4" // Blue for medium safety
    if (score >= 40) return "text-destructive" // Orange for low safety
    return "text-red-500" // Red for very low safety
  }

  const getStrokeColor = (score: number) => {
    if (score >= 80) return "#10B981" // Green
    if (score >= 60) return "#3B82F6" // Blue
    if (score >= 40) return "#F97316" // Orange
    return "#EF4444" // Red
  }

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          className="text-muted/20"
        />
        {/* Progress circle */}
        <circle
          ref={circleRef}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={getStrokeColor(score)}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          strokeLinecap="round"
          className="transition-all duration-300"
        />
      </svg>
      {/* Score text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`text-2xl font-bold ${getScoreColor(score)}`}>{animatedScore}</span>
        <span className="text-xs text-muted-foreground">Safety Score</span>
      </div>
    </div>
  )
}
