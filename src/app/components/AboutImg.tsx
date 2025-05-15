'use client';

import Image from 'next/image';
import React from 'react';

const AboutImg = () => {
  return (
    <div className="flex justify-center items-center">
      <div
        className="
          relative
          group
          rounded-full
          p-[6px]
          
          hover:from-[#0ea5e9] hover:to-[#2dd4bf]
          transition-all duration-500
          shadow-[0_0_15px_rgba(14,165,233,0.4)]
          hover:shadow-[0_0_25px_rgba(45,212,191,0.6),0_0_35px_rgba(14,165,233,0.6)]
          active:shadow-[0_0_10px_rgba(14,165,233,0.4)]
        "
      >
        {/* 🖼️ Put your black & white profile image here */}
        <div className="overflow-hidden rounded-full w-48 h-48 md:w-60 md:h-60">
          <Image
            src="/me-2-m.png" // <-- Replace with your black & white photo
            alt="Ahnaf — Frontend Developer"
            width={240}
            height={240}
            className="
              object-cover w-full h-full
              grayscale
              transition-all duration-700 ease-in-out scale-100
              group-hover:grayscale-0 group-hover:scale-105
            "
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default AboutImg;



