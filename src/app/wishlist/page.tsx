"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import { Product } from '../../../types/products';
import Link from 'next/link';

const WishlistPage = () => {
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);

  useEffect(() => {
    const storedWishlistItems = JSON.parse(localStorage.getItem('wishlist') || '[]');
    setWishlistItems(storedWishlistItems);
  }, []);

  // Remove item from wishlist
  const removeItemFromWishlist = (productId: string) => {
    const updatedWishlistItems = wishlistItems.filter((item) => item._id !== productId);
    setWishlistItems(updatedWishlistItems);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlistItems));
  };

  return (
    <div className="pt-28 pb-20 px-4 sm:px-8 md:px-12 bg-gray-50 min-h-screen">
      <div className="text-center mb-14">
        <h1 className="text-4xl md:text-5xl font-extrabold font-manrope text-gray-800">Your Wishlist</h1>
        <p className="text-gray-500 mt-2 text-sm md:text-base">Collect Your Favourite Products.</p>
      </div>

      <div className="space-y-8">
        {wishlistItems.length === 0 ? (
          <div className="text-center">
            <p className="text-xl font-semibold text-gray-500 mb-4">Your wishlist is empty!</p>
            {/* Start Shopping Button */}
            <Link href="/shop" passHref>
              <button className="px-6 font-manrope py-2 bg-orange-700 text-white hover:bg-black transition-all duration-300 ease-in text-lg font-bold rounded-full hover:from-blue-500 hover:to-purple-500 ">
                Select Your Favourite Product
              </button>
            </Link>
          </div>
        ) : (
          wishlistItems.map((product) => (
            <div key={product._id} className="bg-white border rounded-2xl shadow-sm flex p-4 gap-4">
              {/* Product Image */}
              <div className="relative w-[120px] h-[120px]">
                <Image
                  src={product.image ? urlFor(product.image).url() : '/placeholder-image.jpg'}
                  alt={product.title}
                  layout="fill"
                  className="object-cover rounded-xl"
                />
              </div>

              <div className="flex-grow">
                <h2 className="text-lg font-semibold text-gray-800">{product.title}</h2>
                <p className="text-sm text-gray-500 mt-1">Rs. {product.price}</p>
                {product.discount && (
                  <span className="text-xs text-gray-500 line-through ml-1">Rs. {product.discount}</span>
                )}
              </div>

              {/* Remove Item Button */}
              <button
                onClick={() => removeItemFromWishlist(product._id)}
                className="text-red-500 text-sm font-bold hover:underline"
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
