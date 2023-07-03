import { useState, useEffect } from 'react';
import { getTrendingMovies } from 'api';
import { useLocation } from 'react-router-dom';
import { MovieLink, PageLi } from './Home.styled';

export default function Home() {
  const [popularFilms, setPopularFilms] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getTrendingMovies();
        setPopularFilms(data.results);
      } catch (error) {}
    };

    fetchMovies();
  }, []);

  const renderMovieLink = ({ title, name, id }) => {
    const movieTitle = name || title;
    return (
      <PageLi key={id}>
        <MovieLink to={`/movies/${id}`} state={{ from: location }}>
          {movieTitle}
        </MovieLink>
      </PageLi>
    );
  };

  return <ul>{popularFilms.map(renderMovieLink)}</ul>;
}
