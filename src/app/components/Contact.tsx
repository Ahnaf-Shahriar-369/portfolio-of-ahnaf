"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import NeonTicTacToe from "./Tic"

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    console.log("Form submitted:", formData)
    setIsSubmitting(false)

    // Reset form after submission
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white w-full relative overflow-hidden">
      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(1deg); }
          66% { transform: translateY(5px) rotate(-1deg); }
        }
        
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.05); }
        }
        
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        
        @keyframes neon-pulse {
          0%, 100% { 
            text-shadow: 0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor;
            opacity: 1;
          }
          50% { 
            text-shadow: 0 0 2px currentColor, 0 0 5px currentColor, 0 0 8px currentColor;
            opacity: 0.8;
          }
        }
        
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .float-animation { animation: float 6s ease-in-out infinite; }
        .float-animation-delay { animation: float 6s ease-in-out infinite 2s; }
        .float-animation-delay-2 { animation: float 6s ease-in-out infinite 4s; }
        .pulse-glow { animation: pulse-glow 4s ease-in-out infinite; }
        .pulse-glow-delay { animation: pulse-glow 4s ease-in-out infinite 2s; }
        .pulse-glow-delay-2 { animation: pulse-glow 4s ease-in-out infinite 4s; }
        .neon-text { animation: neon-pulse 2s ease-in-out infinite; }
        .shimmer-bg {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          background-size: 200% 100%;
          animation: shimmer 3s ease-in-out infinite;
        }
        .gradient-animate {
          background-size: 200% 200%;
          animation: gradient-shift 4s ease infinite;
        }
        
        .glass-morphism {
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .glass-hover:hover {
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          background: rgba(255, 255, 255, 0.15);
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 20px 40px rgba(147, 51, 234, 0.3);
        }
        
        .input-glow:focus {
          box-shadow: 0 0 0 2px rgba(236, 72, 153, 0.3), 0 0 20px rgba(236, 72, 153, 0.2);
        }
        
        .button-glow:hover {
          box-shadow: 0 0 30px rgba(147, 51, 234, 0.5), 0 0 60px rgba(236, 72, 153, 0.3);
        }

        /* Responsive adjustments */
        @media (max-width: 640px) {
          .glass-hover:hover {
            transform: none;
            box-shadow: 0 10px 20px rgba(147, 51, 234, 0.2);
          }
        }
      `}</style>

      {/* Animated background elements - Responsive sizing */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 sm:-top-40 -right-20 sm:-right-40 w-40 h-40 sm:w-60 md:w-80 sm:h-60 md:h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl pulse-glow"></div>
        <div className="absolute -bottom-20 sm:-bottom-40 -left-20 sm:-left-40 w-40 h-40 sm:w-60 md:w-80 sm:h-60 md:h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl pulse-glow-delay"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 sm:w-60 md:w-80 sm:h-60 md:h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl pulse-glow-delay-2"></div>

        {/* Floating particles - Responsive positioning */}
        <div className="absolute top-10 sm:top-20 left-10 sm:left-20 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-pink-400 rounded-full float-animation opacity-60"></div>
        <div className="absolute top-20 sm:top-40 right-16 sm:right-32 w-1 h-1 bg-purple-400 rounded-full float-animation-delay opacity-40"></div>
        <div className="absolute bottom-16 sm:bottom-32 left-20 sm:left-40 w-2 h-2 sm:w-3 sm:h-3 bg-blue-400 rounded-full float-animation-delay-2 opacity-50"></div>
        <div className="absolute top-30 sm:top-60 right-10 sm:right-20 w-1 h-1 sm:w-1.5 sm:h-1.5 bg-indigo-400 rounded-full float-animation opacity-70"></div>
        <div className="absolute bottom-10 sm:bottom-20 right-30 sm:right-60 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-pink-300 rounded-full float-animation-delay opacity-30"></div>
      </div>

      {/* Main layout - Enhanced responsive grid */}
      <div className="flex flex-col lg:grid lg:grid-cols-2 min-h-screen relative z-10">
        {/* Left Section - Tic Tac Toe Game */}
        <div className="order-2 lg:order-1 p-3 sm:p-4 md:p-6 lg:p-8 flex items-center justify-center min-h-[50vh] lg:min-h-screen">
          <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
            <NeonTicTacToe />
          </div>
        </div>

        {/* Right Section - Contact Form */}
        <div className="order-1 lg:order-2 p-3 sm:p-4 md:p-6 lg:p-8 xl:p-12 flex flex-col justify-center min-h-[50vh] lg:min-h-screen">
          <div className="max-w-xs sm:max-w-sm md:max-w-md mx-auto w-full">
            {/* Glassmorphic container - Responsive padding and sizing */}
            <div className="glass-morphism glass-hover rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-xl sm:shadow-2xl transition-all duration-500 relative">
              {/* Header with neon glow effect - Responsive typography */}
              <div className="text-center mb-6 sm:mb-8 space-y-3 sm:space-y-4">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent neon-text gradient-animate leading-tight">
                  Let's Have a Chat
                </h1>
                <div className="h-0.5 sm:h-1 w-16 sm:w-20 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto rounded-full shadow-lg shadow-purple-500/50 shimmer-bg"></div>
                <p className="text-purple-200 text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed px-2 sm:px-0">
                  Leave your email and I will get back to you within 24 hours
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                {/* Name Field - Responsive spacing and sizing */}
                <div className="group">
                  <Label
                    htmlFor="name"
                    className="text-purple-200 text-xs sm:text-sm font-medium mb-2 sm:mb-3 block transition-all duration-300 group-focus-within:text-pink-300 group-focus-within:drop-shadow-sm"
                  >
                    Name
                  </Label>
                  <div className="relative overflow-hidden rounded-lg sm:rounded-xl">
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Write your name"
                      className="w-full glass-morphism rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-white placeholder:text-purple-300/60 border-purple-300/30 focus:border-pink-400/60 focus:ring-2 focus:ring-pink-400/30 transition-all duration-300 hover:bg-white/8 hover:border-purple-300/50 input-glow"
                      required
                    />
                    <div className="absolute inset-0 rounded-lg sm:rounded-xl bg-gradient-to-r from-pink-500/20 to-purple-500/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    <div className="absolute inset-0 shimmer-bg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-lg sm:rounded-xl"></div>
                  </div>
                </div>

                {/* Email Field */}
                <div className="group">
                  <Label
                    htmlFor="email"
                    className="text-purple-200 text-xs sm:text-sm font-medium mb-2 sm:mb-3 block transition-all duration-300 group-focus-within:text-pink-300 group-focus-within:drop-shadow-sm"
                  >
                    Email
                  </Label>
                  <div className="relative overflow-hidden rounded-lg sm:rounded-xl">
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Write your email"
                      className="w-full glass-morphism rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-white placeholder:text-purple-300/60 border-purple-300/30 focus:border-pink-400/60 focus:ring-2 focus:ring-pink-400/30 transition-all duration-300 hover:bg-white/8 hover:border-purple-300/50 input-glow"
                      required
                    />
                    <div className="absolute inset-0 rounded-lg sm:rounded-xl bg-gradient-to-r from-pink-500/20 to-purple-500/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    <div className="absolute inset-0 shimmer-bg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-lg sm:rounded-xl"></div>
                  </div>
                </div>

                {/* Subject Field */}
                <div className="group">
                  <Label
                    htmlFor="subject"
                    className="text-purple-200 text-xs sm:text-sm font-medium mb-2 sm:mb-3 block transition-all duration-300 group-focus-within:text-pink-300 group-focus-within:drop-shadow-sm"
                  >
                    Subject
                  </Label>
                  <div className="relative overflow-hidden rounded-lg sm:rounded-xl">
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="Want to build a website?"
                      className="w-full glass-morphism rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-white placeholder:text-purple-300/60 border-purple-300/30 focus:border-pink-400/60 focus:ring-2 focus:ring-pink-400/30 transition-all duration-300 hover:bg-white/8 hover:border-purple-300/50 input-glow"
                      required
                    />
                    <div className="absolute inset-0 rounded-lg sm:rounded-xl bg-gradient-to-r from-pink-500/20 to-purple-500/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    <div className="absolute inset-0 shimmer-bg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-lg sm:rounded-xl"></div>
                  </div>
                </div>

                {/* Message Field */}
                <div className="group">
                  <Label
                    htmlFor="message"
                    className="text-purple-200 text-xs sm:text-sm font-medium mb-2 sm:mb-3 block transition-all duration-300 group-focus-within:text-pink-300 group-focus-within:drop-shadow-sm"
                  >
                    Message
                  </Label>
                  <div className="relative overflow-hidden rounded-lg sm:rounded-xl">
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Looking for a proficient software developer skilled in React and Next.js ?"
                      rows={3}
                      className="w-full glass-morphism rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-white placeholder:text-purple-300/60 border-purple-300/30 focus:border-pink-400/60 focus:ring-2 focus:ring-pink-400/30 transition-all duration-300 hover:bg-white/8 hover:border-purple-300/50 resize-none input-glow"
                      required
                    />
                    <div className="absolute inset-0 rounded-lg sm:rounded-xl bg-gradient-to-r from-pink-500/20 to-purple-500/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    <div className="absolute inset-0 shimmer-bg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-lg sm:rounded-xl"></div>
                  </div>
                </div>

                {/* Submit Button - Responsive sizing */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white border-0 rounded-lg sm:rounded-xl py-3 sm:py-4 text-sm sm:text-base font-semibold transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden group button-glow gradient-animate"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {isSubmitting ? (
                      <>
                        <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span className="shimmer-bg bg-clip-text">Sending...</span>
                      </>
                    ) : (
                      <>
                        <span className="bg-gradient-to-r from-white to-purple-100 bg-clip-text text-transparent">
                          Submit
                        </span>
                        <span className="transform transition-transform group-hover:translate-x-1 text-white">→</span>
                      </>
                    )}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 shimmer-bg opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
                </Button>
              </form>

              {/* Decorative elements - Responsive sizing */}
              <div className="absolute -top-1 sm:-top-2 -right-1 sm:-right-2 w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full opacity-60 float-animation"></div>
              <div className="absolute -bottom-1 sm:-bottom-2 -left-1 sm:-left-2 w-2 h-2 sm:w-3 sm:h-3 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full opacity-40 float-animation-delay"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
