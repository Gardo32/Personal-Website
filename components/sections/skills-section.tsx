"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import {
  Code,
  Server,
  Database,
  Globe,
  Cpu,
  GitBranch,
  Terminal,
  Braces,
  FileCode,
  Layers,
  MessageCircle,
} from "lucide-react"

interface SkillsSectionProps {
  mode?: "doom" | "netflix" | "adventure"
  expanded?: boolean
  onSelect?: () => void
  onHover?: (id: string) => void
  hoveredItem?: string | null
}

// Replace the entire skillsWithIcons object with the new skill tree structure
const skillsWithIcons = {
  programmingLanguages: [
    { name: "Python", icon: <Code className="h-4 w-4 mr-1" /> },
    { name: "JavaScript (ES6+)", icon: <Braces className="h-4 w-4 mr-1" /> },
    { name: "TypeScript", icon: <FileCode className="h-4 w-4 mr-1" /> },
    { name: "Solidity", icon: <FileCode className="h-4 w-4 mr-1" /> },
    { name: "HTML5 & CSS3", icon: <Globe className="h-4 w-4 mr-1" /> },
    { name: "Bash", icon: <Terminal className="h-4 w-4 mr-1" /> },
  ],
  frameworks: [
    { name: "Flask", icon: <Server className="h-4 w-4 mr-1" /> },
    { name: "Pandas", icon: <Database className="h-4 w-4 mr-1" /> },
    { name: "Streamlit", icon: <Layers className="h-4 w-4 mr-1" /> },
    { name: "React", icon: <Layers className="h-4 w-4 mr-1" /> },
    { name: "TailwindCSS", icon: <Braces className="h-4 w-4 mr-1" /> },
    { name: "Framer Motion", icon: <Layers className="h-4 w-4 mr-1" /> },
  ],
  cloud: [
    { name: "AWS EC2", icon: <Server className="h-4 w-4 mr-1" /> },
    { name: "AWS Lambda", icon: <Code className="h-4 w-4 mr-1" /> },
    { name: "AWS S3", icon: <Database className="h-4 w-4 mr-1" /> },
    { name: "AWS CloudFront", icon: <Globe className="h-4 w-4 mr-1" /> },
    { name: "AWS IAM", icon: <Terminal className="h-4 w-4 mr-1" /> },
    { name: "Azure AI Services", icon: <Cpu className="h-4 w-4 mr-1" /> },
    { name: "Azure Functions", icon: <Code className="h-4 w-4 mr-1" /> },
    { name: "Azure Blob Storage", icon: <Database className="h-4 w-4 mr-1" /> },
  ],
  devops: [
    { name: "Git & GitHub", icon: <GitBranch className="h-4 w-4 mr-1" /> },
    { name: "GitHub Actions", icon: <Code className="h-4 w-4 mr-1" /> },
    { name: "Docker", icon: <Layers className="h-4 w-4 mr-1" /> },
    { name: "Docker Swarm", icon: <Server className="h-4 w-4 mr-1" /> },
    { name: "YAML", icon: <FileCode className="h-4 w-4 mr-1" /> },
    { name: "GitHub CLI", icon: <Terminal className="h-4 w-4 mr-1" /> },
    { name: "VS Code", icon: <Code className="h-4 w-4 mr-1" /> },
  ],
  apiTools: [
    { name: "RESTful API design", icon: <Server className="h-4 w-4 mr-1" /> },
    { name: "Azure Cognitive Services", icon: <Cpu className="h-4 w-4 mr-1" /> },
    { name: "OpenAI API", icon: <Cpu className="h-4 w-4 mr-1" /> },
    { name: "JSON parsing", icon: <Braces className="h-4 w-4 mr-1" /> },
    { name: "Webhooks", icon: <Globe className="h-4 w-4 mr-1" /> },
    { name: "AI model integration", icon: <Cpu className="h-4 w-4 mr-1" /> },
  ],
  devTools: [
    { name: "Next.js", icon: <Globe className="h-4 w-4 mr-1" /> },
    { name: "Vercel", icon: <Server className="h-4 w-4 mr-1" /> },
    { name: "Replit", icon: <Code className="h-4 w-4 mr-1" /> },
    { name: "Glitch", icon: <Globe className="h-4 w-4 mr-1" /> },
    { name: "Postman", icon: <Server className="h-4 w-4 mr-1" /> },
    { name: "ngrok", icon: <Terminal className="h-4 w-4 mr-1" /> },
  ],
  collaboration: [
    { name: "Notion", icon: <FileCode className="h-4 w-4 mr-1" /> },
    { name: "Trello", icon: <Layers className="h-4 w-4 mr-1" /> },
    { name: "Google Colab", icon: <Code className="h-4 w-4 mr-1" /> },
    { name: "GitHub Pages", icon: <Globe className="h-4 w-4 mr-1" /> },
    { name: "Discord", icon: <MessageCircle className="h-4 w-4 mr-1" /> },
  ],
}

// Update the renderDoomMode function to include the new skill categories
const renderDoomMode = () => (
  <div className="px-4 flex flex-col items-center justify-center h-screen overflow-y-auto py-20">
    <motion.h2
      className="text-3xl font-bold mb-6 text-center"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      Skills & Tools
    </motion.h2>

    <motion.div
      className="w-full max-w-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">💻 Programming Languages</h3>
          <div className="flex flex-wrap gap-2">
            {skillsWithIcons.programmingLanguages.map((skill) => (
              <Badge key={skill.name} className="bg-indigo-600 flex items-center">
                {skill.icon} {skill.name}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">⚙️ Frameworks & Libraries</h3>
          <div className="flex flex-wrap gap-2">
            {skillsWithIcons.frameworks.map((skill) => (
              <Badge key={skill.name} className="bg-green-600 flex items-center">
                {skill.icon} {skill.name}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">☁️ Cloud Platforms</h3>
          <div className="flex flex-wrap gap-2">
            {skillsWithIcons.cloud.map((skill) => (
              <Badge key={skill.name} className="bg-blue-600 flex items-center">
                {skill.icon} {skill.name}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">⚙️ DevOps & CI/CD Tools</h3>
          <div className="flex flex-wrap gap-2">
            {skillsWithIcons.devops.map((skill) => (
              <Badge key={skill.name} className="bg-purple-600 flex items-center">
                {skill.icon} {skill.name}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">🔧 APIs & AI Tools</h3>
          <div className="flex flex-wrap gap-2">
            {skillsWithIcons.apiTools.map((skill) => (
              <Badge key={skill.name} className="bg-orange-600 flex items-center">
                {skill.icon} {skill.name}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">🛠️ Development & Deployment Tools</h3>
          <div className="flex flex-wrap gap-2">
            {skillsWithIcons.devTools.map((skill) => (
              <Badge key={skill.name} className="bg-rose-600 flex items-center">
                {skill.icon} {skill.name}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">🧪 Learning & Collaboration</h3>
          <div className="flex flex-wrap gap-2">
            {skillsWithIcons.collaboration.map((skill) => (
              <Badge key={skill.name} className="bg-teal-600 flex items-center">
                {skill.icon} {skill.name}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  </div>
)

// Update the renderNetflixMode function to include the new skill categories
const renderNetflixMode = ({ expanded, onSelect, hoveredItem, onHover }: SkillsSectionProps) => (
  <div className={`${expanded ? "p-6" : "p-4"}`} onClick={!expanded && onSelect ? () => onSelect() : undefined}>
    {expanded ? (
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">Skills & Tools</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <h3 className="text-xl font-bold mb-4">💻 Programming Languages</h3>
            <div className="flex flex-wrap gap-2">
              {skillsWithIcons.programmingLanguages.map((skill) => (
                <Badge key={skill.name} className="bg-indigo-600 text-sm flex items-center">
                  {skill.icon} {skill.name}
                </Badge>
              ))}
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <h3 className="text-xl font-bold mb-4">⚙️ Frameworks & Libraries</h3>
            <div className="flex flex-wrap gap-2">
              {skillsWithIcons.frameworks.map((skill) => (
                <Badge key={skill.name} className="bg-green-600 text-sm flex items-center">
                  {skill.icon} {skill.name}
                </Badge>
              ))}
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <h3 className="text-xl font-bold mb-4">☁️ Cloud Platforms</h3>
            <div className="flex flex-wrap gap-2">
              {skillsWithIcons.cloud.map((skill) => (
                <Badge key={skill.name} className="bg-blue-600 text-sm flex items-center">
                  {skill.icon} {skill.name}
                </Badge>
              ))}
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <h3 className="text-xl font-bold mb-4">⚙️ DevOps & CI/CD Tools</h3>
            <div className="flex flex-wrap gap-2">
              {skillsWithIcons.devops.map((skill) => (
                <Badge key={skill.name} className="bg-purple-600 text-sm flex items-center">
                  {skill.icon} {skill.name}
                </Badge>
              ))}
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <h3 className="text-xl font-bold mb-4">🔧 APIs & AI Tools</h3>
            <div className="flex flex-wrap gap-2">
              {skillsWithIcons.apiTools.map((skill) => (
                <Badge key={skill.name} className="bg-orange-600 text-sm flex items-center">
                  {skill.icon} {skill.name}
                </Badge>
              ))}
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <h3 className="text-xl font-bold mb-4">🛠️ Development Tools</h3>
            <div className="flex flex-wrap gap-2">
              {skillsWithIcons.devTools.map((skill) => (
                <Badge key={skill.name} className="bg-rose-600 text-sm flex items-center">
                  {skill.icon} {skill.name}
                </Badge>
              ))}
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <h3 className="text-xl font-bold mb-4">🧪 Collaboration</h3>
            <div className="flex flex-wrap gap-2">
              {skillsWithIcons.collaboration.map((skill) => (
                <Badge key={skill.name} className="bg-teal-600 text-sm flex items-center">
                  {skill.icon} {skill.name}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    ) : (
      <div className="grid grid-cols-2 gap-4">
        <div
          className={`bg-gray-800 p-4 rounded-lg border border-gray-700 cursor-pointer
            ${hoveredItem === "skills-languages" ? "scale-105 shadow-xl z-10" : "scale-100"}
            transition-all duration-300
          `}
          onMouseEnter={() => onHover && onHover("skills-languages")}
          onMouseLeave={() => onHover && onHover("")}
        >
          <h3 className="text-sm font-bold mb-2">💻 Programming Languages</h3>
          <div className="flex flex-wrap gap-1">
            {skillsWithIcons.programmingLanguages.slice(0, 3).map((skill) => (
              <Badge key={skill.name} className="bg-indigo-600 text-xs flex items-center">
                {skill.icon} {skill.name}
              </Badge>
            ))}
            {skillsWithIcons.programmingLanguages.length > 3 && (
              <Badge className="bg-indigo-600/50 text-xs">+{skillsWithIcons.programmingLanguages.length - 3}</Badge>
            )}
          </div>
        </div>

        <div
          className={`bg-gray-800 p-4 rounded-lg border border-gray-700 cursor-pointer
            ${hoveredItem === "skills-frameworks" ? "scale-105 shadow-xl z-10" : "scale-100"}
            transition-all duration-300
          `}
          onMouseEnter={() => onHover && onHover("skills-frameworks")}
          onMouseLeave={() => onHover && onHover("")}
        >
          <h3 className="text-sm font-bold mb-2">⚙️ Frameworks</h3>
          <div className="flex flex-wrap gap-1">
            {skillsWithIcons.frameworks.slice(0, 3).map((skill) => (
              <Badge key={skill.name} className="bg-green-600 text-xs flex items-center">
                {skill.icon} {skill.name}
              </Badge>
            ))}
            {skillsWithIcons.frameworks.length > 3 && (
              <Badge className="bg-green-600/50 text-xs">+{skillsWithIcons.frameworks.length - 3}</Badge>
            )}
          </div>
        </div>

        <div
          className={`bg-gray-800 p-4 rounded-lg border border-gray-700 cursor-pointer
            ${hoveredItem === "skills-cloud" ? "scale-105 shadow-xl z-10" : "scale-100"}
            transition-all duration-300
          `}
          onMouseEnter={() => onHover && onHover("skills-cloud")}
          onMouseLeave={() => onHover && onHover("")}
        >
          <h3 className="text-sm font-bold mb-2">☁️ Cloud Platforms</h3>
          <div className="flex flex-wrap gap-1">
            {skillsWithIcons.cloud.slice(0, 3).map((skill) => (
              <Badge key={skill.name} className="bg-blue-600 text-xs flex items-center">
                {skill.icon} {skill.name}
              </Badge>
            ))}
            {skillsWithIcons.cloud.length > 3 && (
              <Badge className="bg-blue-600/50 text-xs">+{skillsWithIcons.cloud.length - 3}</Badge>
            )}
          </div>
        </div>

        <div
          className={`bg-gray-800 p-4 rounded-lg border border-gray-700 cursor-pointer
            ${hoveredItem === "skills-devops" ? "scale-105 shadow-xl z-10" : "scale-100"}
            transition-all duration-300
          `}
          onMouseEnter={() => onHover && onHover("skills-devops")}
          onMouseLeave={() => onHover && onHover("")}
        >
          <h3 className="text-sm font-bold mb-2">⚙️ DevOps</h3>
          <div className="flex flex-wrap gap-1">
            {skillsWithIcons.devops.slice(0, 3).map((skill) => (
              <Badge key={skill.name} className="bg-purple-600 text-xs flex items-center">
                {skill.icon} {skill.name}
              </Badge>
            ))}
            {skillsWithIcons.devops.length > 3 && (
              <Badge className="bg-purple-600/50 text-xs">+{skillsWithIcons.devops.length - 3}</Badge>
            )}
          </div>
        </div>
      </div>
    )}
  </div>
)

// Update the renderAdventureMode function to include the new skill categories
const renderAdventureMode = () => (
  <div className="max-w-2xl mx-auto overflow-y-auto max-h-[70vh] pr-2 custom-scrollbar">
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
      <h2 className="text-3xl font-bold mb-6 text-center">Skills & Tools</h2>

      <div className="bg-gray-800/80 backdrop-blur-sm p-6 rounded-lg border border-gray-700">
        <div className="grid grid-cols-1 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="p-4 rounded-lg border border-indigo-500/50 bg-indigo-900/10"
          >
            <h3 className="font-bold text-lg mb-3">💻 Programming Languages</h3>
            <div className="flex flex-wrap gap-2">
              {skillsWithIcons.programmingLanguages.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Badge className="bg-indigo-600 flex items-center">
                    {skill.icon} {skill.name}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="p-4 rounded-lg border border-green-500/50 bg-green-900/10"
          >
            <h3 className="font-bold text-lg mb-3">⚙️ Frameworks & Libraries</h3>
            <div className="flex flex-wrap gap-2">
              {skillsWithIcons.frameworks.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Badge className="bg-green-600 flex items-center">
                    {skill.icon} {skill.name}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="p-4 rounded-lg border border-blue-500/50 bg-blue-900/10"
          >
            <h3 className="font-bold text-lg mb-3">☁️ Cloud Platforms</h3>
            <div className="flex flex-wrap gap-2">
              {skillsWithIcons.cloud.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Badge className="bg-blue-600 flex items-center">
                    {skill.icon} {skill.name}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="p-4 rounded-lg border border-purple-500/50 bg-purple-900/10"
          >
            <h3 className="font-bold text-lg mb-3">⚙️ DevOps & CI/CD Tools</h3>
            <div className="flex flex-wrap gap-2">
              {skillsWithIcons.devops.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Badge className="bg-purple-600 flex items-center">
                    {skill.icon} {skill.name}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="p-4 rounded-lg border border-orange-500/50 bg-orange-900/10"
          >
            <h3 className="font-bold text-lg mb-3">🔧 APIs & AI Tools</h3>
            <div className="flex flex-wrap gap-2">
              {skillsWithIcons.apiTools.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Badge className="bg-orange-600 flex items-center">
                    {skill.icon} {skill.name}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
            className="p-4 rounded-lg border border-rose-500/50 bg-rose-900/10"
          >
            <h3 className="font-bold text-lg mb-3">🛠️ Development & Deployment Tools</h3>
            <div className="flex flex-wrap gap-2">
              {skillsWithIcons.devTools.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Badge className="bg-rose-600 flex items-center">
                    {skill.icon} {skill.name}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.6 }}
            className="p-4 rounded-lg border border-teal-500/50 bg-teal-900/10"
          >
            <h3 className="font-bold text-lg mb-3">🧪 Learning & Collaboration</h3>
            <div className="flex flex-wrap gap-2">
              {skillsWithIcons.collaboration.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Badge className="bg-teal-600 flex items-center">
                    {skill.icon} {skill.name}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  </div>
)

const SkillsSection: React.FC<SkillsSectionProps> = ({ mode, expanded, onSelect, onHover, hoveredItem }) => {
  switch (mode) {
    case "netflix":
      return renderNetflixMode({ expanded, onSelect, hoveredItem, onHover })
    case "adventure":
      return renderAdventureMode()
    default:
      return renderDoomMode()
  }
}

export default SkillsSection

