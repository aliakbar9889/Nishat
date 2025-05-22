'use client';

import React, { useEffect, useState, useCallback, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { urlFor, SanityImageSource } from '@/sanity/lib/image';
import { Product } from '../../../types/products';
import { womenProductsQuery } from '@/sanity/lib/query';
import { client } from '@/sanity/lib/client';
import { FaHeart, FaSearch } from 'react-icons/fa';
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
    '/product2', '/product32', '/product33', '/product6',
    '/product3', '/product34', '/product18', '/product4',
  ];

  // Fetch products function
  const fetchData = useCallback(async () => {
    try {
      let query = womenProductsQuery;
      const params: QueryParams = {};

      if (searchTerm) {
        query = `*[_type == "product" && category == "women" && lower(title) match lower($searchTerm)]`;
        params.searchTerm = `*${searchTerm.toLowerCase()}*`;
        console.log('Search Query:', query, 'Params:', params);
      }

      const fetchedProducts: Product[] = await client.fetch(query, params);
      console.log('Fetched Products:', fetchedProducts);

      const sortedProducts = [...fetchedProducts].sort((a, b) => {
        if (sortOption === 'price-low') return a.price - b.price;
        if (sortOption === 'price-high') return b.price - a.price;
        if (sortOption === 'name-asc') return a.title.localeCompare(b.title);
        if (sortOption === 'name-desc') return b.title.localeCompare(a.title);
        return 0;
      });

      setProducts(sortedProducts);
      if (fetchedProducts.length === 0 && searchTerm) {
        toast.info('No products match your search.');
      }
    } catch (error) {
      console.error('Failed to fetch products:', error);
      toast.error('Failed to load products');
    }
  }, [searchTerm, sortOption]);

  // Memoize debounce so it remains stable between renders
  const debouncedFetch = useMemo(() => debounce(fetchData, 300), [fetchData]);

  useEffect(() => {
    debouncedFetch();
    return () => {
      debouncedFetch.cancel();
    };
  }, [debouncedFetch, searchTerm, sortOption]);

  const handleSearchIconClick = () => {
    fetchData(); // immediate fetch without debounce on icon click
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
    <div className="py-24 px-4 sm:px-8 md:px-10 bg-gray-50 min-h-screen">
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <div className="flex flex-col gap-6">
        {/* Search + Heading + Sorting */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          {/* Search Bar with Icon */}
          <div className="flex justify-start w-32 sm:w-40 relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search womens products..."
              className="p-2 pl-3 pr-8 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 font-manrope text-sm"
            />
            <FaSearch
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-green-500 text-sm cursor-pointer"
              onClick={handleSearchIconClick}
            />
          </div>

          {/* Heading */}
          <div className="text-center flex-1">
            <h1 className="text-3xl md:text-4xl font-bold font-manrope tracking-tight relative inline-block group">
              Womens Collection
            </h1>
            <p className="text-gray-500 mt-2 text-sm md:text-base">
              Discover the latest womens products at unbeatable prices.
            </p>
          </div>

          {/* Sorting Dropdown */}
          <div className="flex justify-end w-32 sm:w-40">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 font-manrope text-sm"
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
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {products.map((product, index) => (
              <div
                key={product._id}
                className="border rounded-lg overflow-hidden shadow-sm group relative bg-white"
              >
                <Link
                  href={hardcodedLinks[index] || '#'}
                  className="relative w-full h-[300px] overflow-hidden block"
                >
                  <Image
                    src={product.image ? urlFor(product.image as SanityImageSource).url() : '/placeholder-image.jpg'}
                    alt={product.title}
                    layout="fill"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </Link>

                <div className="absolute top-2 right-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition duration-300">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToLocalStorage('wishlist', product);
                    }}
                    className="bg-white p-1 rounded-full shadow hover:bg-gray-100"
                  >
                    <FaHeart className="text-red-500 text-sm" />
                  </button>
                </div>

                <div className="p-2 space-y-1">
                  <h2 className="text-sm font-semibold">{product.title}</h2>
                  <p className="text-sm text-gray-800 font-bold">
                    Rs. {product.price}{' '}
                    {product.discount && (
                      <span className="text-xs text-gray-500 line-through ml-1">
                        Rs. {product.discount}
                      </span>
                    )}
                  </p>
                </div>

                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToLocalStorage('cart', product);
                    }}
                    className="bg-black text-white text-xs px-4 py-2 rounded-full hover:bg-white hover:text-black transition ease-out duration-150 shadow"
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
