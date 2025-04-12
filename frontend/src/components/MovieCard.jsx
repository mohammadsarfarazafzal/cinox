import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { cn } from '../utils/helpers';

const MovieCard = ({ movie, className }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ 
        y: -5,
        transition: { duration: 0.2 }
      }}
      className={cn(
        "glass-effect relative overflow-hidden rounded-xl",
        "group cursor-pointer",
        className
      )}
    >
      <Link to={`/movies/${movie?.id}`}>
        <div className="relative aspect-[2/3] overflow-hidden">
          <motion.img
            src={movie?.poster}
            alt={movie?.title}
            className="h-full w-full object-cover"
            loading="lazy"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute inset-0 bg-black/50 p-4 flex flex-col justify-end"
          >
            <h3 className="text-xl font-bold text-white">{movie?.title}</h3>
            <p className="text-sm text-gray-200 mt-1">{movie?.genre}</p>
          </motion.div>
        </div>
      </Link>
    </motion.div>
  );
};

export default MovieCard;