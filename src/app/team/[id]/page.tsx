import { teamMembers } from '@/lib/constants';
import { notFound } from 'next/navigation';
import { MapPin, Trophy, Clock, Star, ArrowLeft, Mail, Phone, Instagram, Linkedin } from 'lucide-react';
import Link from 'next/link';
import Button from '@/components/ui/button';

// Force dynamic rendering or generate static params
export function generateStaticParams() {
    return teamMembers.map((member) => ({
        id: member.id.toString(),
    }));
}

export default function TeamMemberPage({ params }: { params: { id: string } }) {
    const member = teamMembers.find((m) => m.id.toString() === params.id);

    if (!member) {
        notFound();
    }

    return (
        <main className="min-h-screen pt-24 pb-20 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-[50vh] bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />

            <div className="container-custom relative z-10">
                <Link href="/#team" className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Team
                </Link>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
                    {/* Profile Card (Left Column) */}
                    <div className="md:col-span-1">
                        <div className="bg-secondary/30 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl relative overflow-hidden group">
                            <div className="aspect-square rounded-xl overflow-hidden mb-6 relative bg-gray-800">
                                {/* Placeholder for actual image */}
                                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
                                    <MapPin className="h-24 w-24 text-white/10" />
                                </div>
                            </div>

                            <div className="text-center mb-6">
                                <h1 className="text-2xl font-bold text-white mb-2">{member.name}</h1>
                                <span className="inline-block px-3 py-1 bg-primary/20 text-primary rounded-full text-xs font-semibold uppercase tracking-wide">
                                    {member.role}
                                </span>
                            </div>

                            <div className="space-y-4 border-t border-white/10 pt-6">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-400">Experience</span>
                                    <span className="text-white font-medium">{member.experience}</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-400">Expeditions</span>
                                    <span className="text-white font-medium">40+</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-400">Rating</span>
                                    <span className="flex items-center text-white font-medium">
                                        <Star className="w-3 h-3 text-accent fill-accent mr-1" />
                                        5.0
                                    </span>
                                </div>
                            </div>

                            <div className="flex justify-center gap-4 mt-8">
                                <button className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
                                    <Instagram className="w-5 h-5" />
                                </button>
                                <button className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
                                    <Linkedin className="w-5 h-5" />
                                </button>
                                <button className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
                                    <Mail className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Details (Right Column) */}
                    <div className="md:col-span-2 space-y-8">
                        {/* Bio Section */}
                        <div className="bg-secondary/30 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-xl">
                            <h2 className="text-2xl font-bold text-white mb-4">About {member.name.split(' ')[0]}</h2>
                            <p className="text-gray-300 leading-relaxed indent-8">
                                {member.bio} {member.name} has dedicated their life to exploring the most remote corners of the globe.
                                With a passion for conservation and sustainable travel, they ensure that every expedition not only thrills the adventurers but also respects the delicate ecosystems we visit.
                            </p>
                            <p className="text-gray-300 leading-relaxed mt-4">
                                "The wild does not forgive mistakes, but it rewards respect and preparation," is {member.name.split(' ')[0]}'s motto.
                                Traveling with them means you are in the safest hands possible, learning from a master of the craft.
                            </p>
                        </div>

                        {/* Specialties */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-secondary/30 backdrop-blur-xl border border-white/10 rounded-xl p-6">
                                <div className="flex items-center mb-4 text-primary">
                                    <Trophy className="w-6 h-6 mr-3" />
                                    <h3 className="text-lg font-bold text-white">Specialty</h3>
                                </div>
                                <p className="text-gray-300 text-sm">{member.specialty}</p>
                            </div>
                            <div className="bg-secondary/30 backdrop-blur-xl border border-white/10 rounded-xl p-6">
                                <div className="flex items-center mb-4 text-primary">
                                    <Clock className="w-6 h-6 mr-3" />
                                    <h3 className="text-lg font-bold text-white">Recent Activity</h3>
                                </div>
                                <p className="text-gray-300 text-sm">Led the successful "Apex Arctic" expedition in Winter 2023.</p>
                            </div>
                        </div>

                        {/* Call to Action */}
                        <div className="bg-gradient-to-r from-primary/20 to-blue-900/20 border border-white/10 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2">Book an Expedition with {member.name.split(' ')[0]}</h3>
                                <p className="text-gray-300 text-sm">Check upcoming availability and join a guided tour.</p>
                            </div>
                            <Button variant="solid" className="shrink-0">
                                View Schedule
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
