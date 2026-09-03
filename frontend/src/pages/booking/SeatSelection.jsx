import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FiChevronLeft, FiEdit2, FiInfo, FiX } from 'react-icons/fi';

const SeatSelection = () => {
  const { showtimeId } = useParams();
  const navigate = useNavigate();
  const [showtime, setShowtime] = useState(null);
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Seat Modal State
  const [showModal, setShowModal] = useState(true);
  const [seatCount, setSeatCount] = useState(2); // default

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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-brand-500"></div>
      </div>
    );
  }

  if (!showtime) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center text-gray-800">
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
      if (selectedSeats.length < seatCount) {
        setSelectedSeats([...selectedSeats, seat]);
      } else {
        // Replace the first selected seat if they click a new one beyond the limit
        // Or simply shift the array
        const newArr = [...selectedSeats];
        newArr.shift();
        newArr.push(seat);
        setSelectedSeats(newArr);
      }
    }
  };

  const calculateTotal = () => {
    return selectedSeats.reduce((total, seat) => total + seat.price, 0);
  };

  const handleProceedToPayment = () => {
    if (selectedSeats.length === 0) return;
    
    navigate('/payment', {
      state: {
        showtime,
        selectedSeats,
        subtotal: calculateTotal()
      }
    });
  };

  // Group seats by category and then by row
  const seatsByCategory = seats.reduce((acc, seat) => {
    if (!acc[seat.category]) acc[seat.category] = [];
    acc[seat.category].push(seat);
    return acc;
  }, {});

  const renderSeatCategory = (category, catSeats) => {
    const seatsByRow = catSeats.reduce((acc, seat) => {
      if (!acc[seat.row]) acc[seat.row] = [];
      acc[seat.row].push(seat);
      return acc;
    }, {});
    
    const rows = Object.keys(seatsByRow).sort();

    return (
      <div key={category} className="mb-10 w-full max-w-4xl mx-auto">
        <div className="text-xs text-gray-500 font-bold tracking-widest uppercase mb-4 border-b border-gray-300 pb-2">
          {category} - ₹{catSeats[0].price}
        </div>
        <div className="flex flex-col gap-3">
          {rows.map((row) => (
            <div key={row} className="flex items-center justify-center gap-6">
              <div className="w-4 text-xs font-semibold text-gray-400">{row}</div>
              <div className="flex gap-2">
                {seatsByRow[row]
                  .sort((a, b) => a.column - b.column)
                  .map((seat) => {
                    const isSelected = selectedSeats.some((s) => s._id === seat._id);
                    const isBooked = seat.status !== 'Available';
                    
                    let baseClasses = "w-7 h-7 sm:w-8 sm:h-8 rounded text-[10px] sm:text-xs transition-colors flex items-center justify-center font-medium border ";
                    
                    if (isBooked) {
                      baseClasses += "bg-gray-200 border-gray-200 text-transparent cursor-not-allowed";
                    } else if (isSelected) {
                      baseClasses += "bg-green-500 border-green-500 text-white shadow-md";
                    } else {
                      baseClasses += "bg-white border-green-500 text-green-600 hover:bg-green-50 cursor-pointer";
                    }

                    return (
                      <div
                        key={seat._id}
                        className={baseClasses}
                        onClick={() => toggleSeatSelection(seat)}
                      >
                        {seat.column}
                      </div>
                    );
                  })}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-32 font-sans">
      
      {/* Sticky Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="text-2xl text-gray-500 hover:text-gray-900">
              <FiChevronLeft />
            </button>
            <div>
              <h1 className="text-lg md:text-xl font-bold text-gray-900">{showtime.movie.title}</h1>
              <p className="text-xs text-gray-500">
                {showtime.cinema.name} | {new Date(showtime.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}, {showtime.startTime}
              </p>
            </div>
          </div>
          <div className="hidden sm:flex gap-4">
            <button 
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 border border-gray-300 rounded-full px-4 py-1 text-sm font-medium hover:bg-gray-50"
            >
              <FiEdit2 className="text-xs" /> {seatCount} Tickets
            </button>
          </div>
        </div>
      </div>

      {/* Main Seat Layout */}
      <div className="pt-10 px-4 sm:px-6">
        
        {/* Seats Container */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-10 max-w-5xl mx-auto overflow-x-auto">
          
          {Object.entries(seatsByCategory).map(([category, catSeats]) => renderSeatCategory(category, catSeats))}
          
          {/* Screen */}
          <div className="mt-16 w-full max-w-2xl mx-auto relative">
            <div className="h-10 w-full overflow-hidden">
               <div className="h-[200%] w-full bg-blue-50 border-t-[4px] border-blue-400 rounded-[50%] mt-[-5%] blur-[1px]"></div>
            </div>
            <p className="text-center text-xs text-gray-400 tracking-widest mt-2 uppercase">All eyes this way</p>
          </div>

        </div>

      </div>

      {/* Floating Bottom Bar (Appears when seats selected) */}
      {selectedSeats.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-[0_-4px_15px_rgba(0,0,0,0.05)] z-40 animate-slide-up">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-sm">Selected Seats ({selectedSeats.length})</p>
              <div className="flex gap-2 mt-1">
                {selectedSeats.map(s => (
                   <span key={s._id} className="font-semibold text-gray-900">{s.seatNumber}</span>
                ))}
              </div>
            </div>
            <button 
              onClick={handleProceedToPayment}
              className="bg-brand-500 hover:bg-brand-600 text-white font-bold text-lg px-8 py-3 rounded-lg shadow-lg transition-transform transform hover:-translate-y-0.5"
            >
              Pay ₹{calculateTotal()}
            </button>
          </div>
        </div>
      )}

      {/* How Many Seats Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 relative animate-scale-in shadow-2xl">
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-900"
            >
              <FiX className="text-xl" />
            </button>
            <h2 className="text-xl font-bold text-center mb-6 text-gray-900">How Many Seats?</h2>
            
            {/* Scooter Graphic Illustration (CSS placeholder) */}
            <div className="w-48 h-32 mx-auto mb-8 relative flex justify-center items-end opacity-80">
               {/* Just a stylized representation of tickets */}
               <div className="w-32 h-20 bg-brand-500/10 rounded-lg border-2 border-brand-500/40 relative">
                  <div className="absolute -left-3 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-white rounded-full"></div>
                  <div className="absolute -right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-white rounded-full"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-brand-500 font-bold text-3xl">{seatCount}</span>
                  </div>
               </div>
            </div>

            <div className="flex justify-center gap-3 mb-8">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                <button
                  key={num}
                  onClick={() => setSeatCount(num)}
                  className={`w-9 h-9 rounded-full font-semibold transition-all ${
                    seatCount === num 
                      ? 'bg-brand-500 text-white scale-110 shadow-md' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>

            <button 
              onClick={() => {
                setShowModal(false);
                setSelectedSeats([]); // reset when count changes
              }}
              className="w-full bg-brand-500 hover:bg-brand-600 text-white font-bold py-3 rounded-xl transition-colors"
            >
              Select Seats
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default SeatSelection;
