import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Navbar() {
  const { user, logout } = useAuth();
  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };
  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          AksharDhara
        </Link>
        <nav className="space-x-6">
          <Link to="/" className="text-gray-700 hover:text-blue-600">
            Home
          </Link>
          {user ? (
            <button onClick={logout} className="text-red-600">
              Logout
            </button>
          ) : (
            <Link to="/login" className="text-gray-700 hover:text-blue-600">Login</Link>
          )}
          <Link to="/register" className="text-gray-700 hover:text-blue-600">
            Register
          </Link>
        </nav>
      </div>
    </header>
  );
}
