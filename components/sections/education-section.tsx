"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { BookOpen, Briefcase, Compass, MapPin, Scroll, Play } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface EducationSectionProps {
  mode?: "doom" | "netflix" | "adventure" | "mobile-rpg"
  expanded?: boolean
  onSelect?: () => void
  onHover?: (id: string) => void
  hoveredItem?: string | null
}

// Medieval Roguelike Map version
function RoguelikeMapEducation() {
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
            Chronicles of Knowledge
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
                <h3 className="font-bold text-xl text-amber-300 font-serif">The Grand Archives of Nasser</h3>
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
                <h3 className="font-bold text-xl text-teal-300 font-serif">The Gulf Ari Artificer's Guild</h3>
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

// Keeping the original components for other modes
function DoomEducation() {
  return (
    <div className="px-4 flex flex-col items-center justify-center h-screen">
      <motion.h2
        className="text-3xl font-bold mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Education & Experience
      </motion.h2>

      <motion.ul
        className="w-full max-w-xl space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <li className="flex items-start space-x-4">
          <BookOpen className="h-6 w-6 text-blue-500 mt-1" />
          <div>
            <h3 className="font-bold">Nasser Centre for Science and Technology</h3>
            <p className="text-sm text-gray-400">Student • Sept 2022 – June 2025 (2 yrs 10 mos)</p>
            <p className="mt-1 text-gray-300">
              Intensive cloud computing curriculum with hands-on labs in AI & DevOps.
            </p>
          </div>
        </li>

        <li className="flex items-start space-x-4">
          <Briefcase className="h-6 w-6 text-green-500 mt-1" />
          <div>
            <h3 className="font-bold">Gulf Ari Group – Apprenticeship</h3>
            <p className="text-sm text-gray-400">11 May – 28 May 2025</p>
            <p className="mt-1 text-gray-300">
              On-the-job training in platform engineering: CI/CD pipelines, container orchestration, and IaC automation.
            </p>
          </div>
        </li>
      </motion.ul>
    </div>
  )
}

function NetflixEducation({
  expanded,
  onSelect,
  onHover,
  hoveredItem,
}: {
  expanded: boolean
  onSelect?: () => void
  onHover?: (id: string) => void
  hoveredItem?: string | null
}) {
  return (
    <div className={`${expanded ? "p-6" : "p-4"}`} onClick={!expanded && onSelect ? () => onSelect() : undefined}>
      {expanded ? (
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Education & Experience</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-blue-900/50 flex items-center justify-center">
                    <BookOpen className="h-6 w-6 text-blue-300" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl">Nasser Centre for Science and Technology</h3>
                    <p className="text-sm text-gray-400">Sept 2022 – June 2025</p>
                  </div>
                </div>
                <p className="text-gray-300 text-sm mb-2">Student in cloud computing, focused on AI & DevOps.</p>
                <Badge className="bg-blue-600">Education</Badge>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-green-900/50 flex items-center justify-center">
                    <Briefcase className="h-6 w-6 text-green-300" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl">Gulf Ari Group</h3>
                    <p className="text-sm text-gray-400">May 11 – 28, 2025</p>
                  </div>
                </div>
                <p className="text-gray-300 text-sm mb-2">
                  Platform Engineering OJT with focus on CI/CD and container orchestration.
                </p>
                <Badge className="bg-green-600">Experience</Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        <div
          className={`bg-gray-800 rounded-lg overflow-hidden h-64 relative cursor-pointer
            ${hoveredItem === "education" ? "scale-105 shadow-xl z-10" : "scale-100"}
            transition-all duration-300
          `}
          onMouseEnter={() => onHover && onHover("education")}
          onMouseLeave={() => onHover && onHover("")}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent z-10" />

          {hoveredItem === "education" && (
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <Button className="bg-white text-black hover:bg-white/90 flex items-center gap-2">
                <Play className="h-4 w-4 fill-black" /> View
              </Button>
            </div>
          )}

          <div className="absolute bottom-0 left-0 p-4 z-20">
            <h3 className="text-xl font-bold mb-2">Education & Experience</h3>
            <p className="text-sm text-gray-300 line-clamp-2">My academic journey and professional experience</p>
          </div>
        </div>
      )}
    </div>
  )
}

// Keeping the original Adventure mode but not using it by default
function AdventureEducation() {
  const [activeItem, setActiveItem] = useState<string | null>(null)

  return (
    <div className="max-w-2xl mx-auto font-pixel">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2 className="text-3xl font-bold mb-8 text-center text-amber-400 tracking-wider">Ancient Scrolls & Ledgers</h2>

        <div className="bg-stone-800/70 backdrop-blur-md p-6 rounded-lg border-2 border-stone-600 shadow-xl">
          <div className="grid grid-cols-1 gap-6">
            {/* Education Item */}
            <motion.div
              className={`p-4 rounded-md border-2 cursor-pointer transition-all duration-300 ease-in-out shadow-md hover:shadow-amber-500/30 ${
                activeItem === "education"
                  ? "border-amber-500 bg-amber-900/40 scale-105"
                  : "border-stone-600 bg-stone-700/60 hover:border-amber-600/70"
              }`}
              onClick={() => setActiveItem(activeItem === "education" ? null : "education")}
              whileHover={{ scale: activeItem === "education" ? 1.05 : 1.03 }}
              layout
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-amber-700/30 flex items-center justify-center border-2 border-amber-600/50 shadow-inner">
                  <BookOpen className="h-7 w-7 text-amber-300" />
                </div>
                <div>
                  <h3 className="font-bold text-xl text-amber-300">Nasser Archives of Knowledge</h3>
                  <p className="text-sm text-stone-400">Year of Enrollment: Sept 2022 – Present Era</p>
                </div>
              </div>

              {activeItem === "education" && (
                <motion.div
                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                  animate={{ opacity: 1, height: "auto", marginTop: "1rem" }}
                  exit={{ opacity: 0, height: 0, marginTop: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <p className="text-sm text-stone-300 leading-relaxed border-t-2 border-stone-600/70 pt-3 mt-3">
                    Within these hallowed halls, I delve into the arcane arts of Cloud Weaving and the enigmatic
                    constructs of Artificial Intellect & Developer Operations. My studies focus on transmuting
                    theoretical scripts into tangible, real-world enchantments.
                  </p>
                </motion.div>
              )}
            </motion.div>

            {/* Experience Item */}
            <motion.div
              className={`p-4 rounded-md border-2 cursor-pointer transition-all duration-300 ease-in-out shadow-md hover:shadow-teal-500/30 ${
                activeItem === "experience"
                  ? "border-teal-500 bg-teal-900/40 scale-105"
                  : "border-stone-600 bg-stone-700/60 hover:border-teal-600/70"
              }`}
              onClick={() => setActiveItem(activeItem === "experience" ? null : "experience")}
              whileHover={{ scale: activeItem === "experience" ? 1.05 : 1.03 }}
              layout
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-teal-700/30 flex items-center justify-center border-2 border-teal-600/50 shadow-inner">
                  <Briefcase className="h-7 w-7 text-teal-300" />
                </div>
                <div>
                  <h3 className="font-bold text-xl text-teal-300">The Gulf Ari Artificer's Guild</h3>
                  <p className="text-sm text-stone-400">Apprenticeship: 11th Moon – 28th Moon, Year 2025</p>
                </div>
              </div>

              {activeItem === "experience" && (
                <motion.div
                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                  animate={{ opacity: 1, height: "auto", marginTop: "1rem" }}
                  exit={{ opacity: 0, height: 0, marginTop: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <p className="text-sm text-stone-300 leading-relaxed border-t-2 border-stone-600/70 pt-3 mt-3">
                    My apprenticeship involved mastering the crafts of Platform Engineering: forging Continuous
                    Integration & Deployment runes, orchestrating legions of Containers, and automating the very fabric
                    of Infrastructure through Code.
                  </p>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

// Main component that now defaults to the roguelike map style
export default function EducationSection({
  mode = "mobile-rpg", // Changed default to mobile-rpg to use the new roguelike map style
  expanded = false,
  onSelect,
  onHover,
  hoveredItem,
}: EducationSectionProps) {
  if (mode === "netflix") {
    return <NetflixEducation expanded={expanded} onSelect={onSelect} onHover={onHover} hoveredItem={hoveredItem} />
  }

  if (mode === "adventure") {
    return <AdventureEducation />
  }

  if (mode === "doom") {
    return <DoomEducation />
  }

  // Default to the new roguelike map style for mobile-rpg mode
  return <RoguelikeMapEducation />
}
