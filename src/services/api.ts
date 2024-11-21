import axios from 'axios';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

if (!API_KEY) {
  console.error('TMDB API key is missing. Please add VITE_TMDB_API_KEY to your environment variables.');
}

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

export const getPopularMovies = () => api.get('/movie/popular');
export const searchMovies = (query: string) => api.get('/search/movie', { params: { query } });
export const getTrendingMovies = () => api.get('/trending/movie/week');