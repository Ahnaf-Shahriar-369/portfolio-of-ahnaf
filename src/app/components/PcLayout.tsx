"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import ProjectCard from "./ProjectCard"

// Sample project data - replace with your actual projects
const projectsData = [
  {
    id: 1,
    title: "CoinEcho - Coming Soon",
    description:
      "Stay informed with real-time cryptocurrency updates, expert opinions, and in-depth analysis. CoinEcho brings the world of crypto to your fingertips. Still making improvements and adding new features.",
    technologies: [
      { id: 1, name: "React" },
      { id: 2, name: "Next.js" },
      { id: 3, name: "TypeScript" },
      { id: 4, name: "Tailwind" },
      { id: 5, name: "Node.js" },
    ],
    githubUrl: "https://github.com/example/coinecho",
    liveUrl: "https://coinecho.example.com",
    imageUrl: "/coin-echo.webp",
  },
  {
    id: 2,
    title: "SnapLoom - Coming Soon",
    description:
      "Transform your images with AI-powered tools for background removal, recoloring, aspect ratio resizing, and image generation. Still making improvements and adding new features.",
    technologies: [
      { id: 1, name: "Python" },
      { id: 2, name: "FastAPI" },
      { id: 3, name: "React" },
      { id: 4, name: "TensorFlow" },
      { id: 5, name: "OpenCV" },
    ],
    githubUrl: "https://github.com/example/snaploom",
    liveUrl: "https://snaploom.example.com",
    imageUrl: "/snaploom.webp",
  },
  {
    id: 3,
    title: "Free Games Hub - Coming Soon",
    description:
      "Unleash your inner gamer at FreeGamesHub! Dive into a treasure trove of free PC games and browser-based delights. Still making improvements and adding new features.",
    technologies: [
      { id: 1, name: "Vue.js" },
      { id: 2, name: "Nuxt.js" },
      { id: 3, name: "MongoDB" },
      { id: 4, name: "Express" },
      { id: 5, name: "Socket.io" },
    ],
    githubUrl: "https://github.com/example/freegameshub",
    liveUrl: "https://freegameshub.example.com",
    imageUrl: "/games-hub.webp",
  },
  {
    id: 4,
    title: "TaskFlow - Coming Soon",
    description:
      "Streamline your workflow with our intelligent task management system. Boost productivity with AI-powered scheduling and team collaboration. Still making improvements and adding new features.",
    technologies: [
      { id: 1, name: "React" },
      { id: 2, name: "GraphQL" },
      { id: 3, name: "PostgreSQL" },
      { id: 4, name: "Redis" },
      { id: 5, name: "Docker" },
    ],
    githubUrl: "https://github.com/example/taskflow",
    liveUrl: "https://taskflow.example.com",
    imageUrl: "/taskflow.webp",
  },
  {
    id: 5,
    title: "EcoTracker - Coming Soon",
    description:
      "Monitor your environmental impact with our comprehensive carbon footprint tracking application. Make sustainable choices with data-driven insights. Still making improvements and adding new features.",
    technologies: [
      { id: 1, name: "Angular" },
      { id: 2, name: "NestJS" },
      { id: 3, name: "MySQL" },
      { id: 4, name: "Chart.js" },
      { id: 5, name: "AWS" },
    ],
    githubUrl: "https://github.com/example/ecotracker",
    liveUrl: "https://ecotracker.example.com",
    imageUrl: "/ecotracker.webp",
  },
  {
    id: 6,
    title: "CodeMentor - Coming Soon",
    description:
      "Learn programming through interactive tutorials and AI-powered code reviews. Perfect for beginners and advanced developers alike. Still making improvements and adding new features.",
    technologies: [
      { id: 1, name: "Svelte" },
      { id: 2, name: "SvelteKit" },
      { id: 3, name: "Supabase" },
      { id: 4, name: "Prisma" },
      { id: 5, name: "Vercel" },
    ],
    githubUrl: "https://github.com/example/codementor",
    liveUrl: "https://codementor.example.com",
    imageUrl: "/codementor.webp",
  },
  {
    id: 7,
    title: "HealthSync - Coming Soon",
    description:
      "Synchronize your health data across multiple devices and platforms. Get personalized insights and recommendations for better wellness. Still making improvements and adding new features.",
    technologies: [
      { id: 1, name: "React Native" },
      { id: 2, name: "Expo" },
      { id: 3, name: "Firebase" },
      { id: 4, name: "TensorFlow" },
      { id: 5, name: "HealthKit" },
    ],
    githubUrl: "https://github.com/example/healthsync",
    liveUrl: "https://healthsync.example.com",
    imageUrl: "/healthsync.webp",
  },
  {
    id: 8,
    title: "ArtisanMarket - Coming Soon",
    description:
      "Connect local artisans with customers through our beautiful marketplace platform. Discover unique handcrafted items and support local creators. Still making improvements and adding new features.",
    technologies: [
      { id: 1, name: "Next.js" },
      { id: 2, name: "Stripe" },
      { id: 3, name: "Sanity" },
      { id: 4, name: "Tailwind" },
      { id: 5, name: "Framer Motion" },
    ],
    githubUrl: "https://github.com/example/artisanmarket",
    liveUrl: "https://artisanmarket.example.com",
    imageUrl: "/artisan-market.webp",
  },
  {
    id: 9,
    title: "WeatherWise - Coming Soon",
    description:
      "Get accurate weather forecasts with beautiful visualizations and smart notifications. Plan your day with confidence using our advanced weather analytics. Still making improvements and adding new features.",
    technologies: [
      { id: 1, name: "Flutter" },
      { id: 2, name: "Dart" },
      { id: 3, name: "OpenWeather API" },
      { id: 4, name: "SQLite" },
      { id: 5, name: "Provider" },
    ],
    githubUrl: "https://github.com/example/weatherwise",
    liveUrl: "https://weatherwise.example.com",
    imageUrl: "/weatherwise.webp",
  },
]

export default function ProjectLayout() {
  const [showMore, setShowMore] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [isLoadingLess, setIsLoadingLess] = useState(false)
  const [visibleProjects, setVisibleProjects] = useState<typeof projectsData>([])

  // Initial loading effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisibleProjects(projectsData.slice(0, 3))
      setIsLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [])

  // Handle show more functionality
  const handleShowMore = async () => {
    setIsLoadingMore(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setVisibleProjects(projectsData)
    setShowMore(true)
    setIsLoadingMore(false)
  }

  // Handle show less functionality
  const handleShowLess = async () => {
    setIsLoadingLess(true)
    await new Promise((resolve) => setTimeout(resolve, 800))
    setVisibleProjects(projectsData.slice(0, 3))
    setShowMore(false)
    setIsLoadingLess(false)
  }

  // Simplified animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  }

  const titleVariants = {
    hidden: { opacity: 0, y: -15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  }

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3, delay: 0.2 },
    },
    hover: { scale: 1.02, transition: { duration: 0.2 } },
    tap: { scale: 0.98, transition: { duration: 0.1 } },
  }

  // Optimized loading skeleton
  const LoadingSkeleton = () => (
    <div className="w-full max-w-xs mx-auto">
      <div className="relative overflow-hidden  bg-[#1a1a2e]/80 backdrop-blur-xl shadow-xl rounded-lg border border-[#e91e63]/20">
        <div className="relative p-3 space-y-2">
          <div className="relative h-44 rounded-lg bg-gradient-to-br from-[#16213e]/60 via-[#e91e63]/5 to-[#16213e]/60 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#e91e63]/8 to-transparent opacity-50" />
          </div>
          <div className="flex items-center justify-center">
            <div className="flex -space-x-3">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-[#16213e]/60 via-[#e91e63]/8 to-[#16213e]/60 border border-[#e91e63]/15"
                />
              ))}
            </div>
          </div>
          <div className="space-y-1">
            <div className="h-6 bg-gradient-to-r from-[#16213e]/60 via-[#e91e63]/8 to-[#16213e]/60 rounded" />
            <div className="h-4 bg-gradient-to-r from-[#16213e]/40 via-[#e91e63]/5 to-[#16213e]/40 rounded" />
            <div className="h-4 w-3/4 bg-gradient-to-r from-[#16213e]/40 via-[#e91e63]/5 to-[#16213e]/40 rounded" />
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-[#0f0f23] overflow-hidden w-full h-full">
      {/* ========================================
          OPTIMIZED STATIC BACKGROUND SYSTEM
      ======================================== */}

      {/* Base background layers */}
      <div className="absolute inset-0 bg-[#0f0f23]" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e]/30 via-transparent to-[#16213e]/20" />
      <div className="absolute inset-0 bg-gradient-to-tr from-[#e91e63]/5 via-transparent to-[#9c27b0]/5" />

      {/* Static decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Static orbs */}
        <div className="absolute top-1/4 left-1/6 w-32 h-32 bg-[#e91e63]/6 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/6 w-40 h-40 bg-[#9c27b0]/4 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#673ab7]/3 rounded-full blur-3xl" />

        {/* Static geometric shapes */}
        <div className="absolute top-1/5 left-1/8 w-4 h-4 border border-[#e91e63]/15 rotate-45" />
        <div className="absolute bottom-1/4 right-1/8 w-3 h-3 border border-[#9c27b0]/20 rounded-full" />
        <div className="absolute top-1/2 right-1/5 w-2 h-2 bg-[#673ab7]/10 rotate-45" />
        <div className="absolute top-1/3 left-1/3 w-1 h-1 bg-[#e91e63]/20 rounded-full" />
        <div className="absolute bottom-1/3 right-1/3 w-1.5 h-1.5 bg-[#9c27b0]/15 rounded-full" />

        {/* Static particles constellation */}
        <div className="absolute top-1/6 left-1/4 w-1 h-1 bg-[#e91e63]/25 rounded-full" />
        <div className="absolute top-2/3 right-1/4 w-0.5 h-0.5 bg-[#9c27b0]/30 rounded-full" />
        <div className="absolute bottom-1/6 left-1/3 w-1 h-1 bg-[#673ab7]/20 rounded-full" />
        <div className="absolute top-1/4 right-1/2 w-0.5 h-0.5 bg-[#e91e63]/25 rounded-full" />
        <div className="absolute bottom-1/2 left-1/5 w-1 h-1 bg-[#9c27b0]/20 rounded-full" />
      </div>

      {/* Static grid pattern */}
      <div className="absolute inset-0 opacity-[0.008] pointer-events-none">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(233, 30, 99, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(233, 30, 99, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* Static corner glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-48 h-48 bg-gradient-to-br from-[#e91e63]/8 to-transparent rounded-br-full" />
        <div className="absolute bottom-0 right-0 w-56 h-56 bg-gradient-to-tl from-[#9c27b0]/6 to-transparent rounded-tl-full" />
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-[#673ab7]/5 to-transparent rounded-bl-full" />
        <div className="absolute bottom-0 left-0 w-44 h-44 bg-gradient-to-tr from-[#e91e63]/7 to-transparent rounded-tr-full" />
      </div>

      {/* Main content container */}
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Title Section */}
        <motion.div variants={titleVariants} initial="hidden" animate="visible" className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-[#e91e63] via-[#9c27b0] to-[#673ab7] bg-clip-text text-transparent">
              My Projects
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
            A showcase of my recent work and creative solutions. Each project represents a unique challenge and learning
            experience.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-[#e91e63] to-[#9c27b0] mx-auto rounded-full" />

          {/* Static decorative elements around title */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 pointer-events-none">
            <div className="absolute top-4 left-1/4 w-1.5 h-1.5 bg-[#e91e63]/20 rounded-full" />
            <div className="absolute top-8 right-1/3 w-1 h-1 bg-[#9c27b0]/25 rounded-full" />
            <div className="absolute top-12 left-1/3 w-1.2 h-1.2 bg-[#673ab7]/15 rounded-full" />
          </div>
        </motion.div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
            >
              {[...Array(3)].map((_, index) => (
                <motion.div key={index} variants={cardVariants}>
                  <LoadingSkeleton />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="projects"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
            >
              {visibleProjects.map((project, ) => {
                  return (
                      <motion.div
                          key={project.id}
                          variants={cardVariants}
                          whileHover={{ y: -6, transition: { duration: 0.2 } }}
                          className="flex justify-center"
                      >
                          <ProjectCard />
                      </motion.div>
                  )
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Show More/Less Button */}
        <motion.div variants={buttonVariants} initial="hidden" animate="visible" className="flex justify-center">
          <AnimatePresence mode="wait">
            {!showMore ? (
              <motion.button
                key="show-more"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={handleShowMore}
                disabled={isLoadingMore}
                className="relative group px-8 py-4 bg-[#1a1a2e]/80 border border-[#e91e63]/30 rounded-lg backdrop-blur-sm shadow-lg shadow-[#e91e63]/8 transition-all duration-300 hover:border-[#e91e63]/50 hover:shadow-[#e91e63]/15 disabled:opacity-50 disabled:cursor-not-allowed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#e91e63]/0 via-[#9c27b0]/0 to-[#e91e63]/0 group-hover:from-[#e91e63]/5 group-hover:via-[#9c27b0]/3 group-hover:to-[#e91e63]/5 transition-all duration-300" />

                <div className="relative flex items-center space-x-3">
                  <AnimatePresence mode="wait">
                    {isLoadingMore ? (
                      <motion.div
                        key="loading"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="flex items-center space-x-3"
                      >
                        <div className="w-5 h-5 border-2 border-[#e91e63] border-t-transparent rounded-full animate-spin" />
                        <span className="text-white font-medium">Loading More Projects...</span>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="show-more"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="flex items-center space-x-3"
                      >
                        <span className="text-white font-medium">Show More Projects</span>
                        <span className="text-[#e91e63] text-lg">→</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-[#e91e63]/0 via-[#9c27b0]/0 to-[#e91e63]/0 group-hover:from-[#e91e63]/10 group-hover:via-[#9c27b0]/5 group-hover:to-[#e91e63]/10 blur transition-all duration-300 opacity-0 group-hover:opacity-100" />
              </motion.button>
            ) : (
              <motion.button
                key="show-less"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={handleShowLess}
                disabled={isLoadingLess}
                className="relative group px-8 py-4 bg-[#1a1a2e]/80 border border-[#e91e63]/30 rounded-lg backdrop-blur-sm shadow-lg shadow-[#e91e63]/8 transition-all duration-300 hover:border-[#e91e63]/50 hover:shadow-[#e91e63]/15 disabled:opacity-50 disabled:cursor-not-allowed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#e91e63]/0 via-[#9c27b0]/0 to-[#e91e63]/0 group-hover:from-[#e91e63]/5 group-hover:via-[#9c27b0]/3 group-hover:to-[#e91e63]/5 transition-all duration-300" />

                <div className="relative flex items-center space-x-3">
                  <AnimatePresence mode="wait">
                    {isLoadingLess ? (
                      <motion.div
                        key="loading"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="flex items-center space-x-3"
                      >
                        <div className="w-5 h-5 border-2 border-[#e91e63] border-t-transparent rounded-full animate-spin" />
                        <span className="text-white font-medium">Collapsing Projects...</span>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="show-less"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="flex items-center space-x-3"
                      >
                        <span className="text-[#e91e63] text-lg">←</span>
                        <span className="text-white font-medium">Show Less Projects</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-[#e91e63]/0 via-[#9c27b0]/0 to-[#e91e63]/0 group-hover:from-[#e91e63]/10 group-hover:via-[#9c27b0]/5 group-hover:to-[#e91e63]/10 blur transition-all duration-300 opacity-0 group-hover:opacity-100" />
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}