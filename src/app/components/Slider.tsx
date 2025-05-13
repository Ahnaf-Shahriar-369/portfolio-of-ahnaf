// components/slider.tsx
"use client";

import { useState } from "react";
import Image from "next/image";

interface Slide {
  name: string;
  src: string;
}

const Slider: React.FC = () => {
  const [active, setActive] = useState<number>(0);

  const slides: Slide[] = [
    {
      name: "Instructor One",
      src: "/images/instructor1.jpg", // ← Replace with your first image
    },
    {
      name: "Instructor Two",
      src: "/images/instructor2.jpg", // ← Replace with your second image
    },
  ];

  return (
    <div className="w-full flex justify-center py-6 overflow-x-auto">
      {slides.map((slide, idx) => (
        <button
          key={idx}
          onClick={() => setActive(idx)}
          className={`
            flex-shrink-0 m-4
            transition-transform duration-500 ease-in-out
            focus:outline-none focus:ring-4 focus:ring-blue-300
            ${active === idx
              ? "scale-110 z-20 shadow-2xl animate-bounce-custom"
              : "scale-90 opacity-80 hover:scale-100 hover:opacity-100 z-10 shadow-md"}
          `}
        >
          {/* Circle-shaped image container, responsive sizes */}
          <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48">
            <Image
              src={slide.src}
              alt={slide.name}
              fill
              className="
                rounded-full object-cover
                transition-transform duration-500 ease-out
                hover:scale-105
                active:scale-90
                cursor-pointer
              "
            />
          </div>

          {/* Name badge */}
          <div className="
            absolute bottom-0 left-1/2 transform -translate-x-1/2
            bg-black/60 text-white text-sm sm:text-base
            py-1 px-3 rounded-full
            opacity-80 transition-opacity duration-300
            hover:opacity-100
          ">
            {slide.name}
          </div>
        </button>
      ))}
    </div>
  );
};

export default Slider;
