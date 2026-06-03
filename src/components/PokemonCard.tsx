import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const PokemonCard = ({ name, url }: { name: string; url: string }) => {
  const [image, setImage] = useState<string>("");

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setImage(data.sprites.front_default));
  }, [url]);

  return (
    <div>
      <h4>{name}</h4>
      {image && <img src={image} alt={name} />}
      <Link to={`/pokemon/${name}`}>Ver Detalle</Link>
    </div>
  );
};

export default PokemonCard;
