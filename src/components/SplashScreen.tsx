'use client';

import { useEffect } from 'react';
import Image from 'next/image';

export default function SplashScreen({ onFinish }: { onFinish: () => void }) {
  useEffect(() => {
    console.log('Splash screen started');
    const timer = setTimeout(() => {
      console.log('Splash screen ended');
      onFinish();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#1a1a1a] z-[9999] min-h-screen m-0 p-0">
      <div className="flex items-center justify-center animate-[logoAnimation_3s_ease-in-out_forwards]">
        <Image
          src="https://nishatlinen.com/cdn/shop/files/final_logo_1_nishat-golden.png?v=1691747968"
          alt="NISHAT"
          width={140}
          height={40}
          className="w-[140px] h-auto block"
          priority
          onError={() => console.error('Failed to load logo image')}
          onLoad={() => console.log('Logo image loaded successfully')}
        />
      </div>
    </div>
  );
}