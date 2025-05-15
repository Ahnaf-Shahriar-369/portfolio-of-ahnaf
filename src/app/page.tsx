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


      <main className="min-h-screen  bg-black text-white">
        
        <section
  id="home"
  className="min-h-screen flex items-center justify-center transition-all duration-500 rounded-3xl p-0 m-0 "
>
  <Hero />
</section>

        <section
          id="about"
          className="min-h-screen flex items-center justify-center transition-all duration-500 rounded-3xl"
        >
          
          <About></About>
          
          {/* <AboutImg></AboutImg> */}


          {/* <Slider /> */}


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
      <DownBar />
    </>
  );
}