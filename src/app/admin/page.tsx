'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useExpeditions, Expedition } from '@/contexts/ExpeditionContext';
import { useRouter } from 'next/navigation';
import { Plus, Edit, Trash, Pause, Play, LogOut, Package, Percent, Settings } from 'lucide-react';
import AnimatedButton from '@/components/ui/AnimatedButton';
import ExpeditionForm from '@/components/admin/ExpeditionForm';

export default function AdminDashboard() {
    const { user, logout, isLoading } = useAuth();
    const { expeditions, deleteExpedition, toggleStatus, addExpedition, updateExpedition, applyDiscount } = useExpeditions();
    const router = useRouter();

    const [view, setView] = useState<'list' | 'settings'>('list');
    const [showForm, setShowForm] = useState(false);
    const [editingExpedition, setEditingExpedition] = useState<Expedition | undefined>(undefined);

    const [discountForm, setDiscountForm] = useState({
        value: 0,
        type: 'percent' as 'percent' | 'flat',
        target: 'all' as number | 'all'
    });

    useEffect(() => {
        if (!isLoading && (!user || !user.isAdmin)) {
            router.push('/admin-login');
        }
    }, [user, isLoading, router]);

    if (isLoading || !user?.isAdmin) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
            </div>
        );
    }

    const handleEdit = (expedition: Expedition) => {
        setEditingExpedition(expedition);
        setShowForm(true);
    };

    const handleAddNew = () => {
        setEditingExpedition(undefined);
        setShowForm(true);
    };

    const codeSave = (data: Omit<Expedition, 'id'>) => {
        if (editingExpedition) {
            updateExpedition(editingExpedition.id, data);
        } else {
            addExpedition(data);
        }
        setShowForm(false);
    };

    const handleApplyDiscount = (e: React.FormEvent) => {
        e.preventDefault();
        applyDiscount(discountForm.target, discountForm.type, Number(discountForm.value));
        alert('Discount Applied!');
    };

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                <div>
                    <h1 className="text-4xl font-bold text-white mb-2">Mission Control</h1>
                    <p className="text-gray-400">Manage expeditions, pricing, and availability.</p>
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={() => setView('list')}
                        className={`px-4 py-2 rounded-lg transition-colors ${view === 'list' ? 'bg-white text-black' : 'bg-black/40 text-gray-400 hover:text-white'}`}
                    >
                        <Package className="inline-block mr-2 h-4 w-4" /> Expeditions
                    </button>
                    <button
                        onClick={() => setView('settings')}
                        className={`px-4 py-2 rounded-lg transition-colors ${view === 'settings' ? 'bg-white text-black' : 'bg-black/40 text-gray-400 hover:text-white'}`}
                    >
                        <Percent className="inline-block mr-2 h-4 w-4" /> Discounts
                    </button>
                    <button
                        onClick={logout}
                        className="px-4 py-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-colors border border-red-500/20"
                    >
                        <LogOut className="inline-block mr-2 h-4 w-4" /> Logout
                    </button>
                </div>
            </div>

            {view === 'settings' ? (
                <div className="animate-fade-in bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-8 max-w-2xl mx-auto">
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                        <Percent className="h-6 w-6 text-accent" /> Global Discount Manager
                    </h2>
                    <form onSubmit={handleApplyDiscount} className="space-y-6">
                        <div>
                            <label className="block text-gray-300 mb-2">Discount Value</label>
                            <input
                                type="number"
                                value={discountForm.value}
                                onChange={(e) => setDiscountForm({ ...discountForm, value: parseFloat(e.target.value) })}
                                className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-300 mb-2">Type</label>
                            <select
                                value={discountForm.type}
                                onChange={(e) => setDiscountForm({ ...discountForm, type: e.target.value as 'percent' | 'flat' })}
                                className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white"
                            >
                                <option value="percent">Percentage (%)</option>
                                <option value="flat">Flat Amount ($)</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-gray-300 mb-2">Target</label>
                            <select
                                value={discountForm.target}
                                onChange={(e) => setDiscountForm({ ...discountForm, target: e.target.value === 'all' ? 'all' : parseInt(e.target.value) })}
                                className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white"
                            >
                                <option value="all">All Expeditions</option>
                                {expeditions.map(e => (
                                    <option key={e.id} value={e.id}>{e.title}</option>
                                ))}
                            </select>
                        </div>
                        <AnimatedButton
                            type="submit"
                            variant="solid"
                            className="w-full"
                            onClick={() => { }}
                        >
                            Apply Discount
                        </AnimatedButton>
                    </form>
                </div>
            ) : showForm ? (
                <div className="animate-fade-in">
                    <ExpeditionForm
                        initialData={editingExpedition}
                        onSave={codeSave}
                        onCancel={() => setShowForm(false)}
                    />
                </div>
            ) : (
                /* Expeditions List */
                <div className="grid grid-cols-1 gap-6 animate-fade-in">
                    {/* Toolbar */}
                    <div className="flex justify-between items-center bg-secondary/10 p-4 rounded-xl border border-white/5">
                        <p className="text-gray-400">Total Expeditions: <span className="text-white font-bold">{expeditions.length}</span></p>
                        <AnimatedButton
                            onClick={handleAddNew}
                            variant="white"
                            className="border border-gray-300 hover:border-white"
                            icon={Plus}
                        >
                            Add Expedition
                        </AnimatedButton>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {expeditions.map((exp) => (
                            <div key={exp.id} className={`group relative bg-black/40 backdrop-blur-md border ${exp.status === 'paused' ? 'border-red-900/50 opacity-70' : 'border-white/10'} rounded-2xl overflow-hidden hover:border-white/30 transition-all`}>
                                <div className="h-48 overflow-hidden relative">
                                    <img src={exp.image} alt={exp.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    {exp.discountedPrice && (
                                        <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                                            SALE
                                        </div>
                                    )}
                                    <div className="absolute top-2 left-2 bg-black/60 backdrop-blur text-white text-xs font-bold px-2 py-1 rounded border border-white/10">
                                        {exp.status.toUpperCase()}
                                    </div>
                                </div>

                                <div className="p-5">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-xl font-bold text-white truncate w-[80%]">{exp.title}</h3>
                                        {exp.discountedPrice ? (
                                            <div className="text-right">
                                                <div className="text-gray-500 line-through text-xs">{exp.price}</div>
                                                <div className="text-accent font-bold">{exp.discountedPrice}</div>
                                            </div>
                                        ) : (
                                            <div className="text-white font-bold">{exp.price}</div>
                                        )}
                                    </div>

                                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">{exp.description}</p>

                                    <div className="flex gap-2 border-t border-white/10 pt-4 mt-2">
                                        <button
                                            onClick={() => handleEdit(exp)}
                                            className="flex-1 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white text-sm font-medium transition-colors"
                                        >
                                            <Edit className="inline-block mt-[-2px] h-3 w-3 mr-1" /> Edit
                                        </button>
                                        <button
                                            onClick={() => toggleStatus(exp.id)}
                                            className="px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors"
                                            title={exp.status === 'active' ? 'Pause' : 'Resume'}
                                        >
                                            {exp.status === 'active' ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                                        </button>
                                        <button
                                            onClick={() => { if (confirm('Are you sure?')) deleteExpedition(exp.id) }}
                                            className="px-3 py-2 rounded-lg bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white transition-colors"
                                        >
                                            <Trash className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
