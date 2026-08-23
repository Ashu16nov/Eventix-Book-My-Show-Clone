import { useState, useEffect } from 'react';
import axios from 'axios';
import { FiTrendingUp, FiFilm, FiUsers, FiCalendar, FiDollarSign } from 'react-icons/fi';

const AdminDashboard = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/movies');
        setMovies(data.data);
      } catch (error) {
        console.error('Failed to fetch movies', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  const stats = [
    { title: 'Total Revenue', value: '$24,500', icon: FiDollarSign, color: 'text-green-500', bg: 'bg-green-500/10' },
    { title: 'Active Movies', value: movies.length, icon: FiFilm, color: 'text-brand-500', bg: 'bg-brand-500/10' },
    { title: 'Total Bookings', value: '1,284', icon: FiCalendar, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { title: 'Registered Users', value: '8,405', icon: FiUsers, color: 'text-purple-500', bg: 'bg-purple-500/10' },
  ];

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
    <div className="mb-10">
      <div className="flex justify-between items-center mb-6 border-b border-dark-700 pb-2">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          {title}
        </h2>
        <button className="text-brand-500 text-sm font-medium hover:text-brand-400 transition-colors">
          View All &Manage
        </button>
      </div>
      
      {loading && isMovie ? (
        <div className="text-gray-500">Loading {title.toLowerCase()}...</div>
      ) : (
        <div className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide">
          {items.map((item) => (
            <div key={item._id} className="min-w-[160px] w-[160px] sm:min-w-[180px] sm:w-[180px] group flex flex-col transition-transform hover:-translate-y-2">
              <div className="aspect-[2/3] w-full overflow-hidden relative rounded-xl shadow-lg group-hover:shadow-[0_10px_25px_-5px_rgba(217,70,239,0.3)] transition-shadow">
                <img src={item.poster} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity gap-2 backdrop-blur-sm">
                  <button className="bg-brand-500 hover:bg-brand-600 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-lg w-3/4">
                    Edit
                  </button>
                  <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-lg w-3/4">
                    Metrics
                  </button>
                </div>
              </div>
              <div className="w-full pt-3 flex flex-col">
                <span className="text-[9px] uppercase tracking-widest bg-gray-700 text-white px-1.5 py-0.5 rounded font-bold self-start mb-1">
                  {item.status}
                </span>
                <h3 className="text-white font-bold truncate text-sm mb-0.5">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-[85vh] bg-dark-900 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-dark-800 border-r border-dark-700 hidden lg:block">
        <div className="p-6">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Management</p>
          <nav className="space-y-2">
            <a href="#" className="flex items-center gap-3 bg-brand-500/10 text-brand-500 px-4 py-3 rounded-lg font-medium transition-colors border border-brand-500/20">
              <FiTrendingUp /> Dashboard Overview
            </a>
            <a href="#" className="flex items-center gap-3 text-gray-400 hover:bg-dark-700 hover:text-white px-4 py-3 rounded-lg font-medium transition-colors">
              <FiFilm /> Movies
            </a>
            <a href="#" className="flex items-center gap-3 text-gray-400 hover:bg-dark-700 hover:text-white px-4 py-3 rounded-lg font-medium transition-colors">
              <FiCalendar /> Showtimes
            </a>
            <a href="#" className="flex items-center gap-3 text-gray-400 hover:bg-dark-700 hover:text-white px-4 py-3 rounded-lg font-medium transition-colors">
              <FiUsers /> Users
            </a>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto h-[85vh]">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Media Management Dashboard</h1>
          <p className="text-gray-400 mt-1">Manage all active catalogs across your platform.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <div key={index} className="bg-dark-800 rounded-2xl p-6 border border-dark-700 hover:border-dark-600 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${stat.bg}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <span className="text-green-500 text-sm font-medium flex items-center">
                  +12% <FiTrendingUp className="ml-1" />
                </span>
              </div>
              <h3 className="text-gray-400 text-sm font-medium mb-1">{stat.title}</h3>
              <p className="text-3xl font-bold text-white">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* 3 Rows of Media */}
        {renderMediaRow('Recommended Movies', movies.filter(m => m.status === 'Now Showing'), true)}
        {renderMediaRow('Upcoming Movies', movies.filter(m => m.status === 'Coming Soon').sort((a, b) => new Date(a.releaseDate) - new Date(b.releaseDate)), true)}
        {renderMediaRow('Featured Events', events)}
        {renderMediaRow('Live Shows & Theatre', shows)}

      </main>
    </div>
  );
};

export default AdminDashboard;
