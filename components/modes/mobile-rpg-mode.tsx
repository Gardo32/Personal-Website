"use client"

import React, { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import HeroArchive from "@/components/sections/hero-archive"
import AboutArchive from "@/components/sections/about-archive"
import CertificationsArchive from "@/components/sections/certifications-archive"
import ProjectsArchive from "@/components/sections/projects-archive"
import SkillsArchive from "@/components/sections/skills-archive"
import ContactArchive from "@/components/sections/contact-archive"
import AcademyArchives from "@/components/sections/academy-archives"
import { Button } from "@/components/ui/button"
import { ArrowUp, ArrowDown, ChevronsUp, ChevronsDown } from "lucide-react"

type Zone = "home" | "about" | "certifications" | "projects" | "skills" | "contact" | "education"

const zones = {
    home: {
      component: HeroArchive,
      name: "The Artificer\'s Haven",
      icon: "🏠",
      x: 50,
      y: 15,
      color: "#8B4513",
    },
    about: {
      component: AboutArchive,
      name: "Character Lore",
      icon: "📜",
      x: 50,
      y: 30,
      color: "#228B22",
    },
    education: {
      component: AcademyArchives,
      name: "Academy Archives",
      icon: "🎓",
      x: 50,
      y: 45,
      color: "#9370DB",
    },
    skills: {
      component: SkillsArchive,
      name: "Skills Grimoire",
      icon: "📚",
      x: 50,
      y: 60,
      color: "#4682B4",
    },
    projects: {
      component: ProjectsArchive,
      name: "Quest Journal",
      icon: "📕",
      x: 50,
      y: 75,
      color: "#B22222",
    },
    certifications: {
      component: CertificationsArchive,
      name: "Certification Scrolls",
      icon: "🏛️",
      x: 50,
      y: 90,
      color: "#DAA520",
    },
    contact: {
      component: ContactArchive,
      name: "Messenger Ravens",
      icon: "🦅",
      x: 50,
      y: 105,
      color: "#00CED1",
    },
}

const zoneOrder: Zone[] = ["home", "about", "education", "skills", "projects", "certifications", "contact"]

export default function MobileRpgMode() {
  const [currentZoneIndex, setCurrentZoneIndex] = useState(0)

  const navigateToZone = (index: number) => {
    setCurrentZoneIndex(index)
  }

  const currentZone = zoneOrder[currentZoneIndex]
  const CurrentZoneComponent = zones[currentZone].component

  return (
    <div
      className="h-screen w-screen overflow-hidden flex flex-col text-amber-200 font-serif relative"
      style={{
        backgroundImage:
          "url('/images/board-dragons-dungeons-fantasy-wallpaper-preview.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex flex-1 overflow-hidden">
          {/* Main Content */}
          <main className="flex-1 p-4 overflow-y-auto bg-black/30 backdrop-blur-sm">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentZone}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                <CurrentZoneComponent mode="mobile-rpg" />
              </motion.div>
            </AnimatePresence>
          </main>
        </div>

        {/* Footer Taskbar */}
        <footer className="p-3 bg-stone-800/80 backdrop-blur-sm border-t-2 border-amber-600/30 flex justify-center space-x-4 shadow-lg overflow-x-auto">
          {zoneOrder.map((zoneKey, index) => (
            <div
              key={zoneKey}
              onClick={() => navigateToZone(index)}
              className={`w-16 h-16 rounded-lg flex-shrink-0 flex items-center justify-center text-3xl transition-all duration-300 cursor-pointer ${
                index === currentZoneIndex
                  ? "bg-amber-500/80 border-2 border-amber-300 scale-110 shadow-lg"
                  : "bg-stone-700/50 border-2 border-stone-600"
              }`}
              title={zones[zoneKey].name}
            >
              {zones[zoneKey].icon}
            </div>
          ))}
        </footer>
      </div>
    </div>
  )
}
