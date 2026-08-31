import { useState } from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import axios from 'axios';
import { FiCreditCard, FiLock, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { showtime, selectedSeats, subtotal } = location.state || {};

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // If no state is passed, redirect back to home
  if (!showtime || !selectedSeats) {
    return <Navigate to="/" replace />;
  }

  // If user is not logged in, redirect to login with returnUrl
  if (!user) {
    // Basic redirect, you might want a more sophisticated returnUrl handling in Auth
    return <Navigate to="/login" replace />;
  }

  const convenienceFee = subtotal * 0.10; // 10% fee
  const totalAmount = subtotal + convenienceFee;

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const payload = {
        showtimeId: showtime._id,
        seatIds: selectedSeats.map(s => s._id),
        bookingType: 'Movie',
        subtotal: subtotal,
        totalAmount: totalAmount
      };

      const { data } = await axios.post('http://localhost:5000/api/bookings', payload);

      if (data.success) {
        navigate(`/booking-success/${data.data._id}`);
      } else {
        setError(data.message || 'Payment failed. Please try again.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred during payment processing.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-dark-900 min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-12 text-white">
      <div className="max-w-6xl mx-auto flex flex-col-reverse lg:flex-row gap-12">
        
        {/* Left Side: Payment Form */}
        <div className="flex-1">
          <div className="bg-dark-800 rounded-3xl p-8 border border-dark-700 shadow-xl">
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3 border-b border-dark-700 pb-4">
              <FiCreditCard className="text-brand-500" /> Payment Details
            </h2>

            {error && (
              <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg mb-6 flex items-center gap-2">
                <FiAlertCircle /> {error}
              </div>
            )}

            <form onSubmit={handlePayment} className="space-y-6">
              {/* Mock Credit Card Details */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Card Number</label>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="4111 1111 1111 1111" 
                    className="w-full bg-dark-900 border border-dark-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
                    required
                    defaultValue="4111 1111 1111 1111"
                  />
                  <FiCreditCard className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Expiry Date</label>
                  <input 
                    type="text" 
                    placeholder="MM/YY" 
                    className="w-full bg-dark-900 border border-dark-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
                    required
                    defaultValue="12/28"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">CVV</label>
                  <input 
                    type="password" 
                    placeholder="123" 
                    maxLength="3"
                    className="w-full bg-dark-900 border border-dark-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
                    required
                    defaultValue="123"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Name on Card</label>
                <input 
                  type="text" 
                  placeholder="John Doe" 
                  className="w-full bg-dark-900 border border-dark-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
                  required
                  defaultValue={user?.name || "John Doe"}
                />
              </div>

              <div className="pt-4 flex items-center justify-center text-sm text-gray-500 gap-2">
                <FiLock /> Payments are secure and encrypted
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-400 hover:to-brand-500 text-white font-bold text-lg py-4 rounded-xl shadow-[0_10px_25px_-5px_rgba(217,70,239,0.5)] transform transition hover:-translate-y-1 flex justify-center items-center gap-2 disabled:opacity-70 disabled:hover:translate-y-0"
              >
                {loading ? 'Processing...' : `Pay ₹${totalAmount.toFixed(2)}`}
                {!loading && <FiCheckCircle />}
              </button>
            </form>
          </div>
        </div>

        {/* Right Side: Order Summary */}
        <div className="w-full lg:w-[400px] shrink-0">
          <div className="bg-gradient-to-b from-dark-800 to-dark-900 rounded-3xl p-8 border border-dark-700 sticky top-24 shadow-2xl">
            <h2 className="text-2xl font-bold mb-6 border-b border-dark-700 pb-4">Order Summary</h2>
            
            <div className="flex gap-4 mb-6 pb-6 border-b border-dark-700">
              <img 
                src={showtime.movie.poster} 
                alt={showtime.movie.title} 
                className="w-20 h-28 object-cover rounded-lg shadow-md"
              />
              <div>
                <h3 className="text-xl font-bold">{showtime.movie.title}</h3>
                <p className="text-gray-400 text-sm mt-1">{showtime.movie.certificate} • {showtime.movie.language.join(', ')}</p>
                <p className="text-gray-400 text-sm mt-1">{showtime.cinema.name}, {showtime.cinema.city}</p>
              </div>
            </div>

            <div className="space-y-4 mb-6 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Date & Time</span>
                <span className="font-medium">{new Date(showtime.date).toLocaleDateString()} | {showtime.startTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Seats ({selectedSeats.length})</span>
                <span className="font-medium text-right max-w-[50%]">
                  {selectedSeats.map(s => s.seatNumber).join(', ')}
                </span>
              </div>
            </div>

            <div className="space-y-3 pt-6 border-t border-dark-700 text-sm">
              <div className="flex justify-between text-gray-300">
                <span>Tickets Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Convenience Fee (10%)</span>
                <span>₹{convenienceFee.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between text-xl font-black text-white pt-4 border-t border-dark-700 mt-4">
                <span>Amount Payable</span>
                <span className="text-brand-400">₹{totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Payment;
