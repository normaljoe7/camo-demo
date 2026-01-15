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
              Your Trusted <span className="text-primary">Adventure</span> Partner
            </h2>
            <p className="text-gray-300 text-lg mb-6">
              Since 2010, ExpeditionCo has been leading adventurers to the world&apos;s most remote
              and breathtaking destinations. Our expert team combines decades of experience with
              cutting-edge safety protocols to ensure unforgettable journeys.
            </p>
            <p className="text-gray-300 mb-8">
              We specialize in carefully curated expeditions that balance adventure with safety,
              comfort with authenticity, and challenge with support. Every expedition is designed
              to provide transformative experiences while maintaining the highest standards of
              safety and environmental responsibility.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-2 gap-6">
            <div className="p-6 bg-black/20 border border-white/10 rounded-xl">
              <Shield className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">100% Safety Record</h3>
              <p className="text-gray-300 text-sm">Zero incidents across 500+ expeditions</p>
            </div>
            <div className="p-6 bg-black/20 border border-white/10 rounded-xl">
              <Users className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Expert Guides</h3>
              <p className="text-gray-300 text-sm">Certified professionals with 10+ years experience</p>
            </div>
            <div className="p-6 bg-black/20 border border-white/10 rounded-xl">
              <Compass className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">40+ Destinations</h3>
              <p className="text-gray-300 text-sm">From Arctic to Amazon, we go everywhere</p>
            </div>
            <div className="p-6 bg-black/20 border border-white/10 rounded-xl">
              <Award className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Award Winning</h3>
              <p className="text-gray-300 text-sm">Recognized for excellence in adventure travel</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
