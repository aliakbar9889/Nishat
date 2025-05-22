'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Features = () => {
  const [isHovering, setHovering] = useState([false, false, false]);
  const [isHoveringRight, setHoveringRight] = useState([false, false, false]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 640);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleHoverLeft = (index: number, value: boolean) => {
    if (!isMobile) {
      const newHovering = [...isHovering];
      newHovering[index] = value;
      setHovering(newHovering);
    }
  };

  const handleHoverRight = (index: number, value: boolean) => {
    if (!isMobile) {
      const newHoveringRight = [...isHoveringRight];
      newHoveringRight[index] = value;
      setHoveringRight(newHoveringRight);
    }
  };

  const leftImages = ['/pi1.png', '/pi3.png', '/pi5.png'];
  const rightImages = ['/pi2.png', '/pi4.png', '/pi6.png'];
  const leftTitles = ['MENS CLOTHING', 'KIDS CLOTHING', 'WOMENS HOODIES'];
  const rightTitles = ['WOMENS CLOTHING', 'MENS HOODIES', 'KIDS HOODIES'];
  const leftLinks = ['/mens', '/kid', '/womenhoody'];
  const rightLinks = ['/womens', '/menhoody', '/kidhoody'];

  return (
    <section className="w-full py-10 px-4 sm:px-10 md:px-20 bg-white">
      <header className="w-full border-b border-zinc-400 pb-6">
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-inter tracking-tight font-semibold">
          Featured Categories
        </h1>
      </header>

      {[0, 1, 2].map((rowIndex) => (
        <div key={rowIndex} className="w-full flex flex-wrap md:flex-nowrap gap-6 md:gap-10 mt-10">
          {/* Left Card */}
          <a
            href={leftLinks[rowIndex]}
            onMouseEnter={() => handleHoverLeft(rowIndex, true)}
            onMouseLeave={() => handleHoverLeft(rowIndex, false)}
            aria-label={leftTitles[rowIndex]}
            rel="noopener noreferrer"
            className="relative flex-1 min-w-[280px] h-[60vh] md:h-[75vh] rounded-lg bg-cover bg-center hover:cursor-pointer focus:outline-yellow-400 focus:ring-2 focus:ring-yellow-300 transition-shadow duration-300 ease-in-out"
            style={{ backgroundImage: `url(${leftImages[rowIndex]})` }}
          >
            {isMobile ? (
              <h1 className="absolute inset-0 flex items-center justify-center z-20 text-2xl sm:text-3xl md:text-4xl font-inter tracking-wide font-semibold text-yellow-400 bg-black bg-opacity-40 rounded-lg">
                {leftTitles[rowIndex]}
              </h1>
            ) : (
              isHovering[rowIndex] && (
                <h1 className="absolute flex left-full ml-3 overflow-hidden -translate-x-1/2 top-1/2 -translate-y-1/2 z-20 text-3xl sm:text-5xl md:text-7xl font-inter tracking-wide font-semibold text-yellow-400 whitespace-nowrap pointer-events-none">
                  {leftTitles[rowIndex].split('').map((item, index) => (
                    <motion.span
                      className="inline-block"
                      initial={{ y: '100%' }}
                      animate={{ y: '0%' }}
                      transition={{ ease: [0.22, 1, 0.36, 1], delay: index * 0.05 }}
                      key={index}
                      style={{ letterSpacing: '1px' }}
                    >
                      {item}
                    </motion.span>
                  ))}
                </h1>
              )
            )}
          </a>

          {/* Right Card */}
          <a
            href={rightLinks[rowIndex]}
            onMouseEnter={() => handleHoverRight(rowIndex, true)}
            onMouseLeave={() => handleHoverRight(rowIndex, false)}
            aria-label={rightTitles[rowIndex]}
            rel="noopener noreferrer"
            className="relative flex-1 min-w-[280px] h-[60vh] md:h-[75vh] rounded-lg bg-cover bg-center hover:cursor-pointer focus:outline-yellow-400 focus:ring-2 focus:ring-yellow-300 transition-shadow duration-300 ease-in-out"
            style={{ backgroundImage: `url(${rightImages[rowIndex]})` }}
          >
            {isMobile ? (
              <h1 className="absolute inset-0 flex items-center justify-center z-20 text-2xl sm:text-3xl md:text-4xl font-inter tracking-wide font-semibold text-yellow-400 bg-black bg-opacity-40 rounded-lg">
                {rightTitles[rowIndex]}
              </h1>
            ) : (
              isHoveringRight[rowIndex] && (
                <h1 className="absolute flex right-full overflow-hidden translate-x-1/2 top-1/2 -translate-y-1/2 z-20 text-3xl sm:text-5xl md:text-7xl font-inter tracking-wide font-semibold text-yellow-400 whitespace-nowrap pointer-events-none">
                  {rightTitles[rowIndex].split('').map((item, index) => (
                    <motion.span
                      className="inline-block"
                      initial={{ y: '100%' }}
                      animate={{ y: '0%' }}
                      transition={{ ease: [0.22, 1, 0.36, 1], delay: index * 0.05 }}
                      key={index}
                      style={{ letterSpacing: '1px' }}
                    >
                      {item}
                    </motion.span>
                  ))}
                </h1>
              )
            )}
          </a>
        </div>
      ))}
    </section>
  );
};

export default Features;