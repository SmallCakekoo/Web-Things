import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './PokemonList.css';

export const PokemonList = () => {
  const [pokemon, setPokemon] = useState([]);

  useEffect(() => {
    const loadPokemonList = () => {
      fetch('https://pokeapi.co/api/v2/pokemon?limit=20')
        .then((response) => response.json())
        .then((pokemonData) => setPokemon(pokemonData.results));
    };

    loadPokemonList();
  }, []);

  return (
    <div className="pokedex-page">
      <div className="pokedex-box">
        <h1 className="pokedex-title">Lista de Pokémones</h1>

        <ul className="pokemon-button-list">
          {pokemon.map((pokemonEntry, index) => (
            <li key={index}>
              <Link className="pokemon-button" to={`/pokemon/${index + 1}`}>
                {pokemonEntry.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PokemonList;
