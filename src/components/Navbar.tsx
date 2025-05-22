'use client';

import React, { useState, useEffect } from 'react';
import { FaHeart, FaShoppingCart, FaTimes } from 'react-icons/fa';
import { RiMenu2Line } from 'react-icons/ri';
import Link from 'next/link';
import Image from 'next/image';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { auth } from '../firebase';

interface Product {
  id: string;
  title: string;
  price: number;
  image?: string;
  // Add other specific properties as needed
}

interface CartItem extends Product {
  quantity: number;
}

const navlinks = [
  { label: 'About', href: '/about' },
  { label: 'Shop', href: '/shop' },
  { label: 'Mens Clothing', href: '/mens' },
  { label: 'Womens Clothing', href: '/womens' },
  { label: 'Kids Clothing', href: '/kid' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const updateCounts = () => {
      try {
        const cartItems: CartItem[] = JSON.parse(localStorage.getItem('cart') || '[]');
        const wishlistItems: Product[] = JSON.parse(localStorage.getItem('wishlist') || '[]');
        const cartQty = cartItems.reduce((total, item) => total + (item.quantity || 1), 0);
        setCartCount(cartQty);
        setWishlistCount(wishlistItems.length);
      } catch (error) {
        console.error('Error parsing localStorage:', error);
        setCartCount(0);
        setWishlistCount(0);
      }
    };

    updateCounts();
    window.addEventListener('storage', updateCounts);
    window.addEventListener('custom-storage-update', updateCounts as EventListener);

    return () => {
      window.removeEventListener('storage', updateCounts);
      window.removeEventListener('custom-storage-update', updateCounts as EventListener);
    };
  }, []);

  useEffect(() => {
    let mounted = true;
    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        if (mounted) {
          setUser(currentUser);
        }
      },
      (error) => {
        console.error('Auth state change error:', error);
        if (mounted) {
          setUser(null);
        }
      },
    );

    return () => {
      mounted = false;
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsMenuOpen(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <div
      className={`fixed z-[999] w-full px-4 sm:px-6 lg:px-10 py-4 flex justify-between items-center transition-all duration-300 overflow-visible ${
        isScrolled ? 'backdrop-blur-md bg-white/70 shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="flex items-center lg:hidden">
        <button onClick={toggleMenu} aria-label="Toggle menu">
          {isMenuOpen ? (
            <FaTimes className="text-2xl text-black" />
          ) : (
            <RiMenu2Line className="text-2xl text-black" />
          )}
        </button>
      </div>

      <div className="flex justify-center lg:justify-start">
        <Link href="/">
          <div className="logo hover:cursor-pointer">
            <Image
              src="https://nishatlinen.com/cdn/shop/files/final_logo_1_nishat-golden.png?v=1691747968"
              alt="NISHAT"
              width={120}
              height={40}
              className="w-20 sm:w-24 lg:w-[120px]"
              priority
            />
          </div>
        </Link>
      </div>

      <div className="flex items-center gap-4 text-xl lg:hidden">
        <Link href="/wishlist">
          <div className="relative">
            <FaHeart className="cursor-pointer hover:text-gray-600 transition-colors duration-300" />
            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </div>
        </Link>
        <Link href="/cart">
          <div className="relative">
            <FaShoppingCart className="cursor-pointer hover:text-gray-600 transition-colors duration-300" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </div>
        </Link>
      </div>

      <div
        className={`fixed top-0 left-0 min-h-screen w-64 bg-white shadow-lg transform ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out lg:hidden z-[1000]`}
      >
        <div className="flex flex-col min-h-screen bg-white">
          <div className="bg-gray-200 p-4 flex justify-between items-center">
            <h2 className="text-xl font-manrope font-bold text-black ml-2">Menu</h2>
            <button onClick={toggleMenu} className="text-2xl text-black" aria-label="Close menu">
              <FaTimes />
            </button>
          </div>
          <div className="flex flex-col p-6 gap-4 font-manrope text-black">
            {navlinks.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="text-md capitalize"
              >
                {item.label}
              </Link>
            ))}
            {!user ? (
              <Link
                href="/signin"
                onClick={() => setIsMenuOpen(false)}
                className="text-md capitalize"
              >
                Sign In
              </Link>
            ) : (
              <button
                onClick={handleLogout}
                className="text-md text-black border px-3 py-1 rounded hover:bg-red-100 mt-4"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="hidden lg:flex items-center gap-10 font-manrope text-black">
        {navlinks.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className="relative text-md capitalize group overflow-hidden"
          >
            <span className="relative z-10">{item.label}</span>
            <span className="absolute left-0 bottom-0 w-full h-[2px] bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </Link>
        ))}
        <div className="ml-20">
          {!user ? (
            <Link
              href="/signin"
              className="relative text-md capitalize group overflow-hidden"
            >
              <span className="relative z-10">Sign In</span>
              <span className="absolute left-0 bottom-0 w-full h-[2px] bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="text-md text-black border px-3 py-1 rounded hover:bg-red-800 hover:text-white transition duration-300"
            >
              Logout
            </button>
          )}
        </div>
        <div className="flex items-center gap-6 text-xl ml-4 relative">
          <Link href="/wishlist">
            <div className="relative">
              <FaHeart className="cursor-pointer hover:text-gray-600 transition-colors duration-300" />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </div>
          </Link>
          <Link href="/cart">
            <div className="relative">
              <FaShoppingCart className="cursor-pointer hover:text-gray-600 transition-colors duration-300" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
