import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { FiClock, FiMapPin, FiCalendar } from 'react-icons/fi';

const ShowtimeSelection = () => {
  const { id } = useParams();
  const [showtimes, setShowtimes] = useState([]);
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

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
    <div className="bg-dark-900 min-h-screen pb-20 pt-24 px-4 sm:px-6 lg:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 drop-shadow-lg">
            {movie.title}
          </h1>
          <p className="text-gray-400 text-lg flex items-center justify-center gap-2">
            <FiCalendar className="text-brand-500" /> Select Showtime
          </p>
        </div>

        {Object.keys(showtimesByCinema).length === 0 ? (
          <div className="bg-dark-800 p-8 rounded-2xl text-center border border-dark-700">
            <h3 className="text-xl text-gray-300">No showtimes available for this movie right now.</h3>
          </div>
        ) : (
          <div className="space-y-8">
            {Object.entries(showtimesByCinema).map(([cinemaName, cinemaShowtimes]) => (
              <div key={cinemaName} className="bg-dark-800 rounded-2xl p-6 border border-dark-700 shadow-xl">
                <div className="flex items-center gap-3 mb-6 border-b border-dark-700 pb-4">
                  <div className="bg-brand-500/10 p-3 rounded-xl">
                    <FiMapPin className="text-brand-500 text-xl" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">{cinemaName}</h2>
                    <p className="text-sm text-gray-400">{cinemaShowtimes[0].cinema.city}</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-4">
                  {cinemaShowtimes.map(st => (
                    <Link
                      key={st._id}
                      to={`/booking/${st._id}`}
                      className="group relative overflow-hidden bg-dark-700 hover:bg-brand-500 text-white border border-dark-600 hover:border-brand-500 transition-all duration-300 rounded-xl px-6 py-4 min-w-[120px] text-center"
                    >
                      <div className="relative z-10 flex flex-col items-center gap-1">
                        <span className="text-lg font-bold flex items-center gap-2">
                          <FiClock className="group-hover:animate-pulse" /> {st.startTime}
                        </span>
                        <span className="text-xs text-gray-400 group-hover:text-white/80">
                          {st.screen.name}
                        </span>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-r from-brand-600 to-brand-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-0"></div>
                    </Link>
                  ))}
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
