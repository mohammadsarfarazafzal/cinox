import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { movies } from "../utils/mockData.js";
import { TrailerModal } from './Modals.jsx';
import { getYoutubeEmbedUrl } from '../utils/helpers.js';

// Shared modal state for the entire application
let modalState = {
  isOpen: false,
  trailerUrl: "",
  title: "",
  setIsOpen: null
};

// Tab variants for animations
const tabVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.5,
      ease: "easeOut"
    } 
  },
  exit: { 
    opacity: 0,
    y: -20,
    transition: { 
      duration: 0.3,
      ease: "easeIn"
    }
  }
};

const TabContent = ({ activeTab }) => {
  // Demo data for each tab
  const nowShowingMovies = movies.slice(0, 6);
  const comingSoonMovies = movies.slice(1,5);
  
  const trailers = movies;
  
  const offers = [
    { id: 301, title: "Weekend Special", description: "Get 20% off on all movie tickets during weekends", validUntil: "May 31, 2025" },
    { id: 302, title: "Family Package", description: "Buy 4 tickets and get 1 free, plus a free popcorn", validUntil: "June 15, 2025" },
    { id: 303, title: "Student Discount", description: "Show your student ID and get 15% off", validUntil: "Ongoing" }
  ];

  const openTrailer = (trailer) => {
    // Set the global modal state
    modalState.trailerUrl = getYoutubeEmbedUrl(trailer.trailerUrl);
    modalState.title = `${trailer.title} - Trailer`;
    modalState.isOpen = true;
    // Force an update on the modal
    if (modalState.setIsOpen) {
      modalState.setIsOpen(true);
    }
  };

  // Function to determine grid span based on item count and index
  // This will help expand items to fill empty space
  const getGridSpan = (items, index, columnsPerRow) => {
    const totalItems = items.length;
    const remainingItems = totalItems % columnsPerRow;
    
    // If it's the last row and has fewer items than columns
    if (remainingItems > 0 && index >= totalItems - remainingItems) {
      if (remainingItems === 1) return "col-span-full"; // One item spans all columns
      if (remainingItems === 2) return "col-span-6"; // Two items each span half the grid (assuming 12-column grid)
    }
    
    return ""; // Default span
  };

  // Helper function to determine if an item should use backdrop instead of poster
  const shouldUseBackdrop = (items, index, columnsPerRow) => {
    const totalItems = items.length;
    const remainingItems = totalItems % columnsPerRow;
    
    // Use backdrop for expanded items (last row with fewer items)
    return remainingItems > 0 && index >= totalItems - remainingItems;
  };

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          variants={tabVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="w-full mt-4"
        >
          {activeTab === 'nowShowing' && (
            <div className="grid grid-cols-12 gap-6">
              {nowShowingMovies.map((movie, index) => {
                const isExpanded = shouldUseBackdrop(nowShowingMovies, index, 3);
                const colSpan = getGridSpan(nowShowingMovies, index, 3);
                
                // Base column spans for different screen sizes
                let baseColSpan = "col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-4";
                
                // Override with calculated spans for expanded items
                if (colSpan === "col-span-full") {
                  baseColSpan = "col-span-12";
                } else if (colSpan === "col-span-6") {
                  baseColSpan = "col-span-12 sm:col-span-6";
                }
                
                return (
                  <div 
                    key={movie.id} 
                    className={`${baseColSpan} rounded-xl overflow-hidden bg-white/10 dark:bg-black/20 border border-gray-800/95 dark:border-white/10 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
                  >
                    <div className={`relative ${isExpanded ? 'h-80' : 'h-64'} overflow-hidden`}>
                      <img 
                        src={isExpanded ? (movie.backdrop || "/api/placeholder/800/450") : (movie.posterUrl || "/api/placeholder/300/450")} 
                        alt={movie.title} 
                        className="w-full h-full object-cover" 
                      />
                      <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
                        <p className="text-white font-semibold">{movie.title}</p>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs bg-black/20 dark:bg-white/20 px-2 py-1 rounded-full">{movie.genre?.[0] || "Action"}</span>
                        <span className="text-xs dark:text-gray-300">{movie.rating || "8.5/10"}</span>
                      </div>
                      <button className="w-full mt-2 py-2 bg-gray-800/95 cursor-pointer text-white dark:bg-white dark:text-black rounded-md text-sm font-semibold hover:shadow-md shadow-neutral-400 hover:opacity-90 transition">Book Now</button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          
          {activeTab === 'comingSoon' && (
            <div className="grid grid-cols-12 gap-6">
              {comingSoonMovies.map((movie, index) => {
                const isExpanded = shouldUseBackdrop(comingSoonMovies, index, 4);
                const colSpan = getGridSpan(comingSoonMovies, index, 4);
                
                // Base column spans for different screen sizes
                let baseColSpan = "col-span-12 sm:col-span-6 md:col-span-3";
                
                // Override with calculated spans for expanded items
                if (colSpan === "col-span-full") {
                  baseColSpan = "col-span-12";
                } else if (colSpan === "col-span-6") {
                  baseColSpan = "col-span-12 sm:col-span-6";
                }
                
                return (
                  <div 
                    key={movie.id} 
                    className={`${baseColSpan} rounded-xl overflow-hidden bg-white/10 dark:bg-black/20 border border-gray-800/95 dark:border-white/10 shadow-lg`}
                  >
                    <div className={`relative ${isExpanded ? 'h-80' : 'h-64'} overflow-hidden`}>
                      <img 
                        src={isExpanded ? (movie.backdrop || "/api/placeholder/800/450") : (movie.posterUrl || "/api/placeholder/300/450")} 
                        alt={movie.title} 
                        className="w-full h-full object-cover" 
                      />
                      <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
                        <p className="text-white font-semibold">{movie.title}</p>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-center">
                        <span className="text-xs bg-black/20 dark:bg-white/20 px-2 py-1 rounded-full">Coming Soon</span>
                        <span className="text-xs dark:text-gray-300">{movie.releaseDate}</span>
                      </div>
                      <button className="w-full mt-2 py-2 bg-black/50 text-white dark:bg-white/50 dark:text-black rounded-md text-sm font-semibold">Notify Me</button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          
          {activeTab === 'trailers' && (
            <div className="grid grid-cols-12 gap-6">
              {trailers.map((trailer, index) => {
                const isExpanded = shouldUseBackdrop(trailers, index, 3);
                const colSpan = getGridSpan(trailers, index, 3);
                
                // Base column spans for different screen sizes
                let baseColSpan = "col-span-12 md:col-span-6 lg:col-span-4";
                
                // Override with calculated spans for expanded items
                if (colSpan === "col-span-full") {
                  baseColSpan = "col-span-12";
                } else if (colSpan === "col-span-6") {
                  baseColSpan = "col-span-12 md:col-span-6";
                }
                
                return (
                  <div 
                    key={trailer.id} 
                    className={`${baseColSpan} rounded-xl overflow-hidden bg-white/10 dark:bg-black/20 border border-gray-800/95 dark:border-white/10 shadow-lg`}
                  >
                    <div className="relative">
                      <img 
                        src={trailer.backdrop || "/api/placeholder/800/450"} 
                        alt={trailer.title} 
                        className={`w-full ${isExpanded ? 'h-64' : 'h-48'} object-cover`} 
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <button 
                          onClick={() => openTrailer(trailer)} 
                          className="cursor-pointer w-16 h-16 rounded-full bg-black/50 dark:bg-white/50 flex items-center justify-center hover:scale-110 transition-all duration-300"
                        >
                          <svg className="w-8 h-8 text-white dark:text-black" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M6.3 2.841A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                          </svg>
                        </button>
                      </div>
                      <div className="absolute bottom-0 right-0 m-2 px-2 py-1 bg-black/70 text-white rounded text-xs">
                        {/* {trailer.duration} */}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-sm dark:text-white">{trailer.title}</h3>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          
          {activeTab === 'offers' && (
            <div className="space-y-6">
              {offers.map(offer => (
                <div key={offer.id} className="rounded-xl bg-white/10 dark:bg-black/20 border border-gray-800/95 dark:border-white/10 shadow-lg p-6 hover:shadow-xl transition-all duration-300">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <h3 className="text-lg font-semibold dark:text-white">{offer.title}</h3>
                      <p className="text-sm mt-1 dark:text-gray-300">{offer.description}</p>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                      <span className="text-xs bg-black/20 dark:bg-white/20 px-3 py-1 rounded-full">Valid until: {offer.validUntil}</span>
                      <button className="px-4 py-2 bg-black text-white dark:bg-white dark:text-black rounded-md text-sm font-semibold hover:opacity-90 transition">Redeem</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </>
  );
};

const CinemaTabs = () => {
  const [activeTab, setActiveTab] = useState('nowShowing');
  
  const tabs = [
    { id: 'nowShowing', label: 'Now Showing' },
    { id: 'comingSoon', label: 'Coming Soon' },
    { id: 'trailers', label: 'Trailers' },
    { id: 'offers', label: 'Offers' }
  ];

  return (
    <div className="w-full pb-1 px-2">
      <div className="w-full rounded-xl backdrop-blur-md bg-white/10 border border-gray-800/95 dark:border-white/10 shadow-lg p-6">
        {/* Tab Header */}
        <div className="flex overflow-x-auto no-scrollbar">
          <div className="flex space-x-2 md:space-x-4 mx-auto">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`cursor-pointer relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 whitespace-nowrap
                  ${activeTab === tab.id 
                    ? 'bg-gray-800/95 text-white dark:bg-white dark:text-black shadow-md' 
                    : 'text-black dark:text-white hover:bg-black/5 dark:hover:bg-white/5'
                  }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-black dark:bg-white rounded-lg -z-10"
                    transition={{ type: "spring", duration: 0.6 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
        
        {/* Tab Content */}
        <TabContent activeTab={activeTab} />
      </div>
    </div>
  );
};

// This component will handle the global modal
const AppWithModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Set the setter function for the global modal state
  modalState.setIsOpen = setIsOpen;
  
  const handleClose = () => {
    modalState.isOpen = false;
    setIsOpen(false);
  };
  
  return (
    <>
      <CinemaTabs />
      
      {/* Modal rendered at the top level */}
      <TrailerModal
        isOpen={isOpen}
        onClose={handleClose}
        trailerUrl={modalState.trailerUrl}
        title={modalState.title}
      />
    </>
  );
};

export default AppWithModal;