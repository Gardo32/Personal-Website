"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useMode } from "@/components/mode-provider"
import HeroSection from "@/components/sections/hero-section"
import AboutSection from "@/components/sections/about-section"
import CertificationsSection from "@/components/sections/certifications-section"
import ProjectsSection from "@/components/sections/projects-section"
import SkillsSection from "@/components/sections/skills-section"
import ContactSection from "@/components/sections/contact-section"
import { Button } from "@/components/ui/button"
import { Heart, Map, Scroll, Sparkles, Compass, Backpack, Cloud, Award, ExternalLink } from "lucide-react"

type Zone = "home" | "about" | "certifications" | "projects" | "skills" | "contact"

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
      title: "Introduction",
      description: "Learn about Mohammed's background",
      completed: false,
    },
    {
      title: "Skill Hunter",
      description: "Discover Mohammed's technical skills",
      completed: false,
    },
    {
      title: "Project Explorer",
      description: "View Mohammed's portfolio projects",
      completed: false,
    },
    {
      title: "Certification Master",
      description: "Find all of Mohammed's certifications",
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
      component: HeroSection,
      name: "Town Square",
      description: "The central hub of Mohammed's world",
      type: "town",
      color: "#8B4513", // Brown for town
      radius: 2.5, // Size multiplier for the zone
    },
    about: {
      x: 20,
      y: 40,
      component: AboutSection,
      name: "Biography Forest",
      description: "A mystical forest containing Mohammed's story",
      type: "forest",
      color: "#228B22", // Forest green
      radius: 2.2,
    },
    certifications: {
      x: 80,
      y: 40,
      component: CertificationsSection,
      name: "Achievement Temple",
      description: "Ancient temple housing prestigious awards",
      type: "temple",
      color: "#DAA520", // Golden temple
      radius: 2.3,
    },
    projects: {
      x: 30,
      y: 20,
      component: ProjectsSection,
      name: "Creation Workshop",
      description: "Where magical projects are forged",
      type: "workshop",
      color: "#B22222", // Fiery red for forge
      radius: 2.1,
    },
    skills: {
      x: 70,
      y: 60,
      component: SkillsSection,
      name: "Training Grounds",
      description: "Where skills are honed to perfection",
      type: "training",
      color: "#4682B4", // Steel blue for weapons
      radius: 2.0,
    },
    contact: {
      x: 50,
      y: 30,
      component: ContactSection,
      name: "Communication Crystal",
      description: "Magical crystal for contacting Mohammed",
      type: "crystal",
      color: "#00CED1", // Changed from purple to turquoise for communication
      radius: 1.8,
    },
  }

  // RPG game items
  const inventory = [
    {
      id: "resume",
      name: "Resume Scroll",
      description: "A magical scroll containing Mohammed's history",
      icon: <Scroll className="h-5 w-5" />,
    },
    {
      id: "compass",
      name: "Portfolio Compass",
      description: "Points to Mohammed's best projects",
      icon: <Compass className="h-5 w-5" />,
    },
    {
      id: "potion",
      name: "Skill Potion",
      description: "Reveals hidden technical abilities",
      icon: <Sparkles className="h-5 w-5" />,
    },
  ]

  // Load avatar image
  useEffect(() => {
    const img = new Image()
    img.src = "/images/pixel-character.png" // Using the new pixel character image
    img.crossOrigin = "anonymous"
    img.onload = () => {
      avatarRef.current = img
    }
  }, [])

  // Initialize game
  useEffect(() => {
    // Welcome message with Town Elder instead of Guide
    setDialogMessage({
      speaker: "Town Elder",
      text: "Welcome to the Town Square, the heart of Mohammed's portfolio world. Let's move forward!",
      options: [
        { text: "Biography Forest", action: () => navigateToZone("about") },
      ],
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
      
      // Draw dirt paths between zones
      ctx.strokeStyle = "#8B4513";  // Brown dirt path
      ctx.lineWidth = tileSize * 0.8;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      
      // Draw main path
      ctx.beginPath();
      let firstZone = true;
      Object.values(zones).forEach((zone) => {
        const x = (zone.x * canvas.width) / 100;
        const y = (zone.y * canvas.height) / 100;
        if (firstZone) {
          ctx.moveTo(x, y);
          firstZone = false;
        } else {
          ctx.lineTo(x, y);
        }
      });
      ctx.stroke();

      // Draw zone locations with simple markers
      Object.entries(zones).forEach(([zoneName, zone]) => {
        const x = (zone.x * canvas.width) / 100;
        const y = (zone.y * canvas.height) / 100;
        const radius = tileSize * zone.radius;

        // Draw zone circle
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = zoneName === currentZone
          ? `${zone.color}80` // Current zone (with transparency)
          : `${zone.color}40`; // Other zones (more transparent)
        ctx.fill();
        
        // Draw zone border
        ctx.strokeStyle = zone.color;
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Draw zone icon
        ctx.fillStyle = "#ffffff";
        ctx.font = "16px monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        
        // Different icon for each zone type
        let icon = "⭐";
        if (zone.type === "forest") icon = "🌲";
        if (zone.type === "temple") icon = "🏛️";
        if (zone.type === "workshop") icon = "🔨";
        if (zone.type === "training") icon = "⚔️";
        if (zone.type === "crystal") icon = "💎";
        if (zone.type === "town") icon = "🏠";
        
        ctx.fillText(icon, x, y);
      });

      // Draw character
      if (avatarRef.current) {
        const x = (characterPosition.x * canvas.width) / 100;
        const y = (characterPosition.y * canvas.height) / 100;

        // Draw shadow under character
        ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
        ctx.beginPath();
        ctx.ellipse(x, y + 12, 12, 6, 0, 0, Math.PI * 2);
        ctx.fill();

        // Draw character
        ctx.drawImage(avatarRef.current, x - 16, y - 24, 32, 32);
      }
    };

    // Animation loop
    const animate = () => {
      drawMap();
      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [characterPosition, direction, currentZone, isMoving]);

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

    // Draw mini-map
    ctx.fillStyle = "#1f2937"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw border
    ctx.strokeStyle = "#4b5563"
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
    })

    // Draw character position
    const x = (characterPosition.x * canvas.width) / 100
    const y = (characterPosition.y * canvas.height) / 100

    ctx.beginPath()
    ctx.arc(x, y, 3, 0, Math.PI * 2)
    ctx.fillStyle = "#ffffff"
    ctx.fill()
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
          speaker: "Town Elder",
          text: "Welcome to the Town Square, the heart of Mohammed's portfolio world. Let's move forward!",
          options: [
            { text: "Biography Forest", action: () => navigateToZone("about") },
          ],
        })
        break
      case "about":
        setDialogMessage({
          speaker: "Forest Sage",
          text: "You've entered the Biography Forest. Let's continue your journey.",
          options: [
            { text: "Achievement Temple", action: () => navigateToZone("certifications") },
            { text: "Town Square", action: () => navigateToZone("home") },
          ],
        })
        break
      case "certifications":
        setDialogMessage({
          speaker: "Temple Guardian",
          text: "Welcome to the Achievement Temple! Let's proceed to the next stage.",
          options: [
            { text: "Creation Workshop", action: () => navigateToZone("projects") },
            { text: "Biography Forest", action: () => navigateToZone("about") },
          ],
        })
        break
      case "projects":
        setDialogMessage({
          speaker: "Master Craftsman",
          text: "This is the Creation Workshop. Let's move to the next stage.",
          options: [
            { text: "Training Grounds", action: () => navigateToZone("skills") },
            { text: "Achievement Temple", action: () => navigateToZone("certifications") },
          ],
        })
        break
      case "skills":
        setDialogMessage({
          speaker: "Skill Master",
          text: "Welcome to the Training Grounds. Let's find the Communication Crystal.",
          options: [
            { text: "Communication Crystal", action: () => navigateToZone("contact") },
            { text: "Creation Workshop", action: () => navigateToZone("projects") },
          ],
        })
        break
      case "contact":
        setDialogMessage({
          speaker: "Crystal Keeper",
          text: "You've discovered the Communication Crystal. Let's return to the Town Square.",
          options: [
            { text: "Town Square", action: () => navigateToZone("home") },
            { text: "Training Grounds", action: () => navigateToZone("skills") },
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

  // RPG-style dialog box - updated to match mobile view styling
  const dialogBox = dialogMessage && (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      className="absolute bottom-24 left-2 right-2 md:left-4 md:right-auto md:w-[45%] md:max-w-md bg-[#2C3639]/95 p-3 rounded-lg border-2 border-[#8B4513] z-30 shadow-xl"
    >
      {dialogMessage.speaker && (
        <div className="bg-[#8B4513] -mt-7 px-3 py-1 rounded-full inline-block border border-[#DAA520] font-bold text-xs">
          {dialogMessage.speaker}
        </div>
      )}

      <p className="mb-3 text-[#F0E6D2] font-pixel leading-tight text-sm">{dialogMessage.text}</p>

      {dialogMessage.options && (
        <div className="flex flex-wrap gap-2 border-t border-[#8B4513] pt-2">
          {dialogMessage.options.map((option, index) => (
            <button
              key={index}
              onClick={option.action}
              className="bg-[#3A2718] hover:bg-[#5D4037] px-3 py-1 rounded-md text-[#DAA520] hover:text-[#F0E6D2] cursor-pointer text-sm transition-colors flex-1 min-w-[100px] flex items-center justify-center"
            >
              <span className="mr-1">{index === 0 ? "▶" : "◀"}</span> {option.text}
            </button>
          ))}
        </div>
      )}
    </motion.div>
  )

  // RPG-style action buttons
  const actionButtons = (
    <div className="absolute top-4 right-4 z-30 flex gap-2">
      <Button
        variant="outline"
        size="icon"
        onClick={() => setShowInventory(!showInventory)}
        className="bg-gray-900/80 backdrop-blur-sm border-gray-700 hover:bg-indigo-900/50 hover:border-indigo-600 h-10 w-10"
        title="Inventory (I)"
      >
        <Backpack className="h-5 w-5" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        onClick={() => setShowQuestLog(!showQuestLog)}
        className="bg-gray-900/80 backdrop-blur-sm border-gray-700 hover:bg-indigo-900/50 hover:border-indigo-600 h-10 w-10"
        title="Quest Log (Q)"
      >
        <Scroll className="h-5 w-5" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        onClick={() => setShowMiniMap(!showMiniMap)}
        className="bg-gray-900/80 backdrop-blur-sm border-gray-700 hover:bg-indigo-900/50 hover:border-indigo-600 h-10 w-10"
        title="Mini-map (M)"
      >
        <Map className="h-5 w-5" />
      </Button>
    </div>
  )

  // RPG-style inventory
  const inventoryPanel = showInventory && (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="absolute top-20 right-4 z-40 bg-gray-900/95 backdrop-blur-md p-4 rounded-lg border-2 border-indigo-800 shadow-xl w-72"
      style={{ maxHeight: "calc(100vh - 140px)", overflowY: "auto" }} // Make it scrollable to prevent overflow
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-lg">Inventory</h3>
        <Button variant="ghost" size="sm" onClick={() => setShowInventory(false)} className="h-6 w-6 p-0">
          ×
        </Button>
      </div>

      <div className="space-y-2">
        {inventory.map((item) => (
          <div
            key={item.id}
            className="bg-gray-800 p-2 rounded border border-gray-700 flex flex-col items-start gap-3 hover:border-indigo-600 cursor-pointer transition-colors"
          >
            <div className="flex items-start w-full">
              <div className="bg-indigo-900/50 p-2 rounded-lg mr-3">{item.icon}</div>
              <div>
                <h4 className="font-bold text-sm">{item.name}</h4>
                <p className="text-xs text-gray-400">{item.description}</p>
              </div>
            </div>
            
            {item.certLink && (
              <a 
                href={item.certLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="mt-2 w-full"
              >
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full text-xs border-indigo-700 hover:bg-indigo-900/50"
                >
                  View Certificate <ExternalLink className="ml-2 h-3 w-3" />
                </Button>
              </a>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  )

  // RPG-style quest log
  const questLogPanel = showQuestLog && (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="absolute top-20 right-4 z-40 bg-gray-900/95 backdrop-blur-md p-4 rounded-lg border-2 border-indigo-800 shadow-xl w-72"
      style={{ maxHeight: "calc(100vh - 140px)", overflowY: "auto" }} // Make it scrollable to prevent overflow
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-lg">Quest Log</h3>
        <Button variant="ghost" size="sm" onClick={() => setShowQuestLog(false)} className="h-6 w-6 p-0">
          ×
        </Button>
      </div>

      <div className="space-y-2">
        {quests.map((quest, index) => (
          <div
            key={index}
            className={`p-2 rounded border flex items-start gap-3 ${
              quest.completed ? "bg-green-900/20 border-green-700" : "bg-gray-800 border-gray-700"
            }`}
          >
            <div className={`p-1 rounded-full ${quest.completed ? "bg-green-700" : "bg-gray-700"}`}>
              {quest.completed ? "✓" : "!"}
            </div>
            <div>
              <h4 className={`font-bold text-sm ${quest.completed ? "text-green-400" : "text-white"}`}>
                {quest.title}
              </h4>
              <p className="text-xs text-gray-400">{quest.description}</p>
              {quest.completed && <p className="text-xs text-green-500 mt-1">Completed!</p>}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )

  // RPG-style mini-map - kept on the right side
  const miniMap = showMiniMap && (
    <div className="absolute bottom-4 right-4 z-30">
      <div className="bg-gray-900/80 backdrop-blur-sm p-1 rounded-lg border-2 border-gray-700">
        <canvas ref={mapCanvasRef} width={150} height={150} className="rounded" />
        <div className="absolute top-2 left-2 bg-gray-900/80 px-2 py-0.5 text-xs rounded">
          {zones[currentZone].name}
        </div>
      </div>
    </div>
  )

  return (
    <div
      className="h-screen w-screen overflow-hidden relative font-pixel text-white"
      style={{
        backgroundImage: "url('https://c4.wallpaperflare.com/wallpaper/916/248/841/board-dragons-dungeons-fantasy-wallpaper-preview.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
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
          className="absolute inset-0 flex items-center justify-center z-10" // Changed back to center
        >
          <div className="absolute inset-0 bg-gray-900/80" />
          <div className="relative z-20 w-[60%] max-w-3xl ml-[20%] px-4 py-20"> {/* Adjusted position with margin-left */}
            <CurrentZoneComponent mode="adventure" />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* RPG UI Elements */}
      {actionButtons}
      {dialogBox}
      {miniMap}
      {inventoryPanel}
      {questLogPanel}
    </div>
  )
}

