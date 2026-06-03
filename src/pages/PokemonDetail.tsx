import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { usePokemon } from "../context/PokemonContext";
import type { Pokemon } from "../types";

export const PokemonDetail = () => {
  const { name } = useParams();
  const { analysisList, addToAnalysis } = usePokemon();
  const [pokemon, setPokemon] = useState<any>(null);
  const [feedback, setFeedback] = useState<string>("");

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then((res) => res.json())
      .then((data) => setPokemon(data));
  }, [name]);

  if (!pokemon) return <p>Cargando...</p>;

  const added = analysisList.some((p) => p.id === pokemon.id);
  const full = analysisList.length >= 4;

  const handleAdd = () => {
    const formatted: Pokemon = {
      id: pokemon.id,
      name: pokemon.name,
      image: pokemon.sprites.front_default || "",
      height: pokemon.height,
      weight: pokemon.weight,
      types: pokemon.types.map((t: any) => t.type.name),
    };
    const res = addToAnalysis(formatted);
    setFeedback(res.message);
  };

  return (
    <div>
      <Link to="/">Volver</Link>
      <h2>{pokemon.name}</h2>
      {pokemon.sprites.front_default && <img src={pokemon.sprites.front_default} alt={pokemon.name} />}
      <p>Altura: {pokemon.height}</p>
      <p>Peso: {pokemon.weight}</p>
      <p>Tipos: {pokemon.types.map((t: any) => t.type.name).join(", ")}</p>
      <p>Habilidades: {pokemon.abilities.map((a: any) => a.ability.name).join(", ")}</p>
      <button onClick={handleAdd} disabled={added || full}>
        {added ? "Ya agregado" : full ? "Límite alcanzado" : "Agregar a Análisis"}
      </button>
      {feedback && <p>{feedback}</p>}
    </div>
  );
};

export default PokemonDetail;
