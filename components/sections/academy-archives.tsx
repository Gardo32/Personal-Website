"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Briefcase, Compass, MapPin, Scroll } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface AcademyArchivesProps {
  mode?: "doom" | "netflix" | "adventure" | "mobile-rpg"
  expanded?: boolean
  onSelect?: () => void
  onHover?: (id: string) => void
  hoveredItem?: string | null
}

// Medieval Roguelike Map version - now the default for all modes
function RoguelikeMapArchives() {
  const [activeLocation, setActiveLocation] = useState<string | null>(null)

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative"
      >
        {/* Map Title Banner */}
        <div className="relative mb-8 text-center">
          <div className="absolute inset-0 mx-auto w-[280px] h-[70px] bg-stone-800 rounded-md -skew-x-3 transform -rotate-1"></div>
          <div className="absolute inset-0 mx-auto w-[280px] h-[70px] bg-stone-700 rounded-md skew-x-2 transform rotate-1"></div>
          <h2 className="relative text-3xl font-bold text-amber-400 tracking-wider py-4 font-serif">
            Academy Archives
          </h2>
        </div>

        {/* Map Background */}
        <div className="relative bg-stone-800/90 rounded-xl p-6 border-2 border-stone-600 shadow-xl overflow-hidden">
          {/* Parchment Texture Overlay */}
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=600&width=800')] opacity-10 mix-blend-overlay"></div>

          {/* Compass Rose */}
          <div className="absolute top-4 right-4 w-16 h-16 opacity-70">
            <Compass className="w-full h-full text-stone-500" strokeWidth={1} />
          </div>

          {/* Map Path - Dotted line connecting locations */}
          <div className="absolute left-1/2 top-[120px] w-0 h-[200px] border-l-2 border-dashed border-stone-600"></div>

          {/* Map Content */}
          <div className="relative grid grid-cols-1 gap-12 mt-8">
            {/* Education Location */}
            <motion.div
              className={`relative p-5 rounded-md cursor-pointer transition-all duration-300 ease-in-out shadow-md
                ${
                  activeLocation === "education"
                    ? "border-amber-500 bg-amber-900/40 scale-105"
                    : "border-stone-600 bg-stone-700/60 hover:border-amber-600/70"
                } border-2
              `}
              onClick={() => setActiveLocation(activeLocation === "education" ? null : "education")}
              whileHover={{ scale: activeLocation === "education" ? 1.05 : 1.03 }}
              layout
            >
              {/* Location Icon */}
              <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
                <div className="w-14 h-14 rounded-full bg-amber-700/30 flex items-center justify-center border-2 border-amber-600/50 shadow-inner">
                  <MapPin className="h-7 w-7 text-amber-300" />
                </div>
              </div>

              {/* Location Name */}
              <div className="mt-6 text-center mb-4">
                <h3 className="font-bold text-xl text-amber-300 font-serif">Nasser Centre for Science and Technology</h3>
                <p className="text-sm text-stone-400 italic mt-1 font-serif">Years of Study: 2022 - 2025</p>
              </div>

              {/* Decorative Divider */}
              <div className="flex items-center justify-center mb-4">
                <div className="h-[2px] w-16 bg-stone-600/70"></div>
                <Scroll className="mx-2 h-4 w-4 text-amber-500" />
                <div className="h-[2px] w-16 bg-stone-600/70"></div>
              </div>

              {/* Location Description */}
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out
                ${activeLocation === "education" ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
              `}
              >
                <p className="text-sm text-stone-300 leading-relaxed font-serif text-center px-4 py-2 border-t-2 border-stone-600/70 pt-3 mt-3">
                  Within these ancient halls of wisdom, I have mastered the arcane arts of Cloud Weaving. The elders
                  have taught me to harness the mystical forces of Artificial Intellect & Developer Operations. My
                  studies focus on transmuting theoretical scrolls into tangible enchantments that shape the digital
                  realm.
                </p>

                {/* Skills Learned */}
                <div className="flex flex-wrap justify-center gap-2 mt-4">
                  <Badge className="bg-amber-900/60 text-amber-300 hover:bg-amber-800 border border-amber-600/50">
                    Cloud Computing
                  </Badge>
                  <Badge className="bg-amber-900/60 text-amber-300 hover:bg-amber-800 border border-amber-600/50">
                    AI Studies
                  </Badge>
                  <Badge className="bg-amber-900/60 text-amber-300 hover:bg-amber-800 border border-amber-600/50">
                    DevOps Mastery
                  </Badge>
                </div>
              </div>

              {/* Click to Expand Hint */}
              {activeLocation !== "education" && (
                <div className="text-center text-amber-400/70 text-xs mt-2 italic">
                  *Click to reveal the ancient knowledge*
                </div>
              )}
            </motion.div>

            {/* Experience Location */}
            <motion.div
              className={`relative p-5 rounded-md cursor-pointer transition-all duration-300 ease-in-out shadow-md
                ${
                  activeLocation === "experience"
                    ? "border-teal-500 bg-teal-900/40 scale-105"
                    : "border-stone-600 bg-stone-700/60 hover:border-teal-600/70"
                } border-2
              `}
              onClick={() => setActiveLocation(activeLocation === "experience" ? null : "experience")}
              whileHover={{ scale: activeLocation === "experience" ? 1.05 : 1.03 }}
              layout
            >
              {/* Location Icon */}
              <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
                <div className="w-14 h-14 rounded-full bg-teal-700/30 flex items-center justify-center border-2 border-teal-600/50 shadow-inner">
                  <Briefcase className="h-7 w-7 text-teal-300" />
                </div>
              </div>

              {/* Location Name */}
              <div className="mt-6 text-center mb-4">
                <h3 className="font-bold text-xl text-teal-300 font-serif">Gulf Air Group (GFG) - Apprenticeship (OJT)</h3>
                <p className="text-sm text-stone-400 italic mt-1 font-serif">11th Moon – 28th Moon, Year 2025</p>
              </div>

              {/* Decorative Divider */}
              <div className="flex items-center justify-center mb-4">
                <div className="h-[2px] w-16 bg-stone-600/70"></div>
                <Scroll className="mx-2 h-4 w-4 text-teal-500" />
                <div className="h-[2px] w-16 bg-stone-600/70"></div>
              </div>

              {/* Location Description */}
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out
                ${activeLocation === "experience" ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
              `}
              >
                <p className="text-sm text-stone-300 leading-relaxed font-serif text-center px-4 py-2 border-t-2 border-stone-600/70 pt-3 mt-3">
                  As an apprentice to the master artificers, I learned to forge powerful Platform Engineering runes. My
                  training involved crafting Continuous Integration & Deployment enchantments, commanding legions of
                  Containers, and weaving the very fabric of Infrastructure through ancient Code.
                </p>

                {/* Skills Learned */}
                <div className="flex flex-wrap justify-center gap-2 mt-4">
                  <Badge className="bg-teal-900/60 text-teal-300 hover:bg-teal-800 border border-teal-600/50">
                    CI/CD Runes
                  </Badge>
                  <Badge className="bg-teal-900/60 text-teal-300 hover:bg-teal-800 border border-teal-600/50">
                    Container Orchestration
                  </Badge>
                  <Badge className="bg-teal-900/60 text-teal-300 hover:bg-teal-800 border border-teal-600/50">
                    Infrastructure as Code
                  </Badge>
                </div>
              </div>

              {/* Click to Expand Hint */}
              {activeLocation !== "experience" && (
                <div className="text-center text-teal-400/70 text-xs mt-2 italic">*Click to uncover guild secrets*</div>
              )}
            </motion.div>
          </div>

          {/* Decorative Map Elements */}
          <div className="absolute bottom-4 left-4 opacity-40">
            <div className="text-xs text-stone-500 font-serif italic">Here be dragons</div>
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

// Main component that now uses the roguelike map style for all modes
export default function AcademyArchives({
  mode = "mobile-rpg",
  expanded = false,
  onSelect,
  onHover,
  hoveredItem,
}: AcademyArchivesProps) {
  // Always use the roguelike map style regardless of mode
  return <RoguelikeMapArchives />
}
