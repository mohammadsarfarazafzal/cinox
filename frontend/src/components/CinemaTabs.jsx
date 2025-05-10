import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrailerModal } from './Modals.jsx';
import { getYoutubeEmbedUrl } from '../utils/helpers.js';
import { Link } from 'react-router-dom';


let modalState = {
  isOpen: false,
  trailerUrl: "",
  title: "",
  setIsOpen: null
};


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

const TabContent = ({ activeTab, shows, movies, theaters }) => {
  const nowShowingMovies = shows?.filter(show => show.active) || [];

  const openTrailer = (movie) => {
    modalState.trailerUrl = getYoutubeEmbedUrl(movie.trailerUrl);
    modalState.title = `${movie.title} - Trailer`;
    modalState.isOpen = true;
    if (modalState.setIsOpen) {
      modalState.setIsOpen(true);
    }
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
              {nowShowingMovies.map((show, index) => {
                const movie = show.movie;
                const theater = show.screen.theater;
                const showTime = new Date(show.showTime);
                
                return (
                  <div 
                    key={show.id} 
                    className="col-span-12 md:col-span-6 lg:col-span-4 rounded-xl overflow-hidden bg-white/10 dark:bg-black/20 border border-gray-800/95 dark:border-white/10 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="relative h-64 overflow-hidden">
                      <img 
                        src={movie.posterUrl} 
                        alt={movie.title} 
                        className="w-full h-full object-cover" 
                      />
                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                        <h3 className="text-white font-semibold text-lg">{movie.title}</h3>
                        <p className="text-white/80 text-sm">{movie.language}</p>
                      </div>
                    </div>
                    <div className="p-4 space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-xs dark:text-white bg-black/20 dark:bg-white/20 px-2 py-1 rounded-full">
                          {movie.genre}
                        </span>
                        <span className="text-xs dark:text-gray-300">
                          {Math.floor(movie.durationMins / 60)}h {movie.durationMins % 60}m
                        </span>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold dark:text-white">{theater.name}</span>
                          <span className="text-xs bg-blue-500/20 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-full">
                            {show.screen.screenName}
                          </span>
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-400">{theater.address}</p>
                        <div className="text-sm dark:text-white">
                          <span className="font-medium ">Show Time: </span>
                            {showTime.toLocaleTimeString('en-US', { 
                              hour: '2-digit', 
                              minute: '2-digit',
                              hour12: true 
                            })}
                        </div>
                        <div className="flex gap-2 text-xs dark:text-white">
                          <span>Silver: ₹{show.silverPrice}</span>
                          <span>Gold: ₹{show.goldPrice}</span>
                          <span>Platinum: ₹{show.platinumPrice}</span>
                        </div>
                      </div>
                      
                      <Link 
                        to={`/booking/${show.id}`}
                        className="block w-full mt-2 py-2 bg-gray-800/95 text-white dark:bg-white dark:text-black rounded-md text-sm font-semibold text-center hover:opacity-90 transition"
                      >
                        Book Now
                      </Link>
                    </div>
                  </div>
                );
              })}
              
              {nowShowingMovies.length === 0 && (
                <div className="col-span-12 text-center py-8 text-gray-500 dark:text-gray-400">
                  No shows available at the moment.
                </div>
              )}
            </div>
          )}
          {activeTab === 'allMovies' && (
            <div className="grid grid-cols-12 gap-6">
              {movies.map((movie, index) => {
                
                return (
                  <div 
                    key={movie.id} 
                    className="col-span-12 md:col-span-6 lg:col-span-4 rounded-xl overflow-hidden bg-white/10 dark:bg-black/20 border border-gray-800/95 dark:border-white/10 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="relative h-64 overflow-hidden">
                      <img 
                        src={movie.posterUrl} 
                        alt={movie.title} 
                        className="w-full h-full object-cover" 
                      />
                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                        <h3 className="text-white font-semibold text-lg">{movie.title}</h3>
                        <p className="text-white/80 text-sm">{movie.language}</p>
                      </div>
                    </div>                    <div className="p-4 flex flex-col h-[calc(100%-16rem)]">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-xs dark:text-white bg-black/20 dark:bg-white/20 px-2 py-1 rounded-full">
                          {movie.genre}
                        </span>
                        <span className="text-xs text-gray-600 dark:text-gray-400">
                          {Math.floor(movie.durationMins / 60)}h {movie.durationMins % 60}m
                        </span>
                      </div>
                      
                      <div className="flex-grow space-y-3">
                        <div className="space-y-1.5">
                          <div className="text-sm">
                            <span className="font-medium text-gray-900 dark:text-white">Director: </span>
                            <span className="text-gray-700 dark:text-gray-300">{movie.director}</span>
                          </div>
                          <div className="text-sm">
                            <span className="font-medium text-gray-900 dark:text-white">Cast: </span>
                            <span className="text-gray-700 dark:text-gray-300">{movie.cast}</span>
                          </div>
                          <div className="text-sm">
                            <span className="font-medium text-gray-900 dark:text-white">Language: </span>
                            <span className="text-gray-700 dark:text-gray-300">{movie.language}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-3 border-t border-gray-800/10 dark:border-white/10">
                        <button
                          onClick={() => openTrailer(movie)}
                          className="flex items-center justify-center gap-2 w-full py-2 text-sm font-semibold text-white bg-gray-800/95 dark:bg-white dark:text-black rounded-md hover:opacity-90 transition-all duration-300"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M6.3 2.841A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                          </svg>
                          Watch Trailer
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
            {activeTab === 'cinemas' && (
            <div className="grid grid-cols-12 gap-6">
              {theaters.map((theater) => (
                <div 
                  key={theater.id}
                  className="col-span-12 md:col-span-6 lg:col-span-4 rounded-xl overflow-hidden bg-white/10 dark:bg-black/20 border border-gray-800/95 dark:border-white/10 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={theater.theaterPhotoUrl} 
                      alt={theater.name} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-white font-semibold text-lg">{theater.name}</h3>
                      <p className="text-white/80 text-sm">{theater.city.name}</p>
                    </div>
                  </div>
                  <div className="p-4 space-y-3">
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600 dark:text-gray-400">{theater.address}</p>
                      <div className="flex items-center gap-2 text-sm">
                        <svg className="w-4 h-4 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <span className="text-gray-600 dark:text-gray-400">{theater.contactNumber}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium text-gray-900 dark:text-white">Screens:</h4>
                      <div className="flex flex-wrap gap-2">
                        {theater.screens.map((screen) => (
                          <span 
                            key={screen.id}
                            className="text-xs bg-blue-500/20 text-blue-600 dark:text-blue-400 px-2 py-1 rounded-full"
                          >
                            {screen.screenName}
                          </span>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-2 text-xs text-gray-600 dark:text-gray-400">
                        {theater.screens.map((screen) => (
                          <div key={screen.id} className="flex gap-2">
                            <span>Silver: {screen.silverSeats}</span>
                            <span>Gold: {screen.goldSeats}</span>
                            <span>Platinum: {screen.platinumSeats}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {theaters.length === 0 && (
                <div className="col-span-12 text-center py-8 text-gray-500 dark:text-gray-400">
                  No theaters available at the moment.
                </div>
              )}
            </div>
          )}

          {activeTab === 'trailers' && (
            <div className="grid grid-cols-12 gap-6">
              {movies.map((movie, index) => {
                return (
                  <div 
                    key={movie.id} 
                    className="col-span-12 md:col-span-6 lg:col-span-4 rounded-xl overflow-hidden bg-white/10 dark:bg-black/20 border border-gray-800/95 dark:border-white/10 shadow-lg"
                  >
                    <div className="relative">
                      <img 
                        src={movie.backdropUrl} 
                        alt={movie.title} 
                        className="w-full h-48 object-cover" 
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <button 
                          onClick={() => openTrailer(movie)} 
                          className="cursor-pointer w-16 h-16 rounded-full bg-black/50 dark:bg-white/50 flex items-center justify-center hover:scale-110 transition-all duration-300"
                        >
                          <svg className="w-8 h-8 text-white dark:text-black" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M6.3 2.841A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-sm dark:text-white">{movie.title}</h3>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </>
  );
};

const CinemaTabs = ({shows, movies, theaters}) => {
  const [activeTab, setActiveTab] = useState('nowShowing');

  
    const tabs = [
    { id: 'nowShowing', label: 'Now Showing' },
    { id: 'allMovies', label: 'Movies' },
    { id: 'trailers', label: 'Trailers' },
    { id: 'cinemas', label: 'Cinemas' }
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
        <TabContent activeTab={activeTab} shows={shows} movies={movies} theaters={theaters} />
      </div>
    </div>
  );
};

// This component will handle the global modal
const AppWithModal = ({ shows, movies, theaters }) => {  // Add shows prop here
  const [isOpen, setIsOpen] = useState(false);
  
  modalState.setIsOpen = setIsOpen;
  
  const handleClose = () => {
    modalState.isOpen = false;
    setIsOpen(false);
  };
  
  return (
    <>
      <CinemaTabs shows={shows} movies={movies} theaters={theaters}/>  {/* Pass shows prop here */}
      
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