import movies from "../../data/movies.json";
import { useContext, useEffect, useState, type ChangeEvent } from "react";
import { MovieContext } from "../../context/MovieContext";
import type { Movie } from "../../context/MovieContext";
import { useNavigate } from "react-router-dom";

export const Catalogue = () => {
  const [search, setSearch] = useState<string>("");
  const movieContext = useContext(MovieContext);
  const navigate = useNavigate();

  if (!movieContext) {
    throw new Error("MovieContext must be used within MovieProvider");
  }

  const { favorites, watchLater, setFavorites, setWatchLater } = movieContext;
  const [favoritesState, setFavoritesState] = useState<Movie[]>(favorites);
  const [watchLaterState, setWatchLaterState] = useState<Movie[]>(watchLater);

  useEffect(() => {
    setFavoritesState(favorites);
  }, [favorites]);

  useEffect(() => {
    setWatchLaterState(watchLater);
  }, [watchLater]);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearch(event.target.value);
  };

  const filteredMovies: Movie[] = movies.filter((movie: Movie) => {
    return movie.title.includes(search) || movie.genre.includes(search);
  });

  const handleAddToFavorites = (movie: Movie) => {
    if (!favoritesState.find((i) => i.id === movie.id)) {
      const nextFavorites: Movie[] = [...favoritesState, movie];
      setFavoritesState(nextFavorites);
      setFavorites(nextFavorites);
    }
  };

  const handleAddToWatchLater = (movie: Movie) => {
    if (!watchLaterState.find((i) => i.id === movie.id)) {
      const nextWatchLater: Movie[] = [...watchLaterState, movie];
      setWatchLaterState(nextWatchLater);
      setWatchLater(nextWatchLater);
    }
  };

  return (
    <div>
      <h1>Catálogo</h1>
      <button onClick={() => navigate("/saved")}>Ir a Guardadas</button>
      <input
        onChange={handleSearchChange}
        type="text"
        placeholder="Buscar por título o género"
      />

      {filteredMovies.map((movie: Movie) => {
        const isFavorite = favoritesState.some((m) => m.id === movie.id);
        const isWatchLater = watchLaterState.some((m) => m.id === movie.id);

        return (
          <div
            key={movie.id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              margin: "10px",
            }}
          >
            <h3>{movie.title}</h3>
            <p>
              {movie.genre} - {movie.year}
            </p>

            <div>
              <button
                onClick={() => handleAddToFavorites(movie)}
                disabled={isFavorite}
              >
                {isFavorite ? "Ya en favoritos" : "Agregar a favoritos"}
              </button>

              <button
                onClick={() => handleAddToWatchLater(movie)}
                disabled={isWatchLater}
              >
                {isWatchLater ? "Ya guardada" : "Ver más tarde"}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Catalogue;
