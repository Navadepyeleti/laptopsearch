'use client';

import { useState, useEffect } from 'react';
/**
 * Carousel of laptops with free-license images (Unsplash)
 */
export default function LaptopCarousel({ laptops }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCurrent((c) => (c + 1) % laptops.length);
    }, 4000);
    return () => clearInterval(id);
  }, [laptops.length]);

  return (
    <section className="bg-gray-100 py-12">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
          Laptops we recommend
        </h2>
        <div className="relative overflow-hidden rounded-xl bg-white shadow-lg border border-gray-200">
          {/* Slides */}
          {laptops.map((laptop, i) => (
            <div
              key={laptop.id}
              className={`transition-opacity duration-500 ${
                i === current ? 'opacity-100' : 'opacity-0 absolute inset-0'
              }`}
              style={{ zIndex: i === current ? 1 : 0 }}
            >
              <div className="flex flex-col md:flex-row">
                <div className="relative w-full md:w-1/2 aspect-video md:aspect-auto md:min-h-[280px] bg-gray-200">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={laptop.image}
                    alt={laptop.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 md:p-8 flex flex-col justify-center md:w-1/2">
                  <p className="text-sm text-gray-500 mb-1">{laptop.brand}</p>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{laptop.name}</h3>
                  <p className="text-2xl font-bold text-blue-600 mb-4">£{laptop.price}</p>
                  <p className="text-sm text-gray-600">
                    {laptop.ram} GB RAM · {laptop.storage} · {laptop.processor}
                  </p>
                  <span className="inline-block mt-2 px-2 py-1 rounded text-xs font-medium bg-gray-200 text-gray-700">
                    {laptop.usage}
                  </span>
                </div>
              </div>
            </div>
          ))}
          {/* Dots */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
            {laptops.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Slide ${i + 1}`}
                onClick={() => setCurrent(i)}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  i === current ? 'bg-blue-600' : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
          {/* Arrows */}
          <button
            type="button"
            aria-label="Previous"
            onClick={() => setCurrent((c) => (c - 1 + laptops.length) % laptops.length)}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-white z-10"
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Next"
            onClick={() => setCurrent((c) => (c + 1) % laptops.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-white z-10"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
}
