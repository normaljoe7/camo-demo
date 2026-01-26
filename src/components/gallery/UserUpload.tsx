'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useGallery } from '@/contexts/GalleryContext';
import Button from '@/components/ui/button';
import { Camera, Image as ImageIcon, CheckCircle, XCircle } from 'lucide-react';

export default function UserUpload() {
    const { user, isLoggedIn } = useAuth();
    const { uploadImage } = useGallery();
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);
    const [success, setSuccess] = useState(false);

    // Condition: Must be logged in AND (completed at least 1 expedition OR is admin)
    const canUpload = isLoggedIn && user && (user.completedExpeditions > 0 || user.role === 'admin');

    if (!canUpload) return null;

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Mock preview
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
            setSuccess(false);
        }
    };

    const handleUpload = () => {
        if (!previewUrl || !user) return;
        setUploading(true);

        // Simulate network delay
        setTimeout(() => {
            uploadImage({
                src: previewUrl, // In real app, this would be cloud S3 URL
                alt: 'User Uploaded Expedition Photo',
                uploadedBy: user.name,
                expeditionId: 'General', // Could be specific if on specific page
            });
            setUploading(false);
            setSuccess(true);
            setPreviewUrl(null);
            setTimeout(() => setSuccess(false), 3000);
        }, 1500);
    };

    return (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Camera className="w-5 h-5 text-accent" />
                Share Your Experience
            </h3>
            <p className="text-gray-400 text-sm mb-6">
                As a verified explorer, you can contribute to our community gallery.
                Upload your best shots for a chance to be featured.
            </p>

            {success ? (
                <div className="bg-green-500/20 text-green-300 p-4 rounded-xl flex items-center gap-3 animate-fade-in">
                    <CheckCircle className="w-5 h-5" />
                    <span>Photo submitted for approval!</span>
                </div>
            ) : (
                <div className="space-y-4">
                    {!previewUrl ? (
                        <div className="border-2 border-dashed border-white/20 rounded-xl p-8 hover:bg-white/5 transition-colors text-center cursor-pointer relative">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                            <div className="flex flex-col items-center gap-2 text-gray-400">
                                <ImageIcon className="w-8 h-8 opacity-50" />
                                <span className="text-sm font-medium">Click to select photo</span>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div className="relative rounded-xl overflow-hidden aspect-video bg-black/50">
                                <img src={previewUrl} alt="Preview" className="w-full h-full object-contain" />
                                <button
                                    onClick={() => setPreviewUrl(null)}
                                    className="absolute top-2 right-2 p-1 bg-black/50 hover:bg-black/70 rounded-full text-white"
                                >
                                    <XCircle className="w-5 h-5" />
                                </button>
                            </div>
                            <Button
                                onClick={handleUpload}
                                disabled={uploading}
                                className="w-full bg-accent text-black hover:bg-accent/80 font-bold"
                            >
                                {uploading ? 'Uploading...' : 'Submit to Admin'}
                            </Button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
