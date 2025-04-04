import type { ReactNode } from "react"
import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { ModeProvider } from "@/components/mode-provider"

export const metadata: Metadata = {
  title: "Mohammed Aldaqaq | Cloud Computing Intern",
  description: "Personal website of Mohammed Aldaqaq, a Cloud Computing Intern specializing in AI and DevOps",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ModeProvider>
            {children}
          </ModeProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}