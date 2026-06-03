import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav>
      <Link to="/" style={{ marginRight: "15px" }}>Listado Pokémon</Link>
      <Link to="/analysis">Lista de Análisis</Link>
    </nav>
  );
};
export default Navbar;
