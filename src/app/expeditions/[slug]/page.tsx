'use client';

import { useParams, notFound } from 'next/navigation';
import { useExpeditions } from '@/contexts/ExpeditionContext';
import { slugify } from '@/lib/utils';
import { Calendar, MapPin, Thermometer, Users, Check, ArrowLeft, Shield, Star } from 'lucide-react';
import Link from 'next/link';
import Button from '@/components/ui/button';
import { useState } from 'react';
import CustomCalendar from '@/components/ui/custom-calendar';

export default function ExpeditionDetailsPage() {
    const params = useParams();
    const { expeditions } = useExpeditions();
    const slug = params.slug as string;
    const [date, setDate] = useState<Date | null>(null);
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);

    const expedition = expeditions.find((e) => slugify(e.title) === slug);

    if (!expedition) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-white mb-4">Expedition Not Found</h1>
                    <Link href="/expeditions" className="text-accent hover:underline">Return to Expeditions</Link>
                </div>
            </div>
        );
    }

    const formatDate = (d: Date) => {
        return d.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
    };

    const handleDateSelect = (newDate: Date) => {
        setDate(newDate);
        setIsCalendarOpen(false);
    };

    return (
        <main className="min-h-screen pt-24 pb-20 relative overflow-hidden animate-fade-in">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-[50vh] bg-gradient-to-b from-primary/10 to-transparent pointer-events-none" />

            <div className="container px-4 mx-auto relative z-10">
                <Link href="/expeditions" className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Expeditions
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    {/* LEFT COLUMN: Main Content */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Hero Image Section */}
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 aspect-video group">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
                            <img src={expedition.image} alt={expedition.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />

                            {/* Tags floating on image (Top Left) */}
                            <div className="absolute top-6 left-6 z-20 flex gap-2">
                                {expedition.discountedPrice && (
                                    <span className="px-4 py-1.5 bg-white text-black text-xs font-bold uppercase tracking-widest rounded-full shadow-lg">
                                        Sale
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Details "Card" Container */}
                        <div className="relative bg-zinc-950/50 backdrop-blur-3xl border border-white/5 rounded-3xl p-8 md:p-10 overflow-hidden">
                            {/* Subtle top shine */}
                            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                            {/* Type / Badge */}
                            <div className="flex items-center gap-3 mb-6">
                                <span className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[10px] uppercase tracking-widest text-gray-400 font-medium">
                                    Verified Expedition
                                </span>
                                <span className="h-px w-8 bg-white/10" />
                                <span className="text-xs text-gray-500 uppercase tracking-wide">Since 2010</span>
                            </div>

                            {/* Title */}
                            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 font-bold tracking-tight">{expedition.title}</h1>

                            {/* Meta Stats Row */}
                            <div className="flex flex-wrap gap-6 mb-8 text-sm text-gray-300 border-b border-white/5 pb-8">
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4 text-white/60" />
                                    <span>{expedition.location || 'Remote Location'}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-white/60" />
                                    <span>{expedition.duration}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Shield className="w-4 h-4 text-white/60" />
                                    <span>Difficulty: <span className="text-white">{expedition.difficulty}</span></span>
                                </div>
                            </div>

                            {/* Main Body Grid - Split into Content (Left) and Info (Right) */}
                            <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
                                {/* Left Sub-col: Narrative Content (3/5 width) */}
                                <div className="md:col-span-3 space-y-10">

                                    {/* About / Trip Details */}
                                    <div className="space-y-4">
                                        <h3 className="text-xl font-bold text-white">About the Journey</h3>
                                        <div className="w-12 h-0.5 bg-accent/50" />
                                        <p className="text-gray-400 leading-loose text-sm">
                                            {expedition.description}
                                            <br /><br />
                                            {expedition.fullDescription || expedition.description}
                                        </p>
                                    </div>

                                    {/* Flora and Fauna */}
                                    {expedition.floraFauna && (
                                        <div className="space-y-4">
                                            <h3 className="text-xl font-bold text-white">Flora and Fauna</h3>
                                            <div className="w-12 h-0.5 bg-accent/50" />
                                            <p className="text-gray-400 leading-loose text-sm">
                                                {expedition.floraFauna}
                                            </p>
                                        </div>
                                    )}

                                    {/* Safari Experience */}
                                    {expedition.safariExperience && (
                                        <div className="space-y-4">
                                            <h3 className="text-xl font-bold text-white">Safari Experience</h3>
                                            <div className="w-12 h-0.5 bg-accent/50" />
                                            <p className="text-gray-400 leading-loose text-sm">
                                                {expedition.safariExperience}
                                            </p>
                                        </div>
                                    )}

                                    {/* Gallery Mini-Grid */}
                                    {expedition.gallery && expedition.gallery.length > 0 && (
                                        <div>
                                            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4">Gallery</h3>
                                            <div className="grid grid-cols-3 gap-3">
                                                {expedition.gallery.slice(0, 3).map((img, i) => (
                                                    <img key={i} src={img} alt="Gallery" className="rounded-lg object-cover aspect-square border border-white/5 hover:border-white/20 transition-colors" />
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Right Sub-col: Key Info & Policies (2/5 width) */}
                                <div className="md:col-span-2 space-y-10 border-l border-white/5 pl-0 md:pl-8">

                                    {/* Highlights */}
                                    <div>
                                        <h3 className="text-sm font-bold uppercase tracking-widest text-white mb-4">Highlights</h3>
                                        <ul className="space-y-3">
                                            {expedition.highlights.slice(0, 4).map((highlight, idx) => (
                                                <li key={idx} className="flex items-start text-sm text-gray-400">
                                                    <span className="mr-3 text-accent">•</span>
                                                    {highlight}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Safari Timings */}
                                    {expedition.safariTimings && (
                                        <div>
                                            <h3 className="text-sm font-bold uppercase tracking-widest text-white mb-4">Safari Timings</h3>
                                            <p className="text-sm text-gray-400 leading-relaxed">
                                                {expedition.safariTimings}
                                            </p>
                                        </div>
                                    )}

                                    {/* Packages Options */}
                                    {expedition.packages && expedition.packages.length > 0 && (
                                        <div>
                                            <h3 className="text-sm font-bold uppercase tracking-widest text-white mb-4">Packages</h3>
                                            <div className="space-y-4">
                                                {expedition.packages.map((pkg, idx) => (
                                                    <div key={idx} className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                                                        <div className="flex justify-between items-baseline mb-1">
                                                            <span className="text-white font-medium text-sm">{pkg.name}</span>
                                                            <span className="text-accent text-xs font-bold">{pkg.price}</span>
                                                        </div>
                                                        <p className="text-xs text-gray-500 leading-relaxed">{pkg.desc}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* What's Included */}
                                    <div>
                                        <h3 className="text-sm font-bold uppercase tracking-widest text-white mb-4">Inclusions</h3>
                                        <ul className="space-y-2">
                                            <li className="text-xs text-gray-400 flex items-center gap-2"><Check className="w-3 h-3 text-white/40" /> Professional Guide</li>
                                            <li className="text-xs text-gray-400 flex items-center gap-2"><Check className="w-3 h-3 text-white/40" /> All Equipment</li>
                                            <li className="text-xs text-gray-400 flex items-center gap-2"><Check className="w-3 h-3 text-white/40" /> Meals & Permits</li>
                                        </ul>
                                    </div>

                                    {/* Exclusions */}
                                    {expedition.exclusions && (
                                        <div>
                                            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4">Exclusions</h3>
                                            <ul className="space-y-2">
                                                {expedition.exclusions.map((excl, idx) => (
                                                    <li key={idx} className="text-xs text-gray-500 flex items-center gap-2">
                                                        <span className="w-1 h-1 rounded-full bg-red-500/50" />
                                                        {excl}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {/* Policy & Disclaimer */}
                                    <div className="pt-6 border-t border-white/5">
                                        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Cancellation Policy</h3>
                                        <p className="text-[10px] text-gray-600 leading-relaxed mb-4">
                                            {expedition.policy || "Standard terms apply."}
                                        </p>
                                        <p className="text-[10px] text-zinc-700 italic border-l-2 border-zinc-800 pl-3">
                                            "Refunds are subject to standard terms and conditions. No refunds will be issued during peak seasons, weekends, or public holidays."
                                        </p>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Booking Card */}
                    <div className="lg:col-span-1 relative h-full z-30">
                        <div className="sticky top-24">
                            <div className="bg-zinc-950/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl relative overflow-hidden group">
                                {/* Ambient Glow */}
                                <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-white/5 blur-[100px] rounded-full pointer-events-none -mr-20 -mt-20" />

                                {/* Header: Price */}
                                <div className="mb-8 relative z-10">
                                    <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-2">Starting From</p>
                                    <div className="flex items-baseline gap-3">
                                        <span className="text-4xl font-serif text-white">
                                            {expedition.discountedPrice || expedition.price}
                                        </span>
                                        {expedition.discountedPrice && (
                                            <span className="text-sm text-gray-500 line-through decoration-gray-600">
                                                {expedition.price}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Date Input */}
                                <div className="space-y-4 mb-8 relative z-10">
                                    <div
                                        className="group/input relative cursor-pointer"
                                        onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                                    >
                                        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                                            <Calendar className="w-4 h-4 text-gray-400 group-hover/input:text-white transition-colors" />
                                        </div>
                                        <input
                                            type="text"
                                            readOnly
                                            value={date ? formatDate(date) : ''}
                                            placeholder="Select Date"
                                            className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-sm text-white focus:outline-none focus:bg-white/10 transition-all cursor-pointer placeholder:text-gray-500 font-medium"
                                        />
                                        <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                                            <span className="text-gray-500 text-xs">▼</span>
                                        </div>
                                    </div>

                                    {/* Calendar Dropdown */}
                                    {isCalendarOpen && (
                                        <div className="absolute top-full left-0 right-0 mt-2 z-50 flex justify-center shadow-2xl rounded-2xl overflow-hidden">
                                            <CustomCalendar
                                                date={date}
                                                onChange={handleDateSelect}
                                                className="bg-zinc-900 border-white/10 w-full"
                                            />
                                        </div>
                                    )}
                                </div>

                                {/* Stats Info */}
                                <div className="grid grid-cols-2 gap-4 mb-8 border-t border-white/5 pt-6 relative z-10">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                                            <Calendar className="w-3 h-3 text-white" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-gray-500 uppercase tracking-wider">Duration</p>
                                            <p className="text-sm text-white font-medium">{expedition.duration}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                                            <Shield className="w-3 h-3 text-white" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-gray-500 uppercase tracking-wider">Level</p>
                                            <p className="text-sm text-white font-medium">{expedition.difficulty}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="grid grid-cols-2 gap-3 relative z-10">
                                    <Button
                                        className="w-full py-6 text-sm uppercase tracking-wider font-bold bg-white text-black hover:bg-gray-200 border-0"
                                        variant="solid"
                                        onClick={() => alert('Booking feature coming soon!')}
                                    >
                                        Book Now
                                    </Button>
                                    <Button
                                        className="w-full py-6 text-sm uppercase tracking-wider font-bold bg-transparent text-white border border-white/20 hover:bg-white/5 hover:border-white/40 backdrop-blur-sm"
                                        variant="outline"
                                        onClick={() => alert('Added to cart!')}
                                    >
                                        Add to Cart
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Close calendar on click outside */}
            {isCalendarOpen && (
                <div className="fixed inset-0 z-10" onClick={() => setIsCalendarOpen(false)} />
            )}
        </main>
    );
}
