import { useState, useEffect } from 'react';
import { CharacterCard } from './components/CharacterCard';
import './index.css';

const App = () => {
  const [searchValue, setSearchValue] = useState('rick');
  const [query, setQuery] = useState('rick');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Si el query está vacío, no buscamos y limpiamos resultados
    if (!query) {
      setResults([]);
      setLoading(false);
      return;
    }

    const getData = async () => {
      setLoading(true);
      setError(false);

      try {
        await fetch(`https://rickandmortyapi.com/api/character/?name=${query}`)
          .then((response) => {
            if (!response.ok) throw new Error('No results');
            return response.json();
          })
          .then((data) => setResults(data.results.slice(0, 8)));
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(true);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [query]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchValue.trim()) {
      setQuery(searchValue);
    }
  };

  const handleClear = () => {
    setSearchValue('');
    setQuery('');
    setResults([]);
    setError(false);
  };

  return (
    <div className="main-app">
      {/* Hero Section */}
      <section className="hero">
        <h1>Find your character</h1>
        <p className="subheadline">
          Explore the multiverse and discover your favorite characters from the Rick and
          Morty dimension.
        </p>

        <form className="search-container" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search characters..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </section>

      {/* Results Section */}
      <section className="results-section">
        <div className="results-header">
          <h2>Multiverse results</h2>
          {query && (
            <div
              style={{
                display: 'flex',
                gap: '1rem',
                justifyContent: 'center',
                marginTop: '1rem',
              }}
            >
              <button className="secondary" onClick={handleClear}>
                Clear results
              </button>
            </div>
          )}
        </div>

        {loading && (
          <div className="status-message">
            <div className="loading-spinner"></div>
            <p>Scanning the multiverse...</p>
          </div>
        )}

        {error && !loading && (
          <div className="status-message">
            <p className="error-message">No results found in this reality.</p>
          </div>
        )}

        {!loading && !error && results.length === 0 && !query && (
          <div className="status-message">
            <p>Escribe un nombre para buscar</p>
          </div>
        )}

        {!loading && !error && results.length > 0 && (
          <div className="results-grid">
            {results.map((char) => (
              <CharacterCard
                key={char.id}
                name={char.name}
                image={char.image}
                species={char.species}
                status={char.status}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default App;
