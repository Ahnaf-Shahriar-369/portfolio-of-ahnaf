"use client";

import React, { useEffect, useRef } from "react";
// Instead of:
import TagCloud from 'TagCloud'

// Try one of these:


const logos = [
  "bootstrap", "css", "material", "express", "shadecn",
  "git", "github", "html", "javascript", "mongodb",
  "prisma", "nextjs", "nodejs", "react", "redux",
  "sass", "tailwind", "vercel",
].map(
  (name) =>
    `<div class="tech-item" title="${name}">
      <img src="/logos/${name}.svg" alt="${name}" />
      <span class="tooltip">${name}</span>
     </div>`
);

export default function LogoSphere() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) {
      console.error("containerRef is null");
      return;
    }

    console.log("Initializing TagCloud with logos:", logos);

    try {
      // Wrap containerRef.current in an array to match the expected type
      const tagCloud = TagCloud([containerRef.current], logos, {
        radius: window.innerWidth < 768 ? 100 : 150,
        maxSpeed: "normal",
        initSpeed: "normal",
        keep: true,
        useHTML: true,
      });

      return () => tagCloud.destroy();
    } catch (error) {
      console.error("Error initializing TagCloud:", error);
    }
  }, []);

  return (
    <div className="logo-sphere-container mt-5" ref={containerRef} />
  );
}