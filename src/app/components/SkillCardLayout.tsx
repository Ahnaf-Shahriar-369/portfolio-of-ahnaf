"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, useAnimation, type PanInfo } from "framer-motion"
import SkillCard from "./SkillCard"

interface Skill {
  id: number
  imageSrc: string
  name: string
  description: string
}

interface SkillCardLayoutProps {
  skills?: Skill[]
}

export default function SkillCardLayout({ skills = [] }: SkillCardLayoutProps) {
  // Use default skills if none provided
  const defaultSkills: Skill[] = [
    {
      id: 1,
      imageSrc: "/placeholder.svg?height=40&width=40",
      name: "GitHub",
      description: "A developer platform for storing, managing, and sharing code.",
    },
    {
      id: 2,
      imageSrc: "/placeholder.svg?height=40&width=40",
      name: "React",
      description: "A JavaScript library for building user interfaces with components.",
    },
    {
      id: 3,
      imageSrc: "/placeholder.svg?height=40&width=40",
      name: "TypeScript",
      description: "A strongly typed programming language built on JavaScript.",
    },
    {
      id: 4,
      imageSrc: "/placeholder.svg?height=40&width=40",
      name: "Next.js",
      description: "The React framework for production with hybrid rendering.",
    },
    {
      id: 5,
      imageSrc: "/placeholder.svg?height=40&width=40",
      name: "Tailwind CSS",
      description: "A utility-first CSS framework for rapid UI development.",
    },
  ]

  const actualSkills = skills.length > 0 ? skills : defaultSkills

  // States for interaction
  const [isAnyCardHovered, setIsAnyCardHovered] = useState(false)
  const [isHolding, setIsHolding] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [touchStartTime, setTouchStartTime] = useState(0)
  const [touchStartPosition, setTouchStartPosition] = useState({ x: 0, y: 0 })
  const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null)
  const [clickedCardIndex, setClickedCardIndex] = useState<number | null>(null)

  // Refs
  const containerRef = useRef<HTMLDivElement>(null)
  const controls = useAnimation()
  const holdTimerRef = useRef<NodeJS.Timeout | null>(null)
  const clickTimerRef = useRef<NodeJS.Timeout | null>(null)
  const touchInfoRef = useRef<{
    identifier: number | null
    force: number
    cardIndex: number | null
  }>({
    identifier: null,
    force: 0,
    cardIndex: null,
  })

  // For responsive design
  const [isMobile, setIsMobile] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  // Handle client-side only code
  useEffect(() => {
    setIsClient(true)
    setIsMobile(window.innerWidth < 768)
    setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0)

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Calculate dimensions for proper infinite scroll
  const [containerWidth, setContainerWidth] = useState(0)
  const [cardWidth, setCardWidth] = useState(0)
  const [totalContentWidth, setTotalContentWidth] = useState(0)

  useEffect(() => {
    if (isClient && containerRef.current) {
      const updateDimensions = () => {
        const containerRect = containerRef.current?.getBoundingClientRect()
        if (containerRect) {
          setContainerWidth(containerRect.width)

          // Calculate card width including gap
          const estimatedCardWidth = isMobile ? 280 : 340 // card + gap
          setCardWidth(estimatedCardWidth)

          // Calculate total width of all cards
          const calculatedTotalWidth = actualSkills.length * estimatedCardWidth
          setTotalContentWidth(calculatedTotalWidth)
        }
      }

      updateDimensions()
      window.addEventListener("resize", updateDimensions)
      return () => window.removeEventListener("resize", updateDimensions)
    }
  }, [isClient, actualSkills.length, isMobile])

  // Animation loop using requestAnimationFrame for smooth scrolling
  const animationRef = useRef<number | null>(null)
  const lastTimestampRef = useRef<number>(0)
  const scrollPositionRef = useRef<number>(0)
  const scrollSpeedRef = useRef<number>(1)
  const directionRef = useRef<number>(-1) // -1 for left, 1 for right
  const lastScrollPositionRef = useRef<number>(0)

  const animate = (timestamp: number) => {
    if (!lastTimestampRef.current) lastTimestampRef.current = timestamp
    const elapsed = timestamp - lastTimestampRef.current

    if (elapsed > 16) {
      // Cap at roughly 60fps
      lastTimestampRef.current = timestamp

      // Only animate if not hovering any card, not holding, not clicking, and not dragging
      if (!isAnyCardHovered && !isHolding && clickedCardIndex === null && !isDragging) {
        // Update scroll position
        scrollPositionRef.current += directionRef.current * scrollSpeedRef.current

        // Handle infinite loop - improved for seamless scrolling
        if (totalContentWidth > 0) {
          // If scrolled too far left, jump to right
          if (scrollPositionRef.current < -totalContentWidth) {
            // Calculate exact offset to make the jump seamless
            const offset = scrollPositionRef.current + totalContentWidth
            scrollPositionRef.current = offset
          }

          // If scrolled too far right, jump to left
          if (scrollPositionRef.current > 0) {
            // Calculate exact offset to make the jump seamless
            const offset = scrollPositionRef.current - totalContentWidth
            scrollPositionRef.current = offset
          }
        }

        // Only update the animation if the position has changed significantly
        // This reduces unnecessary renders
        if (Math.abs(scrollPositionRef.current - lastScrollPositionRef.current) > 0.1) {
          controls.set({ x: scrollPositionRef.current })
          lastScrollPositionRef.current = scrollPositionRef.current
        }
      }
    }

    animationRef.current = requestAnimationFrame(animate)
  }

  // Start and clean up animation
  useEffect(() => {
    if (isClient) {
      animationRef.current = requestAnimationFrame(animate)

      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current)
        }
      }
    }
  }, [isClient, isAnyCardHovered, isHolding, clickedCardIndex, isDragging, totalContentWidth])

  // Handle card hover state
  const handleCardHoverStart = () => {
    setIsAnyCardHovered(true)
  }

  const handleCardHoverEnd = () => {
    setIsAnyCardHovered(false)
  }

  // Handle card click to show animation
  const handleCardClick = (index: number) => {
    setClickedCardIndex(index)

    // Clear any existing click timer
    if (clickTimerRef.current) {
      clearTimeout(clickTimerRef.current)
    }

    // Set a timer to clear the clicked state after animation duration
    clickTimerRef.current = setTimeout(() => {
      setClickedCardIndex(null)
    }, 2000) // Animation duration
  }

  // Enhanced touch event handling for better pressure sensitivity and card-specific holds
  const handleCardTouchStart = (e: React.TouchEvent, index: number) => {
    if (e.touches.length > 0) {
      const touch = e.touches[0]

      // Store touch identifier to track the same touch point
      touchInfoRef.current.identifier = touch.identifier
      touchInfoRef.current.cardIndex = index

      // Store touch force if available (iOS and some Android devices)
      touchInfoRef.current.force = touch.force || 0

      // Store start time and position for velocity calculation
      setTouchStartTime(Date.now())
      setTouchStartPosition({ x: touch.clientX, y: touch.clientY })

      // Start a timer to detect holding
      holdTimerRef.current = setTimeout(() => {
        setIsHolding(true)
        setActiveCardIndex(index)
      }, 200) // 200ms threshold for hold detection

      // Prevent default to avoid scrolling the page
      e.preventDefault()
    }
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    // Find the touch point that matches our stored identifier
    if (touchInfoRef.current.identifier !== null) {
      for (let i = 0; i < e.touches.length; i++) {
        const touch = e.touches[i]
        if (touch.identifier === touchInfoRef.current.identifier) {
          // Update force information if available
          touchInfoRef.current.force = touch.force || 0

          // If moving significantly, cancel hold and consider it a drag
          const deltaX = Math.abs(touch.clientX - touchStartPosition.x)
          const deltaY = Math.abs(touch.clientY - touchStartPosition.y)

          if (deltaX > 10 || deltaY > 10) {
            if (holdTimerRef.current) {
              clearTimeout(holdTimerRef.current)
              holdTimerRef.current = null
            }

            if (isHolding) {
              setIsHolding(false)
              setActiveCardIndex(null)
            }

            // Only set dragging if horizontal movement is significant
            if (deltaX > deltaY && deltaX > 10) {
              setIsDragging(true)
            }
          }
          break
        }
      }
    }
  }

  const handleTouchEnd = () => {
    // Clear the hold timer
    if (holdTimerRef.current) {
      clearTimeout(holdTimerRef.current)
      holdTimerRef.current = null
    }

    // Reset states
    setIsHolding(false)
    setActiveCardIndex(null)
    setIsDragging(false)
    touchInfoRef.current.identifier = null
    touchInfoRef.current.force = 0
    touchInfoRef.current.cardIndex = null
  }

  // Handle drag events with pressure sensitivity
  const handleDragStart = () => {
    if (isTouchDevice) {
      setIsDragging(true)
      // Clear any hold timer when dragging starts
      if (holdTimerRef.current) {
        clearTimeout(holdTimerRef.current)
        holdTimerRef.current = null
      }
      setIsHolding(false)
      setActiveCardIndex(null)
    }
  }

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (isTouchDevice) {
      setIsDragging(false)

      // Update scroll position
      scrollPositionRef.current += info.offset.x

      // Calculate velocity multiplier based on touch force if available
      const forceMultiplier =
        touchInfoRef.current.force > 0
          ? Math.min(touchInfoRef.current.force * 2.5, 4) // Scale force to a reasonable range
          : 1

      // Update direction and speed based on drag velocity and force
      if (info.velocity.x < -100) {
        directionRef.current = -1
        scrollSpeedRef.current = Math.min(Math.abs(info.velocity.x) / 100, 6) * forceMultiplier
      } else if (info.velocity.x > 100) {
        directionRef.current = 1
        scrollSpeedRef.current = Math.min(Math.abs(info.velocity.x) / 100, 6) * forceMultiplier
      }

      // Gradually return to normal speed
      setTimeout(() => {
        scrollSpeedRef.current = 1
      }, 1000)
    }
  }

  // Create duplicates for infinite scrolling - improved for seamless experience
  const getRepeatedSkills = () => {
    if (!isClient || totalContentWidth === 0) {
      // Default to 5 repeats if we don't have dimensions yet
      return Array.from({ length: 5 }, () => actualSkills).flat()
    }

    // Calculate how many repeats we need to fill the container at least 5 times
    // This ensures smooth infinite scrolling in both directions
    const repeatsNeeded = Math.max(5, Math.ceil((containerWidth * 5) / totalContentWidth))
    return Array.from({ length: repeatsNeeded }, () => actualSkills).flat()
  }

  const extendedSkills = getRepeatedSkills()

  // Only render client-side content after hydration
  if (!isClient) {
    return <div className="w-full h-screen bg-black"></div>
  }

  return (
    <motion.div
      className="relative w-full h-screen overflow-hidden bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* 
        ADD YOUR CUSTOM BACKGROUND HERE
        Replace the plain black background (bg-black) above with your own background.
        You can add images, gradients, or any other background styles here.
        
        Examples:
        1. For an image background:
           className="relative w-full h-screen overflow-hidden bg-[url('/your-image.jpg')] bg-cover bg-center"
        
        2. For a gradient background:
           className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-purple-900 via-black to-blue-900"
      */}

      {/* Cards container with horizontal scroll and conditional drag support */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <motion.div
          ref={containerRef}
          className="flex gap-6 md:gap-8 py-8 px-4 will-change-transform"
          animate={controls}
          initial={{ x: 0 }}
          drag={isTouchDevice ? "x" : false}
          dragConstraints={{ left: 0, right: 0 }}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          dragElastic={0.1}
          dragTransition={{
            power: 0.3,
            timeConstant: 400,
            modifyTarget: (target) => {
              // Apply force multiplier to drag target
              const force = touchInfoRef.current.force || 1
              return target * (force > 0.3 ? force * 1.8 : 1)
            },
          }}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchEnd}
        >
          {extendedSkills.map((skill, index) => (
            <motion.div
              key={`${skill.id}-${index}`}
              className="flex-shrink-0"
              whileHover={{ y: -10 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: activeCardIndex === index ? 1.03 : 1,
              }}
              transition={{
                duration: 0.5,
                delay: Math.min(index * 0.05, 1),
              }}
              style={{
                width: isMobile ? "260px" : "320px",
              }}
              onHoverStart={handleCardHoverStart}
              onHoverEnd={handleCardHoverEnd}
              onTouchStart={(e) => handleCardTouchStart(e, index)}
            >
              {/* Floating animation wrapper */}
              <motion.div
                animate={{
                  y: [0, -8, 0],
                }}
                transition={{
                  duration: 4 + (index % 3),
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
              >
                <SkillCard
                  imageSrc={skill.imageSrc}
                  name={skill.name}
                  description={skill.description}
                  onClick={() => handleCardClick(index)}
                  isActive={activeCardIndex === index || clickedCardIndex === index || isAnyCardHovered}
                />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Edge gradients */}
      <div className="absolute top-0 left-0 bottom-0 w-24 md:w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 right-0 bottom-0 w-24 md:w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

      {/* Status indicator - shows if paused */}
      {(isAnyCardHovered || isHolding || clickedCardIndex !== null) && (
        <motion.div
          className="absolute top-6 right-6 bg-gray-800/50 backdrop-blur-sm px-3 py-1 rounded-full text-xs text-white/80"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          Paused
        </motion.div>
      )}

      {/* Instructions - different for mobile and desktop - positioned at bottom center */}
      <motion.div
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white text-opacity-80 text-xs md:text-sm bg-gray-800/50 px-3 py-1.5 md:px-4 md:py-2 rounded-full backdrop-blur-sm z-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        {isTouchDevice ? "Hold to pause" : "Hover to pause"}
      </motion.div>
    </motion.div>
  )
}





















