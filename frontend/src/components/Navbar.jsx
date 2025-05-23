import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">AksharDhara</span>
          </Link>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <Link to="/" className="nav-link">
              Home
            </Link>
            {user && (
              <>
                <Link to="/drafts" className="nav-link">
                  Drafts
                </Link>
                <Link to="/dashboard" className="nav-link">
                  Dashboard
                </Link>
                <Link to="/profile/view" className="nav-link">
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Logout
                </button>
              </>
            )}
            {!user && (
              <>
                <Link to="/login" className="nav-link">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Register
                </Link>
              </>
            )}
          </nav>
        </div>

        {/* Mobile navigation */}
        <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} pb-3`}>
          <div className="flex flex-col space-y-2">
            <Link to="/" className="mobile-nav-link">
              Home
            </Link>
            {user && (
              <>
                <Link to="/drafts" className="mobile-nav-link">
                  Drafts
                </Link>
                <Link to="/dashboard" className="mobile-nav-link">
                  Dashboard
                </Link>
                <Link to="/profile/view" className="mobile-nav-link">
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  Logout
                </button>
              </>
            )}
            {!user && (
              <>
                <Link to="/login" className="mobile-nav-link">
                  Login
                </Link>
                <Link to="/register" className="mobile-nav-link">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Add these styles to your global CSS or within a style tag */}
      <style>{`
        .nav-link {
          @apply px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors;
        }
        .mobile-nav-link {
          @apply block px-4 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors;
        }
      `}</style>
    </header>
  );
}
