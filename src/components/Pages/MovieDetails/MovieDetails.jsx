import { Link, Outlet, useLocation, useParams } from 'react-router-dom';
import { useEffect, useRef, useState, Suspense } from 'react';
import { getMovieById } from 'api';
import MovieImage from './MovieImage';
import Loader from '../../Loader/Loader';
import {
  MovieImageWrapper,
  GoBackLink,
  MovieTitle,
  PageUl,
  PageLi,
} from './MovieDetails.styled';

export default function MovieDetails() {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();
  const location = useLocation();
  const backLinkLocationRef = useRef(location.state?.from ?? '/');
  const movieId = params.movieId;

  useEffect(() => {
    const fetchMovieById = async () => {
      try {
        setIsLoading(true);
        const data = await getMovieById(movieId);
        setIsLoading(false);
        setMovie(data);
      } catch (error) {}
    };

    fetchMovieById();
  }, [movieId]);

  const renderGenres = () => {
    if (!movie.genres) return null;
    return (
      <div>
        Genres:
        <PageUl>
          {movie.genres.map(({ name, id }) => (
            <PageLi key={id}>{name}</PageLi>
          ))}
        </PageUl>
      </div>
    );
  };

  return (
    <>
      <GoBackLink to={backLinkLocationRef.current}>Go back</GoBackLink>
      <MovieImageWrapper>
        {isLoading ? <Loader /> : <MovieImage movie={movie} />}
      </MovieImageWrapper>
      <MovieTitle>{movie.title}</MovieTitle>
      <p>
        Popularity:{' '}
        {movie.popularity ? movie.popularity : 'No information found'}
      </p>
      <p>
        Overview: {movie.overview ? movie.overview : 'No information found'}
      </p>
      {renderGenres()}
      <PageUl>
        <PageLi>
          <Link to="cast">Cast</Link>
        </PageLi>
        <PageLi>
          <Link to="reviews">Reviews</Link>
        </PageLi>
      </PageUl>
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </>
  );
}
