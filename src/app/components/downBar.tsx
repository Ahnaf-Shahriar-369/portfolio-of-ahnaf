"use client"

import { useState, useRef, useEffect } from "react"
import { Play, CirclePause, Moon, Sun } from "lucide-react"
import Image from "next/image"

function DownBar() {
  // State to track if music is playing
  const [isPlaying, setIsPlaying] = useState(false)
  // State to track dark/light mode
  const [isDarkMode, setIsDarkMode] = useState(true) // Changed to true for dark mode default
  // State to track language (true for English, false for Bangla)
  const [isEnglish, setIsEnglish] = useState(true)
  // State to track loading
  const [isLoading, setIsLoading] = useState(true)
  // State to track if component is mounted (for animations)
  const [isMounted, setIsMounted] = useState(false)

  // Reference to the audio element
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Simulate loading and mount animation
  useEffect(() => {
    // Simulate loading delay
    const loadingTimer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    // Set mounted after a short delay to trigger animation
    const mountTimer = setTimeout(() => {
      setIsMounted(true)
    }, 100)

    return () => {
      clearTimeout(loadingTimer)
      clearTimeout(mountTimer)
    }
  }, [])

  // Apply dark mode class to document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDarkMode])

  // Toggle play/pause state
  const togglePlayPause = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause() // Pause the music
    } else {
      audioRef.current.play() // Play the music
    }

    setIsPlaying(!isPlaying) // Update the state
  }

  // Toggle dark/light mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  // Toggle language
  const toggleLanguage = () => {
    setIsEnglish(!isEnglish)
    // Here you would implement the actual language change functionality
  }

  return (
    <>
      {/* Audio element */}
      <audio loop ref={audioRef} src="/in-slow-motion-inspiring-ambient-lounge-219592.mp3"></audio>

      <div className="container">
        {isLoading ? (
          // Loading animation
          <div
            className={`fixed bottom-0 left-0 right-0 mx-auto mb-[30px] w-[200px] h-[60px] backdrop-blur-xl bg-white/20 dark:bg-black/20 rounded-full shadow-lg z-50 overflow-hidden ${isMounted ? "opacity-100" : "opacity-0"} transition-all duration-500`}
          >
            <div className="absolute inset-0 flex justify-center items-center">
              <div className="w-full h-full flex justify-center items-center">
                <div className="w-2 h-2 bg-white/70 dark:bg-white/70 rounded-full mx-1 animate-[pulse_1s_ease-in-out_0s_infinite]"></div>
                <div className="w-2 h-2 bg-white/70 dark:bg-white/70 rounded-full mx-1 animate-[pulse_1s_ease-in-out_0.2s_infinite]"></div>
                <div className="w-2 h-2 bg-white/70 dark:bg-white/70 rounded-full mx-1 animate-[pulse_1s_ease-in-out_0.4s_infinite]"></div>
              </div>
            </div>
          </div>
        ) : (
          // Actual DownBar
          <div
            className={`fixed bottom-0 left-0 right-0 mx-auto mb-[30px] w-fit backdrop-blur-xl bg-white/30 dark:bg-black/30 text-black dark:text-white py-4 px-8 rounded-full shadow-lg flex justify-center items-center space-x-6 z-50 transition-all duration-500 
            hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:bg-white/40 dark:hover:bg-black/40 hover:scale-105 
            border border-white/40 dark:border-white/10 
            before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-b before:from-white/20 before:to-transparent before:pointer-events-none before:z-[-1] 
            after:absolute after:inset-0 after:rounded-full after:shadow-[inset_0_0_15px_rgba(255,255,255,0.15)] after:pointer-events-none after:z-[-1]
            ${isMounted ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"}`}
          >
            {/* Play/Pause button */}
            <div className="relative group">
              <button
                type="button"
                className="cursor-pointer p-2 rounded-full hover:bg-gray-200/50 dark:hover:bg-gray-800/50 transition-all duration-300 hover:scale-110 active:scale-95"
                onClick={togglePlayPause}
              >
                {isPlaying ? (
                  <CirclePause size={24} className="animate-fadeIn" />
                ) : (
                  <Play size={24} className="animate-fadeIn" />
                )}
              </button>
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap translate-y-2 group-hover:translate-y-0 duration-300">
                {isPlaying ? "Pause" : "Play"}
              </span>
            </div>

            {/* Dark/Light mode button */}
            <div className="relative group">
              <button
                type="button"
                className="cursor-pointer p-2 rounded-full hover:bg-gray-200/50 dark:hover:bg-gray-800/50 transition-all duration-300 hover:scale-110 active:scale-95"
                onClick={toggleDarkMode}
              >
                {isDarkMode ? (
                  <Sun size={24} className="animate-fadeIn text-yellow-300" />
                ) : (
                  <Moon size={24} className="animate-fadeIn" />
                )}
              </button>
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap translate-y-2 group-hover:translate-y-0 duration-300">
                {isDarkMode ? "Light" : "Dark"}
              </span>
            </div>

            {/* Language button */}
            <div className="relative group">
              <button
                type="button"
                className="cursor-pointer p-2 rounded-full hover:bg-gray-200/50 dark:hover:bg-gray-800/50 transition-all duration-300 hover:scale-110 hover:rotate-12 active:scale-95"
                onClick={toggleLanguage}
              >
                <Image
                  src={isEnglish ? "/eng.png" : "/bang.png"}
                  alt={isEnglish ? "English" : "Bangla"}
                  width={24}
                  height={24}
                  className="rounded-full animate-fadeIn"
                />
              </button>
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap translate-y-2 group-hover:translate-y-0 duration-300">
                {isEnglish ? "English" : "Bangla"}
              </span>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default DownBar
