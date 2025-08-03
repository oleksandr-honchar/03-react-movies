import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import css from './App.module.css';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import SearchBar from '../SearchBar/SearchBar';
import { MovieGrid } from '../MovieGrid/MovieGrid';
import { fetchMovies } from '../../services/movieService';
import type { Movie } from '../../types/movie';
import MovieModal from '../MovieModal/MovieModal';

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSearchSubmit = async (query: string) => {
    setIsLoading(true);
    setError(false);
    setMovies([]);

    try {
      const data = await fetchMovies({ query });

      if (!data?.results?.length) {
        toast.error('No movies found for your request.');
        return;
      }

      setMovies(data.results);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(true);
      toast.error('Failed to fetch movies. Try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const closeModal = () => {
    setSelectedMovie(null);
  };

  useEffect(() => {
    const modalRoot = document.createElement('div');
    modalRoot.id = 'modal-root';
    document.body.appendChild(modalRoot);
    
    return () => {
      document.body.removeChild(modalRoot);
    };
  }, []);

  return (
    <div className={css.app}>
      <Toaster position="top-right" />
      <SearchBar onSubmit={handleSearchSubmit} />

      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      {!isLoading && !error && (
        <MovieGrid movies={movies} onSelect={handleMovieClick} />
      )}

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={closeModal} />
      )}
    </div>
  );
}
