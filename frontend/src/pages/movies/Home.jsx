import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FiStar, FiChevronRight } from 'react-icons/fi';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  const featuredMovies = movies.slice(0, 5).map((movie) => {
    return { ...movie, banner: movie.banner };
  });

  useEffect(() => {
    if (featuredMovies.length === 0) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredMovies.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [featuredMovies.length]);

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

  // Mock data for Events and Shows
  const events = [
    { _id: 'e1', title: 'Arijit Singh Live', poster: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80', status: 'Upcoming' },
    { _id: 'e2', title: 'Sunburn Festival Goa', poster: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&q=80', status: 'Upcoming' },
    { _id: 'e3', title: 'IPL Final 2026', poster: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&q=80', status: 'Live' },
    { _id: 'e4', title: 'Comic Con India', poster: 'https://images.unsplash.com/photo-1561489396-888724a1543d?w=800&q=80', status: 'Upcoming' },
    { _id: 'e5', title: 'Diljit Dosanjh Tour', poster: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&q=80', status: 'Upcoming' },
  ];

  const shows = [
    { _id: 's1', title: 'Zakir Khan: Tathastu', poster: 'https://images.unsplash.com/photo-1585699324551-f6c309eedeca?w=800&q=80', status: 'Now Playing' },
    { _id: 's2', title: 'Vir Das: Mind Fool', poster: 'https://images.unsplash.com/photo-1527224857830-43a7acc85260?w=800&q=80', status: 'Now Playing' },
    { _id: 's3', title: 'Mughal-e-Azam: The Musical', poster: 'https://images.pexels.com/photos/109669/pexels-photo-109669.jpeg?auto=compress&cs=tinysrgb&w=800', status: 'Upcoming' },
    { _id: 's4', title: 'Anubhav Singh Bassi Live', poster: 'https://images.unsplash.com/photo-1616422285623-131e5bc64571?w=800&q=80', status: 'Now Playing' },
    { _id: 's5', title: 'Abhishek Upmanyu Live', poster: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?w=800&q=80', status: 'Upcoming' },
  ];

  const renderMediaRow = (title, items, isMovie = false) => (
    <div className="mb-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        <Link to={isMovie ? "/movies" : "#"} className="text-brand-500 font-medium hover:text-brand-400 transition-colors text-sm flex items-center">
          See All &rsaquo;
        </Link>
      </div>
      
      {loading && isMovie ? (
        <div className="text-gray-500">Loading {title.toLowerCase()}...</div>
      ) : (
        <div className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide">
          {items.map((item) => (
            <Link 
              to={isMovie ? `/movies/${item._id}` : `#`} 
              key={item._id} 
              className="min-w-[220px] w-[220px] group relative rounded-xl overflow-hidden bg-dark-800 border border-dark-700 transition-transform hover:-translate-y-2 hover:shadow-[0_10px_25px_-5px_rgba(217,70,239,0.3)] block"
            >
              <div className="h-[320px] overflow-hidden relative">
                <img 
                  src={item.poster} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
              </div>
              
              <div className="absolute bottom-0 left-0 w-full p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] uppercase tracking-widest bg-brand-500 text-white px-2 py-0.5 rounded font-bold">
                    {isMovie ? item.certificate : item.status}
                  </span>
                  {isMovie && (
                    <span className="text-yellow-500 text-xs font-bold flex items-center gap-1 bg-dark-900/80 px-2 py-1 rounded-md">
                      <FiStar className="fill-current" /> {item.rating}
                    </span>
                  )}
                </div>
                <h3 className="text-white font-bold text-lg mb-1 truncate group-hover:text-brand-400 transition-colors">{item.title}</h3>
                {isMovie && <p className="text-gray-400 text-xs uppercase tracking-wide truncate">{item.genre?.join(' • ')}</p>}
              </div>
              
              <div className="absolute inset-0 bg-brand-500/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                <span className="bg-brand-500 text-white font-bold px-6 py-2 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                  Book Now
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="bg-dark-900 min-h-screen">
      {/* Hero Banner Slider Section */}
      <div className="relative h-[75vh] w-full bg-dark-900 overflow-hidden flex items-center">
        {featuredMovies.length > 0 ? (
          <>
            {featuredMovies.map((movie, index) => (
              <div 
                key={movie._id} 
                className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                  index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                }`}
              >
                {/* Background Image & Gradients */}
                <div className="absolute inset-0 w-full h-full">
                  <img 
                    src={movie.banner} 
                    alt={movie.title} 
                    className="w-full h-full object-cover object-center opacity-60"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-dark-900 via-dark-900/80 to-transparent w-3/4" />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-b from-dark-900/50 via-transparent to-transparent" />
                </div>
                
                {/* Content */}
                <div className="absolute inset-0 z-20 flex items-center">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-16">
                    <div className={`max-w-3xl transition-all duration-700 delay-300 ${index === currentSlide ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                      <div className="flex items-center gap-3 mb-6">
                        <span className="bg-brand-500 text-white text-xs font-bold px-3 py-1 rounded-md uppercase tracking-widest shadow-[0_0_15px_rgba(239,68,68,0.5)]">
                          {movie.status}
                        </span>
                        <span className="bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold px-3 py-1 rounded-md tracking-widest">
                          {movie.certificate}
                        </span>
                      </div>
                      
                      <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight drop-shadow-2xl">
                        {movie.title}
                      </h1>
                      
                      <div className="flex flex-wrap items-center gap-4 text-sm md:text-base text-gray-300 mb-8 font-medium">
                        <span className="flex items-center gap-1.5 text-yellow-500 bg-yellow-500/10 px-3 py-1 rounded-full border border-yellow-500/20">
                          <FiStar className="fill-current" /> {movie.rating}/10
                        </span>
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-600"></span>
                        <span>{movie.duration} min</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-600"></span>
                        <span>{movie.genre.join(', ')}</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-600"></span>
                        <span>{movie.language.join(', ')}</span>
                      </div>
                      
                      <p className="text-gray-400 text-lg md:text-xl mb-10 leading-relaxed max-w-2xl drop-shadow-md line-clamp-3">
                        {movie.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-4">
                        <Link 
                          to={`/booking/${movie._id}`} 
                          className="bg-gradient-to-r from-brand-500 to-brand-700 hover:from-brand-400 hover:to-brand-600 text-white font-bold text-lg px-8 py-4 rounded-xl shadow-[0_10px_25px_-5px_rgba(239,68,68,0.5)] transform transition hover:-translate-y-1"
                        >
                          Book Tickets
                        </Link>
                        <Link 
                          to={`/movies/${movie._id}`} 
                          className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-bold text-lg px-8 py-4 rounded-xl transition-all hover:-translate-y-1"
                        >
                          More Info
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Slider Navigation Dots */}
            <div className="absolute bottom-10 left-0 w-full z-30 flex justify-center gap-3">
              {featuredMovies.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2 rounded-full transition-all duration-500 ${
                    index === currentSlide ? 'w-10 bg-brand-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]' : 'w-2 bg-gray-600 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="absolute inset-0 bg-dark-800 flex items-center justify-center">
            <span className="text-gray-500">Loading Featured Content...</span>
          </div>
        )}
      </div>

      {/* Media Catalog Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {renderMediaRow('Recommended Movies', movies.filter(m => m.status === 'Now Showing'), true)}
        {renderMediaRow('Upcoming Movies', movies.filter(m => m.status === 'Coming Soon'), true)}
        {renderMediaRow('Live Events', events)}
        {renderMediaRow('Standup & Theatre', shows)}
      </div>
    </div>
  );
};

export default Home;
