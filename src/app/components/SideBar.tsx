"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Github, Linkedin, Mail, FileText } from "lucide-react"

interface SidebarIconProps {
  icon: React.ReactNode
  href: string
  delay: number
  badge?: number
  color?: string
}

const SidebarIcon: React.FC<SidebarIconProps> = ({ icon, href, delay, badge, color = "text-white" }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isClicked, setIsClicked] = useState(false)

  return (
    <Link
      href={href}
      className={`relative flex items-center justify-center w-10 h-12 mb-4 rounded-full 
        ${color} 
        transition-all duration-300 ease-in-out
        hover:scale-110 hover:brightness-125
        animate-float
        ${isClicked ? "scale-90 brightness-75" : ""}
      `}
      style={{
        animationDelay: `${delay}s`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={() => setIsClicked(true)}
      onMouseUp={() => setIsClicked(false)}
      onClick={() => {
        setIsClicked(true)
        setTimeout(() => setIsClicked(false), 300)
      }}
    >
      {icon}

      {badge !== undefined && (
        <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-orange-500 rounded-full">
          {badge}
        </span>
      )}

      {isHovered && (
        <span className="absolute left-14 px-2 py-1 text-sm font-bold text-white bg-gray-800 rounded-md whitespace-nowrap animate-fadeIn z-10">
          {href.replace("https://", "").replace("mailto:", "")}
        </span>
      )}
    </Link>
  )
}

export default function Sidebar() {
  const [mounted, setMounted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading delay to match with other components
    const loadingTimer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    // Set mounted after loading completes
    const mountTimer = setTimeout(() => {
      setMounted(true)
    }, 2100)

    return () => {
      clearTimeout(loadingTimer)
      clearTimeout(mountTimer)
    }
  }, [])

  if (!mounted || isLoading) return null

  return (
    <div
      className="fixed left-4 top-1/2 -translate-y-1/2 z-30 md:left-2 md:top-1/2 md:-translate-y-1/2"
    >
      <div
        className="flex flex-col items-center justify-center w-[69px] h-[269px] bg-[#0a0a2e] rounded-3xl p-6 shadow-lg transition-all duration-700 animate-fadeIn md:w-[50px] md:h-auto md:p-2 md:rounded-3xl"
        style={{
          boxShadow: "0 0 20px rgba(0, 0, 255, 0.2)",
        }}
      >
        <SidebarIcon icon={<Github size={28} />} href="https://github.com/Ahnaf-Shahriar-369" delay={0} />
        <SidebarIcon icon={<Linkedin size={28} />} href="https://linkedin.com" delay={0.5} color="text-[#0077b5]" />
        <SidebarIcon
          icon={<Mail size={28} />}
          href="mailto:ahnafshahriar.dev@protonmail.com" 
          delay={1}
          color="text-orange-500"
          
          // Example badge count
          
        />
        <SidebarIcon icon={<FileText size={28} />} href="https://drive.proton.me/urls/HBH57DYT3W#pt5IXOFVa9a3" delay={1.5} color="text-blue-300" />
      </div>
    </div>
  )
}