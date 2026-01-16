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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member) => (
            <Card key={member.id} className="h-full group transition-all duration-300 hover:shadow-xl">
              {/* Image placeholder */}
              <div className="h-64 bg-gradient-to-br from-gray-900 to-blue-900 relative rounded-t-xl overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <MapPin className="h-16 w-16 text-white/30" />
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-primary transition-colors">{member.name}</h3>
                <p className="text-primary font-semibold text-sm mb-2">{member.role}</p>
                <p className="text-gray-400 text-xs mb-4">{member.experience} • {member.specialty}</p>
                <p className="text-gray-300 text-sm line-clamp-3">{member.bio}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
