import { ModeProvider } from "@/components/mode-provider"
import HomePage from "@/components/home-page"

export default function Home() {
  return (
    <ModeProvider>
      <HomePage />
    </ModeProvider>
  )
}

