const BASE_URL = 'https://api.themoviedb.org/';
const API_KEY = 'f68a95841909bbb245d2b540e82c3a85';

const handleResponse = async (response) => {
  if (!response.ok) {
    throw new Error('Oops... something went wrong...');
  }
  return response.json();
};

export const getTrendingMovies = async () => {
  const response = await fetch(
    `${BASE_URL}3/trending/all/day?api_key=${API_KEY}&language=en-US`
  );
  return handleResponse(response);
};

export const getMovieById = async (id) => {
  const response = await fetch(`${BASE_URL}3/movie/${id}?api_key=${API_KEY}`);
  return handleResponse(response);
};

export const getMovieCredits = async (id) => {
  const response = await fetch(
    `${BASE_URL}3/movie/${id}/credits?api_key=${API_KEY}`
  );
  return handleResponse(response);
};

export const getMovieReviews = async (id) => {
  const response = await fetch(
    `${BASE_URL}3/movie/${id}/reviews?api_key=${API_KEY}`
  );
  return handleResponse(response);
};

export const getMoviesBySearch = async (searchQuery) => {
  const response = await fetch(
    `${BASE_URL}3/search/movie?api_key=${API_KEY}&language=en-US&query=${searchQuery}`
  );
  return handleResponse(response);
};
