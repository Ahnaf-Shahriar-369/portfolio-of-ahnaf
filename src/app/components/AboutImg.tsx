'use client';

import Image from 'next/image';
import React from 'react';
import './AboutImg.css'; // For glow or animation from global.css

const AboutImg = () => {
  return (
    <div className="flex justify-center items-center">
      <div
        className="relative group rounded-full p-[6px] bg-gradient-to-tr from-[#2dd4bf] to-[#0ea5e9]
        hover:from-[#0ea5e9] hover:to-[#2dd4bf] transition-all duration-500 shadow-lg about-glow"
      >
        {/* 🖼️ Put your black & white profile image here */}
        <div className="overflow-hidden rounded-full w-48 h-48 md:w-60 md:h-60">
          <Image
            src="/me-portfolio.png" // <-- Replace with your black & white photo
            alt="Ahnaf — Frontend Developer"
            width={240}
            height={240}
            className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out scale-100 group-hover:scale-105"
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default AboutImg;
