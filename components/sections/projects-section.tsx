"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ExternalLink, Play, Info } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface ProjectSectionProps {
  mode?: "doom" | "netflix" | "adventure"
  expanded?: boolean
  onSelect?: () => void
  onHover?: (id: string) => void
  hoveredItem?: string | null
}

const projects = [
  {
    id: "ai-speech-translate",
    name: "AI-Speech-Translate",
    description: "AI-powered application that translates audio in real-time using Azure Cognitive Services.",
    tags: ["Azure", "AI", "Python"],
    image: "/images/Audio Translation With Azure.webp",
    link: "https://github.com/Gardo32/AI-Speech-Translate",
  },
  {
    id: "py-dex",
    name: "Py-Dex",
    description: "A terminal-based educational game that teaches Python programming through an interactive RPG-style experience. Players navigate through levels, solve coding challenges, and learn Python concepts in an engaging way.",
    tags: ["Python", "Education", "Game Development"],
    image: "/images/image.png",
    link: "https://github.com/Gardo32/Py-Game",
  },
  {
    id: "gpa-analytics",
    name: "GPA Analytics",
    description: "Streamlit-based tool for analyzing and visualizing academic performance data.",
    tags: ["Streamlit", "Python", "Data Analysis"],
    image: "/images/GPA-analytics.webp",
    link: "https://github.com/Gardo32/gpa-analytics",
  },
  {
    id: "farmers-aid",
    name: "Farmers Aid",
    description:
      "Digital agriculture tool that helps farmers optimize crop yields using weather data and AI predictions.",
    tags: ["Agriculture", "AI", "Streamlit"],
    image: "/images/Farmers-aid.webp",
    link: "https://github.com/Gardo32/Farmers-Aid",
  },
]

// Separate component for Doom mode
function DoomProjects() {
  return (
    <div className="px-4 py-10 flex flex-col items-center justify-center min-h-[80vh] md:min-h-svh">
      <motion.h2
        className="text-2xl md:text-3xl font-bold mb-6 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Projects
      </motion.h2>

      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="space-y-3 md:space-y-4">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
              className="p-3 md:p-4 rounded-lg border border-gray-700 bg-gray-800/50"
            >
              <h3 className="font-bold text-base md:text-lg">{project.name}</h3>
              <p className="text-xs md:text-sm text-gray-300 my-2">{project.description}</p>
              <div className="flex flex-wrap gap-1 md:gap-2 mt-2">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

// Separate component for Netflix mode
function NetflixProjects({ 
  expanded, 
  onSelect, 
  onHover, 
  hoveredItem 
}: { 
  expanded: boolean;
  onSelect?: () => void;
  onHover?: (id: string) => void;
  hoveredItem?: string | null;
}) {
  return (
    <div className={`${expanded ? "p-4 md:p-6" : "p-3 md:p-4"}`} onClick={!expanded && onSelect ? () => onSelect() : undefined}>
      {expanded ? (
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Projects</h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
            {projects.map((project) => (
              <Card key={project.id} className="bg-gray-800 border-gray-700 overflow-hidden">
                <div className="h-36 md:h-48 bg-gray-700 relative">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.name}
                    className="w-full h-full object-cover"
                    crossOrigin="anonymous"
                  />
                </div>
                <CardContent className="p-4 md:p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg md:text-xl">{project.name}</h3>
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="touch-none" // Better touch target
                    >
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </a>
                  </div>
                  <p className="text-gray-300 text-xs md:text-sm mb-3 md:mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-1 md:gap-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex overflow-x-auto gap-3 md:gap-4 pb-3 md:pb-4 scrollbar-hide">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              className={`flex-shrink-0 w-60 md:w-72 h-36 md:h-40 bg-gray-800 rounded-lg overflow-hidden relative cursor-pointer
                transition-all duration-300
              `}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={() => onHover && onHover(project.id)}
              onMouseLeave={() => onHover && onHover("")}
              onClick={() => onSelect && onSelect()}
            >
              <img
                src={project.image || "/placeholder.svg"}
                alt={project.name}
                className="w-full h-full object-cover opacity-70 transition-opacity"
                crossOrigin="anonymous"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

              <div className="absolute bottom-0 left-0 p-3 md:p-4 z-10">
                <h3 className="font-bold text-xs md:text-sm mb-1">{project.name}</h3>
                <div className="flex flex-wrap gap-1">
                  {project.tags.slice(0, 2).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-[10px] md:text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {project.tags.length > 2 && (
                    <Badge variant="outline" className="text-[10px] md:text-xs">
                      +{project.tags.length - 2}
                    </Badge>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

// Separate component for Adventure mode - this one needs state
function AdventureProjects() {
  // The hook is only in this component, ensuring consistent usage
  const [activeProject, setActiveProject] = useState<string | null>(null)
  
  return (
    <div className="max-w-2xl mx-auto px-3 md:px-0">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-center">Projects</h2>

        <div className="bg-gray-800/80 backdrop-blur-sm p-4 md:p-6 rounded-lg border border-gray-700">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
            {projects.map((project) => (
              <motion.div
                key={project.id}
                className={`rounded-lg border cursor-pointer overflow-hidden ${
                  activeProject === project.id ? "border-blue-500 bg-blue-900/20" : "border-gray-700 bg-gray-800/50"
                }`}
                onClick={() => setActiveProject(activeProject === project.id ? null : project.id)}
                whileHover={{ scale: 1.02 }}
              >
                <div className="h-24 sm:h-32 bg-gray-700 relative">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.name}
                    className="w-full h-full object-cover"
                    crossOrigin="anonymous"
                  />
                </div>
                <div className="p-3 md:p-4">
                  <h3 className="font-bold text-base md:text-lg">{project.name}</h3>

                  {(activeProject === project.id) && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="text-xs md:text-sm text-gray-300 my-2">{project.description}</p>
                      <div className="flex flex-wrap gap-1 md:gap-2 mt-2">
                        {project.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-[10px] md:text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="mt-3 md:mt-4">
                        <a href={project.link} target="_blank" rel="noopener noreferrer">
                          <Button variant="outline" size="sm" className="w-full text-xs md:text-sm py-1.5">
                            View Project <ExternalLink className="ml-2 h-3 w-3" />
                          </Button>
                        </a>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

// Hook-free main component that just returns the appropriate mode component
export default function ProjectsSection({
  mode = "doom",
  expanded = false,
  onSelect,
  onHover,
  hoveredItem,
}: ProjectSectionProps) {
  // No hooks here, just pure conditional rendering
  if (mode === "netflix") {
    return <NetflixProjects 
      expanded={expanded} 
      onSelect={onSelect} 
      onHover={onHover} 
      hoveredItem={hoveredItem} 
    />;
  }
  
  if (mode === "adventure") {
    return <AdventureProjects />;
  }
  
  return <DoomProjects />;
}

