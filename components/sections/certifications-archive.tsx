"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Award, Cloud, Server, Code, Cpu, ExternalLink, Scroll, Compass, Crown, Sparkles } from "lucide-react"

interface CertificationsArchiveProps {
  mode?: string // Support any mode, but always use roguelike style
}

const certifications = [
  {
    id: "aws-cloud-practitioner",
    name: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    date: "February - 2024",
    description: "Foundational understanding of AWS Cloud services, security, and architecture concepts.",
    image: "/images/cert-aws-cloud.jpg",
    icon: <Cloud className="h-6 w-6 text-amber-300" />,
    link: "https://www.credly.com/badges/1be5ff08-e148-4ffa-9f5b-807f917f0f7e/public_url",
  },
  {
    id: "aws-solutions-architect",
    name: "AWS Certified Solutions Architect – Associate",
    issuer: "Amazon Web Services",
    date: "November - 2024",
    description: "Ability to design and deploy scalable, highly available systems on AWS.",
    image: "/images/cert-aws-architect.jpg",
    icon: <Server className="h-6 w-6 text-amber-300" />,
    link: "https://www.credly.com/badges/0095411d-5e22-4235-a119-14c2d20aa5b1/public_url",
  },
  {
    id: "aws-ai-practitioner",
    name: "AWS Certified AI Practitioner",
    issuer: "Amazon Web Services",
    date: "February - 2025",
    description: "Knowledge of AI/ML concepts and AWS AI services implementation.",
    image: "/images/cert-aws-ai.jpg",
    icon: <Cpu className="h-6 w-6 text-amber-300" />,
    link: "https://www.credly.com/badges/7be08fda-a868-4a4e-90d1-c70062f03ba0/public_url",
  },
  {
    id: "aws-devops-engineer-pro",
    name: "AWS Certified DevOps Engineer – Professional",
    issuer: "Amazon Web Services",
    date: "May - 2025",
    description:
      "Demonstrates expertise in provisioning, operating, and managing distributed application systems on the AWS platform.",
    highlight: true,
    highlightText: "First U-18 & Youngest in GCC",
    specialAchievement: true, // Add this flag for special visual effects
    image: "/images/cert-aws-devops-pro.jpg",
    icon: <Code className="h-6 w-6 text-amber-300" />,
    link: "https://www.credly.com/badges/7992031f-9a62-41cb-8363-509887423d45/public_url",
  },
  {
    id: "azure-ai-engineer",
    name: "Microsoft Certified: Azure AI Engineer Associate",
    issuer: "Microsoft",
    date: "June - 2024",
    description: "Expertise in building, managing, and deploying AI solutions on Azure.",
    highlight: true,
    highlightText: "Youngest Bahraini Certified",
    specialAchievement: true, // Add this flag for special visual effects
    image: "/images/cert-azure-ai.jpg",
    icon: <Award className="h-6 w-6 text-teal-300" />,
    link: "https://learn.microsoft.com/api/credentials/share/en-us/MohammedAldaqaq-6809/E99B96AAB4D586B8?sharingId=95DBE1616EC92D0",
  },
  {
    id: "ibm-devops-engineer",
    name: "IBM DevOps and Software Engineering Professional Certificate",
    issuer: "IBM",
    date: "April - 2024",
    description: "Proficiency in DevOps practices, CI/CD pipelines, and automation tools.",
    image: "/images/cert-ibm-devops.jpg",
    icon: <Code className="h-6 w-6 text-teal-300" />,
    link: "https://www.credly.com/badges/57110a68-6d1d-443e-997e-a905892bfac9/public_url",
  },
]

export default function CertificationsArchive({ mode = "roguelike" }: CertificationsArchiveProps) {
  const [activeCert, setActiveCert] = useState<string | null>(null)

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
          <div className="absolute inset-0 mx-auto w-[320px] h-[70px] bg-stone-800 rounded-md -skew-x-3 transform -rotate-1"></div>
          <div className="absolute inset-0 mx-auto w-[320px] h-[70px] bg-stone-700 rounded-md skew-x-2 transform rotate-1"></div>
          <h2 className="relative text-3xl font-bold text-amber-400 tracking-wider py-4 font-serif">
            DevOps Mastery Scrolls
          </h2>
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
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.id}
                className={`relative p-5 rounded-md cursor-pointer transition-all duration-300 ease-in-out shadow-md
                  ${
                    activeCert === cert.id
                      ? cert.id.includes("azure") || cert.id.includes("ibm")
                        ? "border-teal-500 bg-teal-900/40 scale-105"
                        : "border-amber-500 bg-amber-900/40 scale-105"
                      : "border-stone-600 bg-stone-700/60 hover:border-amber-600/70"
                  } border-2
                  ${cert.specialAchievement ? "shadow-[0_0_15px_rgba(218,165,32,0.4)]" : ""}
                `}
                onClick={() => setActiveCert(activeCert === cert.id ? null : cert.id)}
                whileHover={{ scale: activeCert === cert.id ? 1.05 : 1.03 }}
                animate={
                  cert.specialAchievement && activeCert !== cert.id
                    ? {
                        boxShadow: [
                          "0 0 5px rgba(218,165,32,0.2)",
                          "0 0 15px rgba(218,165,32,0.4)",
                          "0 0 5px rgba(218,165,32,0.2)",
                        ],
                      }
                    : {}
                }
                transition={
                  cert.specialAchievement
                    ? {
                        boxShadow: { repeat: Number.POSITIVE_INFINITY, duration: 3 },
                      }
                    : {}
                }
                layout
              >
                {/* Special Achievement Crown */}
                {cert.specialAchievement && (
                  <div className="absolute -top-3 -right-3 w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center border-2 border-amber-700 z-10 animate-bounce">
                    <Crown className="h-4 w-4 text-stone-900" />
                  </div>
                )}

                {/* Certificate Icon */}
                <div className="flex items-center gap-4 mb-3">
                  <div
                    className={`w-12 h-12 rounded-full 
                    ${
                      cert.id.includes("azure") || cert.id.includes("ibm")
                        ? "bg-teal-700/30 border-teal-600/50"
                        : "bg-amber-700/30 border-amber-600/50"
                    } 
                    flex items-center justify-center border-2 shadow-inner
                    ${cert.specialAchievement ? "ring-2 ring-amber-500 ring-opacity-50" : ""}
                    `}
                  >
                    {cert.icon}
                    {/* Removed the glowing circle animation, keeping only the crown at the top-right */}
                  </div>
                  <div>
                    <h3
                      className={`font-bold text-lg 
                      ${
                        cert.id.includes("azure") || cert.id.includes("ibm") ? "text-teal-300" : "text-amber-300"
                      } font-serif`}
                    >
                      {cert.name}
                    </h3>
                    <p className="text-sm text-stone-400 italic font-serif">
                      {cert.issuer} • {cert.date}
                    </p>
                  </div>
                </div>

                {/* Decorative Divider */}
                <div className="flex items-center justify-center mb-3">
                  <div className="h-[2px] w-16 bg-stone-600/70"></div>
                  <Scroll
                    className={`mx-2 h-4 w-4 
                    ${cert.id.includes("azure") || cert.id.includes("ibm") ? "text-teal-500" : "text-amber-500"}`}
                  />
                  <div className="h-[2px] w-16 bg-stone-600/70"></div>
                </div>

                {/* Certificate Description */}
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out
                    ${activeCert === cert.id ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
                  `}
                >
                  <p className="text-sm text-stone-300 leading-relaxed font-serif text-center px-2 py-2 border-t-2 border-stone-600/70 pt-3 mt-1">
                    {cert.description}
                  </p>

                  {/* Special Achievement */}
                  {cert.highlight && (
                    <div className="flex justify-center mt-3">
                      <Badge
                        className={`
                        ${
                          cert.id.includes("azure") || cert.id.includes("ibm")
                            ? "bg-teal-900/60 text-teal-300 border-teal-600/50"
                            : "bg-amber-900/60 text-amber-300 border-amber-600/50"
                        } border px-3 py-1 font-serif ${cert.specialAchievement ? "animate-pulse font-bold" : ""}`}
                      >
                        {cert.highlightText}
                        {cert.specialAchievement && <Sparkles className="h-3 w-3 ml-1 inline-block" />}
                      </Badge>
                    </div>
                  )}

                  {/* View Certificate Link */}
                  {cert.link && (
                    <div className="flex justify-center mt-4">
                      <a
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-2 px-3 py-1 rounded-md text-sm font-serif
                          ${
                            cert.id.includes("azure") || cert.id.includes("ibm")
                              ? "bg-teal-900/60 text-teal-300 border border-teal-600/50 hover:bg-teal-800/60"
                              : "bg-amber-900/60 text-amber-300 border border-amber-600/50 hover:bg-amber-800/60"
                          }
                          ${cert.specialAchievement ? "shadow-md shadow-amber-500/20" : ""}
                          `}
                      >
                        View Certificate <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  )}
                </div>

                {/* Click to Expand Hint */}
                {activeCert !== cert.id && (
                  <div className="text-center text-amber-400/70 text-xs mt-2 italic font-serif">
                    *Click to unfurl this scroll*
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Decorative Map Elements */}
          <div className="absolute bottom-4 left-4 opacity-40">
            <div className="text-xs text-stone-500 font-serif italic">Certified by the Guilds</div>
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
