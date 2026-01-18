import { slugify } from '@/lib/utils';
import { Calendar, Mountain, Thermometer, Users, MapPin } from 'lucide-react';
import Link from 'next/link';
import Button from '@/components/ui/button';
import { expeditions } from '@/lib/constants';
import Card from '@/components/ui/card';

export default function Expeditions() {
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
          {expeditions.map((expedition) => (
            <Link href={`/expeditions/${slugify(expedition.title)}`} key={expedition.id} className="block h-full">
              <Card className="group transition-all duration-300 h-full">
                <div className="relative overflow-hidden rounded-t-xl h-48 group">
                  {expedition.image ? (
                    <div className="w-full h-full relative">
                      <img
                        src={expedition.image}
                        alt={expedition.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                    </div>
                  ) : (
                    <div className="h-full bg-gradient-to-br from-gray-900 to-blue-900 relative flex items-center justify-center">
                      <Mountain className="h-20 w-20 text-white/30" />
                    </div>
                  )}
                  <div className="absolute top-4 right-4 z-10">
                    <span className="px-3 py-1 bg-black/50 backdrop-blur-md rounded-full text-xs font-semibold text-white border border-white/10">
                      {expedition.difficulty}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">{expedition.title}</h3>
                      <p className="text-gray-300 mb-4">{expedition.description}</p>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span className="text-sm text-gray-300">{expedition.duration}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Thermometer className="h-4 w-4 text-primary" />
                      <span className="text-sm text-gray-300">{expedition.season}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-primary" />
                      <span className="text-sm text-gray-300">Small Groups</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span className="text-sm text-gray-300">Remote</span>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-white mb-2">Highlights</h4>
                    <div className="flex flex-wrap gap-2">
                      {expedition.highlights.map((highlight, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-primary/20 text-primary rounded-full text-xs font-medium"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Price & CTA */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <div>
                      <span className="text-2xl font-bold text-white">{expedition.price}</span>
                      <span className="text-gray-400 text-sm ml-2">per person</span>
                    </div>
                    <div className="inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-300 bg-primary text-white hover:bg-primary/90 px-4 py-2 text-sm">
                      Learn More
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