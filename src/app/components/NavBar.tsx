"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, X } from "lucide-react"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeLink, setActiveLink] = useState("home")
  const [isVisible, setIsVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const navbarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)

    const loadingTimer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    const visibilityTimer = setTimeout(() => {
      setIsVisible(true)
    }, 2100)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      clearTimeout(loadingTimer)
      clearTimeout(visibilityTimer)
    }
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleLinkClick = (link: string) => {
    setActiveLink(link)
    setIsMenuOpen(false)

    const element = document.getElementById(link)
    if (element) {
      element.classList.add("section-active")
      setTimeout(() => {
        element.classList.remove("section-active")
      }, 1000)

      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  if (isLoading) {
    return (
      <div className="fixed top-[39px] left-0 right-0 z-40 flex justify-center items-center">
        <div className="w-[200px] h-[60px] backdrop-blur-xl bg-white/20 rounded-full shadow-lg flex justify-center items-center">
          <p className="text-white text-lg font-medium loading-dots">Loading</p>
        </div>
      </div>
    )
  }

  return (
    <nav
      ref={navbarRef}
      className={`animate-float fixed top-[9px] left-0 right-0 z-40 transition-all duration-700 ${scrolled ? "py-2" : "py-4"} ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
      }`}
    >
      <div className="container mx-auto px-4">
        <div
          className={`relative w-[600px] max-w-full mx-auto backdrop-blur-2xl 
          bg-white/20
          text-white
          rounded-full shadow-lg 
          transition-all duration-500 ease-in-out
          border border-white/30
          hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]
          before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-b before:from-white/30 before:to-transparent before:pointer-events-none before:z-[-1]
          after:absolute after:inset-0 after:rounded-full after:shadow-[inset_0_0_10px_rgba(255,255,255,0.2)] after:pointer-events-none after:z-[-1]
          ${scrolled ? "scale-95" : "scale-100"}
          ${isMenuOpen ? "!rounded-3xl" : "rounded-full"}
          `}
        >
          <div className="flex items-center justify-between px-6 py-2">
            <div className="flex items-center space-x-3 flex-shrink-0 mr-6">
              <div className="relative w-10 h-10 overflow-hidden rounded-full transition-transform duration-500 hover:scale-110 group">
                <Image
                  src="/coder.png"
                  alt="Coder Logo"
                  width={40}
                  height={40}
                  className="object-cover transition-all duration-700 group-hover:rotate-[360deg] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-full"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/30 to-purple-500/0 opacity-0 group-hover:opacity-100 animate-shine"></div>
              </div>
              <h1 className="text-lg md:text-xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 bg-clip-text text-transparent animate-gradient truncate">
                Ahnaf Shahriar
              </h1>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              {["home", "about", "skills", "projects"].map((link) => (
                <Link
                  key={link}
                  href={`#${link}`}
                  onClick={() => handleLinkClick(link)}
                  className={`relative text-base font-medium transition-all duration-500 hover:text-purple-500 group overflow-hidden`}
                >
                  <span
                    className={`capitalize transition-transform duration-500 inline-block ${
                      activeLink === link ? "text-purple-500" : ""
                    } group-hover:translate-y-[-100%]`}
                  >
                    {link}
                  </span>
                  <span className="absolute left-0 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 capitalize text-purple-500">
                    {link}
                  </span>
                  <span
                    className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500 group-hover:w-full ${
                      activeLink === link ? "w-full" : "w-0"
                    }`}
                  ></span>
                </Link>
              ))}
            </div>

            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className={`p-2 rounded-full transition-all duration-300 hover:bg-white/20 active:scale-95`}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <X size={24} className="animate-spin-once" />
                ) : (
                  <Menu size={24} className="animate-pulse-slow" />
                )}
              </button>
            </div>
          </div>

          <div
            className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
              isMenuOpen ? "max-h-[200px] opacity-100 mb-2" : "max-h-0 opacity-0"
            }`}
          >
            <div className={`flex flex-col space-y-2 py-2 px-4 mx-2 mb-2 rounded-xl backdrop-blur-md bg-white/20`}>
              {["home", "about", "skills", "projects"].map((link) => (
                <Link
                  key={link}
                  href={`#${link}`}
                  onClick={() => handleLinkClick(link)}
                  className={`px-3 py-2 rounded-md transition-all duration-300 ${
                    activeLink === link
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white scale-105 shadow-md"
                      : "hover:bg-white/20 hover:scale-105"
                  }`}
                >
                  <span className="capitalize">{link}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}