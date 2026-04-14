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
interface MovieContextType {
  favorites: Movie[];
  setFavorites: React.Dispatch<React.SetStateAction<Movie[]>>;
  watchLater: Movie[];
  setWatchLater: React.Dispatch<React.SetStateAction<Movie[]>>;
}

// Contexto inicial en null (como te piden)
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
