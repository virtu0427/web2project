import React, { useEffect, useState, useCallback, useRef } from 'react';
import { getTrendingMovies } from '../services/api';
import MovieCard from '../components/MovieCard';
import { Movie } from '../types/movie';

export default function Home() {
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);
  const lastMovieElementRef = useCallback((node: HTMLDivElement | null) => {
    if (isLoading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [isLoading, hasMore]);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await getTrendingMovies(page);
        setTrendingMovies(prev => {
          const newMovies = response.data.results;
          const uniqueMovies = [...prev, ...newMovies].filter(
            (movie, index, self) => 
              index === self.findIndex(m => m.id === movie.id)
          );
          return uniqueMovies;
        });
        setHasMore(response.data.results.length > 0);
      } catch (error) {
        setError('영화를 불러오는데 실패했습니다. 다시 시도해주세요.');
        console.error('Error fetching trending movies:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrendingMovies();
  }, [page]);

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
        <h1 className="text-2xl font-bold text-gray-100 mb-4">이번 주 인기 영화</h1>
        <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 gap-2 sm:gap-4">
          {trendingMovies.map((movie, index) => (
            <div
              key={`${movie.id}-${index}`}
              ref={index === trendingMovies.length - 1 ? lastMovieElementRef : null}
            >
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
        {isLoading && (
          <div className="text-center py-4">
            <div className="inline-block animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        )}
      </div>
    </div>
  );
}