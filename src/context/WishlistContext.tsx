import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Movie } from '../types/movie';

interface WishlistContextType {
  wishlist: Movie[];
  addToWishlist: (movie: Movie) => void;
  removeFromWishlist: (movieId: number) => void;
  isInWishlist: (movieId: number) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = useState<Movie[]>([]);

  const addToWishlist = (movie: Movie) => {
    setWishlist((prev) => [...prev, movie]);
  };

  const removeFromWishlist = (movieId: number) => {
    setWishlist((prev) => prev.filter((movie) => movie.id !== movieId));
  };

  const isInWishlist = (movieId: number) => {
    return wishlist.some((movie) => movie.id === movieId);
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}