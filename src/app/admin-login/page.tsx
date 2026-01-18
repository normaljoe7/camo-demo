'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { LogIn, Lock, Mail, ArrowRight } from 'lucide-react';
import Card from '@/components/ui/card';
import AnimatedButton from '@/components/ui/AnimatedButton';

export default function AdminLoginPage() {
    const router = useRouter();
    const { login } = useAuth();
    const [formData, setFormData] = useState({
        email: 'admin@expedition.com',
        password: 'admin123',
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            if (formData.email !== 'admin@expedition.com' || formData.password !== 'admin123') {
                // Let the context handle validation, or just fail here if we want strictly frontend check
                // But context `login` handles checking credentials.
                // However, context login checks: if (email === 'admin@expedition.com' && password === 'admin123')
            }

            await login(formData.email, formData.password);
            // Login context redirects to /admin if successful admin login

        } catch (err) {
            setError('Invalid admin credentials');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-24 pb-12 flex items-center justify-center px-4">
            <div className="w-full max-w-md animate-fade-in">
                <Card className="p-8 border-0 shadow-2xl bg-black/40 backdrop-blur-md border border-white/10">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center h-16 w-16 bg-red-500/10 rounded-full mb-4">
                            <LogIn className="h-8 w-8 text-red-500" />
                        </div>
                        <h1 className="text-3xl font-bold text-white mb-2">Admin Access</h1>
                        <p className="text-gray-400">Restricted area. Authorized personnel only.</p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                            <p className="text-red-400 text-sm">{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Admin Email
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full pl-10 pr-4 py-3 border border-white/20 bg-black/20 text-white placeholder-gray-500 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                                    placeholder="admin@expedition.com"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <input
                                    type="password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className="w-full pl-10 pr-12 py-3 border border-white/20 bg-black/20 text-white placeholder-gray-500 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <AnimatedButton
                            variant="solid"
                            size="lg"
                            className="w-full bg-red-600 hover:bg-red-700 text-white border-none"
                            disabled={isLoading}
                            icon={ArrowRight}
                            tooltipText={isLoading ? 'Verifying...' : 'Access Dashboard'}
                            onClick={() => { }}
                        >
                            {isLoading ? 'Verifying...' : 'Access Dashboard'}
                        </AnimatedButton>
                    </form>
                </Card>
            </div>
        </div>
    );
}
