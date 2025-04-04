"use client"

import { useMode } from "@/components/mode-provider"
import DoomScrollingMode from "@/components/modes/doom-scrolling-mode"
import NetflixMode from "@/components/modes/netflix-mode"
import AdventureMode from "@/components/modes/adventure-mode"
import ModeToggle from "@/components/mode-toggle"

export default function HomePage() {
  const { mode, isMobile, isTabletOrPC } = useMode()

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <ModeToggle />

      {mode === "doom" && isMobile && <DoomScrollingMode />}
      {mode === "netflix" && isTabletOrPC && <NetflixMode />}
      {mode === "adventure" && <AdventureMode />}

      {/* Fallback content if mode is not available for device */}
      {mode === "doom" && !isMobile && <AdventureMode />}
      {mode === "netflix" && !isTabletOrPC && <AdventureMode />}
    </div>
  )
}

