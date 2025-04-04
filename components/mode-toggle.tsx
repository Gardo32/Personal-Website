"use client"

import { useState } from "react"
import { useMode } from "@/components/mode-provider"
import { motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function ModeToggle() {
  const { mode, setMode, isMobile, isTabletOrPC } = useMode()
  const [isOpen, setIsOpen] = useState(false)

  const updateMode = (newMode: "doom" | "netflix" | "adventure") => {
    setMode(newMode)

    // Update URL parameter without page refresh
    const url = new URL(window.location.href)
    url.searchParams.set("mode", newMode)
    window.history.pushState({}, "", url)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-4 right-4 z-50"
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="bg-gray-800/70 border-gray-700 hover:bg-gray-700 backdrop-blur-sm"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-gray-800 border-gray-700">
          {isMobile && (
            <DropdownMenuItem onClick={() => updateMode("doom")} className={`${mode === "doom" ? "bg-gray-700" : ""}`}>
              Doom Scrolling Mode
            </DropdownMenuItem>
          )}

          {isTabletOrPC && (
            <DropdownMenuItem
              onClick={() => updateMode("netflix")}
              className={`${mode === "netflix" ? "bg-gray-700" : ""}`}
            >
              Netflix Mode
            </DropdownMenuItem>
          )}

          <DropdownMenuItem
            onClick={() => updateMode("adventure")}
            className={`${mode === "adventure" ? "bg-gray-700" : ""}`}
          >
            Adventure Mode
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </motion.div>
  )
}

