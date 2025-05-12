"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ExternalLink, Compass, Scroll, MapPin } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface ProjectsArchiveProps {
  mode?: string // Support any mode, but always use roguelike style
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
    description:
      "A terminal-based educational game that teaches Python programming through an interactive RPG-style experience. Players navigate through levels, solve coding challenges, and learn Python concepts in an engaging way.",
    tags: ["Python", "Education", "Game Development"],
    image: "/images/image.png",
    link: "https://github.com/Gardo32/Py-Game",
  },
  {
    id: "nis",
    name: "NCST Infrustructure Solutions (NIS)",
    description:
      "Providing an environment that bridges both on-premises and cloud environments using containerization, combining cloud features and services with on-premises compliance. ",
    tags: ["Cloud", "Infrustructure", "Docker", "Docker Swarm"],
    image: "/images/NIS.jpg",
  },
  {
    id: "Biopixel",
    name: "Biopixel",
    description:
      "Powerful web-based platform for satellite vegetation analysis that helps users analyze, visualize, and extract agricultural insights from satellite imagery.",
    tags: ["Agriculture", "AI", "Satellite Imagery"],
    image: "/images/biopixel.jpg",
    link: "https://github.com/Gardo32/data-cosmos",
  },
]

export default function ProjectsArchive({ mode = "roguelike" }: ProjectsArchiveProps) {
  const [activeProject, setActiveProject] = useState<string | null>(null)

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
          <h2 className="relative text-3xl font-bold text-amber-400 tracking-wider py-4 font-serif">Quest Journal</h2>
        </div>

        {/* Map Background */}
        <div className="relative bg-stone-800/90 rounded-xl p-6 border-2 border-stone-600 shadow-xl overflow-hidden">
          {/* Parchment Texture Overlay */}
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=600&width=800')] opacity-10 mix-blend-overlay"></div>

          {/* Compass Rose */}
          <div className="absolute top-4 right-4 w-16 h-16 opacity-70">
            <Compass className="w-full h-full text-stone-500" strokeWidth={1} />
          </div>

          {/* Map Content */}
          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                className={`relative p-5 rounded-md cursor-pointer transition-all duration-300 ease-in-out shadow-md
                  ${
                    activeProject === project.id
                      ? index % 2 === 0
                        ? "border-amber-500 bg-amber-900/40 scale-105"
                        : "border-teal-500 bg-teal-900/40 scale-105"
                      : "border-stone-600 bg-stone-700/60 hover:border-amber-600/70"
                  } border-2
                `}
                onClick={() => setActiveProject(activeProject === project.id ? null : project.id)}
                whileHover={{ scale: activeProject === project.id ? 1.05 : 1.03 }}
                layout
              >
                {/* Project Image */}
                <div className="h-40 rounded-md overflow-hidden mb-4 border-2 border-stone-600">
                  <img
                    src={project.image || "/placeholder.svg?height=200&width=400"}
                    alt={project.name}
                    className="w-full h-full object-cover"
                    crossOrigin="anonymous"
                  />
                </div>

                {/* Project Title */}
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className={`w-10 h-10 rounded-full 
                    ${index % 2 === 0 ? "bg-amber-700/30 border-amber-600/50" : "bg-teal-700/30 border-teal-600/50"} 
                    flex items-center justify-center border-2 shadow-inner`}
                  >
                    <MapPin className={`h-5 w-5 ${index % 2 === 0 ? "text-amber-300" : "text-teal-300"}`} />
                  </div>
                  <div>
                    <h3
                      className={`font-bold text-lg 
                      ${index % 2 === 0 ? "text-amber-300" : "text-teal-300"} 
                      font-serif`}
                    >
                      {project.name}
                    </h3>
                  </div>
                </div>

                {/* Decorative Divider */}
                <div className="flex items-center justify-center mb-3">
                  <div className="h-[2px] w-16 bg-stone-600/70"></div>
                  <Scroll className={`mx-2 h-4 w-4 ${index % 2 === 0 ? "text-amber-500" : "text-teal-500"}`} />
                  <div className="h-[2px] w-16 bg-stone-600/70"></div>
                </div>

                {/* Project Description */}
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out
                    ${activeProject === project.id ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
                  `}
                >
                  <p className="text-sm text-stone-300 leading-relaxed font-serif text-center px-2 py-2 border-t-2 border-stone-600/70 pt-3 mt-1">
                    {project.description}
                  </p>

                  {/* Project Tags */}
                  <div className="flex flex-wrap justify-center gap-2 mt-3">
                    {project.tags.map((tag) => (
                      <Badge
                        key={tag}
                        className={`
                          ${
                            index % 2 === 0
                              ? "bg-amber-900/60 text-amber-300 border-amber-600/50"
                              : "bg-teal-900/60 text-teal-300 border-teal-600/50"
                          } border px-2 py-0.5 text-xs font-serif`}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Project Link */}
                  {project.link && (
                    <div className="flex justify-center mt-4">
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-2 px-3 py-1 rounded-md text-sm font-serif
                          ${
                            index % 2 === 0
                              ? "bg-amber-900/60 text-amber-300 border border-amber-600/50 hover:bg-amber-800/60"
                              : "bg-teal-900/60 text-teal-300 border border-teal-600/50 hover:bg-teal-800/60"
                          }`}
                      >
                        View Quest <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  )}
                </div>

                {/* Click to Expand Hint */}
                {activeProject !== project.id && (
                  <div className="text-center text-amber-400/70 text-xs mt-2 italic font-serif">
                    *Click to reveal quest details*
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Decorative Map Elements */}
          <div className="absolute bottom-4 left-4 opacity-40">
            <div className="text-xs text-stone-500 font-serif italic">Completed & Ongoing Quests</div>
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
