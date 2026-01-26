'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useBookings } from '@/contexts/BookingContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/button';
import { Calendar, MapPin, Clock, ArrowRight, User, CheckCircle, Smartphone } from 'lucide-react';

export default function MyTripsPage() {
    const { user, isLoading } = useAuth();
    const { bookings } = useBookings(); // This contains all bookings, we need to filter
    const router = useRouter();

    const [userBookings, setUserBookings] = useState<typeof bookings>([]);

    useEffect(() => {
        if (!isLoading && !user) {
            router.push('/auth/login');
        }
    }, [user, isLoading, router]);

    useEffect(() => {
        if (user && bookings) {
            // Filter bookings for the current user
            // Note: In a real app the API would return only user bookings usually, 
            // but here we filter the context state.
            const myBookings = bookings.filter(b => b.userId === user.id);
            // Sort by date descending (newest first)
            const sorted = [...myBookings].sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
            setUserBookings(sorted);
        }
    }, [user, bookings]);

    if (isLoading || !user) {
        return (
            <div className="min-h-screen pt-32 pb-12 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
            </div>
        );
    }

    const now = new Date();
    const upcomingTrips = userBookings.filter(b => new Date(b.endDate) >= now);
    const pastTrips = userBookings.filter(b => new Date(b.endDate) < now);

    return (
        <div className="min-h-screen pt-32 pb-20 px-4 container-custom">
            <div className="flex justify-between items-end mb-10 border-b border-white/10 pb-6">
                <div>
                    <h1 className="text-4xl font-bold text-white mb-2">My Expeditions</h1>
                    <p className="text-gray-400">Manage your upcoming adventures and relive past memories.</p>
                </div>
                <Link href="/expeditions">
                    <Button variant="outline" className="hidden md:flex">Browse Expeditions</Button>
                </Link>
            </div>

            {upcomingTrips.length === 0 && pastTrips.length === 0 ? (
                // Empty State
                <div className="flex flex-col items-center justify-center py-20 bg-white/5 rounded-3xl border border-white/10 text-center animate-fade-in">
                    <div className="bg-white/10 p-6 rounded-full mb-6">
                        <MapPin className="w-12 h-12 text-accent" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-4">No adventures booked yet</h2>
                    <p className="text-gray-400 max-w-md mb-8">
                        Your journey into the wild hasn't begun. Explore our curated expeditions and start your story today.
                    </p>
                    <Link href="/expeditions">
                        <Button variant="solid" size="lg" className="bg-accent text-black hover:bg-accent/80 font-bold uppercase tracking-wider">
                            Book Your First Safari
                        </Button>
                    </Link>
                </div>
            ) : (
                <div className="space-y-16 animate-fade-in">

                    {/* Upcoming Trips Section */}
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <span className="w-2 h-8 bg-accent rounded-full" />
                            Upcoming Trips
                            <span className="text-sm font-normal text-gray-500 ml-2">({upcomingTrips.length})</span>
                        </h2>

                        {upcomingTrips.length > 0 ? (
                            <div className="grid grid-cols-1 gap-6">
                                {upcomingTrips.map(booking => (
                                    <div key={booking.id} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:border-accent/40 transition-all group">
                                        <div className="flex flex-col md:flex-row">
                                            {/* Left color bar */}
                                            <div className="w-full md:w-2 bg-accent/80" />

                                            <div className="p-6 md:p-8 flex-1">
                                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                                                    <div>
                                                        <h3 className="text-2xl font-bold text-white mb-1">{booking.expeditionTitle}</h3>
                                                        <p className="text-sm text-gray-400 font-mono">Booking ID: <span className="text-white">#{booking.id.toUpperCase()}</span></p>
                                                    </div>
                                                    <div className="px-4 py-2 bg-green-500/20 text-green-400 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                                                        <CheckCircle className="w-3 h-3" />
                                                        {booking.status}
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                                                    <div className="flex flex-col gap-1">
                                                        <span className="text-xs text-gray-500 uppercase tracking-wider">Start Date</span>
                                                        <div className="flex items-center gap-2 text-white font-medium">
                                                            <Calendar className="w-4 h-4 text-accent" />
                                                            {new Date(booking.startDate).toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' })}
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col gap-1">
                                                        <span className="text-xs text-gray-500 uppercase tracking-wider">End Date</span>
                                                        <div className="flex items-center gap-2 text-white font-medium">
                                                            <Clock className="w-4 h-4 text-accent" />
                                                            {new Date(booking.endDate).toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' })}
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col gap-1">
                                                        <span className="text-xs text-gray-500 uppercase tracking-wider">Travellers</span>
                                                        <div className="flex items-center gap-2 text-white font-medium">
                                                            <User className="w-4 h-4 text-accent" />
                                                            {booking.passengers}
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col gap-1">
                                                        <span className="text-xs text-gray-500 uppercase tracking-wider">Total Price</span>
                                                        <div className="flex items-center gap-2 text-white font-medium">
                                                            {booking.totalPrice}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex flex-wrap gap-3 pt-6 border-t border-white/5">
                                                    <Button variant="outline" size="sm" className="bg-transparent border-white/20 hover:bg-white/10">Download Itinerary</Button>
                                                    <Button variant="outline" size="sm" className="bg-transparent border-white/20 hover:bg-white/10">Manage Guests</Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="p-8 bg-white/5 rounded-xl border border-white/10 text-center">
                                <p className="text-gray-400">No upcoming trips scheduled.</p>
                            </div>
                        )}
                    </section>

                    {/* Past Trips Section */}
                    {pastTrips.length > 0 && (
                        <section className="opacity-70 hover:opacity-100 transition-opacity duration-500">
                            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                                <span className="w-2 h-8 bg-gray-600 rounded-full" />
                                Past Expeditions
                                <span className="text-sm font-normal text-gray-500 ml-2">({pastTrips.length})</span>
                            </h2>

                            <div className="grid grid-cols-1 gap-4">
                                {pastTrips.map(booking => (
                                    <div key={booking.id} className="bg-black/40 border border-white/5 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 group hover:border-white/20 transition-all">
                                        <div className="flex-1">
                                            <h3 className="text-xl font-bold text-gray-300 mb-2 group-hover:text-white transition-colors">{booking.expeditionTitle}</h3>
                                            <p className="text-sm text-gray-500">
                                                {new Date(booking.startDate).toLocaleDateString()} — {new Date(booking.endDate).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <div className="flex gap-3">
                                            <Link href={`/expeditions/${booking.expeditionId}`}>
                                                <Button variant="outline" size="sm" className="border-white/10 text-gray-400 hover:text-white">View Details</Button>
                                            </Link>
                                            {/* Could add a 'Write Review' button or 'View Gallery' */}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                </div>
            )}
        </div>
    );
}
