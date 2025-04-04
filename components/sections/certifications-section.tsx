"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Award, Cloud, Server, Code, Cpu } from "lucide-react"

interface CertificationSectionProps {
  mode?: "doom" | "netflix" | "adventure"
  expanded?: boolean
  onSelect?: () => void
  onHover?: (id: string) => void
  hoveredItem?: string | null
}

const certifications = [
  {
    id: "aws-cloud-practitioner",
    name: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    date: "2023",
    description: "Foundational understanding of AWS Cloud services, security, and architecture concepts.",
    image: "/images/cert-aws-cloud.jpg",
    icon: <Cloud className="h-6 w-6 text-orange-400" />,
  },
  {
    id: "aws-solutions-architect",
    name: "AWS Certified Solutions Architect – Associate",
    issuer: "Amazon Web Services",
    date: "2023",
    description: "Ability to design and deploy scalable, highly available systems on AWS.",
    image: "/images/cert-aws-architect.jpg",
    icon: <Server className="h-6 w-6 text-orange-400" />,
  },
  {
    id: "aws-ai-practitioner",
    name: "AWS Certified AI Practitioner",
    issuer: "Amazon Web Services",
    date: "2023",
    description: "Knowledge of AI/ML concepts and AWS AI services implementation.",
    image: "/images/cert-aws-ai.jpg",
    icon: <Cpu className="h-6 w-6 text-orange-400" />,
  },
  {
    id: "azure-ai-engineer",
    name: "Microsoft Certified: Azure AI Engineer Associate",
    issuer: "Microsoft",
    date: "2023",
    description:
      "Youngest Bahraini to earn this certification. Expertise in building, managing, and deploying AI solutions on Azure.",
    highlight: true,
    image: "/images/cert-azure-ai.jpg",
    icon: <Award className="h-6 w-6 text-blue-400" />,
  },
  {
    id: "ibm-devops-engineer",
    name: "IBM Certified DevOps Engineer",
    issuer: "IBM",
    date: "2023",
    description: "Proficiency in DevOps practices, CI/CD pipelines, and automation tools.",
    image: "/images/cert-ibm-devops.jpg",
    icon: <Code className="h-6 w-6 text-blue-600" />,
  },
]

// Extract a child component for mode-specific rendering.
function CertificationsContent({
  mode,
  expanded,
  onSelect,
  onHover,
  hoveredItem,
  activeCert,
  setActiveCert,
}: {
  mode: "doom" | "netflix" | "adventure"
  expanded: boolean
  onSelect?: () => void
  onHover?: (id: string) => void
  hoveredItem?: string | null
  activeCert: string | null
  setActiveCert: (id: string | null) => void
}) {
  const renderDoomMode = () => (
    <div className="px-4 flex flex-col items-center justify-center h-screen">
      <motion.h2
        className="text-3xl font-bold mb-6 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Certifications
      </motion.h2>

      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="space-y-4">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
              className={`p-4 rounded-lg border ${cert.highlight ? "border-purple-500 bg-purple-900/20" : "border-gray-700 bg-gray-800/50"}`}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden">
                  {cert.icon}
                </div>
                <div>
                  <h3 className="font-bold text-lg">{cert.name}</h3>
                  <p className="text-sm text-gray-400">
                    {cert.issuer} • {cert.date}
                  </p>
                </div>
              </div>
              {cert.highlight && <Badge className="mt-2 bg-purple-600">Youngest Bahraini Certified</Badge>}
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
          <h2 className="text-3xl font-bold mb-6">Certifications</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {certifications.map((cert) => (
              <Card
                key={cert.id}
                className={`bg-gray-800 border-gray-700 ${cert.highlight ? "border-purple-500" : ""}`}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden">
                      {cert.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-xl">{cert.name}</h3>
                      <p className="text-sm text-gray-400">
                        {cert.issuer} • {cert.date}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm">{cert.description}</p>
                  {cert.highlight && <Badge className="mt-4 bg-purple-600">Youngest Bahraini Certified</Badge>}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide">
          {certifications.map((cert) => (
            <div
              key={cert.id}
              className={`flex-shrink-0 w-64 h-40 bg-gray-800 rounded-lg p-4 relative cursor-pointer
                ${hoveredItem === cert.id ? "scale-105 shadow-xl z-10" : "scale-100"}
                ${cert.highlight ? "border-2 border-purple-500" : "border border-gray-700"}
                transition-all duration-300
              `}
              onMouseEnter={() => onHover && onHover(cert.id)}
              onMouseLeave={() => onHover && onHover("")}
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden">
                  {cert.icon}
                </div>
                <h3 className="font-bold text-sm line-clamp-1">{cert.name}</h3>
              </div>
              <p className="text-xs text-gray-400 mt-1">{cert.issuer}</p>

              {hoveredItem === cert.id && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/70 rounded-lg">
                  <Button size="sm" className="bg-white text-black hover:bg-white/90 flex items-center gap-2">
                    <Award className="h-4 w-4" /> View
                  </Button>
                </div>
              )}

              {cert.highlight && (
                <Badge className="absolute bottom-3 left-3 bg-purple-600 text-xs">Youngest Bahraini</Badge>
              )}
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
        <h2 className="text-3xl font-bold mb-6 text-center">Certifications</h2>

        <div className="bg-gray-800/80 backdrop-blur-sm p-6 rounded-lg border border-gray-700">
          <div className="grid grid-cols-1 gap-4">
            {certifications.map((cert) => (
              <motion.div
                key={cert.id}
                className={`p-4 rounded-lg border cursor-pointer ${
                  activeCert === cert.id
                    ? "border-purple-500 bg-purple-900/30"
                    : cert.highlight
                      ? "border-purple-500/50 bg-purple-900/10"
                      : "border-gray-700 bg-gray-800/50"
                }`}
                onClick={() => setActiveCert(activeCert === cert.id ? null : cert.id)}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden">
                    {cert.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{cert.name}</h3>
                    <p className="text-sm text-gray-400">
                      {cert.issuer} • {cert.date}
                    </p>
                  </div>
                </div>

                {(activeCert === cert.id || cert.highlight) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3 }}
                    className="mt-2"
                  >
                    <p className="text-sm text-gray-300 mt-2">{cert.description}</p>
                    {cert.highlight && <Badge className="mt-2 bg-purple-600">Youngest Bahraini Certified</Badge>}
                  </motion.div>
                )}
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

export default function CertificationsSection({
  mode = "doom",
  expanded = false,
  onSelect,
  onHover,
  hoveredItem,
}: CertificationSectionProps) {
  const [activeCert, setActiveCert] = useState<string | null>(null)

  return (
    <CertificationsContent
      mode={mode}
      expanded={expanded}
      onSelect={onSelect}
      onHover={onHover}
      hoveredItem={hoveredItem}
      activeCert={activeCert}
      setActiveCert={setActiveCert}
    />
  )
}

