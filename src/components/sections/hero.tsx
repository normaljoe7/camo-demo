'use client';

import { ArrowRight, Compass, Shield, Users, Star } from 'lucide-react';
import Button from '@/components/ui/button';
import AnimatedButton from '@/components/ui/AnimatedButton';
// Removed unused imports: useState, useEffect
import { useRouter } from 'next/navigation';

export default function Hero() {
  const router = useRouter();

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
            <Compass className="h-5 w-5 text-accent" />
            <span className="font-medium uppercase tracking-[0.2em] text-xs text-gray-200">
              Trusted Since 2010 • 500+ Expeditions
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-8 leading-tight tracking-tight group cursor-default select-none">
            <span className="block text-white drop-shadow-lg lg:opacity-20 lg:group-hover:opacity-100 transition-all duration-700 ease-in-out">
              Discover the
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-accent via-white to-accent pb-2 lg:opacity-10 lg:group-hover:opacity-100 transition-all duration-700 ease-in-out">
              Untamed
            </span>
            <span className="block font-light text-white/90 lg:opacity-20 lg:group-hover:opacity-100 transition-all duration-700 ease-in-out">
              Wonders
            </span>
          </h1>

          {/* Static Heading Subtitle (formerly rotating) */}
          <div className="h-16 mb-12 flex items-center justify-center">
            <p className="text-2xl md:text-3xl font-light tracking-wide text-gray-200">
              Explore the <span className="font-semibold text-accent border-b border-accent/50 pb-1">Unexplored</span>
            </p>
          </div>

          {/* Description */}
          <p className="text-lg md:text-xl text-gray-300 mb-16 max-w-2xl mx-auto leading-relaxed font-light">
            Spanning iconic tiger habitats and lesser-known forest corridors, each journey is guided by expertise, limited in scale, and designed to unfold at nature’s pace.
          </p>

          {/* CTA Button */}
          <div className="flex justify-center mb-20 animate-fade-in-up">
            <AnimatedButton
              variant="accent"
              size="lg"
              icon={ArrowRight}
              tooltipText="Discover our exclusive destinations"
              className="px-10 py-6 text-xl rounded-full shadow-[0_0_30px_rgba(var(--accent),0.3)] hover:shadow-[0_0_50px_rgba(var(--accent),0.5)] transition-shadow duration-500"
              onClick={() => {
                // Navigate to /expeditions per requirement
                router.push('/expeditions');
              }}
            >
              Explore All Expeditions
            </AnimatedButton>
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
                <span className="text-4xl font-bold text-white">4</span>
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