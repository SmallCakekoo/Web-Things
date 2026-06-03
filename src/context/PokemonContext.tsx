import { createContext, useState, useContext } from "react";
import type {  Pokemon } from "../types";

interface PokemonContextType {
  analysisList: Pokemon[];
  addToAnalysis: (pokemon: Pokemon) => { success: boolean; message: string };
  removeFromAnalysis: (id: number) => void;
}

const PokemonContext = createContext<PokemonContextType | null>(null);

export const PokemonProvider = ({ children }: { children: React.ReactNode }) => {
  const [analysisList, setAnalysisList] = useState<Pokemon[]>([]);

  const addToAnalysis = (pokemon: Pokemon) => {
    if (analysisList.some((p) => p.id === pokemon.id)) {
      return { success: false, message: "Este Pokémon ya está agregado." };
    }
    if (analysisList.length >= 4) {
      return { success: false, message: "Límite de 4 Pokémon alcanzado." };
    }
    setAnalysisList((prev) => [...prev, pokemon]);
    return { success: true, message: "Agregado con éxito." };
  };

  const removeFromAnalysis = (id: number) => {
    setAnalysisList((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <PokemonContext.Provider value={{ analysisList, addToAnalysis, removeFromAnalysis }}>
      {children}
    </PokemonContext.Provider>
  );
};

export const usePokemon = () => {
  const context = useContext(PokemonContext);
  if (!context) throw new Error("usePokemon must be used within PokemonProvider");
  return context;
};
