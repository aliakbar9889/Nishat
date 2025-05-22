'use client';

import { useState } from 'react';
import SplashScreen from './SplashScreen';
import Navbar from './Navbar';

export default function SplashWrapper({ children }: { children: React.ReactNode }) {
  const [showSplash, setShowSplash] = useState(true);

  return showSplash ? (
    <SplashScreen onFinish={() => setShowSplash(false)} />
  ) : (
    <>
      <Navbar />
      {children}
    </>
  );
}
