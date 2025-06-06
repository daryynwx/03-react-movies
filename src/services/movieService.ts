import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3/search/movie';
const API_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

export async function fetchMovies(query: string, page: number = 1) {
  const response = await axios.get(BASE_URL, {
    params: {
      query,
      page,
      include_adult: false,
      language: 'en-US',
    },
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });

  return response.data;
}
