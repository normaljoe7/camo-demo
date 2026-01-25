'use client';

import { galleryImages } from '@/lib/constants';
import { Mountain, ArrowRight } from 'lucide-react';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { useRouter } from 'next/navigation';

export default function Gallery() {
  const router = useRouter();

  return (
    <section className="section-padding bg-transparent" id="gallery">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-semibold uppercase tracking-wide mb-4">
            Gallery
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Moments from Our <span className="text-primary">Expeditions</span>
          </h2>
          <p className="text-gray-300 text-lg">
            Explore stunning visuals from our adventures around the world.
          </p>
        </div>

        {/* Gallery Grid */}
        {/* Gallery Marquee */}
        <div className="relative w-full overflow-hidden mask-gradient">
          <div className="flex w-max animate-scroll gap-6">
            {[...galleryImages, ...galleryImages].map((image, index) => (
              <div
                key={`${image.id}-${index}`}
                className="relative overflow-hidden rounded-xl w-72 md:w-96 aspect-square bg-gradient-to-br from-gray-900 to-blue-900 group cursor-pointer"
              >
                {/* Image Background */}
                <div className="absolute inset-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />

                <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Mountain className="h-5 w-5 text-white" />
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <p className="font-bold text-lg mb-1">{image.alt}</p>
                  <p className="text-sm text-primary font-medium tracking-wide uppercase">{image.category}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* View All Button */}
        <div className="flex justify-center mt-12 bg-transparent">
          <AnimatedButton
            variant="white"
            onClick={() => router.push('/gallery')}
            className="border border-white/20 bg-transparent text-white hover:bg-white/10"
            icon={ArrowRight}
          >
            View Full Gallery
          </AnimatedButton>
        </div>
      </div>
    </section>
  );
}
