import "./App.css";
import { Routes, Route } from "react-router-dom";
import { PokemonProvider } from "./context/PokemonContext";
import PokemonList from "./pages/PokemonList";
import PokemonDetail from "./pages/PokemonDetail";
import Analysis from "./pages/Analysis";
import Navbar from "./components/Navbar";

function App() {
  return (
    <PokemonProvider>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<PokemonList />} />
          <Route path="/pokemon/:name" element={<PokemonDetail />} />
          <Route path="/analysis" element={<Analysis />} />
        </Routes>
      </div>
    </PokemonProvider>
  );
}

export default App;
