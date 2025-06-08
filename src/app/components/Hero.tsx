"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowRight, Download } from "lucide-react"
import styles from "./Hero.module.css"
import LogoSphere from "./LogoSphere"
export default function Hero() {
  const [isGithubHovered, setIsGithubHovered] = useState(false)
  const [isResumeHovered, setIsResumeHovered] = useState(false)
  const [isGithubClicked, setIsGithubClicked] = useState(false)
  const [isResumeClicked, setIsResumeClicked] = useState(false)
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [isTextChanging, setIsTextChanging] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const rotatingTexts = [
    "Full-stack Developer",
    "Front-end Developer",
    "Backend-Developer",
    "Tech-Enthusiast",
    "Open Source Contributor",
    "Web Developer",
    "Software Engineer",
  ]
  // Loading animation effect
  useEffect(() => {
    const loadingInterval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(loadingInterval)
          setTimeout(() => setIsLoaded(true), 500)
          return 100
        }
        return prev + 2
      })
    }, 50)
    return () => clearInterval(loadingInterval)
  }, [])
  // Rotating text effect
  useEffect(() => {
    if (!isLoaded) return
    const interval = setInterval(() => {
      setIsTextChanging(true)
      setTimeout(() => {
        setCurrentTextIndex((prevIndex) => (prevIndex + 1) % rotatingTexts.length)
        setIsTextChanging(false)
      }, 500)
    }, 3000)
    return () => clearInterval(interval)
  }, [rotatingTexts.length, isLoaded])
  if (!isLoaded) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingContent}>
          <div className={styles.loadingSpinner}>
            <div className={styles.spinnerRing}></div>
            <div className={styles.spinnerRing}></div>
            <div className={styles.spinnerRing}></div>
          </div>
          <div className={styles.loadingText}>
            <span className={styles.loadingLabel}>Loading Experience</span>
            <div className={styles.progressBar}>
              <div className={styles.progressFill} style={{ width: `${loadingProgress}%` }}></div>
            </div>
            <span className={styles.progressText}>{loadingProgress}%</span>
          </div>
          <div className={styles.loadingParticles}>
            {[...Array(12)].map((_, i) => (
              <div key={i} className={`${styles.loadingParticle} ${styles[`particle${i + 1}`]}`}></div>
            ))}
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className={styles.heroContainer}>
      {/* Enhanced Background Effects */}
      <div className={styles.backgroundShine}></div>
      <div className={styles.backgroundWaves}>
        <div className={styles.wave1}></div>
        <div className={styles.wave2}></div>
        <div className={styles.wave3}></div>
      </div>
      <div className={styles.floatingParticles}>
        <div className={styles.particle1}></div>
        <div className={styles.particle2}></div>
        <div className={styles.particle3}></div>
        <div className={styles.particle4}></div>
        <div className={styles.particle5}></div>
        <div className={styles.particle6}></div>
        <div className={styles.particle7}></div>
        <div className={styles.particle8}></div>
        <div className={styles.particle9}></div>
        <div className={styles.particle10}></div>
      </div>
      {/* Geometric Shapes */}
      <div className={styles.geometricShapes}>
        <div className={styles.shape1}></div>
        <div className={styles.shape2}></div>
        <div className={styles.shape3}></div>
        <div className={styles.shape4}></div>
      </div>
      {/* Main Content */}
      <main className={styles.heroMain}>
        {/* Left Side - Text Content with Glassmorphism */}
        <div className={`${styles.contentContainer} ${styles.slideInLeft}`}>
          <div className={styles.glassCard}>
            <div className={styles.cardGlow}></div>
            <h1 className={`${styles.nameGradient} ${styles.fadeInUp}`}>
              Hello there!
              <br />
              I&apos;m Ahnaf
              <br />
              Shahriar
            </h1>
            <div className={`${styles.perspective} ${styles.fadeInUp} ${styles.delay200}`}>
              <div className={styles.rotatingTextContainer}>
                <span className={`${styles.rotatingText} ${isTextChanging ? styles.shatterOut : styles.active}`}>
                  {rotatingTexts[currentTextIndex]}
                </span>
                <div className={styles.textGlow}></div>
              </div>
            </div>
            <p className={`${styles.subtitleText} ${styles.fadeInUp} ${styles.delay400}`}>
              Full Stack Developer • Next.JS | React | Tailwind CSS | Typescript | NodeJS | MongoDB | ExpressJS | Prisma
            </p>
            <div className={`${styles.buttonContainer} ${styles.fadeInUp} ${styles.delay600}`}>
              <Link
                href="https://github.com/Ahnaf-Shahriar-369"
                className={`${styles.buttonEffect} ${styles.githubButton} ${isGithubClicked ? styles.buttonClicked : ""}`}
                onMouseEnter={() => setIsGithubHovered(true)}
                onMouseLeave={() => setIsGithubHovered(false)}
                onMouseDown={() => setIsGithubClicked(true)}
                onMouseUp={() => setIsGithubClicked(false)}
                onTouchStart={() => setIsGithubClicked(true)}
                onTouchEnd={() => setIsGithubClicked(false)}
              >
                <div className={styles.buttonGlow}></div>
                GitHub{" "}
                <ArrowRight size={18} className={`${styles.arrowIcon} ${isGithubHovered ? styles.arrowMoved : ""}`} />
              </Link>
              <Link
                href="https://drive.proton.me/urls/HBH57DYT3W#pt5IXOFVa9a3"
                className={`${styles.buttonEffect} ${styles.resumeButton} ${isResumeClicked ? styles.buttonClicked : ""}`}
                onMouseEnter={() => setIsResumeHovered(true)}
                onMouseLeave={() => setIsResumeHovered(false)}
                onMouseDown={() => setIsResumeClicked(true)}
                onMouseUp={() => setIsResumeClicked(false)}
                onTouchStart={() => setIsResumeClicked(true)}
                onTouchEnd={() => setIsResumeClicked(false)}
              >
                <div className={styles.buttonGlow}></div>
                Get Resume{" "}
                <Download
                  size={18}
                  className={`${styles.downloadIcon} ${isResumeHovered ? styles.downloadMoved : ""}`}
                />
              </Link>
            </div>
          </div>
        </div>
        {/* Right Side - Enhanced Tech Sphere with Glassmorphism */}
        <div className={`${styles.techSphereContainer} ${styles.slideInRight}`}>
          <div className={styles.sphereGlassContainer}>
            <div className={styles.sphereInnerGlow}></div>
            <div className={styles.sphereOuterRing}></div>
            <div className={styles.sphereMiddleRing}></div>
            <LogoSphere />
            <div className={styles.sphereRipple}></div>
            <div className={styles.sphereRipple2}></div>
          </div>
          {/* Enhanced Shine Effects */}
          <div className={styles.techSphereShineBottom}></div>
          <div className={styles.techSphereShineHorizontal}></div>
          <div className={styles.techSphereShineVertical}></div>
          <div className={styles.techSphereShineDiagonal}></div>
        </div>
      </main>
      {/* Interactive Elements */}
      <div className={styles.interactiveElements}>
        <div className={styles.floatingIcon1}>⚡</div>
        <div className={styles.floatingIcon2}>🚀</div>
        <div className={styles.floatingIcon3}>💎</div>
        <div className={styles.floatingIcon4}>✨</div>
      </div>
    </div>
  )
}