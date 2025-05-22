"use client";

import Image from 'next/image';
import { FaStar } from 'react-icons/fa';
import ShopPage from '@/app/shop/page';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Define Product type
interface Product {
  _id: number;
  title: string;
  price: number;
  discount?: number;
  image: string;
}
// Static product data
const product: Product = {
  _id: 19,
  title: 'UrbanFlex - Comfort That Moves With You Mens Pnat',
  price: 1050,
  discount: 105,
  image: '/MENS 08.png',
};

 // Add to LocalStorage function
  const addToLocalStorage = (key: string, item: Product) => {
    const existing = JSON.parse(localStorage.getItem(key) || '[]');
    const isAlreadyAdded = existing.find((p: Product) => p._id === item._id);
    if (!isAlreadyAdded) {
      existing.push(item);
      localStorage.setItem(key, JSON.stringify(existing));
      toast.success('Added to cart successfully!', {
        position: 'top-center',
        autoClose: 2000,
      });
      window.dispatchEvent(new Event('storage')); // Trigger storage event for sync
    } else {
      toast.info('Already in cart', {
        position: 'top-center',
        autoClose: 2000,
      });
    }
  };

export default function ProductPage() {
  return (
      <>
        <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 font-manrope pt-16 pb-10">
          <ToastContainer
            position="top-center"
            autoClose={2000}
            hideProgressBar
            newestOnTop
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            className="w-full max-w-[90%] sm:max-w-xs mx-auto"
          />
          <div className="w-full max-w-5xl flex flex-col md:flex-row items-center gap-6 sm:gap-8 lg:gap-10 p-4 sm:p-6 lg:p-8">
            {/* Product Image */}
            <div className="w-full md:w-1/2 flex justify-center mt-6 sm:mt-0">
              <Image
                src={product.image}
                alt={product.title}
                width={400}
                height={350}
                className="rounded-lg object-contain w-full max-w-[90%] sm:max-w-[350px] md:max-w-[400px] h-auto mx-auto"
                sizes="(max-width: 640px) 90vw, (max-width: 768px) 350px, 400px"
                priority
              />
            </div>
  
            {/* Product Info */}
            <div className="w-full md:w-1/2 flex flex-col gap-4 sm:gap-5 text-center md:text-left">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold leading-tight">{product.title}</h1>
  
              {/* Stylish HR line */}
              <hr className="border-t-2 border-black w-full mb-3 sm:mb-4 mt-1 sm:mt-2 mx-auto md:mx-0 rounded-full" />
  
              {/* Rating Stars */}
              <div className="flex justify-center md:justify-start text-yellow-500 text-base sm:text-lg md:text-xl">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar key={star} className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                ))}
              </div>
  
              {/* Prices */}
              <p className="text-base sm:text-lg md:text-xl text-gray-800 font-semibold">
                Price: <span className="text-zinc-500">Rs. {product.price}</span>
              </p>
              {product.discount && (
                <p className="text-sm sm:text-base md:text-lg text-gray-500 font-bold">
                  <span className="line-through">Rs. {product.discount}</span>
                </p>
              )}
  
              {/* Buttons with hover animation */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4 sm:mt-5 justify-center md:justify-start">
                <Link href="/confirmation">
                  <button className="relative overflow-hidden group bg-blue-800 text-white px-5 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-base rounded-md w-full sm:w-auto">
                    <span className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-0"></span>
                    <span className="relative z-10">Buy Now</span>
                  </button>
                </Link>
                <button
                  onClick={() => addToLocalStorage('cart', product)}
                  className="relative overflow-hidden group bg-yellow-600 text-white px-5 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-base rounded-md w-full sm:w-auto"
                >
                  <span className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-0"></span>
                  <span className="relative z-10">Add to Cart</span>
                </button>
              </div>
            </div>
          </div>
        </div>
  
        {/* ShopPage with reduced margin */}
        <div className="mb-10">
          <ShopPage />
        </div>
      </>
    );
  }
