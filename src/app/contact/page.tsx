'use client';

import { useState } from 'react';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function ContactPage() {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <div className="min-h-screen pt-24 pb-20">
            <div className="container px-4 mx-auto animate-fade-in">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    <div>
                        <h1 className="text-5xl font-bold text-white mb-8">Get In Touch</h1>
                        <p className="text-gray-400 text-lg mb-12">
                            Ready to plan your next adventure? Have questions about our upcoming expeditions?
                            Our team is here to help you start your journey.
                        </p>

                        <div className="space-y-8">
                            <div className="flex items-start">
                                <Mail className="w-6 h-6 text-accent mt-1 mr-4" />
                                <div>
                                    <h3 className="text-white font-bold mb-1">Email Us</h3>
                                    <p className="text-gray-400">info@camoscapes.com</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <Phone className="w-6 h-6 text-accent mt-1 mr-4" />
                                <div>
                                    <h3 className="text-white font-bold mb-1">Call Us</h3>
                                    <p className="text-gray-400">+1 (555) 123-4567</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <MapPin className="w-6 h-6 text-accent mt-1 mr-4" />
                                <div>
                                    <h3 className="text-white font-bold mb-1">Headquarters</h3>
                                    <p className="text-gray-400">123 Adventure Way<br />Basecamp City, ST 12345</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
                        {submitted ? (
                            <div className="h-full flex flex-col items-center justify-center text-center py-12">
                                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
                                    <Send className="w-10 h-10 text-green-500" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                                <p className="text-gray-400">We'll get back to you as soon as possible.</p>
                                <button
                                    onClick={() => setSubmitted(false)}
                                    className="mt-6 text-accent hover:text-white transition-colors"
                                >
                                    Send another message
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                                    <input type="text" className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:ring-2 focus:ring-accent outline-none transition-all" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                                    <input type="email" className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:ring-2 focus:ring-accent outline-none transition-all" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Subject</label>
                                    <select className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:ring-2 focus:ring-accent outline-none transition-all">
                                        <option>General Inquiry</option>
                                        <option>Expedition Booking</option>
                                        <option>Custom Trip</option>
                                        <option>Press / Media</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                                    <textarea className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:ring-2 focus:ring-accent outline-none transition-all h-32 resize-none" required></textarea>
                                </div>
                                <AnimatedButton variant="solid" type="submit" className="w-full justify-center">
                                    Send Message
                                </AnimatedButton>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
