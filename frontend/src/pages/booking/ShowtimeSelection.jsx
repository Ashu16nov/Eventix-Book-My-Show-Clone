import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { FiClock, FiMapPin, FiInfo, FiChevronRight } from 'react-icons/fi';

const ShowtimeSelection = () => {
  const { id } = useParams();
  const [showtimes, setShowtimes] = useState([]);
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Dummy dates for the date selector
  const today = new Date();
  const dates = Array.from({ length: 5 }).map((_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() + i);
    return d;
  });
  const [selectedDate, setSelectedDate] = useState(dates[0].toDateString());

  useEffect(() => {
    const fetchShowtimes = async () => {
      try {
        const [movieRes, showtimesRes] = await Promise.all([
          axios.get(`http://localhost:5000/api/movies/${id}`),
          axios.get(`http://localhost:5000/api/showtimes?movie=${id}`)
        ]);
        setMovie(movieRes.data.data);
        setShowtimes(showtimesRes.data.data);
      } catch (error) {
        console.error('Failed to fetch showtimes', error);
      } finally {
        setLoading(false);
      }
    };
    fetchShowtimes();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-brand-500"></div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center text-white">
        <h2 className="text-2xl">Movie not found</h2>
      </div>
    );
  }

  // Filter by selected date (In a real app, this would filter actual dates)
  // Here we assume all fetched showtimes belong to the selected date for simplicity, 
  // or we can just render them all if it's dummy data.
  
  // Group showtimes by cinema
  const showtimesByCinema = showtimes.reduce((acc, showtime) => {
    const cinemaName = showtime.cinema.name;
    if (!acc[cinemaName]) {
      acc[cinemaName] = [];
    }
    acc[cinemaName].push(showtime);
    return acc;
  }, {});

  return (
    <div className="bg-gray-50 min-h-screen pb-20 pt-16">
      
      {/* Movie Header - BookMyShow Style */}
      <div className="bg-dark-900 text-white pt-10 pb-6 px-4 sm:px-6 lg:px-12 border-b border-dark-700">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-black mb-3">{movie.title}</h1>
            <div className="flex items-center gap-3 text-sm font-medium text-gray-300">
              <span className="border border-gray-500 rounded-full px-3 py-1 uppercase">{movie.certificate}</span>
              <span className="bg-dark-700 px-3 py-1 rounded-full">{movie.genre.join(', ')}</span>
              <span className="bg-dark-700 px-3 py-1 rounded-full">{movie.language.join(', ')}</span>
            </div>
          </div>
          <div className="hidden md:block">
             <div className="text-right">
                <p className="text-gray-400 text-sm mb-1">Director</p>
                <p className="font-bold">{movie.director}</p>
             </div>
          </div>
        </div>
      </div>

      {/* Date Selector Strip */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-20 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex gap-4 overflow-x-auto py-3 no-scrollbar">
            {dates.map((d, index) => {
              const isSelected = selectedDate === d.toDateString();
              return (
                <button
                  key={index}
                  onClick={() => setSelectedDate(d.toDateString())}
                  className={`flex flex-col items-center justify-center min-w-[60px] py-2 rounded-lg transition-colors ${
                    isSelected 
                      ? 'bg-brand-500 text-white shadow-md' 
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <span className="text-xs font-semibold uppercase">{d.toLocaleDateString('en-US', { weekday: 'short' })}</span>
                  <span className="text-lg font-bold">{d.getDate()}</span>
                  <span className="text-xs">{d.toLocaleDateString('en-US', { month: 'short' })}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 mt-8">
        
        {/* Filter/Legend Strip */}
        <div className="flex justify-end mb-6 bg-white p-3 rounded-xl border border-gray-200 shadow-sm text-xs font-medium text-gray-500 gap-4">
           <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-green-100 border border-green-500"></span> Available</span>
           <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-orange-100 border border-orange-500"></span> Fast Filling</span>
        </div>

        {Object.keys(showtimesByCinema).length === 0 ? (
          <div className="bg-white p-12 rounded-2xl text-center border border-gray-200 shadow-sm">
            <FiInfo className="text-5xl text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl text-gray-600 font-bold">No showtimes available</h3>
            <p className="text-gray-500 mt-2">Try selecting a different date or movie.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(showtimesByCinema).map(([cinemaName, cinemaShowtimes]) => (
              <div key={cinemaName} className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  
                  {/* Cinema Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <FiMapPin className="text-gray-400" />
                      <h2 className="text-lg font-bold text-gray-900">{cinemaName}</h2>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-500 ml-6">
                      <span className="text-green-600 flex items-center gap-1"><FiInfo /> M-Ticket</span>
                      <span>{cinemaShowtimes[0].cinema.city}</span>
                    </div>
                  </div>
                  
                  {/* Showtimes List */}
                  <div className="flex flex-wrap gap-3 w-full md:w-3/4 lg:w-2/3">
                    {cinemaShowtimes.map(st => (
                      <Link
                        key={st._id}
                        to={`/booking/${st._id}`}
                        className="group relative border border-gray-300 hover:border-brand-500 rounded-md px-4 py-2 text-center transition-colors hover:bg-brand-50"
                      >
                        <div className="text-green-600 group-hover:text-brand-600 font-medium text-sm">
                          {st.startTime}
                        </div>
                        <div className="text-[10px] text-gray-500 mt-0.5">
                          {st.screen.name}
                        </div>
                        
                        {/* Tooltip for price (CSS only) */}
                        <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-dark-900 text-white text-xs py-1 px-2 rounded whitespace-nowrap pointer-events-none">
                          ₹{st.price || 250}
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-dark-900"></div>
                        </div>
                      </Link>
                    ))}
                  </div>
                  
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowtimeSelection;
