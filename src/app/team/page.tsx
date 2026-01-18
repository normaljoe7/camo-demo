'use client';

import { Users, Mail } from 'lucide-react';
import Card from '@/components/ui/card';

const teamMembers = [
    {
        name: "Syed Yaseen",
        role: "Lead Guide",
        bio: "Wildlife specialist, photographer and captain",
        image: "https://images.unsplash.com/photo-1519058082700-08a0b56da9b4?auto=format&fit=crop&q=80&w=800"
    },
    {
        name: "Mohammad Nouman",
        role: "Expedition Planner",
        bio: "Big Cat enthusiast and aspiring wildlife photographer",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=800"
    },
    {
        name: "Syeda Zaiba Naiyer",
        role: "Host and Customer Relationshipm Manager",
        bio: "Orchestrating complex supply chains to keep our teams well-equipped and moving.",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800"
    }
];

export default function TeamPage() {
    return (
        <div className="min-h-screen pt-24 pb-20">
            <div className="container px-4 mx-auto animate-fade-in">
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-bold text-white mb-6">Meet The Team</h1>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        World-class experts dedicated to making your expedition safe, successful, and unforgettable.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {teamMembers.map((member, index) => (
                        <Card key={index} className="bg-black/40 border-white/10 hover:border-white/30 w-full">
                            <div className="h-64 overflow-hidden">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <div className="p-6 text-center">
                                <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                                <p className="text-accent text-sm font-medium mb-4 uppercase tracking-wider">{member.role}</p>
                                <p className="text-gray-400 text-sm">{member.bio}</p>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
