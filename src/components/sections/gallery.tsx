import { galleryImages } from '@/lib/constants';
import { Mountain } from 'lucide-react';

export default function Gallery() {
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image) => (
            <div
              key={image.id}
              className="relative overflow-hidden rounded-xl aspect-square bg-gradient-to-br from-gray-900 to-blue-900 group cursor-pointer hover:scale-105 transition-transform duration-300"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <Mountain className="h-20 w-20 text-white/30" />
              </div>
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <p className="font-semibold">{image.alt}</p>
                <p className="text-sm text-gray-300 capitalize">{image.category}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
