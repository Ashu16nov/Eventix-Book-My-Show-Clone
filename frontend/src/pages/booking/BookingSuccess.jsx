import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { FiCheckCircle, FiDownload, FiHome } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

const BookingSuccess = () => {
  const { bookingId } = useParams();
  const { user } = useAuth();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/bookings/${bookingId}`);
        setBooking(data.data);
      } catch (err) {
        setError('Failed to load booking details.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchBooking();
    } else {
      setLoading(false);
      setError('You must be logged in to view booking details.');
    }
  }, [bookingId, user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-brand-500"></div>
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="min-h-screen bg-dark-900 flex flex-col items-center justify-center text-white p-4">
        <h2 className="text-2xl font-bold mb-4 text-red-500">{error || 'Booking not found'}</h2>
        <Link to="/" className="text-brand-500 hover:underline flex items-center gap-2">
          <FiHome /> Back to Home
        </Link>
      </div>
    );
  }

  const { showtime, seats } = booking;
  const { movie, cinema, screen } = showtime;

  return (
    <div className="bg-dark-900 min-h-screen pt-24 pb-20 px-4 sm:px-6 flex items-center justify-center text-white">
      <div className="max-w-2xl w-full">
        {/* Success Message */}
        <div className="text-center mb-8">
          <FiCheckCircle className="text-6xl text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl md:text-4xl font-black mb-2">Booking Confirmed!</h1>
          <p className="text-gray-400">Your tickets have been successfully booked.</p>
        </div>

        {/* Ticket Slip */}
        <div className="bg-white text-dark-900 rounded-3xl overflow-hidden shadow-2xl relative">
          {/* Top Cutouts */}
          <div className="absolute top-0 left-0 w-8 h-8 bg-dark-900 rounded-br-full"></div>
          <div className="absolute top-0 right-0 w-8 h-8 bg-dark-900 rounded-bl-full"></div>
          
          <div className="p-8 border-b-2 border-dashed border-gray-300 relative">
            {/* Side Cutouts for dashed line */}
            <div className="absolute -left-4 -bottom-4 w-8 h-8 bg-dark-900 rounded-full"></div>
            <div className="absolute -right-4 -bottom-4 w-8 h-8 bg-dark-900 rounded-full"></div>

            <div className="flex flex-col md:flex-row gap-6">
              <img 
                src={movie.poster} 
                alt={movie.title} 
                className="w-32 h-48 object-cover rounded-xl shadow-lg mx-auto md:mx-0"
              />
              <div className="flex-1 text-center md:text-left">
                <div className="bg-brand-500 text-white text-xs font-bold px-3 py-1 rounded-full inline-block mb-2">
                  {booking.bookingId}
                </div>
                <h2 className="text-3xl font-black mb-1">{movie.title}</h2>
                <p className="text-gray-600 font-medium mb-4">{movie.language.join(', ')} • {movie.certificate}</p>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500 text-xs uppercase tracking-wider">Date</p>
                    <p className="font-bold">{new Date(showtime.date).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs uppercase tracking-wider">Time</p>
                    <p className="font-bold">{showtime.startTime}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-gray-500 text-xs uppercase tracking-wider">Cinema</p>
                    <p className="font-bold">{cinema.name}, {cinema.city}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 bg-gray-50 relative">
            {/* Bottom Cutouts */}
            <div className="absolute bottom-0 left-0 w-8 h-8 bg-dark-900 rounded-tr-full"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 bg-dark-900 rounded-tl-full"></div>

            <div className="flex justify-between items-center mb-6">
              <div>
                <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Screen</p>
                <p className="font-black text-xl">{screen.name}</p>
              </div>
              <div className="text-right">
                <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Seats ({seats.length})</p>
                <p className="font-black text-xl text-brand-600">
                  {seats.map(s => s.seatNumber).join(', ')}
                </p>
              </div>
            </div>

            <div className="flex justify-between items-end pt-6 border-t border-gray-200">
              <div>
                <img 
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${booking.bookingId}`} 
                  alt="QR Code" 
                  className="w-16 h-16"
                />
              </div>
              <div className="text-right">
                <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Total Amount Paid</p>
                <p className="font-black text-3xl">₹{booking.totalAmount}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <button 
            onClick={() => window.print()}
            className="bg-dark-800 hover:bg-dark-700 text-white font-bold py-3 px-8 rounded-xl transition border border-dark-600 flex justify-center items-center gap-2"
          >
            <FiDownload /> Download / Print Ticket
          </button>
          <Link 
            to="/"
            className="bg-brand-500 hover:bg-brand-600 text-white font-bold py-3 px-8 rounded-xl transition shadow-[0_0_15px_rgba(217,70,239,0.3)] flex justify-center items-center gap-2"
          >
            <FiHome /> Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookingSuccess;
