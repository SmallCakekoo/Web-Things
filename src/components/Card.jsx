import { useState } from 'react';
import './Card.css';

// Crear un input que cada vez que escriba busque esa cantidad de pokemones y los pinte. Por ejempo, si escribo 5, que me muestre los 5 usando el limit rate.

export const Card = () => {
  const [amount, setAmount] = useState('');
  const [data, setData] = useState([]);

  return (
    <div className="card">
      <label>Pokemon Amount</label>
      <input
        type="text"
        value={amount}
        onChange={(event) => setAmount(event.target.value)}
      />
      <button
        onClick={async () => {
          const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon?limit=${amount}`
          );

          const data = await response.json();

          console.log(data);
          setData(data.results);
        }}
      >
        Search
      </button>
      <div>
        {data.map((poke) => (
          <h1 key={poke.name}>{poke.name}</h1>
        ))}
      </div>
    </div>
  );
};
