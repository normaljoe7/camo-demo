'use client';

import { useState } from 'react';
import { X, Calendar, Clock, Camera, Aperture, Info } from 'lucide-react';

import { galleryImages } from '@/lib/constants';

export default function GalleryPage() {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    return (
        <div className="min-h-screen pt-24 pb-20">
            <div className="container px-4 mx-auto animate-fade-in">
                <h1 className="text-5xl font-bold text-white mb-12 text-center text-glow">Expedition Gallery</h1>

                <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                    {galleryImages.map((image, index) => (
                        <div
                            key={image.id || index}
                            className="relative group rounded-xl overflow-hidden cursor-pointer border border-white/5 hover:border-accent/50 transition-all duration-500 break-inside-avoid"
                            onClick={() => setSelectedImage(image.src)}
                        >
                            <img src={image.src} alt={image.alt || 'Gallery Image'} className="w-full h-auto transform group-hover:scale-105 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4">
                                <span className="text-accent text-sm font-bold uppercase tracking-widest mb-2">{image.category}</span>
                                <h3 className="text-white text-xl font-bold text-center mb-4">{image.alt}</h3>
                                <span className="text-white text-xs font-medium border border-white/30 px-4 py-2 rounded-full backdrop-blur-md hover:bg-white hover:text-black transition-colors">View Fullscreen</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Lightbox */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 animate-fade-in"
                    onClick={() => setSelectedImage(null)}
                >
                    <button
                        className="absolute top-6 right-6 text-white hover:text-gray-300"
                        onClick={() => setSelectedImage(null)}
                    >
                        <X className="w-10 h-10" />
                    </button>
                    <img src={selectedImage} alt="Fullscreen" className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl" />

                    {(() => {
                        const activeImage = galleryImages.find(img => img.src === selectedImage);
                        if (!activeImage) return null;

                        return (
                            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-black/80 backdrop-blur-md rounded-2xl p-6 border border-white/10 flex flex-nowrap gap-6 md:gap-10 items-center animate-slide-up max-w-[90vw] overflow-x-auto">
                                {/* Date */}
                                <div className="flex items-center gap-3 min-w-max">
                                    <div className="p-2.5 bg-white/5 rounded-full border border-white/5">
                                        <Calendar className="w-5 h-5 text-accent" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-gray-400 uppercase tracking-widest font-medium">Date</p>
                                        <p className="text-sm font-bold text-white font-mono">{activeImage.date || 'Unknown'}</p>
                                    </div>
                                </div>
                                <div className="w-px h-8 bg-white/10 hidden md:block" />

                                {/* Time */}
                                <div className="flex items-center gap-3 min-w-max">
                                    <div className="p-2.5 bg-white/5 rounded-full border border-white/5">
                                        <Clock className="w-5 h-5 text-accent" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-gray-400 uppercase tracking-widest font-medium">Time</p>
                                        <p className="text-sm font-bold text-white font-mono">{activeImage.time || 'Unknown'}</p>
                                    </div>
                                </div>
                                <div className="w-px h-8 bg-white/10 hidden md:block" />

                                {/* Camera */}
                                <div className="flex items-center gap-3 min-w-max">
                                    <div className="p-2.5 bg-white/5 rounded-full border border-white/5">
                                        <Camera className="w-5 h-5 text-accent" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-gray-400 uppercase tracking-widest font-medium">Device</p>
                                        <p className="text-sm font-bold text-white">{activeImage.camera || 'Unknown'}</p>
                                    </div>
                                </div>
                                <div className="w-px h-8 bg-white/10 hidden md:block" />

                                {/* Lens */}
                                <div className="flex items-center gap-3 min-w-max">
                                    <div className="p-2.5 bg-white/5 rounded-full border border-white/5">
                                        <Aperture className="w-5 h-5 text-accent" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-gray-400 uppercase tracking-widest font-medium">Lens</p>
                                        <p className="text-sm font-bold text-white">{activeImage.lens || 'Unknown'}</p>
                                    </div>
                                </div>
                                <div className="w-px h-8 bg-white/10 hidden md:block" />

                                {/* Settings */}
                                <div className="flex items-center gap-3 min-w-max">
                                    <div className="p-2.5 bg-white/5 rounded-full border border-white/5">
                                        <Info className="w-5 h-5 text-accent" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-gray-400 uppercase tracking-widest font-medium">Settings</p>
                                        <p className="text-sm font-bold text-white font-mono">{activeImage.settings || 'Auto'}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })()}
                </div>
            )}
        </div>
    );
}
