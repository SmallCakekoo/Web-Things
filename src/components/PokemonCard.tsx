import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface PokemonCardProps {
  name: string;
  url: string;
}

interface PokemonDetails {
  id: number;
  imageUrl: string;
  types: string[];
}

export const PokemonCard: React.FC<PokemonCardProps> = ({ name, url }) => {
  const [details, setDetails] = useState<PokemonDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    let active = true;
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Error fetching details");
        return res.json();
      })
      .then((data) => {
        if (active) {
          setDetails({
            id: data.id,
            imageUrl: data.sprites?.other?.["official-artwork"]?.front_default || data.sprites?.front_default || "",
            types: data.types ? data.types.map((t: any) => t.type.name) : [],
          });
          setLoading(false);
        }
      })
      .catch(() => {
        if (active) {
          setError(true);
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [url]);

  // Capitaliza la primera letra del nombre
  const displayName = name.charAt(0).toUpperCase() + name.slice(1);

  return (
    <div className="pokemon-card">
      {loading ? (
        <div className="pokemon-card-placeholder">Cargando datos...</div>
      ) : error || !details ? (
        <div className="pokemon-card-placeholder">Error al cargar</div>
      ) : (
        <>
          <span className="pokemon-id">N.º {details.id.toString().padStart(3, "0")}</span>
          <div className="pokemon-card-image-container">
            {details.imageUrl ? (
              <img src={details.imageUrl} alt={displayName} className="pokemon-card-image" />
            ) : (
              <div className="no-image">Sin Imagen</div>
            )}
          </div>
          <h3 className="pokemon-card-name">{displayName}</h3>
          <div className="pokemon-types">
            {details.types.map((type) => (
              <span key={type} className={`type-badge type-${type}`}>
                {type}
              </span>
            ))}
          </div>
          <Link to={`/pokemon/${name}`} className="pokemon-card-btn">
            Ver Detalle
          </Link>
        </>
      )}
    </div>
  );
};
