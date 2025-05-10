import React, { useState } from 'react';
import { motion } from 'motion/react';
import { cn } from '../utils/helpers';

const Seat = ({ id, isBooked, isSelected, onSelect }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onClick={() => !isBooked && onSelect(id)}
      className={cn(
        "w-10 h-10 rounded-t-lg m-1 transition-colors dark:border-0 border",
        isBooked ? "bg-gray-500 cursor-not-allowed text-white/50" :
        isSelected ? "bg-violet-600 hover:bg-violet-700 text-white" :
        "bg-gray-200 hover:bg-gray-300 dark:bg-neutral-700 dark:hover:bg-neutral-600 text-gray-900 dark:text-white"
      )}
      disabled={isBooked}
    >
      <span className="text-sm font-medium">
        {id}
      </span>
    </motion.button>
  );
};

const SeatSelector = ({ 
  goldSeats = 20, 
  silverSeats = 70, 
  platinumSeats = 10, 
  bookedSeats = [], 
  onSeatSelect 
}) => {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSeatSelect = (seatId) => {
    setSelectedSeats(prev => {
      const newSelection = prev.includes(seatId)
        ? prev.filter(id => id !== seatId)
        : [...prev, seatId];
      onSeatSelect(newSelection);
      return newSelection;
    });
  };

  const renderSeats = (count, prefix) => {
    const rows = Math.ceil(count / 8);
    return Array.from({ length: rows }, (_, rowIndex) => (
      <motion.div
        key={rowIndex}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: rowIndex * 0.1 }}
        className="flex justify-center"
      >
        {Array.from({ length: Math.min(8, count - rowIndex * 8) }, (_, seatIndex) => {
          const seatId = `${prefix}${rowIndex * 8 + seatIndex + 1}`;
          return (
            <Seat
              key={seatId}
              id={seatId}
              isBooked={bookedSeats.includes(seatId)}
              isSelected={selectedSeats.includes(seatId)}
              onSelect={handleSeatSelect}
            />
          );
        })}
      </motion.div>
    ));
  };

  return (
    <div className="p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center gap-6"
      >
        {/* Screen */}
        <div className="w-full max-w-2xl">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            className="h-2 bg-gradient-to-r from-violet-500 to-violet-600 rounded-full mb-8"
          />
          <p className="text-center text-sm text-gray-500 mb-8">Screen</p>
        </div>

        {/* Seats Grid */}
        <div className="space-y-8">
          <div>
            <h3 className="text-center text-sm mb-4">Platinum</h3>
            <div className="grid gap-2">
              {renderSeats(platinumSeats, 'P')}
            </div>
          </div>
          <div>
            <h3 className="text-center text-sm mb-4">Gold</h3>
            <div className="grid gap-2">
              {renderSeats(goldSeats, 'G')}
            </div>
          </div>
          <div>
            <h3 className="text-center text-sm mb-4">Silver</h3>
            <div className="grid gap-2">
              {renderSeats(silverSeats, 'S')}
            </div>
          </div>
        </div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex gap-4 mt-6"
        >
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-gray-500 border dark:border-0 bg-gray-200 dark:bg-neutral-700 rounded" />
            <span className="text-sm dark:text-white text-gray-500">Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-violet-600 rounded" />
            <span className="text-sm dark:text-white text-gray-500">Selected</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-500 rounded" />
            <span className="text-sm dark:text-white text-gray-500">Booked</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SeatSelector;