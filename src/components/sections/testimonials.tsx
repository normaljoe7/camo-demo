import { testimonials } from '@/lib/constants';
import { Star, Quote } from 'lucide-react';

export default function Testimonials() {
  return (
    <section className="section-padding bg-transparent" id="testimonials">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-semibold uppercase tracking-wide mb-4">
            Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            What Our <span className="text-primary">Adventurers</span> Say
          </h2>
          <p className="text-gray-300 text-lg">
            Don&apos;t just take our word for it - hear from those who&apos;ve experienced our expeditions.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-black/20 backdrop-blur-md rounded-xl shadow-lg p-8 border border-white/10 hover:shadow-xl transition-all duration-300"
            >
              <Quote className="h-8 w-8 text-primary/30 mb-4" />
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                &quot;{testimonial.content}&quot;
              </p>
              <div className="border-t border-white/10 pt-4">
                <p className="font-bold text-white">{testimonial.name}</p>
                <p className="text-sm text-gray-400">{testimonial.expedition}</p>
                <p className="text-xs text-gray-400 mt-1">{testimonial.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
