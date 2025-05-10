import React, { useState, useEffect } from 'react';
import { useAuth } from '../auth/AuthContext';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { IconClock, IconMovie, IconChevronRight, IconTicket } from '@tabler/icons-react';

const MyBookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:8080/api/booking/');
        const userBookings = response.data.filter(booking => booking.user.id === user.id);
        setBookings(userBookings);
      } catch (err) {
        console.error('Error fetching bookings:', err);
        setError('Failed to load your bookings. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) {
      fetchBookings();
    }
  }, [user?.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-black dark:text-white">My Bookings</h1>
      
      {bookings.length === 0 ? (
        <div className="text-center py-12">
          <IconTicket className="mx-auto h-16 w-16 text-gray-400 dark:text-gray-600 mb-4" />
          <h3 className="text-xl font-medium text-gray-600 dark:text-gray-400 mb-2">
            No bookings found
          </h3>
          <p className="text-gray-500 dark:text-gray-500">
            Looks like you haven't made any bookings yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking) => (
            <motion.div
              key={booking.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl overflow-hidden bg-white/10 dark:bg-black/20 border border-gray-800/95 dark:border-white/10 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative h-48">
                <img 
                  src={booking?.show?.movie?.backdropUrl || '/placeholder-movie.jpg'} 
                  alt={booking?.show?.movie?.title || 'Movie'}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-semibold text-lg">
                    {booking?.show?.movie?.title || 'Movie Title Not Available'}
                  </h3>
                  <p className="text-white/80 text-sm">
                    {booking?.show?.screen?.theater?.name || 'Theater Name Not Available'}
                  </p>
                </div>
              </div>
              
              <div className="p-4 space-y-3">
                <div className="text-sm space-y-2">
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <IconClock size={16} />
                    <p>
                      {booking?.show?.showTime ? new Date(booking.show.showTime).toLocaleString('en-US', {
                        dateStyle: 'medium',
                        timeStyle: 'short'
                      }) : 'Time Not Available'}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <IconMovie size={16} />
                    <p>{booking?.show?.screen?.screenName || 'Screen Not Available'}</p>
                  </div>
                  
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    <strong>Seats:</strong> {booking?.seatNumbers || 'Not Available'}
                  </div>
                  
                  <div className="flex items-center justify-between pt-2 border-t border-gray-800/10 dark:border-white/10">
                    <span className="font-medium text-gray-900 dark:text-white">
                      ₹{booking?.totalAmount?.toFixed(2) || '0.00'}
                    </span>
                    <span className={`text-sm px-2 py-1 rounded-full ${
                      booking?.status === 'PAID' 
                        ? 'bg-green-500/20 text-green-600 dark:text-green-400'
                        : 'bg-yellow-500/20 text-yellow-600 dark:text-yellow-400'
                    }`}>
                      {booking?.status || 'Unknown'}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
