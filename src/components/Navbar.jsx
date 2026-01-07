import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic, faUser, faRightFromBracket, faShieldHalved } from '@fortawesome/free-solid-svg-icons';

function Navbar() {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition">
            <FontAwesomeIcon icon={faMusic} className="text-2xl" />
            <span className="text-xl font-bold">TEC Catechism</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-6">
            <Link 
              to="/" 
              className="hover:text-blue-200 transition font-medium"
            >
              Home
            </Link>

            {isAuthenticated ? (
              <>
                {/* Show admin link if user is admin */}
                {isAdmin && (
                  <Link 
                    to="/admin" 
                    className="flex items-center space-x-2 bg-blue-700 px-4 py-2 rounded-lg hover:bg-blue-600 transition font-medium"
                  >
                    <FontAwesomeIcon icon={faShieldHalved} />
                    <span>Admin</span>
                  </Link>
                )}

                {/* User info */}
                <div className="flex items-center space-x-2 text-blue-100">
                  <FontAwesomeIcon icon={faUser} />
                  <span>{user?.name}</span>
                </div>

                {/* Logout button */}
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition font-medium"
                >
                  <FontAwesomeIcon icon={faRightFromBracket} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                {/* Login/Register links for non-authenticated users */}
                <Link 
                  to="/login" 
                  className="hover:text-blue-200 transition font-medium"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition font-medium"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
