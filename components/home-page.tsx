"use client"

import { useMode } from "@/components/mode-provider"
import { useIsMobile } from "@/hooks/use-mobile"
import AdventureMode from "@/components/modes/adventure-mode"
import MobileRpgMode from "@/components/modes/mobile-rpg-mode"

export default function HomePage() {
  const { mode } = useMode()
  const isMobile = useIsMobile()

  if (mode === "mobile-rpg") {
    return <MobileRpgMode />
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* ModeToggle removed */}

      {isMobile ? (
        <MobileRpgMode />
      ) : (
        <AdventureMode />
      )}
    </div>
  )
}

