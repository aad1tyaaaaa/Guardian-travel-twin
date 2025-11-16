"use client"

import { useState } from "react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { MapPin, Shield } from "lucide-react"

export function LiveLocationToggle() {
  const [isEnabled, setIsEnabled] = useState(false)

  return (
    <div className="flex items-center space-x-4 p-4 bg-card rounded-lg border">
      <div className="flex items-center space-x-2">
        {isEnabled ? (
          <MapPin className="h-5 w-5 text-secondary animate-pulse" />
        ) : (
          <Shield className="h-5 w-5 text-muted-foreground" />
        )}
      </div>

      <div className="flex-1">
        <Label htmlFor="location-sharing" className="text-sm font-medium">
          Live Location Sharing
        </Label>
        <p className="text-xs text-muted-foreground mt-1">
          {isEnabled
            ? "Your location is being shared with emergency contacts"
            : "Enable to share your location for enhanced safety"}
        </p>
      </div>

      <Switch
        id="location-sharing"
        checked={isEnabled}
        onCheckedChange={setIsEnabled}
        aria-label="Toggle live location sharing"
      />
    </div>
  )
}
