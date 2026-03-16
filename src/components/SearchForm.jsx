export default function SearchForm({ searchTerm, onSearchChange }) {
  return (
    <section aria-labelledby="search-heading">
      <h2 id="search-heading">Søk etter filmer</h2>
      <form>
        <label htmlFor="movie-search">Filmtittel</label>
        <input
          id="movie-search"
          type="text"
          value={searchTerm}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Skriv minst 3 tegn"
        />
      </form>
    </section>
  );
}