import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FiStar, FiFilter, FiSearch } from 'react-icons/fi';

const MoviesList = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/movies');
        setMovies(data.data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  // Extract unique genres for the filter
  const genres = ['All', ...new Set(movies.flatMap(m => m.genre))];

  // Filter movies
  const filteredMovies = movies.filter(movie => {
    const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = selectedGenre === 'All' || movie.genre.includes(selectedGenre);
    return matchesSearch && matchesGenre;
  });

  return (
    <div className="bg-dark-900 min-h-screen py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Filters */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12 border-b border-dark-700 pb-8">
          <div>
            <h1 className="text-4xl font-black text-white mb-2 tracking-tight">Now Showing</h1>
            <p className="text-gray-400">Discover and book tickets for the latest blockbusters.</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            {/* Search Bar */}
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input 
                type="text" 
                placeholder="Search movies..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-64 bg-dark-800 border border-dark-700 text-white text-sm rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:border-brand-500 transition-colors"
              />
            </div>
            
            {/* Genre Filter */}
            <div className="relative min-w-[160px]">
              <FiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-brand-500" />
              <select 
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                className="w-full bg-dark-800 border border-dark-700 text-white text-sm rounded-lg pl-10 pr-4 py-2.5 appearance-none focus:outline-none focus:border-brand-500 transition-colors cursor-pointer"
              >
                {genres.map(genre => (
                  <option key={genre} value={genre}>{genre}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Movies Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-500"></div>
          </div>
        ) : filteredMovies.length === 0 ? (
          <div className="text-center py-20 bg-dark-800 rounded-2xl border border-dark-700">
            <h3 className="text-xl font-bold text-white mb-2">No movies found</h3>
            <p className="text-gray-400">Try adjusting your search or filters to find what you're looking for.</p>
            <button 
              onClick={() => { setSearchTerm(''); setSelectedGenre('All'); }}
              className="mt-6 bg-brand-500/10 text-brand-500 font-bold px-6 py-2 rounded-lg hover:bg-brand-500/20 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredMovies.map((movie) => (
              <Link 
                to={`/movies/${movie._id}`} 
                key={movie._id} 
                className="group flex flex-col transition-transform hover:-translate-y-2 block"
              >
                <div className="aspect-[2/3] w-full overflow-hidden relative rounded-xl shadow-lg group-hover:shadow-[0_10px_25px_-5px_rgba(217,70,239,0.3)] transition-shadow">
                  <img 
                    src={movie.poster} 
                    alt={movie.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-brand-500/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                    <span className="bg-brand-500 text-white font-bold px-4 py-1.5 rounded-full text-sm transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                      Book
                    </span>
                  </div>
                </div>
                
                <div className="w-full pt-3 flex flex-col">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[9px] uppercase tracking-widest bg-gray-700 text-white px-1.5 py-0.5 rounded font-bold">
                      {movie.certificate}
                    </span>
                    <span className="text-yellow-500 text-xs font-bold flex items-center gap-1">
                      <FiStar className="fill-current" /> {movie.rating}
                    </span>
                  </div>
                  <h3 className="text-white font-bold text-base md:text-lg mb-0.5 truncate group-hover:text-brand-400 transition-colors">{movie.title}</h3>
                  <p className="text-gray-400 text-xs truncate">{movie.genre.join(', ')}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MoviesList;
