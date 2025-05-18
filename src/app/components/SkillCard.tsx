"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { motion, useAnimation } from "framer-motion"

interface SkillCardProps {
  imageSrc: string
  name: string
  description: string
  imageAlt?: string
  onClick?: () => void
}

export default function SkillCard({ imageSrc, name, description, imageAlt = "Skill icon", onClick }: SkillCardProps) {
  const [isActive, setIsActive] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const cardRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [progressComplete, setProgressComplete] = useState(false)
  const progressControls = useAnimation()
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    setIsVisible(true)

    const handleMouseMove = (e: MouseEvent) => {
      if (!cardRef.current) return
      const rect = cardRef.current.getBoundingClientRect()
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }

    const card = cardRef.current
    if (card) {
      card.addEventListener("mousemove", handleMouseMove)
    }

    return () => {
      if (card) {
        card.removeEventListener("mousemove", handleMouseMove)
      }
    }
  }, [])

  // Handle progress bar and animations when active state changes
  useEffect(() => {
    if (isActive) {
      // Start progress animation
      progressControls.start({
        scaleX: 1,
        transition: { duration: 3, ease: "linear" }
      })
      
      // Set timer to enable advanced animations after 3 seconds
      timerRef.current = setTimeout(() => {
        setProgressComplete(true)
      }, 3000)
    } else {
      // Reset progress bar immediately
      progressControls.start({
        scaleX: 0,
        transition: { duration: 0 }
      })
      
      // Clear timer and reset state
      if (timerRef.current) {
        clearTimeout(timerRef.current)
        timerRef.current = null
      }
      setProgressComplete(false)
    }
    
    // Cleanup timer on component unmount
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [isActive, progressControls])

  // Handle mouse events
  const handleMouseEnter = () => {
    setIsActive(true)
  }
  
  const handleMouseLeave = () => {
    setIsActive(false)
  }
  
  // Handle touch events
  const handleTouchStart = () => {
    setIsActive(true)
  }
  
  const handleTouchEnd = () => {
    setIsActive(false)
  }

  // Limit number of particles for better performance
  const particleCount = 3;

  return (
    <motion.div
      ref={cardRef}
      className="relative w-80 h-80 rounded-2xl overflow-hidden cursor-pointer animate-float"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0.9,
        rotateY: isActive ? 5 : 0,
        rotateX: isActive ? -5 : 0,
      }}
      transition={{
        duration: 5,
        ease: "easeOut",
        rotateX: { duration: 0.2 },
        rotateY: { duration: 0.2 },
      }}
      whileHover={{
        scale: 1.05,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)",
      }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      onHoverStart={handleMouseEnter}
      onHoverEnd={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
    >
      {/* Glassmorphism background with gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/70 to-black/60 backdrop-blur-md z-0"
        animate={{
          background: isActive
            ? "linear-gradient(135deg, rgba(0,0,0,0.85) 0%, rgba(20,20,40,0.75) 50%, rgba(0,0,0,0.7) 100%)"
            : "linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.7) 100%)",
        }}
        transition={{ duration: 0.5 }}
      />

      {/* Optimized glow effect - only shown after progress complete */}
      {progressComplete && (
        <motion.div
          className="absolute rounded-full bg-blue-500/20 blur-2xl z-0"
          style={{
            width: 150,
            height: 150,
            left: mousePosition.x - 75,
            top: mousePosition.y - 75,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Animated border */}
      <motion.div
        className="absolute inset-0 rounded-2xl z-0"
        animate={{
          boxShadow: isActive
            ? "inset 0 0 0 2px rgba(255, 255, 255, 0.3), 0 0 20px rgba(120, 120, 255, 0.3)"
            : "inset 0 0 0 1px rgba(255, 255, 255, 0.1)",
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Card content */}
      <div className="relative flex flex-col items-center justify-center h-full p-6 z-10 text-center">
        <motion.div
          className="mb-6 relative w-24 h-24 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center"
          animate={{ 
            y: isActive ? -5 : 0,
            rotate: progressComplete ? 5 : 0 
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            y: { duration: 0.5, ease: "easeOut" },
            rotate: { duration: 0.5, ease: "easeOut" },
          }}
        >
          {/* Rotating gradient only after progress complete */}
          {progressComplete && (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, ease: "linear", repeat: Number.POSITIVE_INFINITY }}
              className="absolute inset-0 rounded-full"
              style={{
                background: "conic-gradient(from 0deg, transparent, rgba(120, 120, 255, 0.3), transparent)",
              }}
            />
          )}
          <Image
            src={imageSrc || "/placeholder.svg"}
            alt={imageAlt}
            width={60}
            height={60}
            className="object-contain relative z-10"
          />
        </motion.div>

        <motion.h3
          className="text-2xl font-bold text-white mb-4"
          animate={{
            scale: isActive ? 1.1 : 1,
            y: isActive ? -5 : 0,
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {name}
        </motion.h3>

        <motion.p
          className="text-gray-300 text-sm leading-relaxed"
          animate={{
            opacity: isActive ? 1 : 0.8,
            y: isActive ? 5 : 0,
          }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {description}
        </motion.p>

        {/* Optimized particles - only shown after progress is complete */}
        {progressComplete && (
          <>
            {[...Array(particleCount)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-blue-400"
                initial={{
                  x: (i * 100) - 100,
                  y: Math.random() * 200 - 100,
                  opacity: 0,
                  scale: 0,
                }}
                animate={{
                  opacity: [0, 0.8, 0],
                  scale: [0, 1, 0],
                  x: (i * 100) - 100,
                  y: [(i * 50) - 100, (i * -50) + 100],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.5,
                  repeatType: "reverse",
                }}
              />
            ))}
          </>
        )}

        {/* Progress bar that fills over 3 seconds */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-purple-500 via-blue-500 to-teal-500"
          initial={{ scaleX: 0, originX: 0 }}
          animate={progressControls}
        />
      </div>
    </motion.div>
  )
}