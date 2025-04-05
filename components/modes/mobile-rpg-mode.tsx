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
import { Heart, Map, Scroll, Sparkles, Compass, Backpack, ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Menu } from "lucide-react"

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

export default function MobileRpgMode() {
  const { isMobile } = useMode()
  const [currentZone, setCurrentZone] = useState<Zone>("home")
  const [dialogMessage, setDialogMessage] = useState<DialogMessage | null>(null)
  const [characterPosition, setCharacterPosition] = useState({ x: 50, y: 80 })
  const [isMoving, setIsMoving] = useState(false)
  const [direction, setDirection] = useState<"left" | "right" | "up" | "down" | null>(null)
  const [showMenu, setShowMenu] = useState(false)
  const [currentMenuItem, setCurrentMenuItem] = useState<"inventory" | "quest" | "map" | "skills" | null>(null)
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
      description: "Mohammed Aldaqaq is a high school student specializing in cloud computing at the Nasser Center for Science and Technology. His primary focus lies in the operational aspects of technology, particularly within cloud computing, though he also possesses a keen interest in development.",
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
      color: "#00CED1", // Turquoise for communication
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
    img.src = "/images/pixel-character.png" // Using the pixel character image
    img.crossOrigin = "anonymous"
    img.onload = () => {
      avatarRef.current = img
    }
  }, [])

  // Initialize game
  useEffect(() => {
    // Welcome message
    setDialogMessage({
      speaker: "Guide",
      text: "Welcome, adventurer! I'm your guide to Mohammed's portfolio realm. Where would you like to begin your quest?",
      options: [
        { text: "Visit Biography Forest", action: () => navigateToZone("about") },
        { text: "Explore Achievement Temple", action: () => navigateToZone("certifications") },
        { text: "Head to Creation Workshop", action: () => navigateToZone("projects") },
      ],
    })
  }, [])

  // Animation loop for character
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions to match mobile screen
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const tileSize = 24 // Smaller tile size for mobile
    
    // Draw simplified map with zones and paths
    const drawMap = () => {
      // Clear canvas for transparent background
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Draw dirt paths between zones
      ctx.strokeStyle = "#8B4513"  // Brown dirt path
      ctx.lineWidth = tileSize * 0.6  // Thinner for mobile
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

        // Draw zone circle
        ctx.beginPath()
        ctx.arc(x, y, radius, 0, Math.PI * 2)
        ctx.fillStyle = zoneName === currentZone
          ? `${zone.color}80` // Current zone (with transparency)
          : `${zone.color}40` // Other zones (more transparent)
        ctx.fill()
        
        // Draw zone border
        ctx.strokeStyle = zone.color
        ctx.lineWidth = 2
        ctx.stroke()
        
        // Draw zone icon
        ctx.fillStyle = "#ffffff"
        ctx.font = "12px monospace"
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        
        // Different icon for each zone type
        let icon = "⭐"
        if (zone.type === "forest") icon = "🌲"
        if (zone.type === "temple") icon = "🏛️"
        if (zone.type === "workshop") icon = "🔨"
        if (zone.type === "training") icon = "⚔️"
        if (zone.type === "crystal") icon = "💎"
        if (zone.type === "town") icon = "🏠"
        
        ctx.fillText(icon, x, y)
      })

      // Draw character
      if (avatarRef.current) {
        const x = (characterPosition.x * canvas.width) / 100
        const y = (characterPosition.y * canvas.height) / 100

        // Draw shadow under character
        ctx.fillStyle = "rgba(0, 0, 0, 0.3)"
        ctx.beginPath()
        ctx.ellipse(x, y + 10, 8, 4, 0, 0, Math.PI * 2)
        ctx.fill()

        // Draw character
        ctx.drawImage(avatarRef.current, x - 12, y - 18, 24, 24)
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
          text: "Welcome to the Town Square, the heart of Mohammed's portfolio world. Where would you like to venture next?",
          options: [
            { text: "Visit Biography Forest", action: () => navigateToZone("about") },
            { text: "Explore Achievement Temple", action: () => navigateToZone("certifications") },
          ],
        })
        break
      case "about":
        setDialogMessage({
          speaker: "Forest Sage",
          text: "Mohammed Aldaqaq is a high school student specializing in cloud computing at the Nasser Center for Science and Technology. His primary focus lies in the operational aspects of technology, particularly within cloud computing, though he also possesses a keen interest in development.",
          options: [
            { text: "Travel to Achievement Temple", action: () => navigateToZone("certifications") },
            { text: "Visit Creation Workshop", action: () => navigateToZone("projects") },
          ],
        })
        break
      case "certifications":
        setDialogMessage({
          speaker: "Temple Guardian",
          text: "Welcome to the Achievement Temple! Here you'll find Mohammed's certifications, including his status as the youngest Bahraini Azure AI Engineer.",
          options: [
            { text: "Journey to Creation Workshop", action: () => navigateToZone("projects") },
            { text: "Head to Training Grounds", action: () => navigateToZone("skills") },
          ],
        })
        break
      case "projects":
        setDialogMessage({
          speaker: "Master Craftsman",
          text: "This is the Creation Workshop, where Mohammed's innovative projects are forged and maintained.",
          options: [
            { text: "Visit Training Grounds", action: () => navigateToZone("skills") },
            { text: "Seek the Communication Crystal", action: () => navigateToZone("contact") },
          ],
        })
        break
      case "skills":
        setDialogMessage({
          speaker: "Skill Master",
          text: "Welcome to the Training Grounds. Here Mohammed hones his skills in cloud computing, AI, and DevOps.",
          options: [
            { text: "Find the Communication Crystal", action: () => navigateToZone("contact") },
            { text: "Return to Town Square", action: () => navigateToZone("home") },
          ],
        })
        break
      case "contact":
        setDialogMessage({
          speaker: "Crystal Keeper",
          text: "You've discovered the Communication Crystal. Through this magical artifact, you can connect with Mohammed.",
          options: [
            { 
              text: "Return to Town Square", 
              action: () => navigateToZone("home") 
            }
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

  const handleMenuItemClick = (item: "inventory" | "quest" | "map" | "skills") => {
    if (currentMenuItem === item) {
      setCurrentMenuItem(null)
    } else {
      setCurrentMenuItem(item)
    }
  }

  const CurrentZoneComponent = zones[currentZone].component

  // Remove the mobileControls completely
  const mobileControls = null;

  // Update the dialog box - positioned lower
  const dialogBox = dialogMessage && (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      className="absolute bottom-28 left-4 right-4 bg-[#2C3639]/95 p-4 rounded-lg border-2 border-[#8B4513] z-30 shadow-xl"
    >
      {dialogMessage.speaker && (
        <div className="bg-[#8B4513] -mt-8 px-4 py-1 rounded-full inline-block border border-[#DAA520] font-bold text-sm">
          {dialogMessage.speaker}
        </div>
      )}

      <p className="mb-4 text-[#F0E6D2] font-pixel leading-tight text-sm">{dialogMessage.text}</p>

      {dialogMessage.options && (
        <div className="flex flex-col gap-2 border-t border-[#8B4513] pt-2">
          {dialogMessage.options.map((option, index) => (
            <span
              key={index}
              onClick={option.action}
              className="text-[#DAA520] hover:text-[#F0E6D2] cursor-pointer text-sm"
            >
              ▶ {option.text}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  )

  // Add a new handler to move character when clicking/tapping on the canvas
  const handleCanvasClick = (e: React.MouseEvent | React.TouchEvent) => {
    // Get canvas element and its dimensions
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Get click/touch position 
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e && e.touches.length > 0 ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY = 'touches' in e && e.touches.length > 0 ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
    
    // Convert to percentage position
    const percentX = ((clientX - rect.left) / canvas.width) * 100;
    const percentY = ((clientY - rect.top) / canvas.height) * 100;
    
    // Set new character position directly
    setCharacterPosition({ x: percentX, y: percentY });
    
    // Check if near a zone
    checkZoneProximity();
  };

  const handleSwipe = (e: React.TouchEvent) => {
    const touch = e.changedTouches[0];
    const startX = touch.clientX;
    const startY = touch.clientY;

    let endX = 0;
    let endY = 0;

    const handleTouchMove = (moveEvent: TouchEvent) => {
      endX = moveEvent.touches[0].clientX;
      endY = moveEvent.touches[0].clientY;
    };

    const handleTouchEnd = () => {
      const deltaX = endX - startX;
      const deltaY = endY - startY;

      if (Math.abs(deltaX) < Math.abs(deltaY) && deltaY < -30) {
        // Swipe up
        moveCharacter(0, -5);
      } else if (Math.abs(deltaX) < Math.abs(deltaY) && deltaY > 30) {
        // Swipe down
        moveCharacter(0, 5);
      } else if (Math.abs(deltaX) > Math.abs(deltaY) && deltaX > 30) {
        // Swipe right
        moveCharacter(5, 0);
      } else if (Math.abs(deltaX) > Math.abs(deltaY) && deltaX < -30) {
        // Swipe left
        moveCharacter(-5, 0);
      }

      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };

    document.addEventListener("touchmove", handleTouchMove);
    document.addEventListener("touchend", handleTouchEnd);
  };

  // Updated mobile menu button that just opens the items directly
  const mobileMenuButton = (
    <div className="absolute bottom-4 right-4 z-30 flex gap-2">
      <Button
        variant="outline"
        size="icon"
        onClick={() => handleMenuItemClick("inventory")}
        className="w-14 h-14 bg-gray-900/80 border-gray-700 rounded-full"
      >
        <Backpack className="h-8 w-8" />
      </Button>
    </div>
  )

  // Simplified mobile menu - remove the old menu system
  const mobileMenu = null; // Removing the menu popup

  // RPG-style status bar - simplified for mobile
  const statusBars = (
    <div className="absolute top-0 left-0 right-0 z-30 bg-gray-900/80 backdrop-blur-sm p-2 flex items-center">
      <div className="bg-indigo-900 px-2 py-1 rounded-full text-xs font-bold mr-2">Lv. {gameStats.level}</div>
      
      {/* HP Bar */}
      <div className="flex-1 mr-2">
        <div className="flex justify-between text-xs items-center">
          <span className="flex items-center">
            <Heart className="h-3 w-3 text-red-500 mr-1" /> {gameStats.hp}/{gameStats.maxHp}
          </span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-red-800 to-red-500 h-2 rounded-full"
            style={{ width: `${(gameStats.hp / gameStats.maxHp) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* MP Bar */}
      <div className="flex-1">
        <div className="flex justify-between text-xs items-center">
          <span className="flex items-center">
            <Sparkles className="h-3 w-3 text-blue-500 mr-1" /> {gameStats.mp}/{gameStats.maxMp}
          </span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-blue-800 to-blue-500 h-2 rounded-full"
            style={{ width: `${(gameStats.mp / gameStats.maxMp) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  )

  // Location name indicator
  const locationIndicator = (
    <div className="absolute top-16 left-0 right-0 z-20 flex justify-center">
      <div className="bg-gray-900/80 backdrop-blur-sm px-4 py-1 rounded-full border border-indigo-900">
        <span className="text-sm font-bold">{zones[currentZone].name}</span>
      </div>
    </div>
  )

  // Inventory panel for mobile
  const inventoryPanel = currentMenuItem === "inventory" && (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="absolute top-20 left-4 right-4 z-40 bg-gray-900/95 backdrop-blur-md p-4 rounded-lg border-2 border-indigo-800 shadow-xl"
      style={{ maxHeight: "40%", overflowY: "auto" }}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-lg">Inventory</h3>
        <Button variant="ghost" size="sm" onClick={() => setCurrentMenuItem(null)} className="h-6 w-6 p-0">
          ×
        </Button>
      </div>

      <div className="space-y-2">
        {inventory.map((item) => (
          <div
            key={item.id}
            className="bg-gray-800 p-2 rounded border border-gray-700 flex items-start gap-3 hover:border-indigo-600 active:bg-gray-700 transition-colors"
          >
            <div className="bg-indigo-900/50 p-2 rounded-lg">{item.icon}</div>
            <div>
              <h4 className="font-bold text-sm">{item.name}</h4>
              <p className="text-xs text-gray-400">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )

  // Quest log panel for mobile
  const questLogPanel = currentMenuItem === "quest" && (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="absolute top-20 left-4 right-4 z-40 bg-gray-900/95 backdrop-blur-md p-4 rounded-lg border-2 border-indigo-800 shadow-xl"
      style={{ maxHeight: "40%", overflowY: "auto" }}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-lg">Quest Log</h3>
        <Button variant="ghost" size="sm" onClick={() => setCurrentMenuItem(null)} className="h-6 w-6 p-0">
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

  // Update the map panel to be the items menu
  const mapPanel = currentMenuItem === "map" && (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="absolute top-20 left-4 right-4 z-40 bg-gray-900/95 backdrop-blur-md p-4 rounded-lg border-2 border-indigo-800 shadow-xl flex flex-col items-center"
      style={{ maxHeight: "40%", overflowY: "auto" }}
    >
      <div className="flex justify-between items-center w-full mb-4">
        <h3 className="font-bold text-lg">Items</h3>
        <Button variant="ghost" size="sm" onClick={() => setCurrentMenuItem(null)} className="h-6 w-6 p-0">
          ×
        </Button>
      </div>

      <div className="w-full overflow-auto">
        <div className="grid grid-cols-2 gap-2 w-full">
          {inventory.map((item) => (
            <div
              key={item.id}
              className="bg-gray-800 p-2 rounded border border-gray-700 flex flex-col items-center gap-2 hover:border-indigo-600 active:bg-gray-700 transition-colors"
            >
              <div className="bg-indigo-900/50 p-3 rounded-full">{item.icon}</div>
              <div className="text-center">
                <h4 className="font-bold text-sm">{item.name}</h4>
                <p className="text-xs text-gray-400">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )

  const skillsPanel = null; // Remove the skills panel entirely

  return (
    <div
      className="h-screen w-screen overflow-hidden relative font-pixel text-white"
      style={{
        backgroundImage: "url('https://c4.wallpaperflare.com/wallpaper/916/248/841/board-dragons-dungeons-fantasy-wallpaper-preview.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
      onTouchStart={handleSwipe} // Attach swipe handler
      onClick={handleCanvasClick} 
      onTouchEnd={handleCanvasClick}
    >
      {/* Game canvas for RPG map and character */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 z-0" 
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
          <div className="absolute inset-0 bg-gray-900/80" />
          <motion.div 
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.1, duration: 0.3 }}
            className="relative z-20 w-full h-full pt-20 pb-32 px-4 overflow-y-auto"
          >
            <div className="bg-gray-900/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700 shadow-xl">
              <CurrentZoneComponent mode="mobile-rpg" />
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Mobile UI Elements - Simplified */}
      {statusBars}
      {locationIndicator}
      {mobileMenuButton}
      {mobileMenu}
      {dialogBox}
      {inventoryPanel}
      {questLogPanel}
      {mapPanel}
    </div>
  )
}
