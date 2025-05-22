"use client";

import { useState } from "react";

export default function DeliveryPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    province: "",
    phoneNumber: "",
    city: "",
    address: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Disable button if any field is empty
  const isDisabled = Object.values(formData).some((value) => value.trim() === "");

  const handleProceedToPay = async () => {
    if (isDisabled) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");
    if (cartItems.length === 0) {
      setErrorMessage("Your cart is empty!");
      return;
    }

    setErrorMessage("");
    setLoading(true);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cartItems, formData }),
      });

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setErrorMessage("Error processing checkout");
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-28 sm:py-32 lg:py-40 bg-gray-100 font-manrope px-4">
      {/* Top Section */}
      <div className="w-full max-w-full sm:max-w-md lg:max-w-lg text-center mb-6 sm:mb-8">
        <h1 className="text-3xl sm:text-4xl font-semibold">Delivery Information</h1>
      </div>

      {/* Center Section (Form) */}
      <div className="w-full max-w-full sm:max-w-md lg:max-w-lg bg-white p-4 sm:p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label className="flex flex-col">
            <span className="text-sm font-medium mb-1">Full Name</span>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-sm font-medium mb-1">Province</span>
            <input
              type="text"
              name="province"
              placeholder="Province"
              value={formData.province}
              onChange={handleChange}
              className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </label>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <label className="flex flex-col">
            <span className="text-sm font-medium mb-1">Phone Number</span>
            <input
              type="tel"
              name="phoneNumber"
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-sm font-medium mb-1">City</span>
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </label>
        </div>

        <label className="flex flex-col mt-4">
          <span className="text-sm font-medium mb-1">Address</span>
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </label>

        {errorMessage && <p className="text-red-500 text-sm sm:text-base mt-2">{errorMessage}</p>}

        <button
          onClick={handleProceedToPay}
          disabled={isDisabled || loading}
          className={`group mt-6 py-2 px-4 rounded w-full text-white relative ${
            isDisabled || loading
              ? "bg-gradient-to-r from-orange-700 to-orange-500 cursor-not-allowed"
              : "bg-orange-600 hover:bg-orange-700"
          }`}
        >
          {loading ? "Processing..." : "Proceed to Checkout"}
          <svg
            className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 h-5 sm:h-6 w-5 sm:w-6 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 scale-0 group-hover:scale-100"
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
  );
}