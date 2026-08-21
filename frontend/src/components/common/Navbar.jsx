import { Link } from 'react-router-dom';
import { FiSearch, FiUser, FiMenu, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-dark-800 border-b border-dark-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <span className="text-brand-500 font-bold text-2xl tracking-tighter">Eventix</span>
            </Link>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <Link to="/movies" className="text-gray-300 hover:text-brand-500 px-3 py-2 rounded-md text-sm font-medium transition-colors">Movies</Link>
                <Link to="/events" className="text-gray-300 hover:text-brand-500 px-3 py-2 rounded-md text-sm font-medium transition-colors">Events</Link>
                <Link to="/sports" className="text-gray-300 hover:text-brand-500 px-3 py-2 rounded-md text-sm font-medium transition-colors">Sports</Link>
                <Link to="/activities" className="text-gray-300 hover:text-brand-500 px-3 py-2 rounded-md text-sm font-medium transition-colors">Activities</Link>
              </div>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                className="bg-dark-900 border border-dark-700 text-gray-300 text-sm rounded-lg focus:ring-brand-500 focus:border-brand-500 block w-full pl-10 p-2 placeholder-gray-500"
                placeholder="Search movies, events..."
              />
            </div>
            
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-gray-300 text-sm font-medium">Hi, {user.name.split(' ')[0]}</span>
                {user.role === 'admin' && (
                  <Link to="/admin" className="text-brand-500 text-sm font-medium hover:text-brand-400">Dashboard</Link>
                )}
                <button 
                  onClick={logout}
                  className="text-gray-400 hover:text-red-500 flex items-center gap-1 transition-colors"
                  title="Logout"
                >
                  <FiLogOut />
                </button>
              </div>
            ) : (
              <Link to="/login" className="text-gray-300 hover:text-white flex items-center gap-2 transition-colors">
                <FiUser />
                <span className="text-sm font-medium">Sign In</span>
              </Link>
            )}
          </div>
          
          <div className="md:hidden flex items-center">
            <button className="text-gray-300 hover:text-white p-2">
              <FiMenu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
