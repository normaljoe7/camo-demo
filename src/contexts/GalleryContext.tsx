'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface GalleryImage {
    id: string;
    src: string;
    alt: string;
    uploadedBy: string; // User Name
    date: string;
    status: 'approved' | 'pending';
    expeditionId?: string; // Optional link to specific expedition
}

interface GalleryContextType {
    images: GalleryImage[]; // Approved images
    pendingImages: GalleryImage[]; // Pending approval
    uploadImage: (image: Omit<GalleryImage, 'id' | 'status' | 'date'>) => void;
    approveImage: (id: string) => void;
    rejectImage: (id: string) => void;
}

const GalleryContext = createContext<GalleryContextType | undefined>(undefined);

export function GalleryProvider({ children }: { children: ReactNode }) {
    const [allImages, setAllImages] = useState<GalleryImage[]>([]);

    useEffect(() => {
        const stored = localStorage.getItem('gallery_data_v1');
        if (stored) {
            setAllImages(JSON.parse(stored));
        } else {
            // Seed with some initial data if empty? 
            // For now, start empty or assume constants handled elsewhere, 
            // but this context manages USER uploads primarily.
            // If we want to mix constants, we'd import them, but let's keep this for dynamic uploads.
        }
    }, []);

    useEffect(() => {
        if (allImages.length > 0) {
            localStorage.setItem('gallery_data_v1', JSON.stringify(allImages));
        }
    }, [allImages]);

    const uploadImage = (image: Omit<GalleryImage, 'id' | 'status' | 'date'>) => {
        const newImage: GalleryImage = {
            ...image,
            id: Date.now().toString(),
            date: new Date().toLocaleDateString(),
            status: 'pending'
        };
        setAllImages(prev => [newImage, ...prev]);
        // Ideally notify admin
    };

    const approveImage = (id: string) => {
        setAllImages(prev => prev.map(img => img.id === id ? { ...img, status: 'approved' } : img));
    };

    const rejectImage = (id: string) => {
        setAllImages(prev => prev.filter(img => img.id !== id));
    };

    const images = allImages.filter(img => img.status === 'approved');
    const pendingImages = allImages.filter(img => img.status === 'pending');

    return (
        <GalleryContext.Provider value={{
            images,
            pendingImages,
            uploadImage,
            approveImage,
            rejectImage
        }}>
            {children}
        </GalleryContext.Provider>
    );
}

export function useGallery() {
    const context = useContext(GalleryContext);
    if (context === undefined) {
        throw new Error('useGallery must be used within a GalleryProvider');
    }
    return context;
}
