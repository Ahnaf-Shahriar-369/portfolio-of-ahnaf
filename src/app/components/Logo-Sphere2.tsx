"use client"

import type React from "react"
import { useEffect, useRef, useState, useCallback } from "react"

const technologies = [
  "React",
  "Next.js",
  "Node.js",
  "TypeScript",
  "JavaScript",
  "HTML",
  "CSS",
  "Tailwind",
  "Bootstrap",
  "Sass",
  "Git",
  "GitHub",
  "MongoDB",
  "Prisma",
  "Express",
  "Redux",
  "Vercel",
  "Material UI",
  "GraphQL",
  "Docker",
  "AWS",
  "Firebase",
  "Jest",
  "Webpack",
]

interface TouchPosition {
  x: number
  y: number
}

interface TechItem {
  name: string
  x: number
  y: number
  z: number
  element?: HTMLDivElement
}

export default function LogoSphere2() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [touchStart, setTouchStart] = useState<TouchPosition | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const [techItems, setTechItems] = useState<TechItem[]>([])
  const animationFrameRef = useRef<number>()
  const autoRotationRef = useRef({ x: 0, y: 0.5 })

  // Generate sphere positions
  const generateSpherePositions = useCallback(() => {
    const radius = window.innerWidth < 768 ? 120 : 180
    const items: TechItem[] = []

    technologies.forEach((tech, index) => {
      // Use golden ratio for even distribution
      const phi = Math.acos(1 - (2 * (index + 0.5)) / technologies.length)
      const theta = Math.PI * (1 + Math.sqrt(5)) * (index + 0.5)

      const x = radius * Math.sin(phi) * Math.cos(theta)
      const y = radius * Math.sin(phi) * Math.sin(theta)
      const z = radius * Math.cos(phi)

      items.push({ name: tech, x, y, z })
    })

    setTechItems(items)
  }, [])

  // Initialize sphere
  useEffect(() => {
    generateSpherePositions()

    // Handle window resize
    const handleResize = () => {
      generateSpherePositions()
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [generateSpherePositions])

  // Animation loop
  const animate = useCallback(() => {
    if (!isDragging) {
      // Auto rotation when not being dragged
      setRotation((prev) => ({
        x: prev.x + autoRotationRef.current.x,
        y: prev.y + autoRotationRef.current.y,
      }))
    }

    animationFrameRef.current = requestAnimationFrame(animate)
  }, [isDragging])

  // Start animation
  useEffect(() => {
    animate()
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [animate])

  // Update item positions based on rotation
  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const centerX = container.offsetWidth / 2
    const centerY = container.offsetHeight / 2

    techItems.forEach((item, index) => {
      const element = container.children[index] as HTMLDivElement
      if (!element) return

      // Apply rotation transformations
      const rotX = (rotation.x * Math.PI) / 180
      const rotY = (rotation.y * Math.PI) / 180

      // Rotate around Y axis
      const x = item.x * Math.cos(rotY) - item.z * Math.sin(rotY)
      let z = item.x * Math.sin(rotY) + item.z * Math.cos(rotY)

      // Rotate around X axis
      const y = item.y * Math.cos(rotX) - z * Math.sin(rotX)
      z = item.y * Math.sin(rotX) + z * Math.cos(rotX)

      // Project to 2D
      const scale = 300 / (300 + z) // Perspective projection
      const projectedX = x * scale + centerX
      const projectedY = y * scale + centerY

      // Apply transformations
      element.style.transform = `translate(${projectedX - 20}px, ${projectedY - 20}px) scale(${scale})`
      element.style.opacity = `${Math.max(0.3, scale)}`
      element.style.zIndex = `${Math.floor(scale * 100)}`
    })
  }, [rotation, techItems])

  // Touch handlers
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    e.preventDefault()
    const touch = e.touches[0]
    setTouchStart({ x: touch.clientX, y: touch.clientY })
    setIsDragging(true)
    autoRotationRef.current = { x: 0, y: 0 }
  }, [])

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      e.preventDefault()
      if (!touchStart || !isDragging) return

      const touch = e.touches[0]
      const deltaX = touch.clientX - touchStart.x
      const deltaY = touch.clientY - touchStart.y

      const sensitivity = 0.5
      setRotation((prev) => ({
        x: prev.x - deltaY * sensitivity,
        y: prev.y + deltaX * sensitivity,
      }))

      setTouchStart({ x: touch.clientX, y: touch.clientY })
    },
    [touchStart, isDragging],
  )

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    e.preventDefault()
    setIsDragging(false)
    setTouchStart(null)

    // Resume auto rotation after a delay
    setTimeout(() => {
      autoRotationRef.current = { x: 0, y: 0.5 }
    }, 1000)
  }, [])

  // Mouse handlers
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    setTouchStart({ x: e.clientX, y: e.clientY })
    setIsDragging(true)
    autoRotationRef.current = { x: 0, y: 0 }
  }, [])

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!touchStart || !isDragging) return

      const deltaX = e.clientX - touchStart.x
      const deltaY = e.clientY - touchStart.y

      const sensitivity = 0.5
      setRotation((prev) => ({
        x: prev.x - deltaY * sensitivity,
        y: prev.y + deltaX * sensitivity,
      }))

      setTouchStart({ x: e.clientX, y: e.clientY })
    },
    [touchStart, isDragging],
  )

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
    setTouchStart(null)

    setTimeout(() => {
      autoRotationRef.current = { x: 0, y: 0.5 }
    }, 1000)
  }, [])

  // Global mouse events
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!touchStart || !isDragging) return

      const deltaX = e.clientX - touchStart.x
      const deltaY = e.clientY - touchStart.y

      const sensitivity = 0.5
      setRotation((prev) => ({
        x: prev.x - deltaY * sensitivity,
        y: prev.y + deltaX * sensitivity,
      }))

      setTouchStart({ x: e.clientX, y: e.clientY })
    }

    const handleGlobalMouseUp = () => {
      if (isDragging) {
        handleMouseUp()
      }
    }

    document.addEventListener("mousemove", handleGlobalMouseMove)
    document.addEventListener("mouseup", handleGlobalMouseUp)

    return () => {
      document.removeEventListener("mousemove", handleGlobalMouseMove)
      document.removeEventListener("mouseup", handleGlobalMouseUp)
    }
  }, [isDragging, touchStart, handleMouseUp])

  // Add momentum effect
  useEffect(() => {
    if (!isDragging && touchStart === null) {
      // Apply momentum decay
      const decay = 0.95
      autoRotationRef.current = {
        x: autoRotationRef.current.x * decay,
        y: autoRotationRef.current.y * decay,
      }

      // Reset to default rotation when momentum is very low
      if (Math.abs(autoRotationRef.current.x) < 0.01 && Math.abs(autoRotationRef.current.y) < 0.01) {
        autoRotationRef.current = { x: 0, y: 0.5 }
      }
    }
  }, [isDragging, touchStart, rotation])

  return (
    <div className="logo-sphere-wrapper">
      <div
        ref={containerRef}
        className="logo-sphere-container select-none cursor-grab active:cursor-grabbing"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        style={{
          width: "400px",
          height: "400px",
          position: "relative",
          margin: "0 auto",
          userSelect: "none",
          WebkitUserSelect: "none",
          touchAction: "none",
        }}
      >
        {techItems.map((item, index) => (
          <div
            key={item.name}
            className="tech-item"
            style={{
              position: "absolute",
              width: "40px",
              height: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
              borderRadius: "8px",
              fontSize: "10px",
              fontWeight: "bold",
              textAlign: "center",
              cursor: "pointer",
              transition: "all 0.2s ease",
              boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
              border: "1px solid rgba(255,255,255,0.2)",
              padding: "4px",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
            title={item.name}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform += " scale(1.1)"
              e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.3)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = e.currentTarget.style.transform.replace(" scale(1.1)", "")
              e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.2)"
            }}
          >
            <span
              style={{
                fontSize: item.name.length > 8 ? "8px" : "10px",
                lineHeight: "1.2",
                padding: "2px",
                maxWidth: "100%",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {item.name}
            </span>
          </div>
        ))}
      </div>

      {/* Instructions */}
      <div className="text-center mt-4 text-sm text-gray-600 dark:text-gray-400">
        <p className="hidden sm:block">Click and drag to rotate</p>
        <p className="sm:hidden">Swipe to rotate</p>
      </div>

      <style jsx>{`
        .logo-sphere-wrapper {
          perspective: 1000px;
          perspective-origin: center center;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 20px 0;
        }
        
        .logo-sphere-container {
          transform-style: preserve-3d;
          will-change: transform;
        }
        
        @media (max-width: 768px) {
          .logo-sphere-container {
            width: 300px !important;
            height: 300px !important;
          }
          
          .tech-item {
            width: 35px !important;
            height: 35px !important;
            font-size: 8px !important;
          }
        }
      `}</style>
    </div>
  )
}
