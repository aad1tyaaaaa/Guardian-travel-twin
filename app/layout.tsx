import type React from "react"
import type { Metadata } from "next"
import { Montserrat, Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { AccessibilityProvider } from "@/components/AccessibilityProvider"
import "./globals.css"

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Guardian Travel Twin - Smart Tourist Safety & Response System",
  description: "AI-powered tourist safety with digital ID, geo-fencing, and real-time protection",
  generator: "v0.app",
  keywords: ["tourist safety", "AI protection", "emergency response", "travel security", "blockchain ID"],
  authors: [{ name: "Guardian Travel Twin Team" }],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  openGraph: {
    title: "Guardian Travel Twin - Smart Tourist Safety & Response System",
    description: "AI-powered tourist safety with digital ID, geo-fencing, and real-time protection",
    type: "website",
    locale: "en_US",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" id="top">
      <head>
        <meta name="color-scheme" content="light dark" />
        <meta name="theme-color" content="#1E3A8A" />
      </head>
      <body className={`font-sans ${montserrat.variable} ${inter.variable} antialiased`}>
        <AccessibilityProvider>
          {/* Skip links for keyboard navigation */}
          <a href="#main-content" className="skip-link">
            Skip to main content
          </a>
          <a href="#navigation" className="skip-link">
            Skip to navigation
          </a>

          <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
          <Analytics />
        </AccessibilityProvider>
      </body>
    </html>
  )
}
