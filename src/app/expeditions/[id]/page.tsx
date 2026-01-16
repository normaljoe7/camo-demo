import { expeditions } from '@/lib/constants';
import { notFound } from 'next/navigation';
import { Calendar, MapPin, Thermometer, Users, Check, ArrowLeft, Shield, Star } from 'lucide-react';
import Link from 'next/link';
import Button from '@/components/ui/button';

// Force dynamic rendering or generate static params
export function generateStaticParams() {
    return expeditions.map((exp) => ({
        id: exp.id.toString(),
    }));
}

export default function ExpeditionDetailsPage({ params }: { params: { id: string } }) {
    const expedition = expeditions.find((e) => e.id.toString() === params.id);

    if (!expedition) {
        notFound();
    }

    return (
        <main className="min-h-screen pt-24 pb-20 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-[50vh] bg-gradient-to-b from-primary/10 to-transparent pointer-events-none" />

            <div className="container-custom relative z-10">
                <Link href="/#expeditions" className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Expeditions
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Hero Card */}
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 aspect-video group">
                            <div className="absolute inset-0 bg-gray-900/40 group-hover:bg-gray-900/30 transition-colors duration-500" />
                            {/* Placeholder for actual image */}
                            <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
                                <span className="text-white/20 font-bold text-4xl uppercase tracking-widest">{expedition.title}</span>
                            </div>

                            <div className="absolute top-6 left-6 flex gap-2">
                                <span className="px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-xs font-semibold text-white border border-white/10 uppercase tracking-wider">
                                    {expedition.difficulty}
                                </span>
                                <span className="px-3 py-1 bg-primary/80 backdrop-blur-md rounded-full text-xs font-semibold text-white border border-white/10 flex items-center">
                                    <Star className="w-3 h-3 mr-1 fill-white" />
                                    Featured
                                </span>
                            </div>
                        </div>

                        {/* Title & Stats */}
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{expedition.title}</h1>
                            <p className="text-xl text-gray-300 leading-relaxed">{expedition.description}</p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-secondary/30 backdrop-blur-sm rounded-xl border border-white/5">
                            <div className="space-y-1">
                                <div className="flex items-center text-primary text-sm font-semibold uppercase tracking-wider">
                                    <Calendar className="w-4 h-4 mr-2" />
                                    Duration
                                </div>
                                <div className="text-white font-medium">{expedition.duration}</div>
                            </div>
                            <div className="space-y-1">
                                <div className="flex items-center text-primary text-sm font-semibold uppercase tracking-wider">
                                    <Thermometer className="w-4 h-4 mr-2" />
                                    Season
                                </div>
                                <div className="text-white font-medium">{expedition.season}</div>
                            </div>
                            <div className="space-y-1">
                                <div className="flex items-center text-primary text-sm font-semibold uppercase tracking-wider">
                                    <Users className="w-4 h-4 mr-2" />
                                    Group Size
                                </div>
                                <div className="text-white font-medium">Max 8</div>
                            </div>
                            <div className="space-y-1">
                                <div className="flex items-center text-primary text-sm font-semibold uppercase tracking-wider">
                                    <Shield className="w-4 h-4 mr-2" />
                                    Safety
                                </div>
                                <div className="text-white font-medium">Premium</div>
                            </div>
                        </div>

                        {/* Highlights */}
                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold text-white">Expedition Highlights</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {expedition.highlights.map((highlight, idx) => (
                                    <div key={idx} className="flex items-start p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                                        <div className="mt-1 mr-4 flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                                            <Check className="w-3 h-3 text-primary" />
                                        </div>
                                        <span className="text-gray-200">{highlight}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Description / Story */}
                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold text-white">About The Journey</h3>
                            <div className="prose prose-invert max-w-none text-gray-300">
                                <p>
                                    Embark on an unforgettable journey into the wild. Our {expedition.title} package is designed for those who seek not just adventure, but a profound connection with nature.
                                    Every step is guided by our expert team, ensuring your safety while pushing the boundaries of exploration.
                                </p>
                                <p>
                                    From the moment you arrive, we handle all logistics, gear preparation, and route planning.
                                    You'll experience the raw beauty of the {expedition.title.split(' ')[0]} environment,
                                    untainted and pristine.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar (Booking) */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 bg-secondary/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl">
                            <div className="mb-6">
                                <span className="text-sm text-gray-400">Starting from</span>
                                <div className="flex items-baseline mt-1">
                                    <span className="text-3xl font-bold text-white">{expedition.price}</span>
                                    <span className="text-gray-400 ml-2">/ person</span>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300">Select Date</label>
                                    <input
                                        type="date"
                                        className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300">Travelers</label>
                                    <select className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all cursor-pointer">
                                        <option>1 Person</option>
                                        <option>2 People</option>
                                        <option>3 People</option>
                                        <option>4+ Group</option>
                                    </select>
                                </div>

                                <div className="pt-4 border-t border-white/10 space-y-3">
                                    <Button className="w-full justify-center text-lg py-6" variant="solid">
                                        Book Now
                                    </Button>
                                    <Button className="w-full justify-center bg-white/10 hover:bg-white/20 text-white border-transparent" variant="outline">
                                        Add to Cart
                                    </Button>
                                </div>

                                <div className="text-center">
                                    <span className="text-xs text-gray-500">
                                        Free cancellation up to 30 days before departure
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
