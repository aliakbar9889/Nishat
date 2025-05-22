// components/SuccessMessage.tsx
'use client';
import { useEffect, useState } from 'react';

interface Props {
  message: string;
}

export default function SuccessMessage({ message }: Props) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-2 rounded shadow-lg text-sm font-medium z-50">
      {message}
    </div>
  );
}
