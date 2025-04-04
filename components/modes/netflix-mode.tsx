"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, X, Play, Info, ThumbsUp, Plus, Share2 } from "lucide-react"
import AboutSection from "@/components/sections/about-section"
import CertificationsSection from "@/components/sections/certifications-section"
import ProjectsSection from "@/components/sections/projects-section"
import SkillsSection from "@/components/sections/skills-section"
import ContactSection from "@/components/sections/contact-section"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog"

// Background images for the slideshow
const backgroundImages = [
  "/images/hero-bg-1.jpg",
  "/images/hero-bg-2.jpg",
  "/images/hero-bg-3.jpg",
  "/images/hero-bg-4.jpg",
]

const sections = [
  { id: "about", component: AboutSection, title: "About Mohammed" },
  { id: "certifications", component: CertificationsSection, title: "Top Certifications" },
  { id: "projects", component: ProjectsSection, title: "Trending Projects" },
  { id: "skills", component: SkillsSection, title: "Skills & Tools" },
  { id: "contact", component: ContactSection, title: "Connect" },
]

const continueExploring = [
  { id: "projects", component: ProjectsSection, title: "Continue Exploring Projects" },
  { id: "skills", component: SkillsSection, title: "Continue with Skills" },
]

// Add Netflix-style controls for items
const renderNetflixItemControls = (id: string, hoveredItem: string | null) =>
  hoveredItem === id && (
    <div className="absolute bottom-4 right-4 flex gap-2 z-20">
      <Button size="icon" variant="ghost" className="rounded-full bg-gray-800/70 h-8 w-8">
        <ThumbsUp className="h-4 w-4" />
      </Button>
      <Button size="icon" variant="ghost" className="rounded-full bg-gray-800/70 h-8 w-8">
        <Plus className="h-4 w-4" />
      </Button>
      <Button size="icon" variant="ghost" className="rounded-full bg-gray-800/70 h-8 w-8">
        <Share2 className="h-4 w-4" />
      </Button>
    </div>
  )

export default function NetflixMode() {
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const rowRefs = useRef<Record<string, HTMLDivElement | null>>({})
  const [currentBgIndex, setCurrentBgIndex] = useState(0)

  // Background slideshow effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length)
    }, 8000) // Change background every 8 seconds

    return () => clearInterval(interval)
  }, [])

  const scrollRow = (id: string, direction: "left" | "right") => {
    const row = rowRefs.current[id]
    if (!row) return

    const scrollAmount = 400
    const newScrollLeft = direction === "left" ? row.scrollLeft - scrollAmount : row.scrollLeft + scrollAmount

    row.scrollTo({
      left: newScrollLeft,
      behavior: "smooth",
    })
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden pb-20">
      {/* Hero Banner with Netflix-style UI and background slideshow */}
      <div className="h-screen relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentBgIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${backgroundImages[currentBgIndex]}')` }}
          />
        </AnimatePresence>
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
                <Play className="h-5 w-5 fill-black" /> Play
              </Button>
              <Button variant="outline" className="px-8 py-6 text-lg flex items-center gap-2">
                <Info className="h-5 w-5" /> More Info
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Netflix-style category badges */}
        <div className="absolute bottom-32 left-12 z-20 flex gap-2">
          <span className="text-sm border border-gray-500 px-1 rounded">Cloud</span>
          <span className="text-sm border border-gray-500 px-1 rounded">AI</span>
          <span className="text-sm border border-gray-500 px-1 rounded">DevOps</span>
        </div>
      </div>

      {/* Continue Exploring Section */}
      <div className="px-8 space-y-16 mt-8">
        {continueExploring.map((section) => (
          <div key={section.id} className="relative">
            <h2 className="text-2xl font-bold mb-4 ml-2">{section.title}</h2>

            <div className="relative group">
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => scrollRow(section.id, "left")}
              >
                <ChevronLeft className="h-8 w-8" />
              </Button>

              <div
                ref={(el) => (rowRefs.current[section.id] = el)}
                className="flex overflow-x-auto scrollbar-hide gap-4 pb-4"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                <div className="flex-shrink-0 w-full relative">
                  {section.component({
                    mode: "netflix",
                    onSelect: () => setActiveSection(section.id),
                    onHover: (id: string) => setHoveredItem(id),
                    hoveredItem: hoveredItem,
                  })}
                  {renderNetflixItemControls(section.id, hoveredItem)}
                </div>
              </div>

              <Button
                variant="ghost"
                size="icon"
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => scrollRow(section.id, "right")}
              >
                <ChevronRight className="h-8 w-8" />
              </Button>
            </div>
          </div>
        ))}

        {/* Regular Sections */}
        {sections.map((section) => (
          <div key={section.id} className="relative">
            <h2 className="text-2xl font-bold mb-4 ml-2">{section.title}</h2>

            <div className="relative group">
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => scrollRow(section.id, "left")}
              >
                <ChevronLeft className="h-8 w-8" />
              </Button>

              <div
                ref={(el) => (rowRefs.current[section.id] = el)}
                className="flex overflow-x-auto scrollbar-hide gap-4 pb-4"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                <div className="flex-shrink-0 w-full relative">
                  {section.component({
                    mode: "netflix",
                    onSelect: () => setActiveSection(section.id),
                    onHover: (id: string) => setHoveredItem(id),
                    hoveredItem: hoveredItem,
                  })}
                  {renderNetflixItemControls(section.id, hoveredItem)}
                </div>
              </div>

              <Button
                variant="ghost"
                size="icon"
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => scrollRow(section.id, "right")}
              >
                <ChevronRight className="h-8 w-8" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Netflix-style modal for expanded content */}
      <Dialog open={!!activeSection} onOpenChange={() => setActiveSection(null)}>
        <DialogContent className="bg-gray-900 border-gray-800 max-w-4xl">
          <DialogClose className="absolute right-4 top-4">
            <X className="h-5 w-5" />
          </DialogClose>

          <AnimatePresence mode="wait">
            {activeSection && (
              <motion.div
                key={activeSection}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-6"
              >
                {sections
                  .find((s) => s.id === activeSection)
                  ?.component({
                    mode: "netflix",
                    expanded: true,
                  }) ||
                  continueExploring
                    .find((s) => s.id === activeSection)
                    ?.component({
                      mode: "netflix",
                      expanded: true,
                    })}
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </div>
  )
}

