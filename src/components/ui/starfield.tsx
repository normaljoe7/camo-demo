'use client';

import { useEffect, useState } from 'react';

export default function Starfield() {
    const [stars, setStars] = useState<string>('');
    const [stars2, setStars2] = useState<string>('');
    const [stars3, setStars3] = useState<string>('');

    useEffect(() => {
        const generateStars = (curr: number) => {
            let value = `${Math.floor(Math.random() * 2000)}px ${Math.floor(Math.random() * 2000)}px #FFF`;
            for (let i = 2; i <= curr; i++) {
                value += `, ${Math.floor(Math.random() * 2000)}px ${Math.floor(Math.random() * 2000)}px #FFF`;
            }
            return value;
        };

        setStars(generateStars(700));
        setStars2(generateStars(200));
        setStars3(generateStars(100));
    }, []);

    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
            {/* Small Stars */}
            <div
                className="w-[1px] h-[1px] bg-transparent animate-twinkle"
                style={{ boxShadow: stars, opacity: 0.4 }}
            />

            {/* Medium Stars */}
            <div
                className="w-[2px] h-[2px] bg-transparent animate-twinkle"
                style={{ boxShadow: stars2, opacity: 0.6, animationDelay: '1s' }}
            />

            {/* Large Stars */}
            <div
                className="w-[3px] h-[3px] bg-transparent animate-twinkle"
                style={{ boxShadow: stars3, opacity: 0.8, animationDelay: '2s' }}
            />
        </div>
    );
}
