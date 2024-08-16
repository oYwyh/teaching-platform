'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function Promo({ thumbnail, promo }: { thumbnail: string, promo: string }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        // Indicate that we are on the client side
        setIsClient(true);
    }, []);

    return (
        <div className="relative">
            {/* Video Player - only rendered on the client side */}
            {isClient && (
                <video
                    className={`w-full h-auto rounded-lg `}
                    controls
                    poster={`${process.env.NEXT_PUBLIC_R2_FILES_URL}/${thumbnail}`}
                >
                    <source src={`${process.env.NEXT_PUBLIC_R2_FILES_URL}/${promo}`} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            )}
        </div>
    );
}
