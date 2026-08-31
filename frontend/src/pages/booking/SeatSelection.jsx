import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FiCheckCircle, FiInfo } from 'react-icons/fi';

const SeatSelection = () => {
  const { showtimeId } = useParams();
  const navigate = useNavigate();
  const [showtime, setShowtime] = useState(null);
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShowtimeData = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/showtimes/${showtimeId}`);
        setShowtime(data.data.showtime);
        setSeats(data.data.seats);
      } catch (error) {
        console.error('Failed to fetch showtime and seats', error);
      } finally {
        setLoading(false);
      }
    };
    fetchShowtimeData();
  }, [showtimeId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-brand-500"></div>
      </div>
    );
  }

  if (!showtime) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center text-white">
        <h2 className="text-2xl">Showtime not found</h2>
      </div>
    );
  }

  const toggleSeatSelection = (seat) => {
    if (seat.status !== 'Available') return;

    const isSelected = selectedSeats.some((s) => s._id === seat._id);
    if (isSelected) {
      setSelectedSeats(selectedSeats.filter((s) => s._id !== seat._id));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const calculateTotal = () => {
    return selectedSeats.reduce((total, seat) => total + seat.price, 0);
  };

  const handleProceedToPayment = () => {
    if (selectedSeats.length === 0) return;
    
    // Pass booking data to the payment page via route state
    navigate('/payment', {
      state: {
        showtime,
        selectedSeats,
        subtotal: calculateTotal()
      }
    });
  };

  // Group seats by row for rendering
  const seatsByRow = seats.reduce((acc, seat) => {
    if (!acc[seat.row]) acc[seat.row] = [];
    acc[seat.row].push(seat);
    return acc;
  }, {});

  const rows = Object.keys(seatsByRow).sort(); // A, B, C...

  return (
    <div className="bg-dark-900 min-h-screen pb-32 pt-24 px-4 sm:px-6 lg:px-12 text-white">
      <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-12">
        
        {/* Left Side: Seat Layout */}
        <div className="flex-1">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">{showtime.movie.title}</h1>
            <p className="text-gray-400">
              {showtime.cinema.name} | {new Date(showtime.date).toLocaleDateString()} | {showtime.startTime}
            </p>
          </div>

          <div className="bg-dark-800 p-8 rounded-3xl border border-dark-700 overflow-x-auto shadow-2xl">
            {/* Screen indicator */}
            <div className="relative mb-16">
              <div className="w-3/4 mx-auto h-2 bg-gradient-to-r from-brand-500/0 via-brand-500 to-brand-500/0 blur-[2px]"></div>
              <div className="w-3/4 mx-auto h-2 bg-gradient-to-r from-brand-400/0 via-brand-400 to-brand-400/0 shadow-[0_0_20px_rgba(217,70,239,0.5)]"></div>
              <p className="text-center text-gray-500 mt-4 text-sm font-semibold tracking-widest uppercase">Screen this way</p>
            </div>

            {/* Seat Grid */}
            <div className="flex flex-col gap-4 items-center min-w-max">
              {rows.map((row) => (
                <div key={row} className="flex items-center gap-4">
                  <div className="w-6 text-center font-bold text-gray-500">{row}</div>
                  <div className="flex gap-2">
                    {seatsByRow[row]
                      .sort((a, b) => a.column - b.column)
                      .map((seat) => {
                        const isSelected = selectedSeats.some((s) => s._id === seat._id);
                        const isBooked = seat.status !== 'Available';
                        
                        let baseClasses = "w-8 h-8 sm:w-10 sm:h-10 rounded-t-lg rounded-b-sm text-xs font-bold transition-all duration-200 flex items-center justify-center ";
                        
                        if (isBooked) {
                          baseClasses += "bg-dark-600 text-dark-500 cursor-not-allowed opacity-50";
                        } else if (isSelected) {
                          baseClasses += "bg-brand-500 text-white shadow-[0_0_15px_rgba(217,70,239,0.5)] scale-110";
                        } else {
                          // Different colors for different categories
                          if (seat.category === 'Premium') {
                            baseClasses += "bg-dark-700 text-gray-300 border border-yellow-500/30 hover:border-yellow-500 hover:bg-dark-600 cursor-pointer";
                          } else {
                            baseClasses += "bg-dark-700 text-gray-300 border border-dark-600 hover:border-white hover:bg-dark-600 cursor-pointer";
                          }
                        }

                        return (
                          <div
                            key={seat._id}
                            className={baseClasses}
                            onClick={() => toggleSeatSelection(seat)}
                            title={`${seat.seatNumber} - ₹${seat.price}`}
                          >
                            {seat.column}
                          </div>
                        );
                      })}
                  </div>
                  <div className="w-6 text-center font-bold text-gray-500">{row}</div>
                </div>
              ))}
            </div>
            
            {/* Legend */}
            <div className="mt-12 flex justify-center gap-6 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-t bg-dark-700 border border-dark-600"></div>
                <span>Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-t bg-dark-700 border border-yellow-500/50"></div>
                <span>Premium</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-t bg-brand-500 shadow-[0_0_10px_rgba(217,70,239,0.5)]"></div>
                <span className="text-white">Selected</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-t bg-dark-600 opacity-50"></div>
                <span>Sold</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Booking Summary */}
        <div className="w-full lg:w-96 shrink-0">
          <div className="bg-gradient-to-b from-dark-800 to-dark-900 rounded-3xl p-8 border border-dark-700 sticky top-24 shadow-2xl">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 border-b border-dark-700 pb-4">
              Booking Summary
            </h2>
            
            {selectedSeats.length === 0 ? (
              <div className="text-center py-8 text-gray-500 flex flex-col items-center">
                <FiInfo className="text-4xl mb-4 opacity-50" />
                <p>Please select your seats to continue.</p>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm text-gray-400 mb-2 uppercase tracking-wider font-bold">Selected Seats</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedSeats.map((seat) => (
                      <span key={seat._id} className="bg-brand-500/10 border border-brand-500/30 text-brand-400 px-3 py-1 rounded-lg text-sm font-bold">
                        {seat.seatNumber}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="border-t border-dark-700 pt-4 space-y-3">
                  {selectedSeats.map((seat) => (
                    <div key={seat._id} className="flex justify-between text-gray-300 text-sm">
                      <span>Seat {seat.seatNumber} ({seat.category})</span>
                      <span>₹{seat.price}</span>
                    </div>
                  ))}
                  
                  <div className="flex justify-between text-lg font-bold text-white pt-4 border-t border-dark-700">
                    <span>Subtotal</span>
                    <span>₹{calculateTotal()}</span>
                  </div>
                </div>

                <button
                  onClick={handleProceedToPayment}
                  className="w-full bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-400 hover:to-brand-500 text-white font-bold py-4 rounded-xl shadow-[0_10px_25px_-5px_rgba(217,70,239,0.4)] transform transition hover:-translate-y-1 flex justify-center items-center gap-2"
                >
                  Proceed to Payment <FiCheckCircle />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatSelection;
