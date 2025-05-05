"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ContactSection({ mode = "doom" }) {
  return (
    <div className={`px-4 flex flex-col items-center justify-start ${mode === "mobile-rpg" ? "py-4 min-h-fit" : "min-h-screen"}`}>
      <motion.h2
        className="text-3xl font-bold mb-6 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Contact
      </motion.h2>

      <motion.div
        className="w-full max-w-md flex flex-col items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <p className="text-center mb-6 text-white">
          Let's connect! Feel free to reach out through any of these platforms.
        </p>

        <div className="flex flex-col gap-4 w-full max-w-xs">
          <a
            href="https://www.linkedin.com/in/mohammed-aldaqaq/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full"
          >
            <Button
              className="w-full flex items-center justify-center gap-2 bg-transparent border border-transparent hover:bg-blue-600 hover:text-white transition-colors text-white"
            >
              <Linkedin className="h-5 w-5" />
              LinkedIn
              <ExternalLink className="h-4 w-4 ml-auto" />
            </Button>
          </a>

          <a
            href="https://github.com/Gardo32"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full"
          >
            <Button
              className="w-full flex items-center justify-center gap-2 bg-transparent border border-transparent hover:bg-gray-700 hover:text-white transition-colors text-white"
            >
              <Github className="h-5 w-5" />
              GitHub
              <ExternalLink className="h-4 w-4 ml-auto" />
            </Button>
          </a>

          <a
            href="mailto:Gardodaqqaq@gmail.com"
            className="w-full"
          >
            <Button
              className="w-full flex items-center justify-center gap-2 bg-transparent border border-transparent hover:bg-red-600 hover:text-white transition-colors text-white"
            >
              <Mail className="h-5 w-5" />
              Email
              <ExternalLink className="h-4 w-4 ml-auto" />
            </Button>
          </a>
        </div>
      </motion.div>
    </div>
  );
}
