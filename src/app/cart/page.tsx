'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { urlFor, SanityImageSource } from '@/sanity/lib/image';
import Link from 'next/link';

// Define Product type with explicit fields
interface Product {
  _id: string;
  title: string;
  price: number;
  discount?: number;
  image: SanityImageSource;
  quantity: number;
}

const getImageUrl = (image: SanityImageSource): string => {
  if (
    typeof image === 'object' &&
    'asset' in image &&
    image.asset &&
    (('_ref' in image.asset && image.asset._ref) || ('_id' in image.asset && image.asset._id))
  ) {
    return urlFor(image).url();
  }
  return typeof image === 'string' ? image : '/placeholder-image.jpg';
};

const CartPage = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Load cart from localStorage on component mount
  useEffect(() => {
    try {
      const storedCartItems = JSON.parse(localStorage.getItem('cart') || '[]') as Product[];
      const updatedItems = storedCartItems.map((item) => ({
        ...item,
        quantity: item.quantity || 1,
      }));
      setCartItems(updatedItems);
    } catch (error) {
      console.error('Error parsing cart items:', error);
      setCartItems([]);
    }
  }, []);

  // Update quantity
  const updateQuantity = (productId: string, type: 'increase' | 'decrease') => {
    const updatedCartItems = cartItems
      .map((item) => {
        if (item._id === productId) {
          let newQuantity = item.quantity;

          if (type === 'increase') {
            newQuantity += 1;
          } else if (type === 'decrease') {
            if (newQuantity === 1) {
              setIsModalOpen(true); // Show modal instead of confirm
              return item; // Don't remove yet, wait for modal confirmation
            }
            newQuantity -= 1;
          }

          return { ...item, quantity: newQuantity };
        }
        return item;
      })
      .filter(Boolean);

    setCartItems(updatedCartItems);
    localStorage.setItem('cart', JSON.stringify(updatedCartItems));
  };

  const removeItemFromCart = (productId: string) => {
    const updatedCartItems = cartItems.filter((item) => item._id !== productId);
    setCartItems(updatedCartItems);
    localStorage.setItem('cart', JSON.stringify(updatedCartItems));
    setIsModalOpen(false); // Close modal after removal
  };

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleCheckout = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    if (isModalOpen) document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  return (
    <div className="pt-28 pb-20 px-4 sm:px-8 md:px-12 bg-gray-50 min-h-screen font-manrope">
      <div className="text-center mb-14">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">Your Cart</h1>
        <p className="text-gray-500 mt-2 text-sm md:text-base">Review and complete your purchase.</p>
      </div>

      {cartItems.length === 0 ? (
        <div className="text-center">
          <p className="text-xl font-semibold text-gray-500 mb-4">Your cart is empty!</p>
          <Link href="/shop">
            <button className="px-6 py-2 bg-orange-700 text-white hover:bg-black transition-all duration-300 text-lg font-bold rounded-full">
              Start Shopping
            </button>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3 space-y-8">
            {cartItems.map((product) => (
              <div key={product._id} className="bg-white border rounded-2xl shadow-sm flex p-4 gap-4">
                <div className="relative w-[120px] h-[120px]">
                  <Image
                    src={getImageUrl(product.image)}
                    alt={product.title}
                    fill
                    className="object-cover rounded-xl"
                  />
                </div>

                <div className="flex-grow">
                  <h2 className="text-lg font-semibold text-gray-800">{product.title}</h2>
                  <p className="text-sm text-gray-500 mt-1">Rs. {product.price}</p>
                  {product.discount && (
                    <span className="text-xs text-gray-500 line-through ml-1">Rs. {product.discount}</span>
                  )}

                  <div className="flex items-center gap-4 mt-2">
                    <button
                      onClick={() => updateQuantity(product._id, 'decrease')}
                      className="text-gray-500 hover:text-black text-lg"
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <p className="text-sm text-gray-700">{product.quantity}</p>
                    <button
                      onClick={() => updateQuantity(product._id, 'increase')}
                      className="text-gray-500 hover:text-black text-lg"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => removeItemFromCart(product._id)}
                  className="text-red-500 text-sm font-bold hover:underline"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="lg:w-1/3">
            <div className="bg-white border rounded-2xl shadow-sm p-6 sticky top-4">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>
              <div className="space-y-4">
                {cartItems.map((product) => (
                  <div key={product._id} className="flex gap-4 items-center">
                    <div className="relative w-16 h-16">
                      <Image
                        src={getImageUrl(product.image)}
                        alt={product.title}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold">{product.title}</p>
                      <p className="text-gray-500 text-sm">Quantity: {product.quantity}</p>
                    </div>
                    <p className="font-semibold">Rs. {product.price * product.quantity}</p>
                  </div>
                ))}
                <hr className="my-4" />
                <div className="flex justify-between text-lg font-bold">
                  <p>Total</p>
                  <p>Rs. {totalPrice}</p>
                </div>
              </div>
              <button
                onClick={handleCheckout}
                className="mt-6 w-full px-6 py-3 bg-gradient-to-r from-orange-700 to-orange-500 text-white font-bold rounded-full hover:from-orange-800 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 relative overflow-hidden group"
                aria-label="Proceed to checkout"
              >
                <span className="relative z-10">Proceed to Checkout</span>
                <svg
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 scale-0 group-hover:scale-100"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-2xl p-6 max-w-md w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Checkout Confirmation</h2>
            <p className="text-gray-600 mb-6">
              You are about to checkout with a total of Rs. {totalPrice}. Proceed to payment?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 font-semibold"
              >
                Cancel
              </button>
              <Link href="/confirmation">
                <button className="px-4 py-2 bg-orange-700 text-white hover:bg-orange-800 font-semibold rounded-full transition-all duration-300">
                  Confirm
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;