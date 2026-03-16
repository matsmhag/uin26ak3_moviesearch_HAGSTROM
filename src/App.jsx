import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MoviePage from "./pages/MoviePage";

function App() {
  return (
    <>
      <header>
        <h1>Movie Search</h1>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/:movie" element={<MoviePage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
