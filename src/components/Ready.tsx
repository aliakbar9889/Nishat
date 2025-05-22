import React from 'react';
import Link from 'next/link';

const Ready = () => {
  return (
    <div className="w-full h-auto min-h-[80vh] sm:min-h-screen bg-[#CDEA48] py-12 sm:py-14 md:py-16 flex flex-col items-center justify-center px-4">
      <h1 className="text-black font-lato font-bold tracking-tighter leading-none text-center mb-2 sm:mb-[-16px] md:mb-[-20px] text-6xl sm:text-8xl md:text-[160px]">
        READY
      </h1>

      <h1 className="text-black font-lato font-bold tracking-tighter leading-none text-center mb-2 sm:mb-[-16px] md:mb-[-20px] text-6xl sm:text-8xl md:text-[160px]">
        TO START
      </h1>

      <h1 className="text-black font-lato font-bold tracking-tighter leading-none text-center mb-10 sm:mb-10 md:mb-10 text-6xl sm:text-8xl md:text-[160px]">
        THE SHOPPING ?
      </h1>

      <div>
        <Link href="/shop">
          <span className="relative inline-block px-6 py-3 sm:px-8 sm:py-4 text-lg sm:text-xl font-manrope border-2 rounded-full border-black text-black overflow-hidden group z-10 cursor-pointer">
            <span className="relative z-10 transition-colors duration-200 group-hover:text-white">
              SHOP NOW
            </span>
            <span className="absolute inset-0 bg-black scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-500 ease-in-out z-0"></span>
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Ready;