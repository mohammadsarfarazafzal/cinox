// src/components/MovieCarousel.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const movies = [
  {
    id: 1,
    title: "Inception",
    posterUrl: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
    backdrop: "https://image.tmdb.org/t/p/original/s3TBrRGB1iav7gFOCNx3H31MoES.jpg",
    description:
      "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    duration: "2h 28min",
    genre: ["Action", "Sci-Fi", "Thriller"],
    rating: 8.8,
    director: "Christopher Nolan",
    cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Elliot Page"],
    releaseDate: "2010-07-16",
    trailerUrl: "https://www.youtube.com/watch?v=YoHD9XEInc0",
  },
  {
    id: 2,
    title: "The Dark Knight",
    posterUrl: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    backdrop: "https://image.tmdb.org/t/p/original/hkBaDkMWbLaf8B1lsWsKX7Ew3Xq.jpg",
    description:
      "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    duration: "2h 32min",
    genre: ["Action", "Crime", "Drama"],
    rating: 9.0,
    director: "Christopher Nolan",
    cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
    releaseDate: "2008-07-18",
    trailerUrl: "https://www.youtube.com/watch?v=EXeTwQWrcwY",
  },
  {
    id: 3,
    title: "Interstellar",
    posterUrl: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    backdrop: "https://images7.alphacoders.com/550/550739.jpg",
    description:
      "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    duration: "2h 49min",
    genre: ["Adventure", "Drama", "Sci-Fi"],
    rating: 8.6,
    director: "Christopher Nolan",
    cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
    releaseDate: "2014-11-07",
    trailerUrl: "https://www.youtube.com/watch?v=zSWdZVtXT7E",
  },
  {
    id: 4,
    title: "Dune",
    posterUrl: "https://image.tmdb.org/t/p/w500/d5NXSklXo0qyIYkgV94XAgMIckC.jpg",
    backdrop: "https://image.tmdb.org/t/p/original/jYEW5xZkZk2WTrdbMGAPFuBqbDc.jpg",
    description:
      "Feature adaptation of Frank Herbert's science fiction novel about the son of a noble family entrusted with the protection of the most valuable asset and most vital element in the galaxy.",
    duration: "2h 35min",
    genre: ["Action", "Adventure", "Drama"],
    rating: 8.0,
    director: "Denis Villeneuve",
    cast: ["Timothée Chalamet", "Rebecca Ferguson", "Zendaya"],
    releaseDate: "2021-10-22",
    trailerUrl: "https://www.youtube.com/watch?v=8g18jFHCLXk",
  },
  {
    id: 5,
    title: "Oppenheimer",
    posterUrl: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
    backdrop: "https://image.tmdb.org/t/p/original/fm6KqXpk3M2HVveHwCrBSSBaO0V.jpg",
    description:
      "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.",
    duration: "3h 0min",
    genre: ["Biography", "Drama", "History"],
    rating: 8.5,
    director: "Christopher Nolan",
    cast: ["Cillian Murphy", "Emily Blunt", "Matt Damon"],
    releaseDate: "2023-07-21",
    trailerUrl: "https://www.youtube.com/watch?v=uYPbbksJxIg",
  },
];

const slideVariants = {
  enter: (direction) => ({
    // New slide starts directly below (if direction=1) or above (if direction=-1)
    y: direction > 0 ? "100%" : "-100%",
  }),
  center: {
    y: "0%",
  },
  exit: (direction) => ({
    // Existing slide moves out in the opposite direction
    y: direction > 0 ? "-100%" : "100%",
  }),
};

export default function MovieCarousel() {
  const [[page, direction], setPage] = useState([0, 0]);
  const [hoveredDot, setHoveredDot] = useState(null);
  const movieIndex = (page % movies.length + movies.length) % movies.length;
  const movie = movies[movieIndex];

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

  return (
    <div className="relative flex items-center justify-center w-full h-[600px] overflow-hidden">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={page}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            y: { type: "tween", ease: "easeInOut", duration: 1 },
          }}
          drag="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = Math.abs(offset.y) * velocity.y;
            if (swipe < -100) {
              paginate(1);
            } else if (swipe > 100) {
              paginate(-1);
            }
          }}
          className="absolute top-0 left-0 w-full h-full"
        >
          <img
            src={movie.backdrop}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          {/* Frozen Glass Overlay positioned at Bottom-Left */}
          <div className="absolute inset-0 flex items-end justify-start">
            <div className="mx-4 mb-8 max-w-lg rounded-xl p-6 bg-gray-800/25 shadow-lg backdrop-blur-sm border border-white/30">
              <h2 className="text-3xl font-bold text-white drop-shadow-md">
                {movie.title}
              </h2>
              <p className="mt-2 text-lg text-white/90 drop-shadow-sm">
                {movie.description}
              </p>
              <div className="mt-6">
                <Link
                  to={`/movies/${movie.id}`}
                  className="inline-block px-6 py-3 text-lg font-semibold dark:text-black text-white bg-gray-800 dark:bg-white rounded-md shadow hover:-translate-y-0.5 transition duration-200"
                >
                  Book
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Vertical Pagination Dots on the Right with Tooltip */}
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex flex-col gap-4">
        {movies.map((movieItem, idx) => (
          <div key={idx} className="relative flex items-center">
            <button
              onClick={() => setPage([idx, idx > movieIndex ? 1 : -1])}
              onMouseEnter={() => setHoveredDot(idx)}
              onMouseLeave={() => setHoveredDot(null)}
              className={`w-3 cursor-pointer h-3 rounded-full transition-all ${
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
                {movieItem.title}
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
