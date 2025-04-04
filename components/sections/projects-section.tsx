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
    id: "cloud-guide",
    name: "Cloud Guide",
    description:
      "A comprehensive study platform for cloud computing certifications with interactive quizzes and learning paths.",
    tags: ["AWS", "React", "Node.js"],
    image: "/images/project-cloud-guide.jpg",
    link: "#",
  },
  {
    id: "audio-translation",
    name: "Audio Translation with Azure",
    description: "AI-powered application that translates audio in real-time using Azure Cognitive Services.",
    tags: ["Azure", "AI", "Python"],
    image: "/images/project-audio-translation.jpg",
    link: "#",
  },
  {
    id: "onrobo-system",
    name: "Onrobo System",
    description: "A robotic toolkit that simplifies automation for manufacturing processes.",
    tags: ["Robotics", "IoT", "C++"],
    image: "/images/project-onrobo.jpg",
    link: "#",
  },
  {
    id: "gpa-analytics",
    name: "GPA Analytics",
    description: "Streamlit-based tool for analyzing and visualizing academic performance data.",
    tags: ["Streamlit", "Python", "Data Analysis"],
    image: "/images/project-gpa-analytics.jpg",
    link: "#",
  },
  {
    id: "farmers-aid",
    name: "Farmers Aid",
    description:
      "Digital agriculture tool that helps farmers optimize crop yields using weather data and AI predictions.",
    tags: ["Agriculture", "AI", "React Native"],
    image: "/images/project-farmers-aid.jpg",
    link: "#",
  },
]

export default function ProjectsSection({
  mode = "doom",
  expanded = false,
  onSelect,
  onHover,
  hoveredItem,
}: ProjectSectionProps) {
  const [activeProject, setActiveProject] = useState<string | null>(null)

  const renderDoomMode = () => (
    <div className="px-4 flex flex-col items-center justify-center h-screen">
      <motion.h2
        className="text-3xl font-bold mb-6 text-center"
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
        <div className="space-y-4">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
              className="p-4 rounded-lg border border-gray-700 bg-gray-800/50"
            >
              <h3 className="font-bold text-lg">{project.name}</h3>
              <p className="text-sm text-gray-300 my-2">{project.description}</p>
              <div className="flex flex-wrap gap-2 mt-2">
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

  const renderNetflixMode = () => (
    <div className={`${expanded ? "p-6" : "p-4"}`} onClick={!expanded && onSelect ? () => onSelect() : undefined}>
      {expanded ? (
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Projects</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project) => (
              <Card key={project.id} className="bg-gray-800 border-gray-700 overflow-hidden">
                <div className="h-48 bg-gray-700 relative">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.name}
                    className="w-full h-full object-cover"
                    crossOrigin="anonymous"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-xl">{project.name}</h3>
                    <a href={project.link} target="_blank" rel="noopener noreferrer">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </a>
                  </div>
                  <p className="text-gray-300 text-sm mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
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
        <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide">
          {projects.map((project) => (
            <div
              key={project.id}
              className={`flex-shrink-0 w-72 h-40 bg-gray-800 rounded-lg overflow-hidden relative cursor-pointer
                ${hoveredItem === project.id ? "scale-105 shadow-xl z-10" : "scale-100"}
                transition-all duration-300
              `}
              onMouseEnter={() => onHover && onHover(project.id)}
              onMouseLeave={() => onHover && onHover("")}
            >
              <img
                src={project.image || "/placeholder.svg"}
                alt={project.name}
                className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity"
                crossOrigin="anonymous"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

              {hoveredItem === project.id && (
                <div className="absolute inset-0 flex items-center justify-center gap-2 z-20">
                  <Button size="sm" className="bg-white text-black hover:bg-white/90 flex items-center gap-1">
                    <Play className="h-3 w-3 fill-black" /> Play
                  </Button>
                  <Button size="sm" variant="outline" className="flex items-center gap-1">
                    <Info className="h-3 w-3" /> More Info
                  </Button>
                </div>
              )}

              <div className="absolute bottom-0 left-0 p-4 z-10">
                <h3 className="font-bold text-sm mb-1">{project.name}</h3>
                <div className="flex flex-wrap gap-1">
                  {project.tags.slice(0, 2).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {project.tags.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{project.tags.length - 2}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )

  const renderAdventureMode = () => (
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold mb-6 text-center">Projects</h2>

        <div className="bg-gray-800/80 backdrop-blur-sm p-6 rounded-lg border border-gray-700">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {projects.map((project) => (
              <motion.div
                key={project.id}
                className={`rounded-lg border cursor-pointer overflow-hidden ${
                  activeProject === project.id ? "border-blue-500 bg-blue-900/20" : "border-gray-700 bg-gray-800/50"
                }`}
                onClick={() => setActiveProject(activeProject === project.id ? null : project.id)}
                whileHover={{ scale: 1.02 }}
              >
                <div className="h-32 bg-gray-700 relative">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.name}
                    className="w-full h-full object-cover"
                    crossOrigin="anonymous"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg">{project.name}</h3>

                  {activeProject === project.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="text-sm text-gray-300 my-2">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {project.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="mt-4">
                        <a href={project.link} target="_blank" rel="noopener noreferrer">
                          <Button variant="outline" size="sm" className="w-full">
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

  switch (mode) {
    case "netflix":
      return renderNetflixMode()
    case "adventure":
      return renderAdventureMode()
    default:
      return renderDoomMode()
  }
}

