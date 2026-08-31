import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { FiStar, FiClock, FiCalendar, FiVideo, FiUsers } from 'react-icons/fi';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/movies/${id}`);
        setMovie(data.data);
      } catch (error) {
        console.error('Failed to fetch movie details', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
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

  return (
    <div className="bg-dark-900 min-h-screen pb-20">
      {/* Cinematic Hero Banner */}
      <div className="relative min-h-[55vh] w-full flex items-center pt-8 pb-12">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src={movie.banner} 
            alt={movie.title} 
            className="w-full h-full object-cover object-top opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-dark-900 via-dark-900/80 to-transparent" />
        </div>
        
        {/* Content Overlaid on Banner */}
        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 mt-12">
          <div className="flex flex-col md:flex-row gap-8 lg:gap-12 items-end">
            <div className="w-48 md:w-64 lg:w-72 shrink-0 shadow-2xl rounded-2xl overflow-hidden border border-dark-700">
              <img src={movie.poster} alt={`${movie.title} Poster`} className="w-full h-auto object-cover" />
            </div>
            
            <div className="flex-1 pb-2">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-brand-500/20 text-brand-500 border border-brand-500/30 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase">
                  {movie.status}
                </span>
                <span className="bg-white/10 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold border border-white/20">
                  {movie.certificate}
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-white mb-4 leading-tight drop-shadow-lg">
                {movie.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 text-sm md:text-base text-gray-300 font-medium mb-6">
                <span className="flex items-center gap-1.5 text-yellow-500 bg-yellow-500/10 px-3 py-1 rounded-full border border-yellow-500/20">
                  <FiStar className="fill-current" /> {movie.rating}/10
                </span>
                <span className="flex items-center gap-1.5"><FiClock /> {movie.duration} min</span>
                <span className="w-1.5 h-1.5 rounded-full bg-gray-600"></span>
                <span>{movie.genre.join(', ')}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-gray-600"></span>
                <span>{movie.language.join(', ')}</span>
              </div>
              
              <Link 
                to={`/movie/${movie._id}/showtimes`}
                className="inline-block bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-400 hover:to-brand-500 text-white font-bold text-lg px-10 py-4 rounded-xl shadow-[0_10px_25px_-5px_rgba(217,70,239,0.5)] transform transition hover:-translate-y-1"
              >
                Book Tickets Now
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-10">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <FiVideo className="text-brand-500" /> About the Movie
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                {movie.description}
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <FiUsers className="text-brand-500" /> Cast & Crew
              </h2>
              <div className="bg-dark-800 rounded-2xl p-6 border border-dark-700">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm text-gray-500 uppercase tracking-wider mb-2 font-bold">Director</h3>
                    <p className="text-white text-lg">{movie.director}</p>
                  </div>
                  <div>
                    <h3 className="text-sm text-gray-500 uppercase tracking-wider mb-2 font-bold">Top Cast</h3>
                    <div className="flex flex-wrap gap-2">
                      {movie.cast.map((actor, idx) => (
                        <span key={idx} className="bg-dark-700 text-gray-300 px-3 py-1 rounded-full text-sm">
                          {actor}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
          
          {/* Side Info */}
          <div className="space-y-6">
            <div className="bg-gradient-to-b from-dark-800 to-dark-900 rounded-2xl p-6 border border-dark-700">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <FiCalendar className="text-brand-500" /> Quick Details
              </h3>
              <ul className="space-y-4 text-gray-300">
                <li className="flex justify-between border-b border-dark-700 pb-2">
                  <span className="text-gray-500">Release Date</span>
                  <span className="text-white font-medium">{new Date(movie.releaseDate).toLocaleDateString()}</span>
                </li>
                <li className="flex justify-between border-b border-dark-700 pb-2">
                  <span className="text-gray-500">Duration</span>
                  <span className="text-white font-medium">{movie.duration} Minutes</span>
                </li>
                <li className="flex justify-between border-b border-dark-700 pb-2">
                  <span className="text-gray-500">Certification</span>
                  <span className="text-white font-medium">{movie.certificate}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
