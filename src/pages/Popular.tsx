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
        setError('인기 영화를 불러오는데 실패했습니다. 다시 시도해주세요.');
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
        <div className="inline-block animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-indigo-500"></div>
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
    <div className="min-h-screen bg-gray-900 py-4">
      <div className="max-w-7xl mx-auto px-2 sm:px-4">
        <h1 className="text-2xl font-bold text-gray-100 mb-4">인기 영화</h1>
        <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 gap-2 sm:gap-4">
          {popularMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
}