"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { useMediaQuery } from "@/hooks/use-media-query"

type Mode = "doom" | "netflix" | "adventure"

interface ModeContextType {
  mode: Mode
  setMode: (mode: Mode) => void
  isMobile: boolean
  isTabletOrPC: boolean
}

const ModeContext = createContext<ModeContextType | undefined>(undefined)

export function ModeProvider({ children }: { children: React.ReactNode }) {
  const isMobile = useMediaQuery("(max-width: 767px)")
  const isTabletOrPC = useMediaQuery("(min-width: 768px)")
  const [mode, setMode] = useState<Mode>("doom") // Default to "doom" to avoid null

  useEffect(() => {
    // Check URL params for mode
    const params = new URLSearchParams(window.location.search)
    const modeParam = params.get("mode") as Mode | null

    if (modeParam && ["doom", "netflix", "adventure"].includes(modeParam)) {
      setMode(modeParam)
    } else {
      // Set default mode based on device
      if (isMobile) {
        setMode("doom")
      } else if (isTabletOrPC) {
        setMode("netflix")
      }
    }
  }, [isMobile, isTabletOrPC])

  // Apply mode to HTML element
  useEffect(() => {
    document.documentElement.setAttribute('data-mode', mode)
  }, [mode])

  return (
    <ModeContext.Provider value={{ mode, setMode, isMobile, isTabletOrPC }}>
      {children}
    </ModeContext.Provider>
  )
}

export function useMode() {
  const context = useContext(ModeContext)
  if (context === undefined) {
    throw new Error("useMode must be used within a ModeProvider")
  }
  return context
}

