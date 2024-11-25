import React, { useState, useEffect } from 'react';
import { Search as SearchIcon, Clock } from 'lucide-react';
import { searchMovies } from '../services/api';
import MovieCard from '../components/MovieCard';
import { Movie } from '../types/movie';
import { useAuth } from '../context/AuthContext';

export default function Search() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      const history = localStorage.getItem(`searchHistory_${currentUser.email}`);
      if (history) {
        setSearchHistory(JSON.parse(history));
      }
    }
  }, [currentUser]);

  const addToSearchHistory = (searchQuery: string) => {
    if (currentUser) {
      const updatedHistory = [searchQuery, ...searchHistory.filter(q => q !== searchQuery)].slice(0, 5);
      setSearchHistory(updatedHistory);
      localStorage.setItem(`searchHistory_${currentUser.email}`, JSON.stringify(updatedHistory));
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    try {
      setIsLoading(true);
      setError(null);
      const response = await searchMovies(query);
      setMovies(response.data.results);
      addToSearchHistory(query.trim());
    } catch (error) {
      setError('Failed to search movies. Please try again later.');
      console.error('Error searching movies:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleHistoryClick = (historyQuery: string) => {
    setQuery(historyQuery);
    handleSearch(new Event('submit') as any);
  };

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <form onSubmit={handleSearch} className="flex gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for movies..."
                className="w-full px-4 py-2 pl-10 rounded-lg bg-gray-800 border border-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-500"
              />
              <SearchIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {isLoading ? 'Searching...' : 'Search'}
            </button>
          </form>

          {searchHistory.length > 0 && (
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-400 mb-2 flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                Recent Searches
              </h3>
              <div className="flex flex-wrap gap-2">
                {searchHistory.map((historyQuery, index) => (
                  <button
                    key={index}
                    onClick={() => handleHistoryClick(historyQuery)}
                    className="px-3 py-1 text-sm bg-gray-800 text-gray-300 rounded-full hover:bg-gray-700"
                  >
                    {historyQuery}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {error && (
          <div className="text-center text-red-400 mb-8">
            {error}
          </div>
        )}

        {isLoading && (
          <div className="text-center text-gray-300">
            Searching...
          </div>
        )}

        {!isLoading && movies.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}

        {!isLoading && query && movies.length === 0 && !error && (
          <div className="text-center text-gray-300">
            No movies found for "{query}"
          </div>
        )}
      </div>
    </div>
  );
}