import { useEffect, useState } from "react";
import SearchForm from "../components/SearchForm";
import MovieList from "../components/MovieList";
import { fetchMovies } from "../utils/api";

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [defaultMovies, setDefaultMovies] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function getJamesBondMovies() {
      setIsLoading(true);
      setErrorMessage("");

      try {
        const data = await fetchMovies("james bond");

        if (data.Response === "True") {
          setDefaultMovies(data.Search.slice(0, 10));
        } else {
          setErrorMessage("Kunne ikke hente James Bond-filmer.");
        }
      } catch (error) {
        setErrorMessage("Noe gikk galt ved henting av filmer.");
      } finally {
        setIsLoading(false);
      }
    }

    getJamesBondMovies();
  }, []);

  useEffect(() => {
    async function getSearchResults() {
      if (searchTerm.trim().length < 3) {
        setSearchResults([]);
        setErrorMessage("");
        return;
      }

      setIsLoading(true);
      setErrorMessage("");

      try {
        const data = await fetchMovies(searchTerm);

        if (data.Response === "True") {
          setSearchResults(data.Search);
        } else {
          setSearchResults([]);
          setErrorMessage("Ingen filmer funnet.");
        }
      } catch (error) {
        setErrorMessage("Noe gikk galt under søket.");
      } finally {
        setIsLoading(false);
      }
    }

    getSearchResults();
  }, [searchTerm]);

  const showingSearchResults = searchTerm.trim().length >= 3;
  const moviesToShow = showingSearchResults ? searchResults : defaultMovies;
  const listTitle = showingSearchResults
    ? `Søkeresultater for "${searchTerm}"`
    : "James Bond-filmer";

  return (
    <>
      <SearchForm searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      {isLoading && <p>Laster filmer...</p>}
      {errorMessage && <p>{errorMessage}</p>}

      {!isLoading && !errorMessage && (
        <MovieList movies={moviesToShow} title={listTitle} />
      )}
    </>
  );
}