import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
const About = () => {
  return (
    <div className="w-full min-h-screen p-4 sm:p-6 lg:p-20 bg-[#CDEA48] flex flex-col overflow-hidden box-border">
      <h1
        className="text-black text-4xl sm:text-5xl lg:text-5xl font-lato tracking-tighter text-center lg:text-left max-w-full"
      >
        Nishat is a modern clothing brand for style-conscious individuals who want to express themselves, wear quality designs, explore seasonal trends, and feel confident every day.
      </h1>
      <div className="w-full border-t-[1px] mt-8 sm:mt-12 lg:mt-20 border-zinc-800 pt-5 flex flex-col lg:flex-row gap-6 lg:gap-0">
        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start">
          <h1 className="text-3xl sm:text-4xl lg:text-4xl font-lato tracking-tighter text-center lg:text-left">
            Our Approach:
          </h1>
          <Link href="/about">
            <button
              className="flex gap-3 items-center px-6 py-2 sm:px-8 sm:py-3 lg:px-10 lg:py-3 mt-5 bg-black hover:bg-white hover:text-black transition rounded-full text-white uppercase font-manrope text-sm sm:text-base"
            >
              Read More
            </button>
          </Link>
        </div>
        <div className="w-full lg:w-1/2 h-[40vh] sm:h-[50vh] lg:h-[60vh] rounded-3xl bg-red-400 overflow-hidden">
          <Image
            src="/pic.jpg"
            width={1000}
            height={1000}
            alt="Nishat Clothing"
            className="w-full h-full object-cover rounded-3xl"
          />
        </div>
      </div>
    </div>
  );
};

export default About;