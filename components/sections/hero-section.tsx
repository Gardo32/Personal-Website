"use client"

import { motion } from "framer-motion"
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HeroSectionProps {
  mode?: "doom" | "netflix" | "adventure"
  expanded?: boolean
  onSelect?: () => void
  onHover?: (id: string) => void
  hoveredItem?: string | null
}

export default function HeroSection({
  mode = "doom",
  expanded = false,
  onSelect,
  onHover,
  hoveredItem,
}: HeroSectionProps) {
  const renderDoomMode = () => (
    <div className="px-4 text-center flex flex-col items-center justify-center h-screen">
      <motion.h1
        className="text-4xl font-bold mb-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Mohammed Aldaqaq
      </motion.h1>
      <motion.h2
        className="text-xl text-gray-400 mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        Cloud Computing Intern
      </motion.h2>

      <motion.div
        className="flex flex-col gap-4 w-full max-w-xs"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
      </motion.div>

      <motion.div
        className="flex gap-4 mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <a href="https://www.linkedin.com/in/mohammed-aldaqaq/" target="_blank" rel="noopener noreferrer">
          <Button variant="ghost" size="icon">
            <Linkedin className="h-5 w-5" />
          </Button>
        </a>
        <a href="https://github.com/" target="_blank" rel="noopener noreferrer">
          <Button variant="ghost" size="icon">
            <Github className="h-5 w-5" />
          </Button>
        </a>
        <a href="mailto:contact@example.com">
          <Button variant="ghost" size="icon">
            <Mail className="h-5 w-5" />
          </Button>
        </a>
      </motion.div>
    </div>
  )

  const renderNetflixMode = () => (
    <div className="h-screen relative">
      <div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-black z-10"
        style={{
          backgroundImage: `url('/placeholder.svg?height=1080&width=1920')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-black z-10" />
      <div className="absolute inset-0 flex flex-col justify-center px-12 z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <h1 className="text-6xl font-bold mb-4">Mohammed Aldaqaq</h1>
          <h2 className="text-2xl text-gray-300 mb-6">Cloud Computing Intern</h2>
          <p className="text-lg text-gray-400 mb-8 max-w-lg">
            Specializing in cloud computing, AI, and DevOps. The youngest Bahraini to earn the Azure AI Engineer
            Associate certification.
          </p>

          <div className="flex gap-4">
            <Button className="bg-white text-black hover:bg-white/90 px-8 py-6 text-lg flex items-center gap-2">
              <ArrowRight className="h-5 w-5" /> Explore
            </Button>
            <Button variant="outline" className="px-8 py-6 text-lg">
              Contact Me
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )

  const renderAdventureMode = () => (
    <div className="text-center max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Empty content as requested */}
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

