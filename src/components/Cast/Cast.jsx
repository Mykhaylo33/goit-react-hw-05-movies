import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getMovieCredits } from 'api';
import { CreditsImage } from './Cast.styled';

const defaultProfileImage =
  'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg';

export default function Cast() {
  const [credits, setCredits] = useState({});
  const { movieId } = useParams();

  useEffect(() => {
    const fetchMovieCredits = async () => {
      try {
        const data = await getMovieCredits(movieId);
        setCredits(data);
      } catch (error) {}
    };

    fetchMovieCredits();
  }, [movieId]);

  const renderCredits = (creditList, isCast) => {
    return (
      <ul>
        {creditList.map(({ name, id, profile_path, character, job }) => {
          const imagePath = profile_path
            ? `https://image.tmdb.org/t/p/original${profile_path}`
            : defaultProfileImage;

          return (
            <li key={id}>
              <CreditsImage src={imagePath} alt={name} />
              <p>{name}</p>
              <p>{isCast ? character : job}</p>
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <>
      {credits.cast && renderCredits(credits.cast, true)}
      {credits.crew && renderCredits(credits.crew, false)}
    </>
  );
}
