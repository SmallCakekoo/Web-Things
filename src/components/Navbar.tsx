import { Link } from "react-router-dom"

export const NavBar = () => {

    return(
  <nav>
    <Link to= "/">Todas las Salas</Link>
    <Link to= "/summary">Resumen</Link>
  </nav>
    )
}