'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import { urlFor, SanityImageSource } from '@/sanity/lib/image';
import { Product } from '../../../types/products';
import { client } from '@/sanity/lib/client';
import { FaHeart, FaSearch } from 'react-icons/fa';
import Link from 'next/link';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import debounce from 'lodash.debounce';

interface QueryParams {
  searchTerm?: string;
}

const ShopPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState<string>('default');

  const hardcodedLinks = [
    '/product1', '/product2', '/product3', '/product4', '/product5', '/product6', '/product7', '/product8', '/product9', '/product10',
    '/product11', '/product12', '/product13', '/product14', '/product15', '/product16', '/product17', '/product18', '/product19', '/product20',
    '/product21', '/product22', '/product23', '/product24', '/product25', '/product26', '/product27', '/product28', '/product29', '/product30',
    '/product31', '/product32', '/product33', '/product34', '/product35', '/product36', '/product37', '/product38', '/product39', '/product40',
    '/product41', '/product42', '/product43', '/product44'
  ];

  // useCallback to memoize fetchData and avoid unnecessary re-creation
  const fetchData = useCallback(async () => {
    try {
      let query = `*[_type == "product"`;
      const params: QueryParams = {};

      if (searchTerm) {
        query += ` && title match $searchTerm`;
        params.searchTerm = `*${searchTerm}*`;
      }
      query += `]`;

      const fetchedProducts: Product[] = await client.fetch(query, params);

      const sortedProducts = [...fetchedProducts].sort((a, b) => {
        if (sortOption === 'price-low') return a.price - b.price;
        if (sortOption === 'price-high') return b.price - a.price;
        if (sortOption === 'name-asc') return a.title.localeCompare(b.title);
        if (sortOption === 'name-desc') return b.title.localeCompare(a.title);
        return 0;
      });

      setProducts(sortedProducts);
    } catch (error) {
      console.error('Failed to fetch data:', error);
      toast.error('Failed to load products');
    }
  }, [searchTerm, sortOption]);

  const debouncedFetchRef = useRef<ReturnType<typeof debounce>>();

  // Setup debounce once on mount
  useEffect(() => {
    debouncedFetchRef.current = debounce(() => {
      fetchData();
    }, 500);

    return () => {
      debouncedFetchRef.current?.cancel();
    };
  }, [fetchData]);

  // Trigger debounce when searchTerm or sortOption changes
  useEffect(() => {
    debouncedFetchRef.current?.();
  }, [searchTerm, sortOption]);

  // Immediate fetch on search icon click
  const handleSearchIconClick = () => {
    debouncedFetchRef.current?.cancel();
    fetchData();
  };

  const addToLocalStorage = (key: 'cart' | 'wishlist', item: Product) => {
    const existing = JSON.parse(localStorage.getItem(key) || '[]') as Product[];
    const isAlreadyAdded = existing.some((p) => p._id === item._id);
    if (!isAlreadyAdded) {
      existing.push(item);
      localStorage.setItem(key, JSON.stringify(existing));
      toast.success(`${key === 'cart' ? 'Added to cart' : 'Added to wishlist'} successfully!`);
      window.dispatchEvent(new Event('storage'));
    } else {
      toast.info(`${key === 'cart' ? 'Already in cart' : 'Already in wishlist'}`);
    }
  };

  return (
    <div className="py-24 px-4 sm:px-8 md:px-12 bg-gray-50 min-h-screen relative">
      <ToastContainer position="top-center" autoClose={2000} hideProgressBar newestOnTop rtl={false} pauseOnFocusLoss draggable pauseOnHover />

      <div className="flex flex-col gap-6">
        {/* Search + Heading + Sorting */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          {/* Search Bar with Icon */}
          <div className="flex justify-start w-32 sm:w-40 relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search..."
              className="p-2 pl-3 pr-8 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-nishatOrange font-manrope text-sm"
            />
            <FaSearch
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-nishatOrange text-sm cursor-pointer"
              onClick={handleSearchIconClick}
            />
          </div>
          {/* Heading */}
          <div className="text-center flex-1">
            <h1 className="text-4xl md:text-5xl font-extrabold font-manrope text-gray-800">Shop Now</h1>
            <p className="text-gray-500 mt-2 text-sm md:text-base">Discover the latest products at unbeatable prices.</p>
          </div>
          {/* Sorting Dropdown */}
          <div className="flex justify-end w-32 sm:w-40">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-nishatOrange font-manrope text-sm"
            >
              <option value="default">Sort By: Default</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name-asc">Name: A-Z</option>
              <option value="name-desc">Name: Z-A</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        {products.length === 0 ? (
          <p className="text-center text-gray-500">No products found</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
            {products.map((product, index) => (
              <div
                key={product._id}
                className="bg-white border rounded-2xl shadow-sm group relative flex flex-col h-full w-full hover:shadow-md transition-shadow duration-300"
              >
                <Link href={hardcodedLinks[index] || '#'} className="relative w-full h-[300px] overflow-hidden rounded-t-2xl block">
                  <Image
                    src={product.image ? urlFor(product.image as SanityImageSource).url() : '/placeholder-image.jpg'}
                    alt={product.title}
                    layout="fill"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </Link>

                <div className="absolute top-3 right-3 z-10">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToLocalStorage('wishlist', product);
                    }}
                    className="bg-white p-2 rounded-full shadow hover:bg-gray-100"
                  >
                    <FaHeart className="text-red-500 text-sm" />
                  </button>
                </div>

                <div className="p-4 flex-grow flex flex-col justify-between">
                  <h2 className="text-sm font-semibold text-gray-800 mb-1">{product.title}</h2>
                  <p className="text-sm font-bold text-gray-900">
                    Rs. {product.price}{' '}
                    {product.discount && (
                      <span className="text-xs text-gray-500 line-through ml-1">Rs. {product.discount}</span>
                    )}
                  </p>
                </div>

                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToLocalStorage('cart', product);
                    }}
                    className="bg-black text-white text-sm px-4 py-2 rounded-full hover:bg-white hover:text-black transition ease-out duration-150 shadow"
                    style={{ pointerEvents: 'auto' }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopPage;
