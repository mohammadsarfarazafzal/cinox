import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {getYoutubeEmbedUrl} from '../utils/helpers.js'
import { TrailerModal } from "./Modals.jsx";

const slideVariants = {
  enter: (direction) => ({
    y: direction > 0 ? "100%" : "-100%",
  }),
  center: {
    y: "0%",
  },
  exit: (direction) => ({
    y: direction > 0 ? "-100%" : "100%",
  }),
};

const swipeConfidenceThreshold = 100;

export default function MovieCarousel({shows}) {
  const [[page, direction], setPage] = useState([0, 0]);
  
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const [hoveredDot, setHoveredDot] = useState(null);
  const nowShowingMovies = shows?.filter(show => show.active) || [];

  const movieIndex = (page % nowShowingMovies.length + nowShowingMovies.length) % nowShowingMovies.length;
  const movie = nowShowingMovies[movieIndex].movie;
  const showId = nowShowingMovies[movieIndex].id;
  const theater = nowShowingMovies[movieIndex].screen.theater;
  const showTime = new Date(nowShowingMovies[movieIndex].showTime);

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  // Auto-play every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1);
    }, 5000);
    return () => clearInterval(timer);
  }, [page]);

  
  const handleTrailerClick = () => {
    setSelectedMovie(movie);
    setIsTrailerOpen(true);
  };

  return (
    <div className="relative flex items-center justify-center w-full h-[80vh] lg:h-[calc(100vh-5rem)] overflow-hidden mb-3">
      {/* Carousel Slides */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={page}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ y: { type: "tween", ease: "easeInOut", duration: 1.3 } }}
          drag="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = Math.abs(offset.y) * velocity.y;
            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
          className="absolute top-0 left-0 w-full h-full"
        >
          <img
            src={movie.backdropUrl}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-end justify-start">
            <div className="mx-4 mb-8 max-w-lg rounded-xl p-6 bg-gray-800/25 shadow-lg backdrop-blur-lg border border-white/30">
              <h2 className="text-3xl font-bold text-white drop-shadow-md">{movie.title}</h2>
              <p className="mt-2 text-lg text-white/90 drop-shadow-sm hidden sm:block">{movie.description}</p>
             
              <div className="mt-4 text-white text-sm space-y-1">
                <div>
                  <span className="font-semibold">Duration:</span>{' '}
                  {Math.floor(movie.durationMins / 60)}h {movie.durationMins % 60}m
                </div>
                <div>
                  <span className="font-semibold">Genre:</span> {movie.genre}
                </div>
                <div>
                  <span className="font-semibold">Cast:</span> {movie.cast}
                </div>
                <div>
                  <span className="font-semibold">Theater:</span> {theater.name}
                </div>
                <div>
                  <span className="font-semibold">Show Time:</span> {showTime.toLocaleTimeString('en-US', { 
                            hour: '2-digit', 
                            minute: '2-digit',
                            hour12: true 
                          })}
                </div>
              </div>
              {/* Buttons */}
              <div className="mt-6 flex gap-4">
                <Link
                  to={`/booking/${showId}`}
                  className="inline-block px-6 py-3 text-lg font-bold text-black bg-white rounded-md shadow hover:-translate-y-0.5 transition duration-200"
                >
                  Book
                </Link>
                <button
                  onClick={handleTrailerClick}
                  className="cursor-pointer inline-block px-6 py-3 text-lg font-semibold text-white bg-transparent border border-white rounded-md shadow hover:bg-white/20 transition"
                >
                  Trailer
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Vertical Pagination Dots on Right with Tooltip */}
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex flex-col gap-4">
        {nowShowingMovies.map((movieItem, idx) => {
          const movieName = movieItem.movie;
          return (

          <div key={idx} className="relative flex items-center">
            <button
              onClick={() => setPage([idx, idx > movieIndex ? 1 : -1])}
              onMouseEnter={() => setHoveredDot(idx)}
              onMouseLeave={() => setHoveredDot(null)}
              className={`w-3 h-3 cursor-pointer rounded-full transition-all ${
                idx === movieIndex ? "bg-white" : "bg-white/50"
              }`}
            />
            {hoveredDot === idx && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.3 }}
                className="absolute right-8 whitespace-nowrap text-sm text-white"
              >
                {movieName.title}
              </motion.div>
            )}
          </div>
        )})}
      </div>

      
      <TrailerModal
        isOpen={isTrailerOpen}
        onClose={() => setIsTrailerOpen(false)}
        trailerUrl={selectedMovie ? getYoutubeEmbedUrl(selectedMovie.trailerUrl) : ""}
        title={selectedMovie ? selectedMovie.title + " - Trailer" : ""}
      />
    </div>
  );
}