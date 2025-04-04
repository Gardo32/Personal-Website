"use client"

import { motion } from "framer-motion"
import { Play } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AboutSectionProps {
  mode?: "doom" | "netflix" | "adventure"
  expanded?: boolean
  onSelect?: () => void
  onHover?: (id: string) => void
  hoveredItem?: string | null
}

export default function AboutSection({
  mode = "doom",
  expanded = false,
  onSelect,
  onHover,
  hoveredItem,
}: AboutSectionProps) {
  const renderDoomMode = () => (
    <div className="px-4 text-center flex flex-col items-center justify-center h-screen">
      <motion.h2
        className="text-3xl font-bold mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        About Me
      </motion.h2>

      <motion.div
        className="max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <p className="mb-4">
        Mohammed Aldaqaq is a high school student specializing in cloud computing at the Nasser Center for Science and Technology.</p>
        <p className="mb-4">
        His primary focus lies in the operational aspects of technology, particularly within cloud computing, though he also possesses a keen interest in development
        </p>

      </motion.div>
    </div>
  )

  const renderNetflixMode = () => (
    <div className={`${expanded ? "p-6" : "p-4"}`} onClick={!expanded && onSelect ? () => onSelect() : undefined}>
      {expanded ? (
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">About Mohammed</h2>

          <div className="space-y-4">
            <p>
              Mohammed Aldaqaq is a high school student specializing in cloud computing at the Nasser Center for Science and Technology.
            </p>
            <p>
              His primary focus lies in the operational aspects of technology, particularly within cloud computing, though he also possesses a keen interest in development.
            </p>
          </div>

          <div className="mt-6">
            <Button className="bg-white text-black hover:bg-white/90 flex items-center gap-2">
              <Play className="h-4 w-4 fill-black" /> Play Mohammed's Story
            </Button>
          </div>
        </div>
      ) : (
        <div
          className={`bg-gray-800 rounded-lg overflow-hidden h-64 relative group cursor-pointer
          ${hoveredItem === "about" ? "scale-105 shadow-xl z-10" : "scale-100"}
          transition-all duration-300
        `}
          onMouseEnter={() => onHover && onHover("about")}
          onMouseLeave={() => onHover && onHover("")}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('/images/about-bg.jpg')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent z-10" />

          {hoveredItem === "about" && (
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <Button className="bg-white text-black hover:bg-white/90 flex items-center gap-2">
                <Play className="h-4 w-4 fill-black" /> Play
              </Button>
            </div>
          )}

          <div className="absolute bottom-0 left-0 p-4 z-20">
            <h3 className="text-xl font-bold mb-2">About Mohammed</h3>
            <p className="text-sm text-gray-300 line-clamp-2">
              Cloud Computing Intern and the youngest Bahraini to earn the Azure AI Engineer Associate certification.
            </p>
          </div>
        </div>
      )}
    </div>
  )

  const renderAdventureMode = () => (
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold mb-6 text-center">About Me</h2>

        <div className="bg-gray-800/80 backdrop-blur-sm p-6 rounded-lg border border-gray-700">
          <p className="mb-4">
          Mohammed Aldaqaq is a high school student specializing in cloud computing at the Nasser Center for Science and Technology. </p>
          <p>His primary focus lies in the operational aspects of technology, particularly within cloud computing, though he also possesses a keen interest in development.
          </p>
        </div>
      </motion.div>
    </div>
  )

  switch (mode) {
    case "netflix":
      return renderNetflixMode()
    case "adventure":
      return renderAdventureMode()
    default:
      return renderDoomMode()
  }
}

