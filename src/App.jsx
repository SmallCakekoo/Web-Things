import { Route, Routes } from 'react-router-dom';
import './index.css';
import { Home } from './pages/Home/Home';
import { PokemonDetail } from './pages/PokemonDetail/PokemonDetail';
import { PokemonList } from './pages/PokemonList/PokemonList';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemon" element={<PokemonList />} />
        <Route path="/pokemon/:id" element={<PokemonDetail />} />
      </Routes>
    </div>
  );
}
export default App;
