"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Mail, ExternalLink, Compass, Scroll, MapPin } from "lucide-react"

interface ContactArchiveProps {
  mode?: string // Support any mode, but always use roguelike style
}

export default function ContactArchive({ mode = "roguelike" }: ContactArchiveProps) {
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
          <h2 className="relative text-3xl font-bold text-amber-400 tracking-wider py-4 font-serif">
            Messenger Ravens
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
          <div className="relative mt-4">
            <div className="flex items-center gap-4 mb-6 justify-center">
              <div className="w-14 h-14 rounded-full bg-amber-700/30 flex items-center justify-center border-2 border-amber-600/50 shadow-inner">
                <MapPin className="h-7 w-7 text-amber-300" />
              </div>
            </div>

            {/* Decorative Divider */}
            <div className="flex items-center justify-center mb-6">
              <div className="h-[2px] w-24 bg-stone-600/70"></div>
              <Scroll className="mx-2 h-4 w-4 text-amber-500" />
              <div className="h-[2px] w-24 bg-stone-600/70"></div>
            </div>

            {/* Contact Message */}
            <div className="max-w-2xl mx-auto text-center mb-8">
              <p className="text-amber-300 leading-relaxed font-serif text-lg">
                Let's connect! Feel free to reach out through any of these magical portals.
              </p>
            </div>

            {/* Contact Links */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
              {/* LinkedIn */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-5 rounded-md border-2 border-amber-600/50 bg-amber-900/30 shadow-md"
              >
                <a
                  href="https://www.linkedin.com/in/mohammed-aldaqaq/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-3 text-amber-300 hover:text-amber-200 transition-colors"
                >
                  <div className="w-12 h-12 rounded-full bg-amber-700/50 flex items-center justify-center border-2 border-amber-600/50 shadow-inner">
                    <Linkedin className="h-6 w-6" />
                  </div>
                  <div className="text-center">
                    <h3 className="font-bold text-lg font-serif">LinkedIn</h3>
                    <p className="text-xs text-amber-400/70 italic font-serif flex items-center justify-center gap-1 mt-1">
                      Professional Scroll <ExternalLink className="h-3 w-3" />
                    </p>
                  </div>
                </a>
              </motion.div>

              {/* GitHub */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-5 rounded-md border-2 border-teal-600/50 bg-teal-900/30 shadow-md"
              >
                <a
                  href="https://github.com/Gardo32"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-3 text-teal-300 hover:text-teal-200 transition-colors"
                >
                  <div className="w-12 h-12 rounded-full bg-teal-700/50 flex items-center justify-center border-2 border-teal-600/50 shadow-inner">
                    <Github className="h-6 w-6" />
                  </div>
                  <div className="text-center">
                    <h3 className="font-bold text-lg font-serif">GitHub</h3>
                    <p className="text-xs text-teal-400/70 italic font-serif flex items-center justify-center gap-1 mt-1">
                      Code Repository <ExternalLink className="h-3 w-3" />
                    </p>
                  </div>
                </a>
              </motion.div>

              {/* Email */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-5 rounded-md border-2 border-amber-600/50 bg-amber-900/30 shadow-md"
              >
                <a
                  href="mailto:Gardodaqqaq@gmail.com"
                  className="flex flex-col items-center gap-3 text-amber-300 hover:text-amber-200 transition-colors"
                >
                  <div className="w-12 h-12 rounded-full bg-amber-700/50 flex items-center justify-center border-2 border-amber-600/50 shadow-inner">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div className="text-center">
                    <h3 className="font-bold text-lg font-serif">Email</h3>
                    <p className="text-xs text-amber-400/70 italic font-serif flex items-center justify-center gap-1 mt-1">
                      Direct Message <ExternalLink className="h-3 w-3" />
                    </p>
                  </div>
                </a>
              </motion.div>
            </div>
          </div>

          {/* Decorative Map Elements */}
          <div className="absolute bottom-4 left-4 opacity-40">
            <div className="text-xs text-stone-500 font-serif italic">Communication Methods</div>
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
