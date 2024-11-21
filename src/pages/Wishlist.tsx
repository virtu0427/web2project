import React from 'react';
import { useWishlist } from '../context/WishlistContext';
import MovieCard from '../components/MovieCard';

export default function Wishlist() {
  const { wishlist } = useWishlist();

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-100 mb-8">My Wishlist</h1>
        {wishlist.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlist.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-300">
            Your wishlist is empty. Start adding movies you like!
          </div>
        )}
      </div>
    </div>
  );
}