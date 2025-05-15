import { useState } from "react";

interface SliderProps {
  images: string[]; // ← comment: pass your image URLs here
  height?: string;  // Optional: tailor slide height (e.g. "h-64", "h-80")
}

export default function Slider({ images, height = "h-64" }: SliderProps) {
  const [current, setCurrent] = useState(0);
  const lastIndex = images.length - 1;

  const prev = () =>
    setCurrent((i) => (i === 0 ? lastIndex : i - 1));
  const next = () =>
    setCurrent((i) => (i === lastIndex ? 0 : i + 1));

  return (
    <div className="relative w-full overflow-hidden rounded-full px-8">
      {/* track */}
      <div
        className="flex transition-transform duration-500"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {images.map((src, idx) => (
          <div
            key={idx}
            className={`flex-none w-full ${height}`}
          >
            <img
              
              src={src}
              alt={`Slide ${idx + 1}`}
              className="object-cover w-full h-full"
            />
          </div>
        ))}
      </div>

      {/* prev/next buttons */}
      <button
        onClick={prev}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/60 hover:bg-white p-2 rounded-full shadow"
      >
        ◀
      </button>
      <button
        onClick={next}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/60 hover:bg-white p-2 rounded-full shadow"
      >
        ▶
      </button>
    </div>
);
}
