import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import axios from 'axios';
import SeatSelector from '../components/SeatSelector';

const Booking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [show, setShow] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [showResponse, bookingsResponse] = await Promise.all([
          axios.get(`http://localhost:8080/api/show/${id}`),
          axios.get('http://localhost:8080/api/booking/')
        ]);

        setShow(showResponse.data);
        const currentShowBookings = bookingsResponse.data.filter(
          booking => booking.show.id === parseInt(id)
        );
        setBookings(currentShowBookings);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load show details");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!show) return <div>Show not found</div>;

  const handleSeatSelection = (seats) => {
    setSelectedSeats(seats);
  };

  const handlePayment = async () => {
    try {
      const bookingResponse = await axios.post('http://localhost:8080/api/payment/addBooking', {
        bookingDate: new Date().toISOString(),
        totalAmount: selectedSeats.reduce((total, seat) => {
          const type = seat[0];
          switch(type) {
            case 'S': return total + show.silverPrice;
            case 'G': return total + show.goldPrice;
            case 'P': return total + show.platinumPrice;
            default: return total;
          }
        }, 0),
        userId: user.id,
        showId: show.id,
        seatNumbers: selectedSeats.join(',')
      });

      const booking = bookingResponse.data;

      const options = {
        key: 'rzp_test_qDAV8sCeGjU7AR',
        amount: booking.totalAmount * 100,
        currency: "INR",
        name: "CINOX",
        description: `Booking for ${show.movie.title}`,
        order_id: booking.razorpayOrderId,
        handler: async (response) => {
          await axios.post('http://localhost:8080/api/payment/confirm', {
            razorpayOrderId: booking.razorpayOrderId,
            razorpayPaymentId: response.razorpay_payment_id
          });

          navigate('/bookings');
        },
        prefill: {
          name: user.fullName,
          email: user.email,
          contact: user.phoneNumber
        },
        theme: {
          color: "#3399cc"
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {
      console.error('Payment failed:', error);
      setError('Payment failed. Please try again.');
    }
  };

  
  const bookedSeats = bookings
    .map(booking => booking.seatNumbers.split(','))
    .flat()
    .map(seat => seat.trim());

  return (
    <div className="flex rounded-xl min-h-screen backdrop-blur-md bg-white/10 border border-gray-800/95 dark:border-white/10 shadow-lg text-white p-4">
      
      <div className="flex-grow">
        <SeatSelector 
          goldSeats={show.screen.goldSeats}
          silverSeats={show.screen.silverSeats}
          platinumSeats={show.screen.platinumSeats}
          bookedSeats={bookedSeats}
          onSeatSelect={handleSeatSelection}
        />
      </div>

      
      <div className="w-96 ml-4 p-6 rounded-xl bg-gray-800/95 dark:bg-neutral-900/95 backdrop-blur-md border-t border-white/10 dark:border-white/5">
        <h2 className="text-2xl font-bold mb-4">{show.movie.title}</h2>
        <div className="space-y-4">
          <div>
            <p className="text-gray-400">Theater</p>
            <p className="font-medium">{show.screen.theater.name}</p>
          </div>
          <div>
            <p className="text-gray-400">Screen</p>
            <p className="font-medium">{show.screen.screenName}</p>
          </div>
          <div>
            <p className="text-gray-400">Show Time</p>
            <p className="font-medium">
              {new Date(show.showTime).toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
              })}
            </p>
          </div>
          <div>
            <p className="text-gray-400">Price</p>
            <div className="space-y-1">
              <p className="text-sm">Silver: ₹{show.silverPrice}</p>
              <p className="text-sm">Gold: ₹{show.goldPrice}</p>
              <p className="text-sm">Platinum: ₹{show.platinumPrice}</p>
            </div>
          </div>
          <div>
            <p className="text-gray-400">Selected Seats</p>
            <p className="font-medium">{selectedSeats.join(', ') || 'None'}</p>
          </div>
          <div>
            <p className="text-gray-400">Total Amount</p>
            <p className="text-xl font-bold">
              ₹{selectedSeats.reduce((total, seat) => {
                const type = seat[0];
                switch(type) {
                  case 'S': return total + show.silverPrice;
                  case 'G': return total + show.goldPrice;
                  case 'P': return total + show.platinumPrice;
                  default: return total;
                }
              }, 0)}
            </p>
          </div>
          <button
            disabled={selectedSeats.length === 0}
            onClick={handlePayment}
            className="w-full py-3 bg-white text-black rounded-lg font-semibold 
                     disabled:bg-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed
                     hover:opacity-90 transition"
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Booking;