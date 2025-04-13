import React from "react";

const QuickBooking = () => {
  return (
    <form className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 m-3 bg-white/20 backdrop-blur-md rounded-xl shadow-xl">
      {/* Left Section: Header and Toggle Buttons */}
      <div className="flex flex-col md:flex-row items-center gap-4">
        <div className="flex-shrink-0">
          <p className="text-xl font-bold text-white">Quick Book</p>
        </div>
        <div className="flex gap-2">
          <button type="button" className="px-4 py-2 rounded-full bg-black/70 text-white font-semibold transition hover:bg-black/80">
            Movie
          </button>
          <button type="button" className="px-4 py-2 rounded-full bg-black/30 text-white font-semibold transition hover:bg-black/40">
            Cinema
          </button>
        </div>
      </div>

      {/* Middle Section: Dropdowns */}
      <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
        {/* Movie Dropdown */}
        <div className="relative w-full sm:w-48">
          <select
            className="appearance-none w-full p-3 bg-white/40 dark:bg-neutral-800/40 text-black dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option>Select Movie</option>
            <option>The Great Adventure</option>
            <option>Space Odyssey</option>
            <option>Interstellar</option>
          </select>
          <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
            <svg
              className="w-4 h-4 text-black dark:text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </span>
        </div>

        {/* Date Dropdown (Disabled) */}
        <div className="relative w-full sm:w-48">
          <select
            disabled
            className="appearance-none w-full p-3 bg-white/40 dark:bg-neutral-800/40 text-gray-500 dark:text-gray-300 rounded-md focus:outline-none cursor-not-allowed"
          >
            <option>Select Date</option>
          </select>
          <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </span>
        </div>

        {/* Cinema Dropdown (Disabled) */}
        <div className="relative w-full sm:w-48">
          <select
            disabled
            className="appearance-none w-full p-3 bg-white/40 dark:bg-neutral-800/40 text-gray-500 dark:text-gray-300 rounded-md focus:outline-none cursor-not-allowed"
          >
            <option>Select Cinema</option>
          </select>
          <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </span>
        </div>

        {/* Timing Dropdown (Disabled) */}
        <div className="relative w-full sm:w-48">
          <select
            disabled
            className="appearance-none w-full p-3 bg-white/40 dark:bg-neutral-800/40 text-gray-500 dark:text-gray-300 rounded-md focus:outline-none cursor-not-allowed"
          >
            <option>Select Timing</option>
          </select>
          <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </span>
        </div>
      </div>

      {/* Right Section: Book Button */}
      <div className="mt-4 sm:mt-0">
        <button
          type="submit"
          className="px-6 py-3 bg-black text-white rounded-md shadow transition hover:bg-gray-900"
        >
          Book
        </button>
      </div>
    </form>
  );
};

export default QuickBooking;