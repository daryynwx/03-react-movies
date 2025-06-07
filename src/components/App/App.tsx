import { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { SearchBar } from '../SearchBar/SearchBar';
import MovieGrid from '../MovieGrid/MovieGrid';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import  MovieModal  from '../MovieModal/MovieModal';
import { fetchMovies } from '../../services/movieService';
import type { Movie } from '../../types/movie';


import styles from './App.module.css';

export const App = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (formData: FormData) => {
    const query = formData.get('query')?.toString().trim();
    if (!query) return;

    setMovies([]);
    setError(null);
    setIsLoading(true);

    try {
      const data = await fetchMovies(query);
      if (data.length === 0) {
        toast('No movies found');
      }
      setMovies(data);
    } catch (err) {
      setError('Something went wrong. Try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <SearchBar action={handleSearch} />
      {isLoading && <Loader />}
      {error && <ErrorMessage message={error} />}
      {movies.length > 0 && (
        <MovieGrid movies={movies} onSelect={setSelectedMovie} />
      )}
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
      )}
      <Toaster position="top-right" />
    </div>
  );
};



