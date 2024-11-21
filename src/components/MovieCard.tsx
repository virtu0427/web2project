import React from 'react';
import { Heart } from 'lucide-react';
import { Movie } from '../types/movie';
import { useWishlist } from '../context/WishlistContext';

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const isWishlisted = isInWishlist(movie.id);

  const toggleWishlist = () => {
    if (isWishlisted) {
      removeFromWishlist(movie.id);
    } else {
      addToWishlist(movie);
    }
  };

  return (
    <div className="relative bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="w-full h-[400px] object-cover"
      />
      <button
        onClick={toggleWishlist}
        className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg"
      >
        <Heart
          className={`w-6 h-6 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-500'}`}
        />
      </button>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{movie.title}</h3>
        <p className="text-sm text-gray-600 mb-2">
          {new Date(movie.release_date).getFullYear()}
        </p>
        <div className="flex items-center">
          <span className="text-yellow-500">★</span>
          <span className="ml-1">{movie.vote_average.toFixed(1)}</span>
        </div>
      </div>
    </div>
  );
}