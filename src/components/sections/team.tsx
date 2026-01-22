import { teamMembers } from '@/lib/constants';
import { MapPin } from 'lucide-react';
import Card from '@/components/ui/card';

export default function Team() {
  return (
    <section className="section-padding bg-transparent" id="team">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-semibold uppercase tracking-wide mb-4">
            Our Team
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Meet Our <span className="text-primary">Expert</span> Guides
          </h2>
          <p className="text-gray-300 text-lg">
            Our team of experienced professionals brings decades of combined expertise
            to ensure your safety and create unforgettable adventures.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <Card key={member.id} className="group relative h-[450px] overflow-hidden border-none shadow-xl cursor-pointer">
              {/* Image Background */}
              <div className="absolute inset-0">
                {/* Fallback gradient if image loads slowly or fails */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900" />

                {/* Actual Image */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-50 brightness-90"
                />
              </div>

              {/* Gradient Overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

              {/* Content Overlay */}
              <div className="absolute inset-x-0 bottom-0 p-8 flex flex-col justify-end h-full">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="flex items-center gap-2 mb-2 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="inline-block px-3 py-1 bg-primary/20 text-primary rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
                      {member.role}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-white/50 group-hover:text-white mb-2 transition-colors duration-300">
                    {member.name}
                  </h3>

                  <div className="space-y-2 opacity-40 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-gray-300 text-sm font-medium flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {member.experience} Experience
                    </p>
                    <p className="text-gray-300 text-sm font-medium flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                      {member.specialty}
                    </p>
                    <p className="text-gray-400 text-sm mt-4 line-clamp-3 group-hover:line-clamp-none transition-all duration-300">
                      {member.bio}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
