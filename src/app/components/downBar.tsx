"use client";

import { useState, useRef, useEffect } from "react";
import { Play, CirclePause, Moon, Sun } from "lucide-react";
import Image from "next/image";

function DownBar() {
  // State to track if music is playing
  const [isPlaying, setIsPlaying] = useState(false);
  // State to track dark/light mode
  const [isDarkMode, setIsDarkMode] = useState(true);
  // State to track language (true for English, false for Bangla)
  const [isEnglish, setIsEnglish] = useState(true);
  // State to track loading
  const [isLoading, setIsLoading] = useState(true);

  // Reference to the audio element
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Simulate loading animation
  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => {
      clearTimeout(loadingTimer);
    };
  }, []);

  // Toggle play/pause state
  const togglePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause(); // Pause the music
    } else {
      audioRef.current.play(); // Play the music
    }

    setIsPlaying(!isPlaying); // Update the state
  };

  // Toggle dark/light mode (just visual, doesn't affect the page)
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Toggle language
  const toggleLanguage = () => {
    setIsEnglish(!isEnglish);
    // Here you would implement the actual language change functionality
  };

  return (
    <>
      {/* Audio element */}
      <audio loop ref={audioRef} src="/in-slow-motion-inspiring-ambient-lounge-219592.mp3"></audio>

      {/* Simple fixed DownBar with minimal styling to ensure it's visible */}
      <div className="fixed bottom-8 left-0 right-0 flex justify-center items-center z-50 animate-float">
        <div
          className={`backdrop-blur-xl bg-white/30 text-white py-4 px-8 rounded-full shadow-lg flex justify-center items-center space-x-6 transition-all duration-500 
          border border-white/40 hover:bg-white/40 hover:scale-105
          ${isLoading ? "opacity-0" : "opacity-100"}`}
        >
          {/* Play/Pause button */}
          <div className="relative group">
            <button
              type="button"
              className="cursor-pointer p-2 rounded-full hover:bg-gray-200/50 transition-all duration-300 hover:scale-110 active:scale-95"
              onClick={togglePlayPause}
            >
              {isPlaying ? <CirclePause size={24} /> : <Play size={24} />}
            </button>
            <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
              {isPlaying ? "Pause" : "Play"}
            </span>
          </div>

          {/* Dark/Light mode button */}
          <div className="relative group">
            <button
              type="button"
              className="cursor-pointer p-2 rounded-full hover:bg-gray-200/50 transition-all duration-300 hover:scale-110 active:scale-95"
              onClick={toggleDarkMode}
            >
              {isDarkMode ? <Sun size={24} className="text-yellow-300" /> : <Moon size={24} />}
            </button>
            <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
              {isDarkMode ? "Light" : "Dark"}
            </span>
          </div>

          {/* Language button */}
          <div className="relative group">
            <button
              type="button"
              className="cursor-pointer p-2 rounded-full hover:bg-gray-200/50 transition-all duration-300 hover:scale-110 hover:rotate-12 active:scale-95"
              onClick={toggleLanguage}
            >
              <Image
                src={isEnglish ? "/eng.png" : "/bang.png"}
                alt={isEnglish ? "English" : "Bangla"}
                width={24}
                height={24}
                className="rounded-full"
              />
            </button>
            <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
              {isEnglish ? "English" : "Bangla"}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default DownBar;