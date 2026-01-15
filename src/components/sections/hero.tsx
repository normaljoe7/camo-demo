'use client';

import { ArrowRight, Compass, Shield, Users, Star } from 'lucide-react';
import Button from '@/components/ui/button';
import { useState, useEffect } from 'react';

export default function Hero() {
  const [currentExpedition, setCurrentExpedition] = useState(0);

  const expeditions = [
    'Arctic Exploration',
    'Amazon Rainforest',
    'Himalayan Trek',
    'Saharan Desert'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentExpedition((prev) => (prev + 1) % expeditions.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [expeditions.length]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" id="home">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1591824438708-ce405f36ba3d?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center" />
        {/* Subtle camo texture overlay */}
        <div className="absolute inset-0 opacity-20 mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/camouflage.png')]" />
        {/* Subtle scrim for readability without heavy gradient */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative container-custom section-padding text-center text-white z-10 pt-32">
        <div className="max-w-5xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 mb-8 px-6 py-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-full hover:bg-white/10 transition-colors duration-300">
            <Compass className="h-5 w-5 text-accent animate-spin-slow" />
            <span className="font-medium uppercase tracking-[0.2em] text-xs text-gray-200">
              Trusted Since 2010 • 500+ Expeditions
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-8 leading-tight tracking-tight">
            <span className="block text-white drop-shadow-lg">Discover the</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-accent via-white to-accent opacity-90 pb-2">
              Untouched
            </span>
            <span className="block font-light text-white/90">Wonders</span>
          </h1>

          {/* Rotating Expedition */}
          <div className="h-16 mb-12 overflow-hidden">
            <div
              className="transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]"
              style={{ transform: `translateY(-${currentExpedition * 100}%)` }}
            >
              {expeditions.map((expedition, index) => (
                <div key={index} className="h-16 flex items-center justify-center">
                  <p className="text-2xl md:text-4xl font-light tracking-wide text-gray-200">
                    Next: <span className="font-semibold text-accent border-b border-accent/50 pb-1">{expedition}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Description */}
          <p className="text-lg md:text-xl text-gray-300 mb-16 max-w-2xl mx-auto leading-relaxed font-light">
            Professional expedition services to the most remote and breathtaking locations on Earth.
            Expert guides ensuring safety, comfort, and unforgettable experiences.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20">
            <Button variant="solid" size="lg" icon={ArrowRight} iconPosition="right" className="bg-accent hover:bg-accent/90 text-black font-semibold px-8 py-6 text-lg rounded-full">
              Explore All Expeditions
            </Button>
            <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-6 text-lg rounded-full">
              Download Brochure
            </Button>
          </div>

          {/* Stats - Glassmorphism Card */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto p-8 rounded-3xl bg-white/5 backdrop-blur-lg border border-white/10">
            <div className="text-center group">
              <div className="flex flex-col items-center justify-center mb-2 group-hover:transform group-hover:scale-110 transition-transform duration-300">
                <Users className="h-8 w-8 text-accent mb-3" />
                <span className="text-4xl font-bold text-white">5k+</span>
              </div>
              <p className="text-gray-400 text-xs uppercase tracking-wider">Adventurers</p>
            </div>
            <div className="text-center group">
              <div className="flex flex-col items-center justify-center mb-2 group-hover:transform group-hover:scale-110 transition-transform duration-300">
                <Compass className="h-8 w-8 text-accent mb-3" />
                <span className="text-4xl font-bold text-white">40+</span>
              </div>
              <p className="text-gray-400 text-xs uppercase tracking-wider">Destinations</p>
            </div>
            <div className="text-center group">
              <div className="flex flex-col items-center justify-center mb-2 group-hover:transform group-hover:scale-110 transition-transform duration-300">
                <Shield className="h-8 w-8 text-accent mb-3" />
                <span className="text-4xl font-bold text-white">100%</span>
              </div>
              <p className="text-gray-400 text-xs uppercase tracking-wider">Safety Record</p>
            </div>
            <div className="text-center group">
              <div className="flex flex-col items-center justify-center mb-2 group-hover:transform group-hover:scale-110 transition-transform duration-300">
                <Star className="h-8 w-8 text-accent mb-3" />
                <span className="text-4xl font-bold text-white">4.9</span>
              </div>
              <p className="text-gray-400 text-xs uppercase tracking-wider">Customer Rating</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}

    </section>
  );
}