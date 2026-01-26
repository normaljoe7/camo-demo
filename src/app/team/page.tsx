'use client';

import { Users, Mail } from 'lucide-react';
import Card from '@/components/ui/card';

const teamMembers = [
    {
        name: "Syed Yaseen",
        role: "Lead Guide",
        bio: "Big Cat Tracking Specialist with 10+ years of Field Experience in Wildlife Safaris. Expert in reading animal behavior, pugmarks, and movement patterns to deliver ethical, authentic big cat encounters. Driven by precision, patience, and deep respect for the wild.",
        image: "/images/yaseen.jpeg"
    },
    {
        name: "Mohammad Nouman",
        role: "Expedition Planner",
        bio: "Tiger Enthusiast with years of experience in habitat and behavioural understanding. Aspiring wildlife photographer. An Expedition Planner specializing in tiger behavior and habitat intelligence designing safaris based on how the forest truly works, not chance.",
        image: "/images/nouman.png"
    },
    {
        name: "Syeda Zeba Naiyer",
        role: "Customer Relationship Manager",
        bio: "Customer Support and Relationship Manager known for her calm approach, thoughtful communication, and solution-focused mindset. Inspired by the precision and patience of wildlife expeditions, she guides every customer journey with clarity, care, and confidence.",
        image: "/images/zeba.jpeg"
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
