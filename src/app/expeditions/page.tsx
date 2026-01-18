'use client';

import { useExpeditions } from '@/contexts/ExpeditionContext';
import { slugify } from '@/lib/utils';
import Link from 'next/link';
import { MapPin, Calendar, Clock, DollarSign } from 'lucide-react';
import AnimatedButton from '@/components/ui/AnimatedButton';
import Card from '@/components/ui/card';

export default function ExpeditionsPage() {
    const { expeditions } = useExpeditions();
    const activeExpeditions = expeditions.filter(e => e.status === 'active');

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
                    {activeExpeditions.map((exp) => (
                        <Link key={exp.id} href={`/expeditions/${slugify(exp.title)}`} className="group">
                            <div className="bg-secondary/20 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-white/30 transition-all duration-300 h-full flex flex-col">
                                <div className="h-64 overflow-hidden relative">
                                    <img
                                        src={exp.image}
                                        alt={exp.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    {exp.discountedPrice && (
                                        <div className="absolute top-4 right-4 bg-red-600 text-white font-bold px-3 py-1 rounded shadow-lg">
                                            SALE
                                        </div>
                                    )}
                                </div>

                                <div className="p-6 flex-1 flex flex-col">
                                    <div className="flex justify-between items-start mb-4">
                                        <h2 className="text-2xl font-bold text-white group-hover:text-accent transition-colors">
                                            {exp.title}
                                        </h2>
                                    </div>

                                    <div className="space-y-3 mb-6 flex-1">
                                        <div className="flex items-center text-gray-400 text-sm">
                                            <MapPin className="w-4 h-4 mr-2 text-accent" />
                                            {exp.location || 'Remote Location'}
                                        </div>
                                        <div className="flex items-center text-gray-400 text-sm">
                                            <Clock className="w-4 h-4 mr-2 text-accent" />
                                            {exp.duration}
                                        </div>
                                        <div className="flex items-center text-gray-400 text-sm">
                                            <DollarSign className="w-4 h-4 mr-2 text-accent" />
                                            {exp.discountedPrice ? (
                                                <span className="flex gap-2 items-center">
                                                    <span className="line-through opacity-60">{exp.price}</span>
                                                    <span className="text-white font-bold text-lg">{exp.discountedPrice}</span>
                                                </span>
                                            ) : (
                                                <span className="text-white font-bold text-lg">{exp.price}</span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="mt-auto">
                                        <span className="inline-block w-full text-center py-3 rounded-lg border border-white/20 text-white group-hover:bg-white group-hover:text-black transition-all font-medium">
                                            Explore Expedition
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {activeExpeditions.length === 0 && (
                    <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/10">
                        <p className="text-gray-400 text-xl">No active expeditions at the moment. Check back soon!</p>
                    </div>
                )}
            </div>
        </div>
    );
}
