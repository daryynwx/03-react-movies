import { useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import { fetchMovies } from '../../services/movieService';
import MovieGrid from '../MovieGrid/MovieGrid'; 
import ErrorMessage from '../ErrorMessage/ErrorMessage'; 
import Loader from '../Loader/Loader';
import type { Movie } from '../../types/movie';


function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (query: string) => {
    try {
      setLoading(true);
      setError('');
      const results = await fetchMovies(query);
      setMovies(results);
    } catch (err) {
      setError('Что-то пошло не так. Попробуйте ещё раз.');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectMovie = (movie: Movie) => {
    console.log('Выбран фильм:', movie.title);
  };

  return (
    <div>
      <SearchBar onSubmit={handleSearch} />
      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}
      <MovieGrid movies={movies} onSelect={handleSelectMovie} />
    </div>
  );
}


export default App;
