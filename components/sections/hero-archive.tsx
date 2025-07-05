"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Mail, Compass, Scroll } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HeroArchiveProps {
  mode?: string // Support any mode, but always use roguelike style
}

export default function HeroArchive({ mode = "roguelike" }: HeroArchiveProps) {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative"
      >
        {/* Map Background */}
        <div className="relative bg-stone-800/90 rounded-xl p-6 border-2 border-stone-600 shadow-xl overflow-hidden min-h-[60vh] flex flex-col justify-center">
          {/* Parchment Texture Overlay */}
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=600&width=800')] opacity-10 mix-blend-overlay"></div>

          {/* Compass Rose */}
          <div className="absolute top-4 right-4 w-16 h-16 opacity-70">
            <Compass className="w-full h-full text-stone-500" strokeWidth={1} />
          </div>

          {/* Hero Content */}
          <div className="relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-2 text-amber-400 font-serif tracking-wider">
                Mohammed Aldaqaq
              </h1>
              <div className="flex items-center justify-center mb-6">
                <div className="h-[2px] w-16 bg-stone-600/70"></div>
                <Scroll className="mx-2 h-5 w-5 text-amber-500" />
                <div className="h-[2px] w-16 bg-stone-600/70"></div>
              </div>
              <h2 className="text-xl md:text-2xl text-amber-300 mb-6 font-serif italic">Cloud Computing Artificer</h2>
            </motion.div>

            <motion.p
              className="text-stone-300 max-w-xl mx-auto mb-8 font-serif"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              A young scholar of the digital realm, specializing in cloud computing, AI, and DevOps. 
            </motion.p>

            <motion.div
              className="flex gap-4 justify-center mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <a href="https://www.linkedin.com/in/mohammed-aldaqaq/" target="_blank" rel="noopener noreferrer">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full h-12 w-12 bg-stone-700/80 border-amber-600/50 hover:bg-amber-900/60 text-amber-300"
                >
                  <Linkedin className="h-5 w-5" />
                </Button>
              </a>
              <a href="https://github.com/Gardo32" target="_blank" rel="noopener noreferrer">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full h-12 w-12 bg-stone-700/80 border-amber-600/50 hover:bg-amber-900/60 text-amber-300"
                >
                  <Github className="h-5 w-5" />
                </Button>
              </a>
              <a href="mailto:Mohammed@aldaqaq.com">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full h-12 w-12 bg-stone-700/80 border-amber-600/50 hover:bg-amber-900/60 text-amber-300"
                >
                  <Mail className="h-5 w-5" />
                </Button>
              </a>
            </motion.div>
          </div>

          {/* Map Border Decorations */}
          <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-stone-600"></div>
          <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-stone-600"></div>
          <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-stone-600"></div>
          <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-stone-600"></div>
        </div>
      </motion.div>
    </div>
  )
}
