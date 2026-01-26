'use client';

import { useExpeditions } from '@/contexts/ExpeditionContext';
import { slugify } from '@/lib/utils';
import Link from 'next/link';
import { MapPin, Calendar, Clock, DollarSign } from 'lucide-react';
import AnimatedButton from '@/components/ui/AnimatedButton';
import Card from '@/components/ui/card';

export default function ExpeditionsPage() {
    const { expeditions } = useExpeditions();
    // Show all expeditions, sorting active first
    const visibleExpeditions = [...expeditions].sort((a, b) => (a.status === 'active' ? -1 : 1));

    return (
        <div className="min-h-screen pt-24 pb-20">
            <div className="container px-4 mx-auto animate-fade-in">
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-bold text-white mb-6">Our Expeditions</h1>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        Choose your next adventure. From the depths of the jungle to the highest peaks,
                        we have curated the most exclusive experiences for you.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {visibleExpeditions.map((exp) => (
                        <Link key={exp.id} href={`/expeditions/${slugify(exp.title)}`} className="block h-full animate-fade-in-up">
                            <Card className={`group relative h-[450px] overflow-hidden border-none shadow-xl cursor-pointer ${exp.status === 'paused' ? 'grayscale opacity-70' : ''}`}>
                                {/* Image Background */}
                                <div className="absolute inset-0">
                                    <img
                                        src={exp.image}
                                        alt={exp.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:brightness-75 brightness-90"
                                    />
                                    {exp.status === 'paused' && (
                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-30">
                                            <span className="px-4 py-2 bg-black/80 text-white font-bold text-xl uppercase tracking-widest border border-white/20 rounded-xl backdrop-blur-md">
                                                Coming Soon
                                            </span>
                                        </div>
                                    )}
                                    {exp.status === 'active' && exp.discountedPrice && (
                                        <div className="absolute top-4 right-4 z-20 bg-red-600 text-white text-[10px] font-bold px-3 py-1 rounded shadow-lg">
                                            SALE
                                        </div>
                                    )}
                                </div>

                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent opacity-90 transition-opacity duration-300" />

                                {/* Content Overlay */}
                                <div className="absolute inset-x-0 bottom-0 px-8 pt-8 pb-12 flex flex-col justify-end h-full pointer-events-none">
                                    <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-300 pointer-events-auto">
                                        {/* Top Badges */}
                                        <div className="flex items-center gap-2 mb-3 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                                            <span className="inline-block px-3 py-1 bg-white/20 text-white rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md">
                                                {exp.category}
                                            </span>
                                            {exp.season && (
                                                <span className="inline-block px-3 py-1 bg-primary/80 text-white rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md">
                                                    {exp.season}
                                                </span>
                                            )}
                                        </div>

                                        <h2 className="text-2xl font-bold text-white mb-2 leading-tight">
                                            {exp.title}
                                        </h2>

                                        {/* Stats Row */}
                                        <div className="flex items-center gap-4 text-gray-300 text-sm mb-4">
                                            <div className="flex items-center gap-1.5">
                                                <MapPin className="w-3.5 h-3.5 text-accent" />
                                                <span>{exp.location || 'Remote'}</span>
                                            </div>
                                        </div>



                                        {/* Footer / CTA */}
                                        <div className="flex items-center justify-between pt-4 border-t border-white/20 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                                            <div>
                                                <p className="text-xs text-gray-400 uppercase tracking-widest">Starting From</p>
                                                {exp.discountedPrice ? (
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-lg font-bold text-white">{exp.discountedPrice}</span>
                                                        <span className="text-xs text-gray-500 line-through">{exp.price}</span>
                                                    </div>
                                                ) : (
                                                    <p className="text-lg font-bold text-white">{exp.price}</p>
                                                )}
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

                {visibleExpeditions.length === 0 && (
                    <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/10">
                        <p className="text-gray-400 text-xl">No active expeditions at the moment. Check back soon!</p>
                    </div>
                )}
            </div>
        </div>
    );
}
