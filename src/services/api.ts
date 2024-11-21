import axios from 'axios';

const API_KEY = 'a44b9823bd454859b3e9964ffa626e1d'; // Replace with your actual TMDB API key
const BASE_URL = 'https://api.themoviedb.org/3';

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

export const getPopularMovies = () => api.get('/movie/popular');
export const searchMovies = (query: string) => api.get('/search/movie', { params: { query } });
export const getTrendingMovies = () => api.get('/trending/movie/week');