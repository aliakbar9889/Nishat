'use client';

import React from 'react';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="py-8 px-6 font-manrope">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Section */}
        <div className="flex flex-col">
          <Image
            src="https://nishatlinen.com/cdn/shop/files/final_logo_1_nishat-golden.png?v=1691747968"
            alt="NISHAT"
            width={120}
            height={40}
            className="header__mobile-logo t4s-d-lg-none"
            style={{ width: '120px' }}
            priority
          />
        </div>

        {/* Center Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-teal-400 mr-12">
          {/* Left Sub-Part */}
          <div>
            <h3 className="text-lg font-semibold text-black">About</h3>
            <ul className="mt-4 space-y-2">
              <li className="text-gray-600 cursor-pointer hover:underline">Features</li>
              <li className="text-gray-600 cursor-pointer hover:underline">Pricing</li>
              <li className="text-gray-600 cursor-pointer hover:underline">Support</li>
            </ul>
          </div>

          {/* Right Sub-Part */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Blog</h3>
            <ul className="mt-4 space-y-2">
              <li className="text-gray-600 cursor-pointer hover:underline">Products</li>
              <li className="text-gray-600 cursor-pointer hover:underline">Technology</li>
              <li className="text-gray-600 cursor-pointer hover:underline">Crypto</li>
            </ul>
          </div>
        </div>

        {/* Right Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Left Sub-Part */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Webflow</h3>
            <ul className="mt-4 space-y-2">
              <li className="text-gray-600 hover:underline cursor-pointer">Styleguide</li>
              <li className="text-gray-600 hover:underline cursor-pointer">Licensing</li>
              <li className="text-gray-600 hover:underline cursor-pointer">Changelog</li>
            </ul>
          </div>

          {/* Right Sub-Part */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Social Media</h3>
            <ul className="mt-4 space-y-2">
              <li className="text-gray-600 hover:underline cursor-pointer">Twitter</li>
              <li className="text-gray-600 hover:underline cursor-pointer">Facebook</li>
              <li className="text-gray-600 hover:underline cursor-pointer">Instagram</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Divider */}
      <hr className="my-8 border-gray-300" />

      {/* Footer Bottom Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start sm:text-center text-gray-600 text-sm">
        {/* Left Content */}
        <p className="mb-4 sm:mb-0">
          © Made by <span className="text-black">Ali Akbar</span> - Powered by <span className="text-black">Figma</span>
        </p>

        {/* Right Links */}
        <div className="flex space-x-6">
          <a href="#" className="hover:text-teal-500 transition duration-300">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-teal-500 transition duration-300">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;