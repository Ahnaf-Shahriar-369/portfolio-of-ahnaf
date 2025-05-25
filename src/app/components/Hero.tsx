"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowRight, Download } from "lucide-react"
import styles from "./Hero.module.css"
// import LogoSphere from "./Tech-Sphere"
import LogoSphere from "./LogoSphere"

export default function Hero() {
  const [isGithubHovered, setIsGithubHovered] = useState(false)
  const [isResumeHovered, setIsResumeHovered] = useState(false)
  const [isGithubClicked, setIsGithubClicked] = useState(false)
  const [isResumeClicked, setIsResumeClicked] = useState(false)
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [isTextChanging, setIsTextChanging] = useState(false)

  const rotatingTexts = [
    
    "Full-stack Developer",
    "Front-end Developer",
    "Backend-Developer",
    "Tech-Enthusiast",
    "Open Source Contributor",
    "Web Developer",
    "Software Engineer",
    
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTextChanging(true)

      setTimeout(() => {
        setCurrentTextIndex((prevIndex) => (prevIndex + 1) % rotatingTexts.length)
        setIsTextChanging(false)
      }, 500)
    }, 3000)

    return () => clearInterval(interval)
  }, [rotatingTexts.length])

  return (
    <div className={styles.heroContainer}>
      {/* Background Shine Effect */}
      <div className={styles.backgroundShine}></div>

      {/* Main Content */}
      <main className={styles.heroMain}>
        {/* Left Side - Text Content */}
        <div className={styles.contentContainer}>
          <h1 className={styles.nameGradient}>
            Hello 
            <br />
            I&apos;m Ahnaf 
            <br />
            Shahriar
          </h1>

          <div className={styles.perspective}>
            <div className={styles.rotatingTextContainer}>
              <span className={`${styles.rotatingText} ${isTextChanging ? styles.shatterOut : styles.active}`}>
                {rotatingTexts[currentTextIndex]}
              </span>
            </div>
          </div>

          <p className={styles.subtitleText}>Full Stack Developer  Next.JS | React | Tailwind CSS | Typescript | NodeJS | MongoDB | ExpressJS | Prisma</p>

          <div className={styles.buttonContainer}>
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
              GitHub{" "}
              <ArrowRight size={18} className={`${styles.arrowIcon} ${isGithubHovered ? styles.arrowMoved : ""}`} />
            </Link>
            <Link
              href="/resume"
              className={`${styles.buttonEffect} ${styles.resumeButton} ${isResumeClicked ? styles.buttonClicked : ""}`}
              onMouseEnter={() => setIsResumeHovered(true)}
              onMouseLeave={() => setIsResumeHovered(false)}
              onMouseDown={() => setIsResumeClicked(true)}
              onMouseUp={() => setIsResumeClicked(false)}
              onTouchStart={() => setIsResumeClicked(true)}
              onTouchEnd={() => setIsResumeClicked(false)}
            >
              Get Resume{" "}
              <Download size={18} className={`${styles.downloadIcon} ${isResumeHovered ? styles.downloadMoved : ""}`} />
            </Link>
          </div>
        </div>

        {/* Right Side - Space for Tech Sphere */}
        <div className={styles.techSphereContainer}>
          {/* This space is reserved for the tech sphere component */}
          {/* <LogoSphere /> */}
          <LogoSphere />

          {/* Background Shine Effect */}

          {/* Optimized Tech Sphere Shine Effects - Reduced to just two key elements */}
          <div className={styles.techSphereShineBottom}></div>
          <div className={styles.techSphereShineHorizontal}></div>
        </div>
      </main>
    </div>
  )
}
