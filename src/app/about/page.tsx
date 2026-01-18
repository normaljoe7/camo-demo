'use client';

import { MapPin, Globe, PenTool } from 'lucide-react';

export default function AboutPage() {
    return (
        <div className="min-h-screen pt-24 pb-20">
            <div className="container px-4 mx-auto animate-fade-in space-y-24">

                {/* Story Section */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h1 className="text-5xl font-bold text-white mb-6">Forged in the Wild</h1>
                        <div className="space-y-4 text-gray-300 text-lg leading-relaxed">
                            <p>
                                Started in 2024, Camoscapes was born from a simple belief: that true adventure isn't found on a map, but in the spaces between the known and unknown.
                            </p>
                            <p>
                                We are not just a travel agency. We are specific kind of explorers who believe that the journey matters just as much as the destination. We specialize in expeditions that challenge the spirit and reward the soul.
                            </p>
                            <p>
                                Our mission is to provide safe, sustainable, and life-altering experiences in the world's most remote environments.
                            </p>
                        </div>
                    </div>
                    <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                        <img src="https://images.unsplash.com/photo-1533240332313-0db49b459ad6?auto=format&fit=crop&q=80&w=1600" className="w-full h-full object-cover" alt="Wilderness" />
                    </div>
                </section>

                {/* Values */}
                <section>
                    <h2 className="text-3xl font-bold text-white text-center mb-12">Our Core Values</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white/5 p-8 rounded-2xl border border-white/5 text-center">
                            <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <MapPin className="text-accent w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Authentic Exploration</h3>
                            <p className="text-gray-400">We don't do tourist traps. We go where others don't, respecting the land and its people.</p>
                        </div>
                        <div className="bg-white/5 p-8 rounded-2xl border border-white/5 text-center">
                            <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Globe className="text-accent w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Sustainable Travel</h3>
                            <p className="text-gray-400">Leave no trace. We are committed to preserving the wilderness for future generations.</p>
                        </div>
                        <div className="bg-white/5 p-8 rounded-2xl border border-white/5 text-center">
                            <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <PenTool className="text-accent w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Expert Guidance</h3>
                            <p className="text-gray-400">Our team consists of world-class mountaineers, survivalists, and local legends.</p>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
}
