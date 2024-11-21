import React, { useEffect, useState } from 'react';
import { getPopularMovies } from '../services/api';
import MovieCard from '../components/MovieCard';
import { Movie } from '../types/movie';

export default function Popular() {
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const response = await getPopularMovies();
        setPopularMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching popular movies:', error);
      }
    };

    fetchPopularMovies();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Popular Movies</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {popularMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
}