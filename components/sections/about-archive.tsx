"use client"

import { motion } from "framer-motion"
import { Compass, Scroll, MapPin } from "lucide-react"

interface AboutArchiveProps {
  mode?: string
}

export default function AboutArchive({ mode }: AboutArchiveProps) {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative"
      >
        {/* Map Title Banner */}
        {mode !== "mobile-rpg" && (
          <div className="relative mb-8 text-center">
            <div className="absolute inset-0 mx-auto w-[280px] h-[70px] bg-stone-800 rounded-md -skew-x-3 transform -rotate-1"></div>
            <div className="absolute inset-0 mx-auto w-[280px] h-[70px] bg-stone-700 rounded-md skew-x-2 transform rotate-1"></div>
            <h2 className="relative text-3xl font-bold text-amber-400 tracking-wider py-4 font-serif">
              Character Lore
            </h2>
          </div>
        )}

        {/* Map Background */}
        <div className="relative bg-stone-800/90 rounded-xl p-6 border-2 border-stone-600 shadow-xl overflow-hidden">
          {/* Parchment Texture Overlay */}
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=600&width=800')] opacity-10 mix-blend-overlay"></div>

          {/* Compass Rose */}
          <div className="absolute top-4 right-4 w-16 h-16 opacity-70">
            <Compass className="w-full h-full text-stone-500" strokeWidth={1} />
          </div>

          {/* Map Content */}
          <div className="relative mt-4">
            <div className="flex items-center gap-4 mb-6 justify-center">
              <div className="w-14 h-14 rounded-full bg-amber-700/30 flex items-center justify-center border-2 border-amber-600/50 shadow-inner">
                <MapPin className="h-7 w-7 text-amber-300" />
              </div>
            </div>

            {/* Decorative Divider */}
            <div className="flex items-center justify-center mb-6">
              <div className="h-[2px] w-24 bg-stone-600/70"></div>
              <Scroll className="mx-2 h-4 w-4 text-amber-500" />
              <div className="h-[2px] w-24 bg-stone-600/70"></div>
            </div>

            {/* About Content */}
            <div className="max-w-2xl mx-auto text-center">
              <p className="text-amber-300 leading-relaxed font-serif mb-4 text-lg">
                Mohammed Aldaqaq is a high school Graduate from Nasser Center for Science and Technology.
                specializing in cloud computing
              </p>

              <p className="text-amber-300 leading-relaxed font-serif mb-4">
                His primary focus lies in the operational aspects of technology, particularly within cloud computing,
                though he also possesses a keen interest in development.
              </p>

            </div>
          </div>

          {/* Decorative Map Elements */}
          <div className="absolute bottom-4 left-4 opacity-40">
            <div className="text-xs text-stone-500 font-serif italic">Origins & Background</div>
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
