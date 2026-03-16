import { Link } from "react-router-dom";
import { slugify } from "../utils/slugify";

export default function MovieCard({ movie }) {
  const movieSlug = slugify(movie.Title);

  return (
    <li>
      <article>
        <Link to={`/${movieSlug}`} state={{ imdbID: movie.imdbID }}>
          <figure>
            {movie.Poster !== "N/A" ? (
              <img src={movie.Poster} alt={`Poster for ${movie.Title}`} />
            ) : (
              <p>Ingen plakat tilgjengelig</p>
            )}

            <figcaption>
              <h3>{movie.Title}</h3>
              <p>{movie.Year}</p>
            </figcaption>
          </figure>
        </Link>
      </article>
    </li>
  );
}