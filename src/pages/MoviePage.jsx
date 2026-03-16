import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { fetchMovieById, fetchMovieByTitle } from "../utils/api";
import { unslugify } from "../utils/slugify";

export default function MoviePage() {
  const { movie } = useParams();
  const location = useLocation();

  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function getMovie() {
      setIsLoading(true);
      setErrorMessage("");

      try {
        let data;

        if (location.state?.imdbID) {
          data = await fetchMovieById(location.state.imdbID);
        } else {
          data = await fetchMovieByTitle(unslugify(movie));
        }

        if (data.Response === "True") {
          setSelectedMovie(data);
        } else {
          setErrorMessage("Fant ikke filmen.");
        }
      } catch (error) {
        setErrorMessage("Noe gikk galt ved henting av film.");
      } finally {
        setIsLoading(false);
      }
    }

    getMovie();
  }, [movie, location.state]);

  if (isLoading) {
    return <p>Laster film...</p>;
  }

  if (errorMessage) {
    return (
      <section>
        <p>{errorMessage}</p>
        <nav>
          <Link to="/">Tilbake til forsiden</Link>
        </nav>
      </section>
    );
  }

  return (
    <article>
      <header>
        <h2>{selectedMovie.Title}</h2>
        <p>{selectedMovie.Year}</p>
      </header>

      <figure>
        {selectedMovie.Poster !== "N/A" ? (
          <img
            src={selectedMovie.Poster}
            alt={`Poster for ${selectedMovie.Title}`}
          />
        ) : (
          <p>Ingen plakat tilgjengelig</p>
        )}
      </figure>

      <section>
        <h3>Informasjon</h3>
        <p><strong>Sjanger:</strong> {selectedMovie.Genre}</p>
        <p><strong>Regissør:</strong> {selectedMovie.Director}</p>
        <p><strong>Skuespillere:</strong> {selectedMovie.Actors}</p>
        <p><strong>Handling:</strong> {selectedMovie.Plot}</p>
      </section>

      <nav>
        <Link to="/">Tilbake til forsiden</Link>
      </nav>
    </article>
  );
}