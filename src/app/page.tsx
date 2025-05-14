"use client";

import { useEffect, useState } from "react";
import Navbar from "./components/NavBar";
import Sidebar from "./components/SideBar";
import DownBar from "./components/downBar";
import Cursor from "./components/cursor";
import "./globals.css";
import Hero from "./components/Hero";
import About from "./components/About";
import Image from "next/image";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  // Loading effect logic (3s)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // 3 seconds

    // Fix for the right side background issue
    document.body.style.overflow = "hidden";
    document.body.style.overflowY = "auto";
    document.body.style.width = "100%";
    document.body.style.maxWidth = "100vw";

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
      document.body.style.width = "";
      document.body.style.maxWidth = "";
    };
  }, []);

  return (
    <>
      <Cursor />
      <Navbar />
      <Sidebar />
      <DownBar />

      {/* 👇 Loading GIF shown for 3 seconds */}
      {isLoading ? (
        <div className="fixed top-0 left-0 w-full h-screen bg-black flex items-center justify-center z-50">
          {/* 👇 Put your GIF in the public folder (e.g. /public/loading.gif) */}
          <Image
            width={100}
            height={100}
            priority
            src="/p-orb.gif"
            alt="Loading..."
            className="  object-contain"
          />
        </div>
      ) : (
        <main className="min-h-screen bg-black text-white transition-opacity duration-1000">
          <section
            id="home"
            className="min-h-screen flex items-center justify-center transition-all duration-500 rounded-3xl p-0 m-0"
          >
            <Hero />
          </section>

          <section
            id="about"
            className="min-h-screen flex items-center justify-center transition-all duration-500 rounded-3xl"
          >
            <About />
          </section>

          <section
            id="skills"
            className="min-h-screen flex items-center justify-center transition-all duration-500 rounded-3xl"
          >
            <h1 className="text-4xl font-bold">Skills Section</h1>
          </section>

          <section
            id="projects"
            className="min-h-screen flex items-center justify-center mb-32 transition-all duration-500 rounded-3xl"
          >
            <h1 className="text-4xl font-bold">Projects Section</h1>
          </section>
        </main>
      )}
    </>
  );
}
