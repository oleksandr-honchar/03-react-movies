import axios from 'axios';
import type { Movie } from '../types/movie';

const BASE_URL = 'https://api.themoviedb.org/3/search/movie';
const API_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

export interface FetchMoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface FetchMoviesParams {
  query: string;
  page?: number;
}

export const fetchMovies = async (
  params: FetchMoviesParams
): Promise<FetchMoviesResponse> => {
  const response = await axios.get<FetchMoviesResponse>(BASE_URL, {
    params: {
      query: params.query,
      page: params.page ?? 1,
      include_adult: false,
      language: 'en-US',
    },
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
      accept: 'application/json',
    },
  });

  return response.data;
};
