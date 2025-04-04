"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronUp, ChevronDown, Menu, Heart, MessageCircle, Share2 } from "lucide-react"
import HeroSection from "@/components/sections/hero-section"
import AboutSection from "@/components/sections/about-section"
import CertificationsSection from "@/components/sections/certifications-section"
import ProjectsSection from "@/components/sections/projects-section"
import SkillsSection from "@/components/sections/skills-section"
import ContactSection from "@/components/sections/contact-section"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const sections = [
  { id: "hero", component: HeroSection, title: "Home" },
  { id: "about", component: AboutSection, title: "About Me" },
  { id: "certifications", component: CertificationsSection, title: "Certifications" },
  { id: "projects", component: ProjectsSection, title: "Projects" },
  { id: "skills", component: SkillsSection, title: "Skills & Tools" },
  { id: "contact", component: ContactSection, title: "Contact" },
]

// Update the TikTok-like UI elements with proper icons
const renderTikTokControls = (isLiked: boolean, setIsLiked: (value: boolean) => void) => (
  <div className="fixed right-4 bottom-20 flex flex-col items-center gap-4 z-30">
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setIsLiked(!isLiked)}
      className="rounded-full bg-transparent hover:bg-gray-800/30"
    >
      <motion.div animate={{ scale: isLiked ? [1, 1.2, 1] : 1 }} transition={{ duration: 0.3 }}>
        <Heart className={`h-7 w-7 ${isLiked ? "fill-red-500 text-red-500" : "text-white"}`} />
      </motion.div>
      <span className="text-xs mt-1 block">{isLiked ? "1" : "0"}</span>
    </Button>
    <Button variant="ghost" size="icon" className="rounded-full bg-transparent hover:bg-gray-800/30">
      <MessageCircle className="h-7 w-7" />
      <span className="text-xs mt-1 block">0</span>
    </Button>
    <Button variant="ghost" size="icon" className="rounded-full bg-transparent hover:bg-gray-800/30">
      <Share2 className="h-7 w-7" />
      <span className="text-xs mt-1 block">Share</span>
    </Button>
  </div>
)

export default function DoomScrollingMode() {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const [isLiked, setIsLiked] = useState(false)
  const [showLikeAnimation, setShowLikeAnimation] = useState(false)

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientY)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientY)
  }

  // Fix the doom scrolling section by improving the navigation and ensuring smooth transitions
  // Update the handleTouchEnd function to make scrolling more reliable
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isSwipeDown = distance < -80 // Increased threshold for better detection
    const isSwipeUp = distance > 80 // Increased threshold for better detection

    if (isSwipeUp && currentSectionIndex < sections.length - 1) {
      setCurrentSectionIndex((prev) => prev + 1)
    } else if (isSwipeDown && currentSectionIndex > 0) {
      setCurrentSectionIndex((prev) => prev - 1)
    }

    setTouchStart(null)
    setTouchEnd(null)
  }

  const handleDoubleTap = () => {
    if (!isLiked) {
      setIsLiked(true)
      setShowLikeAnimation(true)
      setTimeout(() => setShowLikeAnimation(false), 1000)
    }
  }

  const goToSection = (index: number) => {
    setCurrentSectionIndex(index)
  }

  const goToPrevSection = () => {
    if (currentSectionIndex > 0) {
      setCurrentSectionIndex((prev) => prev - 1)
    }
  }

  const goToNextSection = () => {
    if (currentSectionIndex < sections.length - 1) {
      setCurrentSectionIndex((prev) => prev + 1)
    }
  }

  return (
    <div
      className="h-screen w-screen overflow-hidden bg-gray-900 text-white"
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onDoubleClick={handleDoubleTap}
    >
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="fixed top-4 right-4 z-40 bg-gray-800/50 backdrop-blur-sm">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="bg-gray-800 border-gray-700">
          <nav className="flex flex-col gap-2 mt-8">
            {sections.map((section, index) => (
              <Button
                key={section.id}
                variant={currentSectionIndex === index ? "default" : "ghost"}
                className="justify-start"
                onClick={() => goToSection(index)}
              >
                {section.title}
              </Button>
            ))}
          </nav>
        </SheetContent>
      </Sheet>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentSectionIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="h-screen w-screen flex items-center justify-center"
        >
          {sections[currentSectionIndex].component({ mode: "doom" })}
        </motion.div>
      </AnimatePresence>

      {/* Like animation */}
      {showLikeAnimation && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1.5 }}
          exit={{ opacity: 0 }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 text-6xl"
        >
          ❤️
        </motion.div>
      )}

      {renderTikTokControls(isLiked, setIsLiked)}

      {/* Improve the navigation controls to make them more visible and easier to use
      Update the navigation dots and arrows at the bottom */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-3 z-30 bg-gray-800/50 backdrop-blur-sm p-2 rounded-lg">
        {currentSectionIndex > 0 && (
          <Button variant="ghost" size="icon" onClick={goToPrevSection} className="bg-gray-800/70 backdrop-blur-sm">
            <ChevronUp className="h-6 w-6" />
          </Button>
        )}

        <div className="flex gap-2">
          {sections.map((_, index) => (
            <div
              key={index}
              onClick={() => goToSection(index)}
              className={`h-3 w-3 rounded-full cursor-pointer transition-all duration-300 ${
                index === currentSectionIndex ? "bg-white scale-125" : "bg-gray-600 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>

        {currentSectionIndex < sections.length - 1 && (
          <Button variant="ghost" size="icon" onClick={goToNextSection} className="bg-gray-800/70 backdrop-blur-sm">
            <ChevronDown className="h-6 w-6" />
          </Button>
        )}
      </div>

      {/* Username and description - TikTok style */}
      <div className="fixed bottom-20 left-4 z-30 max-w-[70%]">
        <h3 className="font-bold text-lg">@mohammed_aldaqaq</h3>
        <p className="text-sm text-gray-300">
          {currentSectionIndex === 0 && "Cloud Computing Intern 👨‍💻 #tech #cloud #ai"}
          {currentSectionIndex === 1 && "About me 🚀 #techjourney #cloudcomputing"}
          {currentSectionIndex === 2 && "My certifications 🏆 #aws #azure #ibm"}
          {currentSectionIndex === 3 && "Check out my projects 💻 #developer #portfolio"}
          {currentSectionIndex === 4 && "Skills & tools I use daily 🛠️ #programming #devops"}
          {currentSectionIndex === 5 && "Let's connect! 🔗 #networking #opportunities"}
        </p>
      </div>
    </div>
  )
}

