'use client';

import { useCart } from '@/contexts/CartContext';
import { useBookings } from '@/contexts/BookingContext';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { Trash2, Calendar, Users, Briefcase, ArrowRight, ShoppingCart } from 'lucide-react';
import Button from '@/components/ui/button';
import Link from 'next/link';

export default function CartPage() {
    const { items, removeFromCart, clearCart, totalAmount } = useCart();
    const { addBooking } = useBookings();
    const { user } = useAuth();
    const router = useRouter();

    const handleCheckout = () => {
        if (!user) {
            router.push('/auth/login?redirect=/cart');
            return;
        }

        // Process each item as a booking
        items.forEach(item => {
            // Calculate end date based on duration (e.g. "4 days")
            const durationDays = parseInt(item.duration) || 1;
            const endDate = new Date(item.startDate);
            endDate.setDate(endDate.getDate() + durationDays);

            addBooking({
                userId: user.id,
                userName: user.name,
                expeditionId: item.expeditionId,
                expeditionTitle: item.expeditionTitle,
                startDate: item.startDate,
                endDate: endDate,
                passengers: item.passengers,
                totalPrice: `₹${(item.pricePerPerson * item.passengers).toLocaleString('en-IN')}`,
                status: 'pending' // Default status
            });
        });

        clearCart();
        alert('Booking confirmed! We will contact you shortly.');
        router.push('/account/trips'); // Or dashboard
    };

    if (items.length === 0) {
        return (
            <div className="min-h-screen pt-32 pb-20 px-4 container-custom flex flex-col items-center justify-center text-center">
                <div className="bg-white/5 p-8 rounded-full mb-6">
                    <ShoppingCart className="w-16 h-16 text-gray-400" />
                </div>
                <h1 className="text-3xl font-bold text-white mb-4">Your Cart is Empty</h1>
                <p className="text-gray-400 mb-8 max-w-md">Looks like you haven't added any expeditions yet. Explore our wild destinations and start your journey.</p>
                <Link href="/expeditions">
                    <Button variant="solid" size="lg" className="bg-accent text-black hover:bg-accent/80">Explore Expeditions</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-32 pb-20 px-4 container-custom">
            <h1 className="text-4xl font-bold text-white mb-8">Your Expedition Cart</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-6">
                    {items.map((item) => (
                        <div key={item.id} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 flex flex-col md:flex-row gap-6 group hover:border-white/20 transition-all">
                            {/* Image */}
                            <div className="w-full md:w-32 h-32 flex-shrink-0 rounded-xl overflow-hidden relative">
                                <img src={item.expeditionImage} alt={item.expeditionTitle} className="w-full h-full object-cover" />
                            </div>

                            {/* Details */}
                            <div className="flex-1">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-xl font-bold text-white">{item.expeditionTitle}</h3>
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="text-gray-500 hover:text-red-400 transition-colors p-1"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>

                                <div className="grid grid-cols-2 gap-4 text-sm text-gray-300 mt-4">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4 text-accent" />
                                        <span>{new Date(item.startDate).toLocaleDateString(undefined, { dateStyle: 'medium' })}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Users className="w-4 h-4 text-accent" />
                                        <span>{item.passengers} Travellers</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Briefcase className="w-4 h-4 text-accent" />
                                        <span>{item.packageType} Package</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-accent font-bold">₹{(item.pricePerPerson * item.passengers).toLocaleString('en-IN')}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Summary */}
                <div className="lg:col-span-1">
                    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 sticky top-32">
                        <h3 className="text-xl font-bold text-white mb-6">Booking Summary</h3>

                        <div className="space-y-4 mb-6 border-b border-white/10 pb-6">
                            <div className="flex justify-between text-gray-300">
                                <span>Subtotal ({items.length} items)</span>
                                <span>₹{totalAmount.toLocaleString('en-IN')}</span>
                            </div>
                            <div className="flex justify-between text-gray-300">
                                <span>Taxes & Fees</span>
                                <span>Calculated at checkout</span>
                            </div>
                        </div>

                        <div className="flex justify-between text-white font-bold text-xl mb-8">
                            <span>Total</span>
                            <span>₹{totalAmount.toLocaleString('en-IN')}</span>
                        </div>

                        <Button
                            variant="solid"
                            className="w-full py-4 text-black font-bold uppercase tracking-wider bg-accent hover:bg-accent/80"
                            onClick={handleCheckout}
                        >
                            Proceed to Checkout <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>

                        <p className="text-xs text-gray-500 text-center mt-4">
                            By proceeding, you agree to our terms and cancellation policy.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
