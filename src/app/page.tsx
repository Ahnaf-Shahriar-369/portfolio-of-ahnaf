"use client"

import { useEffect } from "react"
import Navbar from "./components/NavBar"
import DownBar from "./components/downBar"


export default function Home() {
  // Add a gradient background to body
  useEffect(() => {
    // document.body.classList.add("bg-gradient-to-b", "from-white", "to-gray-100", "dark:from-gray-900", "dark:to-black")

    return () => {
      // document.body.classList.remove(
      //   "bg-gradient-to-b",
      //   "from-white",
      //   "to-gray-100",
      //   "dark:from-gray-900",
      //   "dark:to-black",
      //)
    }
  }, [])

  return (
    <><div className='container h-[3000px] bg-[#000000]'>










<Navbar />
      <main className="min-h-screen pt-32 px-4 transition-colors duration-500">
        <section
          id="home"
          className="min-h-screen flex items-center justify-center transition-all duration-500 rounded-3xl"
        >
          <h1 className="text-4xl font-bold">Home Section</h1>
        </section>

        <section
          id="about"
          className="min-h-screen flex items-center justify-center transition-all duration-500 rounded-3xl"
        >
          <h1 className="text-4xl font-bold">About Section</h1>
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
      </div>
    </>
  )
}








    
      
