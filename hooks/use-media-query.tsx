"use client"

import { useEffect, useState } from "react"

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)
  
  useEffect(() => {
    const media = window.matchMedia(query)
    
    // Set initial value
    setMatches(media.matches)
    
    // Setup listener for changes
    const listener = () => setMatches(media.matches)
    media.addEventListener("change", listener)
    
    // Clean up on unmount
    return () => media.removeEventListener("change", listener)
  }, [query])
  
  return matches
}

