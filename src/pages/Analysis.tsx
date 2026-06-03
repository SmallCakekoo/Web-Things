import { usePokemon } from "../context/PokemonContext";
import { Link } from "react-router-dom";

export const Analysis = () => {
  const { analysisList, removeFromAnalysis } = usePokemon();

  return (
    <div>
      <h2>Análisis ({analysisList.length} / 4)</h2>
      {analysisList.length === 0 ? (
        <p>Lista vacía.</p>
      ) : (
        <div>
          {analysisList.map((p) => (
            <div key={p.id}>
              {p.image && <img src={p.image} alt={p.name} />}
              <h3>{p.name}</h3>
              <p>Altura: {p.height} | Peso: {p.weight}</p>
              <p>Tipos: {p.types.join(", ")}</p>
              <button onClick={() => removeFromAnalysis(p.id)}>Eliminar</button>
            </div>
          ))}
        </div>
      )}
      <Link to="/">Volver al listado</Link>
    </div>
  );
};

export default Analysis;
