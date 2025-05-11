"use client";

import React, { useEffect, useRef } from "react";
import TagCloud from "TagCloud";


const logos = [
  "bootstrap", "css", "docker", "express", "figma",
  "git", "github", "html", "js", "mongodb",
  "mongoose", "next", "node", "react", "redux",
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
    if (!containerRef.current) return;

    const tagCloud = TagCloud(containerRef.current, logos, {
      radius: window.innerWidth < 768 ? 100 : 150, // Smaller radius for all devices
      maxSpeed: "normal",
      initSpeed: "normal",
      direction: 135,
      keep: true,
      useHTML: true,
    });

    return () => tagCloud.destroy();
  }, []);

  return (
    <div className="logo-sphere-container mt-5" ref={containerRef} />
  );
}