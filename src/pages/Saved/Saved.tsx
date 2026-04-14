import { useContext, useEffect, useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { MovieContext } from "../../context/MovieContext";
import type { Movie } from "../../context/MovieContext";

export const Saved = () => {
  const [search, setSearch] = useState<string>("");
  const movieContext = useContext(MovieContext);
  const navigate = useNavigate();

  // Este const con el ! es para decirle a TS que no es null, porque ya validamos eso antes
  const { favorites, watchLater, setFavorites, setWatchLater } = movieContext!;

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

  const filteredFavorites: Movie[] = favoritesState.filter((movie: Movie) =>
    movie.title.includes(search),
  );

  const filteredWatchLater: Movie[] = watchLaterState.filter((movie: Movie) =>
    movie.title.includes(search),
  );

  const handleRemoveFromFavorites = (id: number) => {
    const nextFavorites: Movie[] = favoritesState.filter((m) => m.id !== id);
    setFavoritesState(nextFavorites);
    setFavorites(nextFavorites);
  };

  const handleRemoveFromWatchLater = (id: number) => {
    const nextWatchLater: Movie[] = watchLaterState.filter((m) => m.id !== id);
    setWatchLaterState(nextWatchLater);
    setWatchLater(nextWatchLater);
  };

  return (
    <div>
      <h1>Películas Guardadas</h1>
      <button onClick={() => navigate("/catalogue")}>Ir a Catálogo</button>
      <input
        onChange={handleSearchChange}
        type="text"
        placeholder="Buscar por título"
      />

      {/* FAVORITOS */}
      <h2>Favoritos</h2>
      {favoritesState.length === 0 ? (
        <p>No has agregado películas aún.</p>
      ) : filteredFavorites.length === 0 ? (
        <p>No hay resultados para tu búsqueda.</p>
      ) : (
        filteredFavorites.map((movie: Movie) => (
          <div key={movie.id}>
            <p>{movie.title}</p>
            <button onClick={() => handleRemoveFromFavorites(movie.id)}>
              Eliminar
            </button>
          </div>
        ))
      )}

      {/* VER MÁS TARDE */}
      <h2>Ver más tarde</h2>
      {watchLaterState.length === 0 ? (
        <p>No has agregado películas aún.</p>
      ) : filteredWatchLater.length === 0 ? (
        <p>No hay resultados para tu búsqueda.</p>
      ) : (
        filteredWatchLater.map((movie: Movie) => (
          <div key={movie.id}>
            <p>{movie.title}</p>
            <button onClick={() => handleRemoveFromWatchLater(movie.id)}>
              Eliminar
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default Saved;
