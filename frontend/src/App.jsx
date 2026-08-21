import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import Layout from './layouts/Layout.jsx';
import Home from './pages/movies/Home.jsx';
import MoviesList from './pages/movies/MoviesList.jsx';
import MovieDetails from './pages/movies/MovieDetails.jsx';
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import Login from './pages/auth/Login.jsx';
import Register from './pages/auth/Register.jsx';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<MoviesList />} />
            <Route path="/movies/:id" element={<MovieDetails />} />
            <Route path="/events" element={<div className="text-white p-8">Events Page</div>} />
            <Route path="/booking/:showtimeId" element={<div className="text-white p-8">Seat Selection</div>} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;
