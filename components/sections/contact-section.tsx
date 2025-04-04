"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Mail, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ContactSectionProps {
  mode?: "doom" | "netflix" | "adventure"
  expanded?: boolean
  onSelect?: () => void
  onHover?: (id: string) => void
  hoveredItem?: string | null
}

export default function ContactSection({
  mode = "doom",
  expanded = false,
  onSelect,
  onHover,
  hoveredItem,
}: ContactSectionProps) {
  const renderDoomMode = () => (
    <div className="px-4 flex flex-col items-center justify-center h-screen">
      <motion.h2
        className="text-3xl font-bold mb-6 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Contact
      </motion.h2>

      <motion.div
        className="w-full max-w-md flex flex-col items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <p className="text-center mb-6">Let's connect! Feel free to reach out through any of these platforms.</p>

        <div className="flex flex-col gap-4 w-full max-w-xs">
          <a
            href="https://www.linkedin.com/in/mohammed-aldaqaq/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full"
          >
            <Button
              variant="outline"
              className="w-full flex items-center justify-center gap-2 hover:bg-blue-600 hover:text-white transition-colors"
            >
              <Linkedin className="h-5 w-5" />
              LinkedIn
              <ExternalLink className="h-4 w-4 ml-auto" />
            </Button>
          </a>

          <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="w-full">
            <Button
              variant="outline"
              className="w-full flex items-center justify-center gap-2 hover:bg-gray-700 hover:text-white transition-colors"
            >
              <Github className="h-5 w-5" />
              GitHub
              <ExternalLink className="h-4 w-4 ml-auto" />
            </Button>
          </a>

          <a href="mailto:contact@example.com" className="w-full">
            <Button
              variant="outline"
              className="w-full flex items-center justify-center gap-2 hover:bg-red-600 hover:text-white transition-colors"
            >
              <Mail className="h-5 w-5" />
              Email
              <ExternalLink className="h-4 w-4 ml-auto" />
            </Button>
          </a>
        </div>
      </motion.div>
    </div>
  )

  const renderNetflixMode = () => (
    <div className={`${expanded ? "p-6" : "p-4"}`} onClick={!expanded && onSelect ? () => onSelect() : undefined}>
      {expanded ? (
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Connect</h2>

          <div className="bg-gray-800 p-8 rounded-lg border border-gray-700 flex flex-col items-center">
            <p className="text-center text-lg mb-8 max-w-md">
              Interested in collaborating or learning more about my work? Let's connect through any of these platforms.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-2xl">
              <a
                href="https://www.linkedin.com/in/mohammed-aldaqaq/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
              >
                <Button variant="outline" className="w-full h-16 flex items-center justify-center gap-2">
                  <Linkedin className="h-6 w-6" />
                  LinkedIn
                </Button>
              </a>

              <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="w-full">
                <Button variant="outline" className="w-full h-16 flex items-center justify-center gap-2">
                  <Github className="h-6 w-6" />
                  GitHub
                </Button>
              </a>

              <a href="mailto:contact@example.com" className="w-full">
                <Button variant="outline" className="w-full h-16 flex items-center justify-center gap-2">
                  <Mail className="h-6 w-6" />
                  Email
                </Button>
              </a>
            </div>
          </div>
        </div>
      ) : (
        <div
          className={`bg-gray-800 p-6 rounded-lg border border-gray-700 flex flex-col items-center cursor-pointer
            ${hoveredItem === "contact" ? "scale-105 shadow-xl z-10" : "scale-100"}
            transition-all duration-300
          `}
          onMouseEnter={() => onHover && onHover("contact")}
          onMouseLeave={() => onHover && onHover("")}
        >
          <h3 className="text-lg font-bold mb-4">Connect with Mohammed</h3>

          <div className="flex gap-4">
            <a href="https://www.linkedin.com/in/mohammed-aldaqaq/" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="icon" className="h-10 w-10">
                <Linkedin className="h-5 w-5" />
              </Button>
            </a>

            <a href="https://github.com/" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="icon" className="h-10 w-10">
                <Github className="h-5 w-5" />
              </Button>
            </a>

            <a href="mailto:contact@example.com">
              <Button variant="ghost" size="icon" className="h-10 w-10">
                <Mail className="h-5 w-5" />
              </Button>
            </a>
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
        <h2 className="text-3xl font-bold mb-6 text-center">Contact</h2>

        <div className="bg-gray-800/80 backdrop-blur-sm p-6 rounded-lg border border-gray-700">
          <p className="text-center mb-6">
            You've reached the Communication Hub! Connect with Mohammed through any of these platforms.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <motion.div whileHover={{ scale: 1.05 }} className="flex flex-col items-center">
              <a
                href="https://www.linkedin.com/in/mohammed-aldaqaq/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
              >
                <Button variant="outline" className="w-full flex flex-col items-center justify-center gap-2 py-6">
                  <Linkedin className="h-8 w-8" />
                  <span>LinkedIn</span>
                </Button>
              </a>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} className="flex flex-col items-center">
              <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="w-full">
                <Button variant="outline" className="w-full flex flex-col items-center justify-center gap-2 py-6">
                  <Github className="h-8 w-8" />
                  <span>GitHub</span>
                </Button>
              </a>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} className="flex flex-col items-center">
              <a href="mailto:contact@example.com" className="w-full">
                <Button variant="outline" className="w-full flex flex-col items-center justify-center gap-2 py-6">
                  <Mail className="h-8 w-8" />
                  <span>Email</span>
                </Button>
              </a>
            </motion.div>
          </div>
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

