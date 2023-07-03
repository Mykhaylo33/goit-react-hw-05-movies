import { useState, useEffect } from 'react';
import { getMoviesBySearch } from 'api';
import { useLocation, useSearchParams } from 'react-router-dom';
import { MovieLink, PageLi } from './Movies.styled';
import SearchBar from '../../SearchBar/SearchBar';
import Notiflix from 'notiflix';

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const movieName = searchParams.get('query');

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getMoviesBySearch(movieName);
        setMovies(data.results);
        if (data.results.length === 0) {
          Notiflix.Notify.warning('There are no films found');
        }
      } catch (error) {}
    };

    if (movieName) {
      fetchMovies();
    }
  }, [movieName]);

  return (
    <>
      <SearchBar />
      <ul>
        {movies.map(({ title, name, id }) => (
          <PageLi key={id}>
            <MovieLink to={`/movies/${id}`} state={{ from: location }}>
              {name || title}
            </MovieLink>
          </PageLi>
        ))}
      </ul>
    </>
  );
}
