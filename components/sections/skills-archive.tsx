"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import {
  Code,
  Server,
  Globe,
  Cpu,
  GitBranch,
  Terminal,
  Braces,
  FileCode,
  Layers,
  Compass,
  Scroll,
  Wand2,
} from "lucide-react"

interface SkillsArchiveProps {
  mode?: string // Support any mode, but always use roguelike style
}

// Skill categories with icons
const skillsWithIcons = {
  programmingLanguages: [
    { name: "Python", icon: <Code className="h-4 w-4 mr-1" /> },
    { name: "Solidity", icon: <FileCode className="h-4 w-4 mr-1" /> },
    { name: "HTML5 & CSS3", icon: <Globe className="h-4 w-4 mr-1" /> },
    { name: "Bash", icon: <Terminal className="h-4 w-4 mr-1" /> },
  ],
  frameworks: [
    { name: "React", icon: <Code className="h-4 w-4 mr-1" /> },
    { name: "Next.js", icon: <Code className="h-4 w-4 mr-1" /> },
    { name: "Flask", icon: <Code className="h-4 w-4 mr-1" /> },
  ],
  cloud: [
    { name: "AWS DevOps", icon: <Server className="h-4 w-4 mr-1" /> },
    { name: "AWS Architecting", icon: <Code className="h-4 w-4 mr-1" /> },
    { name: "Azure AI Services", icon: <Cpu className="h-4 w-4 mr-1" /> },
  ],
  devops: [
    { name: "Git & GitHub", icon: <GitBranch className="h-4 w-4 mr-1" /> },
    { name: "Docker", icon: <Layers className="h-4 w-4 mr-1" /> },
    { name: "Terraform", icon: <Server className="h-4 w-4 mr-1" /> },
    { name: "YAML", icon: <Code className="h-4 w-4 mr-1" /> },
    { name: "New Relic", icon: <FileCode className="h-4 w-4 mr-1" /> },
  ],
  apiTools: [
    { name: "Azure Cognitive Services", icon: <Cpu className="h-4 w-4 mr-1" /> },
    { name: "OpenAI API", icon: <Cpu className="h-4 w-4 mr-1" /> },
    { name: "JSON parsing", icon: <Braces className="h-4 w-4 mr-1" /> },
    { name: "Webhooks", icon: <Globe className="h-4 w-4 mr-1" /> },
    { name: "AI model integration", icon: <Cpu className="h-4 w-4 mr-1" /> },
  ],
}

export default function SkillsArchive({ mode = "roguelike" }: SkillsArchiveProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

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
          <h2 className="relative text-3xl font-bold text-amber-400 tracking-wider py-4 font-serif">Skills Grimoire</h2>
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
          <div className="relative grid grid-cols-1 gap-8 mt-4">
            {/* Programming Languages */}
            <motion.div
              className={`relative p-5 rounded-md cursor-pointer transition-all duration-300 ease-in-out shadow-md
                ${
                  activeCategory === "programming"
                    ? "border-amber-500 bg-amber-900/40 scale-105"
                    : "border-stone-600 bg-stone-700/60 hover:border-amber-600/70"
                } border-2
              `}
              onClick={() => setActiveCategory(activeCategory === "programming" ? null : "programming")}
              whileHover={{ scale: activeCategory === "programming" ? 1.05 : 1.03 }}
              layout
            >
              {/* Category Icon */}
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 rounded-full bg-amber-700/30 flex items-center justify-center border-2 border-amber-600/50 shadow-inner">
                  <Terminal className="h-6 w-6 text-amber-300" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-amber-300 font-serif">Programming Languages</h3>
                  <p className="text-sm text-stone-400 italic font-serif">The ancient tongues of command</p>
                </div>
              </div>

              {/* Decorative Divider */}
              <div className="flex items-center justify-center mb-3">
                <div className="h-[2px] w-16 bg-stone-600/70"></div>
                <Scroll className="mx-2 h-4 w-4 text-amber-500" />
                <div className="h-[2px] w-16 bg-stone-600/70"></div>
              </div>

              {/* Skills List */}
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out
                  ${activeCategory === "programming" ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
                `}
              >
                <div className="flex flex-wrap justify-center gap-2 mt-3 border-t-2 border-stone-600/70 pt-4">
                  {skillsWithIcons.programmingLanguages.map((skill) => (
                    <Badge
                      key={skill.name}
                      className="bg-amber-900/60 text-amber-300 hover:bg-amber-800 border border-amber-600/50 flex items-center px-3 py-1 text-sm font-serif"
                    >
                      {skill.icon} {skill.name}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Click to Expand Hint */}
              {activeCategory !== "programming" && (
                <div className="text-center text-amber-400/70 text-xs mt-2 italic font-serif">
                  *Click to reveal these arcane languages*
                </div>
              )}
            </motion.div>

            {/* Frameworks & Libraries */}
            <motion.div
              className={`relative p-5 rounded-md cursor-pointer transition-all duration-300 ease-in-out shadow-md
                ${
                  activeCategory === "frameworks"
                    ? "border-teal-500 bg-teal-900/40 scale-105"
                    : "border-stone-600 bg-stone-700/60 hover:border-teal-600/70"
                } border-2
              `}
              onClick={() => setActiveCategory(activeCategory === "frameworks" ? null : "frameworks")}
              whileHover={{ scale: activeCategory === "frameworks" ? 1.05 : 1.03 }}
              layout
            >
              {/* Category Icon */}
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 rounded-full bg-teal-700/30 flex items-center justify-center border-2 border-teal-600/50 shadow-inner">
                  <Code className="h-6 w-6 text-teal-300" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-teal-300 font-serif">Frameworks & Libraries</h3>
                  <p className="text-sm text-stone-400 italic font-serif">Enchanted tools of creation</p>
                </div>
              </div>

              {/* Decorative Divider */}
              <div className="flex items-center justify-center mb-3">
                <div className="h-[2px] w-16 bg-stone-600/70"></div>
                <Scroll className="mx-2 h-4 w-4 text-teal-500" />
                <div className="h-[2px] w-16 bg-stone-600/70"></div>
              </div>

              {/* Skills List */}
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out
                  ${activeCategory === "frameworks" ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
                `}
              >
                <div className="flex flex-wrap justify-center gap-2 mt-3 border-t-2 border-stone-600/70 pt-4">
                  {skillsWithIcons.frameworks.map((skill) => (
                    <Badge
                      key={skill.name}
                      className="bg-teal-900/60 text-teal-300 hover:bg-teal-800 border border-teal-600/50 flex items-center px-3 py-1 text-sm font-serif"
                    >
                      {skill.icon} {skill.name}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Click to Expand Hint */}
              {activeCategory !== "frameworks" && (
                <div className="text-center text-teal-400/70 text-xs mt-2 italic font-serif">
                  *Click to reveal these magical frameworks*
                </div>
              )}
            </motion.div>

            {/* Cloud Platforms */}
            <motion.div
              className={`relative p-5 rounded-md cursor-pointer transition-all duration-300 ease-in-out shadow-md
                ${
                  activeCategory === "cloud"
                    ? "border-amber-500 bg-amber-900/40 scale-105"
                    : "border-stone-600 bg-stone-700/60 hover:border-amber-600/70"
                } border-2
              `}
              onClick={() => setActiveCategory(activeCategory === "cloud" ? null : "cloud")}
              whileHover={{ scale: activeCategory === "cloud" ? 1.05 : 1.03 }}
              layout
            >
              {/* Category Icon */}
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 rounded-full bg-amber-700/30 flex items-center justify-center border-2 border-amber-600/50 shadow-inner">
                  <Server className="h-6 w-6 text-amber-300" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-amber-300 font-serif">Cloud Platforms</h3>
                  <p className="text-sm text-stone-400 italic font-serif">Ethereal realms of computing</p>
                </div>
              </div>

              {/* Decorative Divider */}
              <div className="flex items-center justify-center mb-3">
                <div className="h-[2px] w-16 bg-stone-600/70"></div>
                <Scroll className="mx-2 h-4 w-4 text-amber-500" />
                <div className="h-[2px] w-16 bg-stone-600/70"></div>
              </div>

              {/* Skills List */}
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out
                  ${activeCategory === "cloud" ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
                `}
              >
                <div className="flex flex-wrap justify-center gap-2 mt-3 border-t-2 border-stone-600/70 pt-4">
                  {skillsWithIcons.cloud.map((skill) => (
                    <Badge
                      key={skill.name}
                      className="bg-amber-900/60 text-amber-300 hover:bg-amber-800 border border-amber-600/50 flex items-center px-3 py-1 text-sm font-serif"
                    >
                      {skill.icon} {skill.name}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Click to Expand Hint */}
              {activeCategory !== "cloud" && (
                <div className="text-center text-amber-400/70 text-xs mt-2 italic font-serif">
                  *Click to reveal these celestial platforms*
                </div>
              )}
            </motion.div>

            {/* DevOps & CI/CD Tools */}
            <motion.div
              className={`relative p-5 rounded-md cursor-pointer transition-all duration-300 ease-in-out shadow-md
                ${
                  activeCategory === "devops"
                    ? "border-teal-500 bg-teal-900/40 scale-105"
                    : "border-stone-600 bg-stone-700/60 hover:border-teal-600/70"
                } border-2
              `}
              onClick={() => setActiveCategory(activeCategory === "devops" ? null : "devops")}
              whileHover={{ scale: activeCategory === "devops" ? 1.05 : 1.03 }}
              layout
            >
              {/* Category Icon */}
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 rounded-full bg-teal-700/30 flex items-center justify-center border-2 border-teal-600/50 shadow-inner">
                  <GitBranch className="h-6 w-6 text-teal-300" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-teal-300 font-serif">DevOps & CI/CD Tools</h3>
                  <p className="text-sm text-stone-400 italic font-serif">Artifacts of automation</p>
                </div>
              </div>

              {/* Decorative Divider */}
              <div className="flex items-center justify-center mb-3">
                <div className="h-[2px] w-16 bg-stone-600/70"></div>
                <Scroll className="mx-2 h-4 w-4 text-teal-500" />
                <div className="h-[2px] w-16 bg-stone-600/70"></div>
              </div>

              {/* Skills List */}
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out
                  ${activeCategory === "devops" ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
                `}
              >
                <div className="flex flex-wrap justify-center gap-2 mt-3 border-t-2 border-stone-600/70 pt-4">
                  {skillsWithIcons.devops.map((skill) => (
                    <Badge
                      key={skill.name}
                      className="bg-teal-900/60 text-teal-300 hover:bg-teal-800 border border-teal-600/50 flex items-center px-3 py-1 text-sm font-serif"
                    >
                      {skill.icon} {skill.name}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Click to Expand Hint */}
              {activeCategory !== "devops" && (
                <div className="text-center text-teal-400/70 text-xs mt-2 italic font-serif">
                  *Click to reveal these mystical tools*
                </div>
              )}
            </motion.div>

            {/* APIs & AI Tools */}
            <motion.div
              className={`relative p-5 rounded-md cursor-pointer transition-all duration-300 ease-in-out shadow-md
                ${
                  activeCategory === "api"
                    ? "border-amber-500 bg-amber-900/40 scale-105"
                    : "border-stone-600 bg-stone-700/60 hover:border-amber-600/70"
                } border-2
              `}
              onClick={() => setActiveCategory(activeCategory === "api" ? null : "api")}
              whileHover={{ scale: activeCategory === "api" ? 1.05 : 1.03 }}
              layout
            >
              {/* Category Icon */}
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 rounded-full bg-amber-700/30 flex items-center justify-center border-2 border-amber-600/50 shadow-inner">
                  <Wand2 className="h-6 w-6 text-amber-300" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-amber-300 font-serif">APIs & AI Tools</h3>
                  <p className="text-sm text-stone-400 italic font-serif">Conduits of artificial wisdom</p>
                </div>
              </div>

              {/* Decorative Divider */}
              <div className="flex items-center justify-center mb-3">
                <div className="h-[2px] w-16 bg-stone-600/70"></div>
                <Scroll className="mx-2 h-4 w-4 text-amber-500" />
                <div className="h-[2px] w-16 bg-stone-600/70"></div>
              </div>

              {/* Skills List */}
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out
                  ${activeCategory === "api" ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
                `}
              >
                <div className="flex flex-wrap justify-center gap-2 mt-3 border-t-2 border-stone-600/70 pt-4">
                  {skillsWithIcons.apiTools.map((skill) => (
                    <Badge
                      key={skill.name}
                      className="bg-amber-900/60 text-amber-300 hover:bg-amber-800 border border-amber-600/50 flex items-center px-3 py-1 text-sm font-serif"
                    >
                      {skill.icon} {skill.name}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Click to Expand Hint */}
              {activeCategory !== "api" && (
                <div className="text-center text-amber-400/70 text-xs mt-2 italic font-serif">
                  *Click to reveal these arcane interfaces*
                </div>
              )}
            </motion.div>
          </div>

          {/* Decorative Map Elements */}
          <div className="absolute bottom-4 left-4 opacity-40">
            <div className="text-xs text-stone-500 font-serif italic">Mastered by the Artificer</div>
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
