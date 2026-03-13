import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './PokemonDetail.css';

export const PokemonDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [pokemon, setPokemon] = useState({
    name: '',
    height: null,
    weight: null,
    sprites: {},
  });

  useEffect(() => {
    const loadPokemonDetails = () => {
      fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then((response) => response.json())
        .then((pokemonData) => setPokemon(pokemonData));
    };

    loadPokemonDetails();
  }, [id]);

  return (
    <div className="pokemon-detail-page">
      <div className="pokemon-detail-card">
        <h1 className="pokemon-detail-title">{pokemon.name || 'Pokemon'}</h1>

        <div className="pokemon-portrait">
          {pokemon.sprites?.front_default && (
            <img
              className="pokemon-detail-image"
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
            />
          )}
        </div>

        <div className="pokemon-stats">
          <p className="pokemon-stat">Altura: {pokemon.height}</p>
          <p className="pokemon-stat">Peso: {pokemon.weight}</p>
        </div>

        <button className="pokemon-back-btn" onClick={() => navigate(-1)}>
          Volver
        </button>
      </div>
    </div>
  );
};
