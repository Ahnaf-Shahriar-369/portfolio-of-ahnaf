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

const SidebarIcon: React.FC<SidebarIconProps> = ({
  icon,
  href,
  delay,
  badge,
  color = "text-gray-800 dark:text-white",
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isClicked, setIsClicked] = useState(false)

  return (
    <Link
      href={href}
      className={`sidebar-icon relative flex items-center justify-center w-10 h-12 mb-4 rounded-full 
        ${color} 
        transition-all duration-500 ease-out
        hover:scale-110 hover:rotate-3
        active:scale-95
        ${isClicked ? "scale-90" : ""}
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
      <div className="icon-wrapper">{icon}</div>

      {badge !== undefined && (
        <span className="badge absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-gradient-to-r from-violet-500 to-purple-600 dark:from-emerald-400 dark:to-teal-500 rounded-full shadow-lg animate-pulse">
          {badge}
        </span>
      )}

      {isHovered && (
        <div className="tooltip absolute left-16 px-3 py-2 text-sm font-medium text-slate-800 dark:text-slate-200 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md rounded-lg whitespace-nowrap shadow-xl border border-white/20 dark:border-slate-700/50 z-10">
          <div className="tooltip-arrow absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-white/90 dark:bg-slate-800/90 rotate-45 border-l border-b border-white/20 dark:border-slate-700/50"></div>
          {href.replace("https://", "").replace("mailto:", "")}
        </div>
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
    <div className="sidebar-container fixed left-4 top-1/2 -translate-y-1/2 z-30 md:left-2 md:top-1/2 md:-translate-y-1/2">
      <div className="sidebar-bg flex flex-col items-center justify-center w-[50px] h-[200px] rounded-3xl p-6 shadow-2xl transition-all duration-700 animate-slideInLeft border border-white/20 dark:border-slate-700/30 md:w-[50px] md:h-auto md:p-2 md:rounded-3xl">
        <div className="sidebar-glow absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500"></div>

        <SidebarIcon
          icon={<Github size={28} />}
          href="https://github.com/Ahnaf-Shahriar-369"
          delay={0}
          color="text-gray-800 dark:text-white"
        />
        <SidebarIcon
          icon={<Linkedin size={28} />}
          href="https://linkedin.com"
          delay={0.5}
          color="text-[#0077b5] dark:text-[#0ea5e9]"
        />
        <SidebarIcon
          icon={<Mail size={28} />}
          href="mailto:ahnafshahriar.dev@protonmail.com"
          delay={1}
          color="text-orange-600 dark:text-orange-400"
        />
        <SidebarIcon
          icon={<FileText size={28} />}
          href="https://drive.proton.me/urls/HBH57DYT3W#pt5IXOFVa9a3"
          delay={1.5}
          color="text-blue-600 dark:text-blue-300"
        />
      </div>
    </div>
  )
}
