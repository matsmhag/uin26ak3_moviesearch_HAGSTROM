import MovieCard from "./MovieCard";

export default function MovieList({ movies, title }) {
  return (
    <section aria-labelledby="movies-heading">
      <h2 id="movies-heading">{title}</h2>

      {movies.length > 0 ? (
        <ul>
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </ul>
      ) : (
        <p>Ingen filmer å vise.</p>
      )}
    </section>
  );
}