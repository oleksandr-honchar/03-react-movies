import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import css from './App.module.css';

import SearchBar from '../SearchBar/SearchBar';
import { MovieGrid } from '../MovieGrid/MovieGrid';
import { fetchMovies } from '../../services/movieService';
import type { Movie } from '../../types/movie';

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);

  const handleSearchSubmit = async (query: string) => {
    setMovies([]); // 🧹 Clear previous search

    try {
      const data = await fetchMovies({ query });

      if (data.results.length === 0) {
        toast.error('No movies found for your request.');
        return;
      }

      setMovies(data.results);
    } catch (err) {
      console.error('Fetch error:', err);
      toast.error('Failed to fetch movies. Try again.');
    }
  };

  return (
    <div className={css.app}>
      <Toaster position="top-right" />
      <SearchBar onSubmit={handleSearchSubmit} />

      <MovieGrid
        movies={movies}
        onSelect={(movie) => {
          console.log('Selected movie:', movie);
          // You can open modal or set selectedMovie state here
        }}
      />
    </div>
  );
}
