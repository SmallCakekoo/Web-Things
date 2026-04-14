import { createContext, useState } from "react";

// Tipado de película
export interface Movie {
  id: number;
  title: string;
  genre: string;
  year: number;
  image?: string;
}

// Tipado del contexto
// El dispath es el tipo de función que actualiza el estado, en este caso un array de películas
interface MovieContextType {
  favorites: Movie[];
  setFavorites: React.Dispatch<React.SetStateAction<Movie[]>>;
  watchLater: Movie[];
  setWatchLater: React.Dispatch<React.SetStateAction<Movie[]>>;
}

// Contexto inicial en null
const MovieContext = createContext<MovieContextType | null>(null);

// Provider
export const MovieProvider = ({ children }: { children: React.ReactNode }) => {
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [watchLater, setWatchLater] = useState<Movie[]>([]);

  return (
    <MovieContext.Provider
      value={{
        favorites,
        setFavorites,
        watchLater,
        setWatchLater,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export { MovieContext };
