import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function SignIn() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (isRegistering) {
        const success = await register(email, password);
        if (success) {
          await login(email, password);
          navigate('/');
        } else {
          setError('Email already exists');
        }
      } else {
        const success = await login(email, password);
        if (success) {
          navigate('/');
        } else {
          setError('Invalid email or password');
        }
      }
    } catch (error) {
      console.error('Authentication failed:', error);
      setError('Authentication failed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center perspective-1000">
      <div className="auth-container">
        <div className={`auth-form ${isRegistering ? 'flipped' : ''}`}>
          {/* Sign In Form - Front */}
          <div className="form-side bg-gray-800 rounded-lg shadow-xl p-6 border border-gray-700">
            <h2 className="text-2xl font-bold text-center text-indigo-400 mb-6">Sign In</h2>
            {error && !isRegistering && (
              <div className="mb-4 text-center text-red-400">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign In
              </button>
            </form>
            <div className="mt-4 text-center">
              <button
                onClick={() => setIsRegistering(true)}
                className="text-indigo-400 hover:text-indigo-300"
              >
                Don't have an account? Register
              </button>
            </div>
          </div>

          {/* Register Form - Back */}
          <div className="form-side back bg-gray-800 rounded-lg shadow-xl p-6 border border-gray-700">
            <h2 className="text-2xl font-bold text-center text-indigo-400 mb-6">Register</h2>
            {error && isRegistering && (
              <div className="mb-4 text-center text-red-400">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="register-email" className="block text-sm font-medium text-gray-300">
                  Email
                </label>
                <input
                  type="email"
                  id="register-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="register-password" className="block text-sm font-medium text-gray-300">
                  Password
                </label>
                <input
                  type="password"
                  id="register-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Register
              </button>
            </form>
            <div className="mt-4 text-center">
              <button
                onClick={() => setIsRegistering(false)}
                className="text-indigo-400 hover:text-indigo-300"
              >
                Already have an account? Sign in
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}