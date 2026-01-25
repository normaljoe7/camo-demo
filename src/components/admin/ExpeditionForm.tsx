'use client';

import { useState } from 'react';
import { Expedition } from '@/contexts/ExpeditionContext';
import { X, Plus, Trash, Image as ImageIcon, Calendar } from 'lucide-react';
import AnimatedButton from '@/components/ui/AnimatedButton';
import CustomCalendar from '@/components/ui/custom-calendar';

interface ExpeditionFormProps {
    initialData?: Expedition;
    onSave: (data: Omit<Expedition, 'id'>) => void;
    onCancel: () => void;
}

export default function ExpeditionForm({ initialData, onSave, onCancel }: ExpeditionFormProps) {
    const [formData, setFormData] = useState<Omit<Expedition, 'id'>>({
        title: initialData?.title || '',
        description: initialData?.description || '',
        fullDescription: initialData?.fullDescription || '',
        duration: initialData?.duration || '',
        category: initialData?.category || 'South',
        price: initialData?.price || '',
        priceIndian: initialData?.priceIndian || '',
        priceForeign: initialData?.priceForeign || '',
        season: initialData?.season || '',
        image: initialData?.image || '',
        highlights: initialData?.highlights || [''],
        gallery: initialData?.gallery || [],
        location: initialData?.location || '',
        status: initialData?.status || 'active',
        pauseReason: initialData?.pauseReason || '',
        availableDates: initialData?.availableDates || [],
    });

    const [newImage, setNewImage] = useState('');
    const [showCalendar, setShowCalendar] = useState(false);
    const [newDateRange, setNewDateRange] = useState<{ from: Date | undefined; to?: Date | undefined }>({ from: undefined, to: undefined });

    const handleAddDateFromCalendar = () => {
        if (newDateRange.from && newDateRange.to) {
            const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
            const year = newDateRange.from.getFullYear();

            const startStr = newDateRange.from.toLocaleDateString('en-US', options);
            const endStr = newDateRange.to.toLocaleDateString('en-US', options);

            const formatted = `${startStr}-${endStr}, ${year}`; // Format: Jan 4-Jan 7, 2024

            setFormData(prev => ({
                ...prev,
                availableDates: [...(prev.availableDates || []), formatted]
            }));
            setShowCalendar(false);
            setNewDateRange({ from: undefined, to: undefined });
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // ... (keep existing handlers)

    const handleHighlightChange = (index: number, value: string) => {
        const newHighlights = [...formData.highlights];
        newHighlights[index] = value;
        setFormData(prev => ({ ...prev, highlights: newHighlights }));
    };

    const addHighlight = () => {
        setFormData(prev => ({ ...prev, highlights: [...prev.highlights, ''] }));
    };

    const removeHighlight = (index: number) => {
        setFormData(prev => ({ ...prev, highlights: prev.highlights.filter((_, i) => i !== index) }));
    };

    const handleAddImage = () => {
        if (newImage) {
            setFormData(prev => ({
                ...prev,
                gallery: [...(prev.gallery || []), newImage]
            }));
            setNewImage('');
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 bg-black/50 p-6 rounded-xl border border-white/10 text-left">
            <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-6">
                <h2 className="text-xl font-bold text-white">
                    {initialData ? 'Edit Expedition' : 'New Expedition'}
                </h2>
                <button type="button" onClick={onCancel} className="text-gray-400 hover:text-white">
                    <X className="h-6 w-6" />
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:ring-2 focus:ring-white/50 outline-none"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Location</label>
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:ring-2 focus:ring-white/50 outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Price (Default Display, e.g. ₹45,000)</label>
                        <input
                            type="text"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:ring-2 focus:ring-white/50 outline-none"
                            required
                        />
                    </div>

                    {formData.category === 'North' && (
                        <div className="grid grid-cols-2 gap-4 animate-fade-in">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">Indian Price</label>
                                <input
                                    type="text"
                                    name="priceIndian"
                                    value={formData.priceIndian || ''}
                                    onChange={handleChange}
                                    className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:ring-2 focus:ring-white/50 outline-none"
                                    placeholder="₹..."
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">Foreign Price</label>
                                <input
                                    type="text"
                                    name="priceForeign"
                                    value={formData.priceForeign || ''}
                                    onChange={handleChange}
                                    className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:ring-2 focus:ring-white/50 outline-none"
                                    placeholder="₹..."
                                />
                            </div>
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Duration</label>
                        <input
                            type="text"
                            name="duration"
                            value={formData.duration}
                            onChange={handleChange}
                            className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:ring-2 focus:ring-white/50 outline-none"
                            placeholder="e.g. 7 Days"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Category</label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:ring-2 focus:ring-white/50 outline-none"
                        >
                            <option value="South">South</option>
                            <option value="North">North</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Status</label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:ring-2 focus:ring-white/50 outline-none"
                        >
                            <option value="active">Active</option>
                            <option value="paused">Paused</option>
                        </select>
                    </div>

                    {formData.status === 'paused' && (
                        <div className="animate-fade-in">
                            <label className="block text-sm font-medium text-gray-300 mb-1">Pause Reason (Publicly Visible)</label>
                            <textarea
                                name="pauseReason"
                                value={formData.pauseReason}
                                onChange={handleChange}
                                className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:ring-2 focus:ring-white/50 outline-none h-20 resize-none"
                                placeholder="e.g. Closed for monsoon season..."
                            />
                        </div>
                    )}
                </div>

                <div className="space-y-4">
                    {/* ... (Keep Description and Full Description) ... */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Short Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:ring-2 focus:ring-white/50 outline-none h-24 resize-none"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Full Description</label>
                        <textarea
                            name="fullDescription"
                            value={formData.fullDescription}
                            onChange={handleChange}
                            className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:ring-2 focus:ring-white/50 outline-none h-32 resize-none"
                        />
                    </div>
                </div>
            </div>

            <div className="mt-6">
                {/* ... (Keep Images section) ... */}
                <label className="block text-sm font-medium text-gray-300 mb-2">Main Image URL</label>
                <div className="flex gap-2">
                    <input
                        type="text"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        className="flex-1 bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:ring-2 focus:ring-white/50 outline-none"
                        placeholder="https://..."
                    />
                </div>
                {formData.image && (
                    <img src={formData.image} alt="Preview" className="mt-2 h-32 w-full object-cover rounded-lg border border-white/10 opacity-70" />
                )}
            </div>

            <div className="mt-6">
                {/* ... (Keep Highlights) ... */}
                <label className="block text-sm font-medium text-gray-300 mb-2">Highlights</label>
                {formData.highlights.map((highlight, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                        <input
                            type="text"
                            value={highlight}
                            onChange={(e) => handleHighlightChange(index, e.target.value)}
                            className="flex-1 bg-black/20 border border-white/10 rounded-lg p-2 text-white focus:ring-2 focus:ring-white/50 outline-none"
                        />
                        <button type="button" onClick={() => removeHighlight(index)} className="p-2 text-red-400 hover:text-red-300">
                            <Trash className="h-5 w-5" />
                        </button>
                    </div>
                ))}
                <button type="button" onClick={addHighlight} className="text-sm text-accent hover:text-white flex items-center gap-1">
                    <Plus className="h-4 w-4" /> Add Highlight
                </button>
            </div>

            {/* ... (Keep Available Dates) ... */}
            {/* Available Dates */}
            <div className="mt-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">Available Dates</label>
                {(formData.availableDates || []).map((date, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                        <input
                            type="text"
                            value={date}
                            onChange={(e) => {
                                const newDates = [...(formData.availableDates || [])];
                                newDates[index] = e.target.value;
                                setFormData(prev => ({ ...prev, availableDates: newDates }));
                            }}
                            className="flex-1 bg-black/20 border border-white/10 rounded-lg p-2 text-white focus:ring-2 focus:ring-white/50 outline-none"
                        />
                        <button type="button" onClick={() => {
                            setFormData(prev => ({
                                ...prev,
                                availableDates: (prev.availableDates || []).filter((_, i) => i !== index)
                            }));
                        }} className="p-2 text-red-400 hover:text-red-300">
                            <Trash className="h-5 w-5" />
                        </button>
                    </div>
                ))}

                {/* Date Picker Integration */}
                <div className="mt-4 relative">
                    {!showCalendar ? (
                        <button
                            type="button"
                            onClick={() => setShowCalendar(true)}
                            className="text-sm text-accent hover:text-white flex items-center gap-1"
                        >
                            <Calendar className="h-4 w-4" /> Add Date Range (Calendar)
                        </button>
                    ) : (
                        <div className="bg-zinc-900 border border-white/10 rounded-xl p-4 animate-fade-in w-fit">
                            <h4 className="text-xs font-bold text-gray-400 uppercase mb-3">Select Range</h4>
                            <div className="flex gap-4 items-start">
                                <CustomCalendar
                                    mode="range"
                                    dateRange={newDateRange}
                                    onRangeChange={setNewDateRange}
                                    className="border-0 bg-transparent p-0 w-[260px]"
                                />
                                <div className="flex flex-col gap-2 min-w-[120px]">
                                    <div className="text-xs text-gray-500">Start: <span className="text-white block text-sm">{newDateRange.from ? newDateRange.from.toLocaleDateString() : '-'}</span></div>
                                    <div className="text-xs text-gray-500">End: <span className="text-white block text-sm">{newDateRange.to ? newDateRange.to.toLocaleDateString() : '-'}</span></div>

                                    <div className="mt-4 flex gap-2">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setShowCalendar(false);
                                                setNewDateRange({ from: undefined, to: undefined });
                                            }}
                                            className="px-3 py-2 text-xs text-gray-400 hover:text-white border border-white/10 rounded-lg"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="button"
                                            onClick={handleAddDateFromCalendar}
                                            disabled={!newDateRange.from || !newDateRange.to}
                                            className="px-3 py-2 text-xs bg-accent text-black font-bold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            Add
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>


            <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-white/10">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-6 py-2 rounded-lg text-white hover:bg-white/10 transition-colors"
                >
                    Cancel
                </button>
                <AnimatedButton
                    type="submit"
                    variant="solid"
                    className="bg-white text-black hover:bg-gray-200"
                    onClick={() => { }}
                >
                    Save Expedition
                </AnimatedButton>
            </div>
        </form>
    );
}
