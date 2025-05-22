// Landing Component
import React from 'react';
import { FaArrowUpLong } from "react-icons/fa6";
import Link from 'next/link';

const Landing = () => {
  const headings = ["ELEVATE YOUR", "STYLE WITH", "EVERY OUTFIT"];

  return (
    <div className="w-full h-auto min-h-[50vh]  pt-8 sm:pt-5 flex flex-col overflow-hidden box-border mt-2">
      <div className="textstructure mt-8 lg:mt-32  sm:px-6 lg:px-10 py-6 sm:py-8 flex flex-col items-center lg:items-start max-w-screen">
        {headings.map((text, index) => (
          <div key={index} className="masker w-full flex justify-center lg:justify-start">
            <h1
              className="font-inter text-5xl  lg:text-8xl leading-tight tracking-tighter font-bold uppercase text-center lg:text-left max-w-full box-border"
            >
              {text}
            </h1>
          </div>
        ))}

        <div className="w-full border-t-[1px] border-zinc-700 mt-12 sm:mt-24 lg:mt-32 py-3 sm:py-5 px-4 sm:px-6 lg:px-10 flex flex-col lg:flex-row items-center lg:items-start justify-between gap-4 lg:gap-0 relative max-w-screen">
          <p className="text-sm sm:text-md font-light leading-none text-center lg:text-left">
            100% Quality Assurance
          </p>
          <p className="text-sm sm:text-md font-light leading-none text-center lg:absolute lg:left-1/2 lg:-translate-x-1/2">
            Fastest Delivery
          </p>
          <div className="flex justify-center lg:justify-end w-full lg:w-auto">
            <div className="flex items-center gap-3">
              <Link href="/shop">
                <button
                  className="px-3 py-1 sm:px-4 sm:py-2 border-2 border-black text-xs sm:text-sm font-light rounded-full hover:bg-black hover:text-white transition duration-300 ease-in-out"
                >
                  Explore Now
                </button>
              </Link>
              <div
                className="w-6 h-6 sm:w-7 sm:h-7 lg:w-10 lg:h-10 border-2 border-black rounded-full flex items-center justify-center"
              >
                <FaArrowUpLong
                  className="text-xs sm:text-sm lg:text-xl text-black rotate-[45deg]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;

