import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { ModeProvider } from "@/components/mode-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Mohammed Aldaqaq | Cloud Computing Intern",
  description: "Personal website of Mohammed Aldaqaq, a Cloud Computing Intern specializing in AI and DevOps",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ModeProvider>
            {children}
          </ModeProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}