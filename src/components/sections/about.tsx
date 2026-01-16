import { Shield, Users, Compass, Award } from 'lucide-react';

export default function About() {
  return (
    <section className="section-padding bg-transparent" id="about">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <span className="inline-block px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-semibold uppercase tracking-wide mb-4">
              About Us
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              The Art of
            </h2>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6"> <span className="text-primary">Indian Safari</span></h2>
            <p className="text-gray-300 text-lg mb-6">
              Curated Encounters with India&apos;s Wild.
              <br />
              Step beyond the ordinary and into India&apos;s most untamed realms.
              CamoScapes Expedition crafts intimate wildlife journeys through the country&apos;s legendary forests—where tigers prowl ancient sal trees, elephants move in quiet grandeur, and rare moments unfold far from the crowds.

            </p>
            <p className="text-gray-300 text-lg mb-8">
              Every expedition is meticulously designed for discerning explorers, photographers, and conservation-minded travelers seeking privileged access to India’s living wilderness. From dawn safaris bathed in golden light to hushed encounters that become lifelong memories, we bring you closer—to the wild, and to its soul.
              <br />
              <br />
              Safari, Elevated. Wild, Revealed.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-2 gap-6">
            <div className="p-6 bg-black/20 border border-white/10 rounded-xl">
              <Shield className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">100% Safety Record</h3>
              <p className="text-gray-300 text-sm">Zero incidents across expeditions</p>
            </div>
            <div className="p-6 bg-black/20 border border-white/10 rounded-xl">
              <Users className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Expert Guides</h3>
              <p className="text-gray-300 text-sm">Led by field specialists with years of jungle experience</p>
            </div>
            <div className="p-6 bg-black/20 border border-white/10 rounded-xl">
              <Compass className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">4 Destinations</h3>
              <p className="text-gray-300 text-sm">Beyond Observation. A Refined Wild Experience.</p>
            </div>
            <div className="p-6 bg-black/20 border border-white/10 rounded-xl">
              <Award className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Archives</h3>
              <p className="text-gray-300 text-sm">Treasured chronicles of our expeditions</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
