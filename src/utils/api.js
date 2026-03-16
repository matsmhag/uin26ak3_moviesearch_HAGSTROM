const API_KEY = "b8428fde";
const BASE_URL = "https://www.omdbapi.com/";

export async function fetchMovies(searchTerm) {
  const response = await fetch(
    `${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(searchTerm)}&type=movie`
  );

  const data = await response.json();
  return data;
}

export async function fetchMovieById(id) {
  const response = await fetch(
    `${BASE_URL}?apikey=${API_KEY}&i=${id}&plot=full`
  );

  const data = await response.json();
  return data;
}

export async function fetchMovieByTitle(title) {
  const response = await fetch(
    `${BASE_URL}?apikey=${API_KEY}&t=${encodeURIComponent(title)}&plot=full`
  );

  const data = await response.json();
  return data;
}