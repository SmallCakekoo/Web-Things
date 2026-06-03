import { useEffect, useState } from "react";
import PokemonCard from "../components/PokemonCard";

export const PokemonList = () => {
  const [pokemons, setPokemons] = useState<{ name: string; url: string }[]>([]);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=20")
      .then((res) => res.json())
      .then((data) => setPokemons(data.results || []));
  }, []);

  const filtered = pokemons.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2>Listado Pokémon</h2>
      <input
        type="text"
        placeholder="Buscar..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div>
        {filtered.map((p) => (
          <PokemonCard key={p.name} name={p.name} url={p.url} />
        ))}
      </div>
    </div>
  );
};

export default PokemonList;
