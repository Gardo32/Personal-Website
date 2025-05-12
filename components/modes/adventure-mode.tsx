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
import { Heart, Map, Scroll, Sparkles, Compass, Backpack, Cloud, ExternalLink, Wand2 } from "lucide-react"

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

export default function AdventureMode() {
  const { isMobile } = useMode()
  const [currentZone, setCurrentZone] = useState<Zone>("home")
  const [dialogMessage, setDialogMessage] = useState<DialogMessage | null>(null)
  const [characterPosition, setCharacterPosition] = useState({ x: 50, y: 80 })
  const [isMoving, setIsMoving] = useState(false)
  const [direction, setDirection] = useState<"left" | "right" | "up" | "down" | null>(null)
  const [showInventory, setShowInventory] = useState(false)
  const [showQuestLog, setShowQuestLog] = useState(false)
  const [showMiniMap, setShowMiniMap] = useState(true)
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
  const mapCanvasRef = useRef<HTMLCanvasElement>(null)
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

  // RPG game items - enhanced with certification items
  const inventory = [
    {
      id: "resume",
      name: "Enchanted Parchment",
      description: "A magical scroll containing the Artificer's history",
      icon: <Scroll className="h-5 w-5 text-amber-300" />,
    },
    {
      id: "compass",
      name: "Artificer's Compass",
      description: "Points to Mohammed's most powerful artifacts",
      icon: <Compass className="h-5 w-5 text-amber-300" />,
    },
    {
      id: "potion",
      name: "Elixir of Knowledge",
      description: "Reveals hidden technical abilities",
      icon: <Sparkles className="h-5 w-5 text-teal-300" />,
    },
  ]

  // Load avatar image
  useEffect(() => {
    const img = new Image()
    img.src = "/images/pixel-character.png" // Using the pixel character image
    img.crossOrigin = "anonymous"
    img.onload = () => {
      avatarRef.current = img
    }
    img.onerror = () => {
      // Fallback to a colored rectangle if image fails to load
      const canvas = document.createElement("canvas")
      canvas.width = 32
      canvas.height = 32
      const ctx = canvas.getContext("2d")
      if (ctx) {
        ctx.fillStyle = "#8B4513"
        ctx.fillRect(0, 0, 32, 32)
        ctx.fillStyle = "#DAA520"
        ctx.fillRect(8, 8, 16, 16)
        const img = new Image()
        img.src = canvas.toDataURL()
        avatarRef.current = img
      }
    }
  }, [])

  // Initialize game
  useEffect(() => {
    // Welcome message with Town Elder instead of Guide
    setDialogMessage({
      speaker: "Master Artificer",
      text: "Welcome to the Artificer's Haven, the heart of Mohammed's portfolio realm. Let us explore the chronicles of this DevOps Artificer!",
      options: [{ text: "Character Lore", action: () => navigateToZone("about") }],
    })

    // Keyboard navigation for desktop and touch events for mobile
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
          setDirection("up")
          moveCharacter(0, -5)
          break
        case "ArrowDown":
          setDirection("down")
          moveCharacter(0, 5)
          break
        case "ArrowLeft":
          setDirection("left")
          moveCharacter(-5, 0)
          break
        case "ArrowRight":
          setDirection("right")
          moveCharacter(5, 0)
          break
        case "i":
          setShowInventory((prev) => !prev)
          break
        case "q":
          setShowQuestLog((prev) => !prev)
          break
        case "m":
          setShowMiniMap((prev) => !prev)
          break
      }
    }

    const handleKeyUp = () => {
      setDirection(null)
    }

    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
    }
  }, [])

  // Animation loop for character
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const tileSize = 32

    // Draw simplified map with zones and paths
    const drawMap = () => {
      // Clear canvas for transparent background
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw parchment background texture
      const drawParchmentTexture = () => {
        ctx.fillStyle = "rgba(139, 69, 19, 0.1)" // Very light brown
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        // Add some random noise for texture
        for (let i = 0; i < 5000; i++) {
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
      ctx.lineWidth = tileSize * 0.8
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
        const radius = tileSize * zone.radius

        // Draw glowing effect for current zone
        if (zoneName === currentZone) {
          ctx.beginPath()
          ctx.arc(x, y, radius + 5, 0, Math.PI * 2)
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
        ctx.lineWidth = 2
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

        // Draw zone name if it's the current zone
        if (zoneName === currentZone) {
          ctx.font = "12px monospace"
          ctx.fillStyle = "#ffffff"
          ctx.fillText(zone.name, x, y + radius + 15)
        }
      })

      // Draw character
      if (avatarRef.current) {
        const x = (characterPosition.x * canvas.width) / 100
        const y = (characterPosition.y * canvas.height) / 100

        // Draw shadow under character
        ctx.fillStyle = "rgba(0, 0, 0, 0.3)"
        ctx.beginPath()
        ctx.ellipse(x, y + 12, 12, 6, 0, 0, Math.PI * 2)
        ctx.fill()

        // Draw character
        ctx.drawImage(avatarRef.current, x - 16, y - 24, 32, 32)

        // Draw small glow effect around character
        ctx.beginPath()
        ctx.arc(x, y - 8, 20, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(218, 165, 32, 0.1)"
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

  // Draw mini-map
  useEffect(() => {
    if (!showMiniMap) return

    const canvas = mapCanvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set mini-map dimensions
    canvas.width = 150
    canvas.height = 150

    // Draw mini-map with parchment texture
    ctx.fillStyle = "#8B4513" // Brown background
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Add parchment texture
    for (let i = 0; i < 500; i++) {
      const x = Math.random() * canvas.width
      const y = Math.random() * canvas.height
      const size = Math.random() * 2
      ctx.fillStyle = `rgba(218, 165, 32, ${Math.random() * 0.2})`
      ctx.fillRect(x, y, size, size)
    }

    // Draw border
    ctx.strokeStyle = "#DAA520" // Gold border
    ctx.lineWidth = 2
    ctx.strokeRect(0, 0, canvas.width, canvas.height)

    // Draw paths between zones
    ctx.strokeStyle = "#6b7280"
    ctx.lineWidth = 2
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

    // Draw zone locations
    Object.entries(zones).forEach(([zoneName, zone]) => {
      const x = (zone.x * canvas.width) / 100
      const y = (zone.y * canvas.height) / 100

      // Draw zone circle
      ctx.beginPath()
      ctx.arc(x, y, 5, 0, Math.PI * 2)
      ctx.fillStyle =
        zoneName === currentZone
          ? zone.color // Current zone
          : `${zone.color}80` // Other zones (with transparency)
      ctx.fill()

      // Add a small icon for each zone
      ctx.fillStyle = "#ffffff"
      ctx.font = "8px monospace"
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

    // Draw character position
    const x = (characterPosition.x * canvas.width) / 100
    const y = (characterPosition.y * canvas.height) / 100

    ctx.beginPath()
    ctx.arc(x, y, 3, 0, Math.PI * 2)
    ctx.fillStyle = "#ffffff"
    ctx.fill()

    // Add a compass rose to the corner
    const drawCompassRose = () => {
      const cx = 15
      const cy = 15
      const size = 10

      // Draw compass circle
      ctx.beginPath()
      ctx.arc(cx, cy, size, 0, Math.PI * 2)
      ctx.fillStyle = "rgba(218, 165, 32, 0.2)"
      ctx.fill()
      ctx.strokeStyle = "#DAA520"
      ctx.lineWidth = 1
      ctx.stroke()

      // Draw compass points
      ctx.beginPath()
      ctx.moveTo(cx, cy - size) // North
      ctx.lineTo(cx, cy + size) // South
      ctx.moveTo(cx - size, cy) // West
      ctx.lineTo(cx + size, cy) // East
      ctx.strokeStyle = "#DAA520"
      ctx.lineWidth = 1
      ctx.stroke()

      // Draw N marker
      ctx.fillStyle = "#DAA520"
      ctx.font = "6px monospace"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText("N", cx, cy - size - 3)
    }

    drawCompassRose()
  }, [showMiniMap, characterPosition, currentZone])

  const moveCharacter = (deltaX: number, deltaY: number) => {
    setIsMoving(true)
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
        Math.pow(characterPosition.x - zonePos.x, 2) + Math.pow(characterPosition.y - zonePos.y, 2),
      )

      if (distance < 15 && zoneName !== currentZone) {
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

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isMobile) {
      const touch = e.touches[0]
      const element = e.currentTarget
      const rect = element.getBoundingClientRect()

      const x = ((touch.clientX - rect.left) / rect.width) * 100
      const y = ((touch.clientY - rect.top) / rect.height) * 100

      setCharacterPosition({ x, y })
      checkZoneProximity()
    }
  }

  const CurrentZoneComponent = zones[currentZone].component

  // RPG-style dialog box - updated to match medieval theme
  const dialogBox = dialogMessage && (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      className="absolute bottom-24 left-2 right-2 md:left-4 md:right-auto md:w-[45%] md:max-w-md bg-stone-800/95 p-4 rounded-lg border-2 border-amber-600/50 z-30 shadow-xl"
    >
      {dialogMessage.speaker && (
        <div className="bg-amber-900/80 -mt-8 px-3 py-1 rounded-full inline-block border border-amber-600/50 font-bold text-xs text-amber-300 font-serif">
          {dialogMessage.speaker}
        </div>
      )}

      <p className="mb-3 text-amber-300 font-serif leading-tight text-sm">{dialogMessage.text}</p>

      {dialogMessage.options && (
        <div className="flex flex-wrap gap-2 border-t border-amber-600/30 pt-2">
          {dialogMessage.options.map((option, index) => (
            <button
              key={index}
              onClick={option.action}
              className="bg-amber-900/60 hover:bg-amber-800 px-3 py-1 rounded-md text-amber-300 hover:text-amber-200 cursor-pointer text-sm transition-colors flex-1 min-w-[100px] flex items-center justify-center font-serif border border-amber-600/50"
            >
              <span className="mr-1">{index === 0 ? "▶" : "◀"}</span> {option.text}
            </button>
          ))}
        </div>
      )}
    </motion.div>
  )

  // RPG-style action buttons - updated to match medieval theme
  const actionButtons = (
    <div className="absolute top-4 right-4 z-30 flex gap-2">
      <Button
        variant="outline"
        size="icon"
        onClick={() => setShowInventory(!showInventory)}
        className="bg-stone-800/80 backdrop-blur-sm border-amber-600/50 hover:bg-amber-900/50 hover:border-amber-600 h-10 w-10"
        title="Inventory (I)"
      >
        <Backpack className="h-5 w-5 text-amber-300" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        onClick={() => setShowQuestLog(!showQuestLog)}
        className="bg-stone-800/80 backdrop-blur-sm border-amber-600/50 hover:bg-amber-900/50 hover:border-amber-600 h-10 w-10"
        title="Quest Log (Q)"
      >
        <Scroll className="h-5 w-5 text-amber-300" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        onClick={() => setShowMiniMap(!showMiniMap)}
        className="bg-stone-800/80 backdrop-blur-sm border-amber-600/50 hover:bg-amber-900/50 hover:border-amber-600 h-10 w-10"
        title="Mini-map (M)"
      >
        <Map className="h-5 w-5 text-amber-300" />
      </Button>
    </div>
  )

  // RPG-style inventory - updated to match medieval theme
  const inventoryPanel = showInventory && (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="absolute top-20 right-4 z-40 bg-stone-800/95 backdrop-blur-md p-4 rounded-lg border-2 border-amber-600/50 shadow-xl w-72"
      style={{ maxHeight: "calc(100vh - 140px)", overflowY: "auto" }}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-lg text-amber-400 font-serif">Artificer's Inventory</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowInventory(false)}
          className="h-6 w-6 p-0 text-amber-400 hover:text-amber-300"
        >
          ×
        </Button>
      </div>

      <div className="space-y-3">
        {inventory.map((item) => (
          <motion.div
            key={item.id}
            className={`bg-stone-700/80 p-3 rounded-md border ${
              item.special
                ? "border-amber-500 shadow-[0_0_10px_rgba(218,165,32,0.3)]"
                : "border-stone-600 hover:border-amber-600/70"
            } transition-colors`}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center gap-3">
              <div
                className={`${
                  item.special ? "bg-amber-900/60 border-amber-600/70" : "bg-stone-800/80 border-stone-600"
                } p-2 rounded-lg border-2`}
              >
                {item.icon}
              </div>
              <div>
                <h4 className="font-bold text-sm text-amber-300 font-serif">{item.name}</h4>
                <p className="text-xs text-stone-300 font-serif">{item.description}</p>
              </div>
            </div>

            {item.certLink && (
              <div className="mt-2 pt-2 border-t border-stone-600">
                <a href={item.certLink} target="_blank" rel="noopener noreferrer" className="block w-full">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-xs border-amber-700/50 bg-amber-900/30 hover:bg-amber-900/60 text-amber-300 font-serif"
                  >
                    Examine Artifact <ExternalLink className="ml-2 h-3 w-3" />
                  </Button>
                </a>
              </div>
            )}

            {item.special && (
              <div className="flex gap-1 mt-2">
                <span className="text-xs bg-amber-900/60 text-amber-300 px-2 py-0.5 rounded-full border border-amber-600/50 font-serif">
                  Legendary
                </span>
                {item.id === "aws-devops" && (
                  <span className="text-xs bg-amber-900/60 text-amber-300 px-2 py-0.5 rounded-full border border-amber-600/50 font-serif">
                    Youngest in GCC
                  </span>
                )}
                {item.id === "azure-ai" && (
                  <span className="text-xs bg-teal-900/60 text-teal-300 px-2 py-0.5 rounded-full border border-teal-600/50 font-serif">
                    Youngest Bahraini
                  </span>
                )}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  )

  // RPG-style quest log - updated to match medieval theme
  const questLogPanel = showQuestLog && (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="absolute top-20 right-4 z-40 bg-stone-800/95 backdrop-blur-md p-4 rounded-lg border-2 border-amber-600/50 shadow-xl w-72"
      style={{ maxHeight: "calc(100vh - 140px)", overflowY: "auto" }}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-lg text-amber-400 font-serif">Quest Scroll</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowQuestLog(false)}
          className="h-6 w-6 p-0 text-amber-400 hover:text-amber-300"
        >
          ×
        </Button>
      </div>

      <div className="space-y-3">
        {quests.map((quest, index) => (
          <div
            key={index}
            className={`p-3 rounded-md border flex items-start gap-3 ${
              quest.completed ? "bg-amber-900/20 border-amber-700" : "bg-stone-700/80 border-stone-600"
            }`}
          >
            <div
              className={`p-1 rounded-full ${
                quest.completed ? "bg-amber-700 text-amber-200" : "bg-stone-600 text-stone-300"
              }`}
            >
              {quest.completed ? "✓" : "!"}
            </div>
            <div>
              <h4 className={`font-bold text-sm font-serif ${quest.completed ? "text-amber-400" : "text-amber-300"}`}>
                {quest.title}
              </h4>
              <p className="text-xs text-stone-400 font-serif">{quest.description}</p>
              {quest.completed && <p className="text-xs text-amber-500 mt-1 font-serif italic">Quest completed!</p>}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )

  // RPG-style mini-map - updated to match medieval theme
  const miniMap = showMiniMap && (
    <div className="absolute bottom-4 right-4 z-30">
      <div className="bg-stone-800/80 backdrop-blur-sm p-1 rounded-lg border-2 border-amber-600/50">
        <canvas ref={mapCanvasRef} width={150} height={150} className="rounded" />
        <div className="absolute top-2 left-2 bg-stone-900/80 px-2 py-0.5 text-xs rounded text-amber-300 font-serif border border-amber-600/30">
          {zones[currentZone].name}
        </div>
      </div>
    </div>
  )

  // RPG-style status bar - updated to match medieval theme
  const statusBar = (
    <div className="absolute top-0 left-0 right-0 z-20 bg-stone-800/90 backdrop-blur-sm p-2 flex items-center">
      <div className="bg-amber-900/80 px-2 py-1 rounded-full text-xs font-bold mr-2 text-amber-300 border border-amber-600/50 font-serif">
        Lv. {gameStats.level}
      </div>

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
      <div className="flex-1 mr-2">
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

      {/* EXP Bar */}
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
      onTouchMove={handleTouchMove}
    >
      {/* Game canvas for RPG map and character */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      {/* Current zone content - balanced position */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentZone}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 flex items-center justify-center z-10"
        >
          <div className="absolute inset-0 bg-stone-900/80" />
          <div className="relative z-20 w-[60%] max-w-3xl ml-[20%] px-4 py-20">
            <CurrentZoneComponent mode="adventure" />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* RPG UI Elements */}
      {statusBar}
      {actionButtons}
      {dialogBox}
      {miniMap}
      {inventoryPanel}
      {questLogPanel}
    </div>
  )
}
