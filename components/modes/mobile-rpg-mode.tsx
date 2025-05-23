"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useMode } from "@/components/mode-provider"
import HeroArchive from "@/components/sections/hero-archive"
import AboutArchive from "@/components/sections/about-archive"
import CertificationsArchive from "@/components/sections/certifications-archive"
import ProjectsArchive from "@/components/sections/projects-archive"
import SkillsArchive from "@/components/sections/skills-archive"
import ContactArchive from "@/components/sections/contact-archive"
import AcademyArchives from "@/components/sections/academy-archives"
import { Button } from "@/components/ui/button"
import { Heart, Sparkles } from "lucide-react"

type Zone = "home" | "about" | "certifications" | "projects" | "skills" | "contact" | "education"

interface DialogMessage {
  text: string
  speaker?: string
  options?: Array<{
    text: string
    action: () => void
  }>
}

// RPG game elements
interface GameStats {
  level: number
  exp: number
  maxExp: number
  hp: number
  maxHp: number
  mp: number
  maxMp: number
}

interface QuestLog {
  title: string
  description: string
  completed: boolean
}

export default function MobileRpgMode() {
  const { isMobile } = useMode()
  const [currentZone, setCurrentZone] = useState<Zone>("home")
  const [dialogMessage, setDialogMessage] = useState<DialogMessage | null>(null)
  const [characterPosition, setCharacterPosition] = useState({ x: 50, y: 80 })
  const [isMoving, setIsMoving] = useState(false)
  const [direction, setDirection] = useState<"left" | "right" | "up" | "down" | null>(null)
  const [gameStats, setGameStats] = useState<GameStats>({
    level: 1,
    exp: 0,
    maxExp: 100,
    hp: 100,
    maxHp: 100,
    mp: 50,
    maxMp: 50,
  })
  const [quests, setQuests] = useState<QuestLog[]>([
    {
      title: "The Artificer's Tale",
      description: "Discover the origins of the DevOps Artificer",
      completed: false,
    },
    {
      title: "Grimoire of Skills",
      description: "Uncover the magical abilities in the Skills Grimoire",
      completed: false,
    },
    {
      title: "Legendary Artifacts",
      description: "Examine the artifacts in the Quest Journal",
      completed: false,
    },
    {
      title: "Sacred Scrolls",
      description: "Find all certification scrolls in the temple",
      completed: false,
    },
    {
      title: "Ancient Knowledge",
      description: "Study the Academy Archives for wisdom",
      completed: false,
    },
  ])

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const avatarRef = useRef<HTMLImageElement | null>(null)

  // Game zones with coordinates and components
  const zones = {
    home: {
      x: 50,
      y: 80,
      component: HeroArchive,
      name: "The Artificer's Haven",
      description: "The central hub of Mohammed's realm",
      type: "town",
      color: "#8B4513", // Brown for town
      radius: 2.5, // Size multiplier for the zone
    },
    about: {
      x: 20,
      y: 40,
      component: AboutArchive,
      name: "Character Lore",
      description: "The chronicles of the DevOps Artificer",
      type: "forest",
      color: "#228B22", // Forest green
      radius: 2.2,
    },
    certifications: {
      x: 80,
      y: 40,
      component: CertificationsArchive,
      name: "Certification Scrolls",
      description: "Ancient scrolls of arcane knowledge",
      type: "temple",
      color: "#DAA520", // Golden temple
      radius: 2.3,
    },
    projects: {
      x: 30,
      y: 20,
      component: ProjectsArchive,
      name: "Quest Journal",
      description: "Records of completed and ongoing quests",
      type: "workshop",
      color: "#B22222", // Fiery red for forge
      radius: 2.1,
    },
    skills: {
      x: 70,
      y: 60,
      component: SkillsArchive,
      name: "Skills Grimoire",
      description: "Tomes of arcane knowledge and abilities",
      type: "training",
      color: "#4682B4", // Steel blue for weapons
      radius: 2.0,
    },
    contact: {
      x: 50,
      y: 30,
      component: ContactArchive,
      name: "Messenger Ravens",
      description: "Magical birds for sending messages",
      type: "crystal",
      color: "#00CED1", // Turquoise for communication
      radius: 1.8,
    },
    education: {
      x: 40,
      y: 50,
      component: AcademyArchives,
      name: "Academy Archives",
      description: "Ancient records of training and experiences",
      type: "academy",
      color: "#9370DB", // Medium purple for education
      radius: 2.1,
    },
  }

  // Load avatar image
  useEffect(() => {
    const img = new Image()
    img.src = "/images/pixel-character.png" 
    img.crossOrigin = "anonymous"
    img.onload = () => {
      avatarRef.current = img
    }
    img.onerror = () => {
      // Fallback to a colored rectangle if image fails to load
      const canvas = document.createElement("canvas")
      canvas.width = 24
      canvas.height = 24
      const ctx = canvas.getContext("2d")
      if (ctx) {
        ctx.fillStyle = "#8B4513"
        ctx.fillRect(0, 0, 24, 24)
        ctx.fillStyle = "#DAA520"
        ctx.fillRect(8, 8, 8, 8)
        const img = new Image()
        img.src = canvas.toDataURL()
        avatarRef.current = img
      }
    }
  }, [])

  // Initialize game
  useEffect(() => {
    // Welcome message with Master Artificer
    setDialogMessage({
      speaker: "Master Artificer",
      text: "Welcome to the Artificer's Haven, the heart of Mohammed's portfolio realm. Let us explore the chronicles of this DevOps Artificer!",
      options: [{ text: "Character Lore", action: () => navigateToZone("about") }],
    })
  }, [])

  // Handle window resize for canvas dimensions
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current
      if (canvas) {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
      }
    }
    
    window.addEventListener('resize', handleResize)
    handleResize() // Initial setup
    
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // Animation loop for character
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Draw simplified map with zones and paths
    const drawMap = () => {
      // Clear canvas for transparent background
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw parchment background texture
      const drawParchmentTexture = () => {
        ctx.fillStyle = "rgba(139, 69, 19, 0.1)" // Very light brown
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        // Add some random noise for texture
        for (let i = 0; i < 2000; i++) {
          const x = Math.random() * canvas.width
          const y = Math.random() * canvas.height
          const size = Math.random() * 2
          ctx.fillStyle = `rgba(218, 165, 32, ${Math.random() * 0.05})`
          ctx.fillRect(x, y, size, size)
        }
      }

      drawParchmentTexture()

      // Draw dirt paths between zones
      ctx.strokeStyle = "#8B4513" // Brown dirt path
      ctx.lineWidth = 14 // Thicker for better visibility
      ctx.lineCap = "round"
      ctx.lineJoin = "round"

      // Draw main path
      ctx.beginPath()
      let firstZone = true
      Object.values(zones).forEach((zone) => {
        const x = (zone.x * canvas.width) / 100
        const y = (zone.y * canvas.height) / 100
        if (firstZone) {
          ctx.moveTo(x, y)
          firstZone = false
        } else {
          ctx.lineTo(x, y)
        }
      })
      ctx.stroke()

      // Draw zone locations with simple markers
      Object.entries(zones).forEach(([zoneName, zone]) => {
        const x = (zone.x * canvas.width) / 100
        const y = (zone.y * canvas.height) / 100
        const radius = 24 * zone.radius // Bigger for better touch targets

        // Draw glowing effect for current zone
        if (zoneName === currentZone) {
          ctx.beginPath()
          ctx.arc(x, y, radius + 8, 0, Math.PI * 2)
          ctx.fillStyle = `${zone.color}30` // Very transparent
          ctx.fill()
        }

        // Draw zone circle
        ctx.beginPath()
        ctx.arc(x, y, radius, 0, Math.PI * 2)
        ctx.fillStyle =
          zoneName === currentZone
            ? `${zone.color}80` // Current zone (with transparency)
            : `${zone.color}40` // Other zones (more transparent)
        ctx.fill()

        // Draw zone border
        ctx.strokeStyle = zone.color
        ctx.lineWidth = 3
        ctx.stroke()

        // Draw zone icon
        ctx.fillStyle = "#ffffff"
        ctx.font = "16px monospace"
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"

        // Different icon for each zone type
        let icon = "⭐"
        if (zone.type === "forest") icon = "📜"
        if (zone.type === "temple") icon = "🏛️"
        if (zone.type === "workshop") icon = "📕"
        if (zone.type === "training") icon = "📚"
        if (zone.type === "crystal") icon = "🦅"
        if (zone.type === "town") icon = "🏠"
        if (zone.type === "academy") icon = "🎓"

        ctx.fillText(icon, x, y)
      })

      // Draw character
      if (avatarRef.current) {
        const x = (characterPosition.x * canvas.width) / 100
        const y = (characterPosition.y * canvas.height) / 100

        // Draw shadow under character
        ctx.fillStyle = "rgba(0, 0, 0, 0.3)"
        ctx.beginPath()
        ctx.ellipse(x, y + 10, 12, 6, 0, 0, Math.PI * 2)
        ctx.fill()

        // Draw character
        ctx.drawImage(avatarRef.current, x - 16, y - 24, 32, 32)

        // Draw small glow effect around character
        ctx.beginPath()
        ctx.arc(x, y - 8, 24, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(218, 165, 32, 0.2)"
        ctx.fill()
      }
    }

    // Animation loop
    const animate = () => {
      drawMap()
      requestAnimationFrame(animate)
    }

    const animationId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationId)
  }, [characterPosition, direction, currentZone, isMoving])

  const moveCharacter = (deltaX: number, deltaY: number) => {
    setIsMoving(true)
    setDirection(deltaX < 0 ? "left" : deltaX > 0 ? "right" : deltaY < 0 ? "up" : "down")

    setCharacterPosition((prev) => {
      const newX = Math.max(0, Math.min(100, prev.x + deltaX))
      const newY = Math.max(0, Math.min(100, prev.y + deltaY))
      return { x: newX, y: newY }
    })

    setTimeout(() => setIsMoving(false), 300)

    // Check if character is near any zone
    checkZoneProximity()
  }

  const checkZoneProximity = () => {
    Object.entries(zones).forEach(([zoneName, zonePos]) => {
      const distance = Math.sqrt(
        Math.pow(characterPosition.x - zonePos.x, 2) + Math.pow(characterPosition.y - zonePos.y, 2)
      )

      // Increased proximity threshold for better touch responsiveness
      if (distance < 20 && zoneName !== currentZone) {
        navigateToZone(zoneName as Zone)
      }
    })
  }

  const navigateToZone = (zone: Zone) => {
    // Add experience when discovering a new zone
    if (zone !== currentZone) {
      gainExperience(25)

      // Update quest progress
      if (zone === "about" && !quests[0].completed) {
        completeQuest(0)
      } else if (zone === "skills" && !quests[1].completed) {
        completeQuest(1)
      } else if (zone === "projects" && !quests[2].completed) {
        completeQuest(2)
      } else if (zone === "certifications" && !quests[3].completed) {
        completeQuest(3)
      } else if (zone === "education" && !quests[4].completed) {
        completeQuest(4)
      }
    }

    setCurrentZone(zone)
    setCharacterPosition({
      x: zones[zone].x,
      y: zones[zone].y,
    })

    // Set dialog message based on zone
    switch (zone) {
      case "home":
        setDialogMessage({
          speaker: "Master Artificer",
          text: "Welcome to the Artificer's Haven, the heart of Mohammed's portfolio realm. Let us explore the chronicles of this DevOps Artificer!",
          options: [{ text: "Character Lore", action: () => navigateToZone("about") }],
        })
        break
      case "about":
        setDialogMessage({
          speaker: "Lorekeeper",
          text: "Here lies the Character Lore of Mohammed, the DevOps Artificer. His journey is one of cloud mastery and technical prowess.",
          options: [
            { text: "Academy Archives", action: () => navigateToZone("education") },
            { text: "Artificer's Haven", action: () => navigateToZone("home") },
          ],
        })
        break
      case "education":
        setDialogMessage({
          speaker: "Academy Archivist",
          text: "The Academy Archives contain ancient scrolls documenting the Artificer's training in the mystical arts of Cloud Computing and DevOps.",
          options: [
            { text: "Certification Scrolls", action: () => navigateToZone("certifications") },
            { text: "Character Lore", action: () => navigateToZone("about") },
          ],
        })
        break
      case "certifications":
        setDialogMessage({
          speaker: "Scroll Keeper",
          text: "Behold the Certification Scrolls! These ancient parchments attest to the Artificer's mastery of cloud realms and DevOps sorcery.",
          options: [
            { text: "Quest Journal", action: () => navigateToZone("projects") },
            { text: "Character Lore", action: () => navigateToZone("about") },
          ],
        })
        break
      case "projects":
        setDialogMessage({
          speaker: "Quest Chronicler",
          text: "The Quest Journal contains tales of the Artificer's completed adventures and ongoing quests in the digital realm.",
          options: [
            { text: "Skills Grimoire", action: () => navigateToZone("skills") },
            { text: "Certification Scrolls", action: () => navigateToZone("certifications") },
          ],
        })
        break
      case "skills":
        setDialogMessage({
          speaker: "Arcane Instructor",
          text: "The Skills Grimoire contains all the magical abilities the DevOps Artificer has mastered through years of study.",
          options: [
            { text: "Messenger Ravens", action: () => navigateToZone("contact") },
            { text: "Quest Journal", action: () => navigateToZone("projects") },
          ],
        })
        break
      case "contact":
        setDialogMessage({
          speaker: "Raven Master",
          text: "The Messenger Ravens await to carry your words to the Artificer. Choose a raven to establish communication.",
          options: [
            { text: "Artificer's Haven", action: () => navigateToZone("home") },
            { text: "Skills Grimoire", action: () => navigateToZone("skills") },
          ],
        })
        break
    }
  }

  const gainExperience = (amount: number) => {
    setGameStats((prev) => {
      const newExp = prev.exp + amount

      // Level up if enough experience
      if (newExp >= prev.maxExp) {
        return {
          ...prev,
          level: prev.level + 1,
          exp: newExp - prev.maxExp,
          maxExp: Math.floor(prev.maxExp * 1.5),
          maxHp: Math.floor(prev.maxHp * 1.2),
          hp: Math.floor(prev.maxHp * 1.2),
          maxMp: Math.floor(prev.maxMp * 1.2),
          mp: Math.floor(prev.maxMp * 1.2),
        }
      }

      return {
        ...prev,
        exp: newExp,
      }
    })
  }

  const completeQuest = (questIndex: number) => {
    setQuests((prev) => {
      const newQuests = [...prev]
      newQuests[questIndex] = {
        ...newQuests[questIndex],
        completed: true,
      }
      return newQuests
    })

    // Reward for completing quest
    gainExperience(50)
  }

  const CurrentZoneComponent = zones[currentZone].component

  // Improved dialog box with better contrast and positioning
  const dialogBox = dialogMessage && (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      className="absolute bottom-16 left-4 right-4 bg-stone-800/95 p-4 rounded-lg border-2 border-amber-600/50 z-30 shadow-xl"
    >
      {dialogMessage.speaker && (
        <div className="bg-amber-900/80 -mt-8 px-3 py-1 rounded-full inline-block border border-amber-600/50 font-bold text-sm text-amber-300 font-serif">
          {dialogMessage.speaker}
        </div>
      )}

      <p className="mb-4 text-amber-300 font-serif leading-tight text-base">{dialogMessage.text}</p>

      {dialogMessage.options && (
        <div className="flex flex-wrap gap-3 border-t border-amber-600/30 pt-3">
          {dialogMessage.options.map((option, index) => (
            <button
              key={index}
              onClick={option.action}
              className="bg-amber-900/60 hover:bg-amber-800 px-4 py-2 rounded-md text-amber-300 hover:text-amber-200 cursor-pointer text-base transition-colors flex-1 min-w-[120px] flex items-center justify-center font-serif border border-amber-600/50"
            >
              <span className="mr-2">{index === 0 ? "▶" : "◀"}</span> {option.text}
            </button>
          ))}
        </div>
      )}
    </motion.div>
  )

  // Improved canvas click handler with better touch detection
  const handleCanvasClick = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault()

    // Get canvas element and its dimensions
    const canvas = canvasRef.current
    if (!canvas) return

    // Get click/touch position
    const rect = canvas.getBoundingClientRect()
    let clientX, clientY

    if ("touches" in e) {
      if (e.touches.length > 0) {
        clientX = e.touches[0].clientX
        clientY = e.touches[0].clientY
      } else {
        // For touchend events
        const touchEnd = e as unknown as React.TouchEvent
        if (touchEnd.changedTouches && touchEnd.changedTouches.length > 0) {
          clientX = touchEnd.changedTouches[0].clientX
          clientY = touchEnd.changedTouches[0].clientY
        } else {
          return // No valid touch points
        }
      }
    } else if ("clientX" in e) {
      clientX = e.clientX
      clientY = e.clientY
    } else {
      return // No valid event data
    }

    // Convert to percentage position
    const percentX = ((clientX - rect.left) / rect.width) * 100
    const percentY = ((clientY - rect.top) / rect.height) * 100

    // Set new character position with smooth animation
    setIsMoving(true)
    setDirection(
      percentX > characterPosition.x
        ? "right"
        : percentX < characterPosition.x
        ? "left"
        : percentY > characterPosition.y
        ? "down"
        : "up"
    )

    setCharacterPosition({ x: percentX, y: percentY })
    setTimeout(() => setIsMoving(false), 300)

    // Check if near a zone
    checkZoneProximity()
  }

  // Improved swipe handler with better touch detection
  const handleSwipe = (e: React.TouchEvent) => {
    if (!e.touches || e.touches.length === 0) return

    const touch = e.touches[0]
    const startX = touch.clientX
    const startY = touch.clientY
    
    let endX = startX
    let endY = startY
    let isSwiping = false

    const handleTouchMove = (moveEvent: TouchEvent) => {
      if (moveEvent.touches && moveEvent.touches.length > 0) {
        endX = moveEvent.touches[0].clientX
        endY = moveEvent.touches[0].clientY
        isSwiping = true
      }
    }

    const handleTouchEnd = (endEvent: TouchEvent) => {
      if (!isSwiping) return
      
      const deltaX = endX - startX
      const deltaY = endY - startY
      
      // Only handle as swipe if there's significant movement
      if (Math.abs(deltaX) > 30 || Math.abs(deltaY) > 30) {
        if (Math.abs(deltaX) < Math.abs(deltaY) && deltaY < -30) {
          // Swipe up - larger movement for mobile
          moveCharacter(0, -10)
        } else if (Math.abs(deltaX) < Math.abs(deltaY) && deltaY > 30) {
          // Swipe down
          moveCharacter(0, 10)
        } else if (Math.abs(deltaX) > Math.abs(deltaY) && deltaX > 30) {
          // Swipe right
          moveCharacter(10, 0)
        } else if (Math.abs(deltaX) > Math.abs(deltaY) && deltaX < -30) {
          // Swipe left
          moveCharacter(-10, 0)
        }
      }

      document.removeEventListener("touchmove", handleTouchMove)
      document.removeEventListener("touchend", handleTouchEnd)
    }

    document.addEventListener("touchmove", handleTouchMove, { passive: false })
    document.addEventListener("touchend", handleTouchEnd)
  }

  // RPG-style status bar - improved for mobile with exp bar
  const statusBars = (
    <div className="absolute top-0 left-0 right-0 z-30 bg-stone-800/90 backdrop-blur-sm p-2 flex flex-col">
      {/* Top row with level and exp */}
      <div className="flex items-center mb-1">
        <div className="bg-amber-900/80 px-3 py-1 rounded-full text-sm font-bold mr-2 text-amber-300 border border-amber-600/50 font-serif">
          Lv. {gameStats.level}
        </div>
        <div className="flex-1">
          <div className="flex justify-between text-xs items-center">
            <span className="flex items-center text-amber-300 font-serif">
              <span className="text-amber-500 mr-1">EXP</span> {gameStats.exp}/{gameStats.maxExp}
            </span>
          </div>
          <div className="w-full bg-stone-700 rounded-full h-2 border border-stone-600">
            <div
              className="bg-gradient-to-r from-amber-800 to-amber-500 h-1.5 rounded-full"
              style={{ width: `${(gameStats.exp / gameStats.maxExp) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Bottom row with HP and MP */}
      <div className="flex">
        {/* HP Bar */}
        <div className="flex-1 mr-2">
          <div className="flex justify-between text-xs items-center">
            <span className="flex items-center text-amber-300 font-serif">
              <Heart className="h-3 w-3 text-red-500 mr-1" /> {gameStats.hp}/{gameStats.maxHp}
            </span>
          </div>
          <div className="w-full bg-stone-700 rounded-full h-2 border border-stone-600">
            <div
              className="bg-gradient-to-r from-red-800 to-red-500 h-1.5 rounded-full"
              style={{ width: `${(gameStats.hp / gameStats.maxHp) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* MP Bar */}
        <div className="flex-1">
          <div className="flex justify-between text-xs items-center">
            <span className="flex items-center text-amber-300 font-serif">
              <Sparkles className="h-3 w-3 text-blue-500 mr-1" /> {gameStats.mp}/{gameStats.maxMp}
            </span>
          </div>
          <div className="w-full bg-stone-700 rounded-full h-2 border border-stone-600">
            <div
              className="bg-gradient-to-r from-blue-800 to-blue-500 h-1.5 rounded-full"
              style={{ width: `${(gameStats.mp / gameStats.maxMp) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  )

  // Location name indicator
  const locationIndicator = (
    <div className="absolute top-16 left-0 right-0 z-20 flex justify-center">
      <div className="bg-stone-800/80 backdrop-blur-sm px-4 py-2 rounded-full border border-amber-600/50">
        <span className="text-base font-bold text-amber-300 font-serif">{zones[currentZone].name}</span>
      </div>
    </div>
  )

  return (
    <div
      className="h-screen w-screen overflow-hidden relative font-serif text-amber-300"
      style={{
        backgroundImage:
          "url('https://c4.wallpaperflare.com/wallpaper/916/248/841/board-dragons-dungeons-fantasy-wallpaper-preview.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      onTouchStart={handleSwipe} 
    >
      {/* Game canvas for RPG map and character */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 touch-none"
        onClick={handleCanvasClick}
        onTouchEnd={handleCanvasClick}
      />

      {/* Current zone content - Updated with slide-down animation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentZone}
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="absolute inset-x-0 top-0 bottom-0 z-10 flex flex-col"
        >
          <div className="absolute inset-0 bg-stone-900/80" />
          <motion.div
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.1, duration: 0.3 }}
            className="relative z-20 w-full h-full pt-24 pb-32 px-4 overflow-y-auto"
          >
            <CurrentZoneComponent mode="mobile-rpg" />
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* RPG UI Elements */}
      {statusBars}
      {locationIndicator}
      {dialogBox}
    </div>
  )
}
