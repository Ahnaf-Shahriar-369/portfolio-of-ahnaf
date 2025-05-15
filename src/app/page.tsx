"use client";

import { useEffect } from "react";
import Navbar from "./components/NavBar";
import Sidebar from "./components/SideBar";
import DownBar from "./components/downBar";
import Cursor from "./components/cursor";
import "./globals.css";
import Hero from "./components/Hero";
// import AboutImg from "./components/AboutImg";
// import LogoSphere from "./components/Tech-Sphere";
import About from "./components/About";
// import Slider from "./components/Slider";
import RightSection from "./components/right2";

export default function Home() {
  // Fix for the right side background issue
  useEffect(() => {
    // Ensure no overflow on the body
    document.body.style.overflow = "hidden";
    document.body.style.overflowY = "auto";
    document.body.style.width = "100%";
    document.body.style.maxWidth = "100vw";

    return () => {
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

<<<<<<< HEAD
      <main className="min-h-screen  bg-black text-white">
        
        <section
  id="home"
  className="min-h-screen flex items-center justify-center transition-all duration-500 rounded-3xl p-0 m-0 "
>
  <Hero />
</section>
=======
      {/* 👇 Loading GIF shown for 3 seconds */}
      {isLoading ? (
        <div className="fixed top-0 left-0 w-full h-screen bg-black flex items-center justify-center z-50 outline-none border-none">
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
>>>>>>> 23f0d2f73235ef32f9baf235e4f8b7479d18f898

        <section
          id="about"
          className="min-h-screen flex items-center justify-center transition-all duration-500 rounded-3xl"
        >
          
          <About></About>
          
          


          {/* <Slider /> */}

        </section>

        <section
          id="skills"
          className="min-h-screen flex items-center justify-center transition-all duration-500 rounded-3xl"
        >
          {/* <h1 className="text-4xl font-bold">Skills Section</h1> */}

          {/* <AboutImg></AboutImg> */}
        </section>

        <section
          id="projects"
          className="min-h-screen flex items-center justify-center mb-32 transition-all duration-500 rounded-3xl"
        >
          {/* <h1 className="text-4xl font-bold">Projects Section</h1> */}
          <RightSection />
        </section>
      </main> 
      
    </>
  );
} 