import { FiFacebook, FiTwitter, FiInstagram, FiYoutube } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark-800 border-t border-dark-700 pt-12 pb-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <span className="text-brand-500 font-bold text-3xl tracking-tighter">Eventix</span>
            </Link>
            <p className="text-gray-400 text-sm mb-6">
              Your ultimate destination for movies, events, plays, sports, and activities. Book tickets instantly and enjoy the show!
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-brand-500 transition-colors">
                <FiFacebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-brand-500 transition-colors">
                <FiTwitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-brand-500 transition-colors">
                <FiInstagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-brand-500 transition-colors">
                <FiYoutube className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Help & Support</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-brand-500 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-brand-500 transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-brand-500 transition-colors">FAQs</a></li>
              <li><a href="#" className="hover:text-brand-500 transition-colors">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-brand-500 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Explore</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/movies" className="hover:text-brand-500 transition-colors">Movies Now Showing</Link></li>
              <li><Link to="/events" className="hover:text-brand-500 transition-colors">Upcoming Events</Link></li>
              <li><Link to="/sports" className="hover:text-brand-500 transition-colors">Sports Matches</Link></li>
              <li><Link to="/activities" className="hover:text-brand-500 transition-colors">Fun Activities</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-400 text-sm mb-4">Subscribe to receive updates, access to exclusive deals, and more.</p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="bg-dark-900 border border-dark-700 text-gray-300 text-sm rounded-l-lg focus:ring-brand-500 focus:border-brand-500 block w-full p-2.5 outline-none"
                required
              />
              <button 
                type="submit" 
                className="bg-brand-500 hover:bg-brand-600 text-white font-medium rounded-r-lg text-sm px-4 py-2.5 outline-none transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-dark-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm text-center md:text-left mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Eventix. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm text-gray-500">
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
