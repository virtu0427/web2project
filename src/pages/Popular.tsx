import React, { useEffect, useState } from 'react';
import { getPopularMovies } from '../services/api';
import MovieCard from '../components/MovieCard';
import { Movie } from '../types/movie';

export default function Popular() {
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await getPopularMovies();
        setPopularMovies(response.data.results);
      } catch (error) {
        setError('Failed to fetch popular movies. Please try again later.');
        console.error('Error fetching popular movies:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPopularMovies();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-xl text-gray-300">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-xl text-red-400">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-100 mb-8">Popular Movies</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {popularMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
}