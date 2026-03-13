import { useNavigate } from 'react-router-dom';
import './Home.css';

export const Home = () => {
  const navigate = useNavigate();

  const viewPokemon = () => {
    navigate('/pokemon');
  };

  return (
    <div className="home-page">
      <div className="home-card">
        <h1 className="home-title">Pokédex</h1>
        <p className="home-subtitle">Bienvenido a la Pokédex</p>
        <button className="home-btn" onClick={viewPokemon}>
          Ver Pokémoncitos
        </button>
      </div>
    </div>
  );
};
