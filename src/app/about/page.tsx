 'use client';

import React from 'react';
import InfiniteMovingHeadings from '@/components/ui/motion';
import { AnimatedTooltipPreview } from '@/components/Tooltip';

const About = () => {
  return (
    <div className="w-full min-h-screen py-20 px-10 mx-auto font-manrope space-y-10">
      {/* Heading Section */}
      <h1 className="font-inter font-semibold text-8xl mt-10 tracking-tighter text-center">
        ABOUT NISHAT
      </h1>
      <div className="w-full border-t border-zinc-700 mt-16 py-5" />

      {/* Infinite Moving Headings Section */}
      <div className="w-full py-12 bg-black rounded-tl-3xl rounded-tr-3xl font-inter font-semibold text-8xl tracking-tighter text-center">
        <InfiniteMovingHeadings headings={['WE ARE HERE SINCE 1951']} />
      </div>
      <div className="w-full border-t border-zinc-700 mt-16 py-5" />

      {/* Paragraph 1 */}
      <p className="text-3xl tracking-tight ">
        Nishat is one of Pakistan’s most trusted and well-known brands, founded in 1951. It operates under the Nishat Group, a large business group involved in various sectors like textiles, cement, banking, and energy. The most prominent company under this group is Nishat Mills Limited, which handles everything from cotton processing to finished clothing. With its modern factories and high production standards, Nishat has gained recognition not only in Pakistan but internationally as well.
      </p>

      {/* Animated Tooltip Section */}
      <div className="py-10">
        <AnimatedTooltipPreview />
      </div>

      {/* Paragraph 2 */}
      <p className="text-3xl tracking-tight pb-20">
        In 1989, Nishat launched its fashion division called Nishat Linen. This brand focuses on clothing for women, men, and children, offering both unstitched and ready-to-wear collections. Nishat Linen was founded by Naz Mansha, the wife of renowned Pakistani businessman Mian Mansha. Over time, the brand has expanded internationally, becoming a symbol of quality, elegance, and modern fashion.
      </p>
    </div>
  );
};

export default About;
