import { slugify } from '@/lib/utils';
import { Calendar, Mountain, Thermometer, Users, MapPin } from 'lucide-react';
import Link from 'next/link';
import Button from '@/components/ui/button';
import { expeditions } from '@/lib/constants';
import Card from '@/components/ui/card';

interface ExpeditionsProps {
  limit?: number;
}

export default function Expeditions({ limit }: ExpeditionsProps) {
  const displayedExpeditions = limit ? expeditions.slice(0, limit) : expeditions;

  return (
    <section className="section-padding bg-transparent" id="expeditions">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-semibold uppercase tracking-wide mb-4">
            Our Adventures
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Featured <span className="text-primary">Expeditions</span>
          </h2>
          <p className="text-gray-300 text-lg">
            Choose from our carefully curated selection of adventures, each designed to
            provide unique experiences with maximum safety and comfort.
          </p>
        </div>

        {/* Expeditions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {displayedExpeditions.map((expedition) => (
            <Link href={`/expeditions/${slugify(expedition.title)}`} key={expedition.id} className="block h-full">
              <Card className="group relative h-[450px] overflow-hidden border-none shadow-xl cursor-pointer">
                {/* Image Background */}
                <div className="absolute inset-0">
                  {expedition.image ? (
                    <img
                      src={expedition.image}
                      alt={expedition.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:brightness-75 brightness-90"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-900 flex items-center justify-center">
                      <Mountain className="h-20 w-20 text-white/20" />
                    </div>
                  )}
                </div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-90 transition-opacity duration-300" />

                {/* Content Overlay */}
                <div className="absolute inset-x-0 bottom-0 p-8 flex flex-col justify-end h-full">
                  <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-300">
                    {/* Top Badges */}
                    <div className="flex items-center gap-2 mb-3 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="inline-block px-3 py-1 bg-white/20 text-white rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md">
                        {expedition.category}
                      </span>
                      {expedition.season && (
                        <span className="inline-block px-3 py-1 bg-primary/80 text-white rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md">
                          {expedition.season}
                        </span>
                      )}
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-2 leading-tight">
                      {expedition.title}
                    </h3>

                    {/* Stats Row */}
                    <div className="flex items-center gap-4 text-gray-300 text-sm mb-4">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-primary" />
                        <span>{expedition.duration}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-primary" />
                        <span>{expedition.location || 'Remote'}</span>
                      </div>
                    </div>

                    {/* Description (Hidden by default, reveal on hover) */}
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2 opacity-0 group-hover:opacity-100 transition-all duration-300 h-0 group-hover:h-auto">
                      {expedition.description}
                    </p>

                    {/* Footer / CTA */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/20 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                      <div>
                        <p className="text-xs text-gray-400 uppercase tracking-widest">Starting From</p>
                        <p className="text-lg font-bold text-white">{expedition.price}</p>
                      </div>
                      <span className="inline-flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 text-white px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors backdrop-blur-sm">
                        Explore
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link href="/expeditions">
            <Button variant="outline" size="lg">
              View All Expeditions
            </Button>
          </Link>
        </div>
      </div>
    </section >
  );
}