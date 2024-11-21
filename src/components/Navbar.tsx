import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Heart, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-indigo-600">
              Jomovie
            </Link>
            {isAuthenticated && (
              <div className="ml-10 flex items-center space-x-4">
                <Link to="/" className="text-gray-700 hover:text-indigo-600">
                  Home
                </Link>
                <Link to="/popular" className="text-gray-700 hover:text-indigo-600">
                  Popular
                </Link>
                <Link to="/search" className="text-gray-700 hover:text-indigo-600">
                  <Search className="w-5 h-5" />
                </Link>
                <Link to="/wishlist" className="text-gray-700 hover:text-indigo-600">
                  <Heart className="w-5 h-5" />
                </Link>
              </div>
            )}
          </div>
          {isAuthenticated ? (
            <button
              onClick={() => {
                logout();
                navigate('/signin');
              }}
              className="flex items-center text-gray-700 hover:text-indigo-600"
            >
              <LogOut className="w-5 h-5" />
              <span className="ml-2">Logout</span>
            </button>
          ) : (
            <Link
              to="/signin"
              className="flex items-center text-indigo-600 hover:text-indigo-800"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}