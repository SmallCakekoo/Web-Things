import { useState } from 'react';
import { InfoCard } from './components/InfoCard';
import './index.css';

const App = () => {
  // 1) Lista inicial local
  const initialState = [
    { id: 1, title: 'Aprender React', description: 'Dominar useState y useEffect antes del parcial.' },
    { id: 2, title: 'Configurar Vite', description: 'Asegurarse de que el entorno de desarrollo sea óptimo.' },
    { id: 3, title: 'Estudiar CSS', description: 'Mejorar las habilidades de diseño con CSS moderno.' },
  ];

  // Estados mínimos sugeridos
  const [cards, setCards] = useState(initialState);
  const [form, setForm] = useState({ title: '', description: '' });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');

  // 3) Formulario controlado (Create & Prefill)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar que no estén vacíos
    if (!form.title.trim() || !form.description.trim()) {
      setError('Todos los campos son obligatorios');
      return;
    }

    if (editingId) {
      // 4) Editar (Update)
      const updatedCards = cards.map((card) =>
        card.id === editingId ? { ...card, ...form } : card
      );
      setCards(updatedCards);
      setEditingId(null);
    } else {
      // Create
      const newCard = {
        id: Date.now(), // ID único
        title: form.title,
        description: form.description,
      };
      setCards([...cards, newCard]);
    }

    // Limpiar el formulario y error
    setForm({ title: '', description: '' });
    setError('');
  };

  // 4) Editar (Update) - Prefill
  const handleEditClick = (card) => {
    setForm({ title: card.title, description: card.description });
    setEditingId(card.id);
    setError('');
  };

  // 5) Eliminar (Delete)
  const handleDeleteClick = (id) => {
    const filteredCards = cards.filter((card) => card.id !== id);
    setCards(filteredCards);

    // Si ese item estaba en edición, cancelar la edición y limpiar el formulario
    if (editingId === id) {
      setEditingId(null);
      setForm({ title: '', description: '' });
    }
  };

  return (
    <div className="container">
      <header>
        <h1>Card Manager</h1>
        {/* ⭐ Bonus: Contador total de cards */}
        <div className="counter">{cards.length} tarjetas en total</div>
      </header>

      <section className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Título</label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Ej: Terminar proyecto"
              value={form.title}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Descripción</label>
            <textarea
              id="description"
              name="description"
              rows="3"
              placeholder="Ej: Detallar los requisitos del CRUD..."
              value={form.description}
              onChange={handleInputChange}
            ></textarea>
          </div>

          {error && <p className="error-message">{error}</p>}

          <button
            type="submit"
            className={`btn ${editingId ? 'btn-success' : 'btn-primary'}`}
          >
            {editingId ? 'Guardar cambios' : 'Agregar Tarjeta'}
          </button>
        </form>
      </section>

      <section className="card-list">
        {cards.map((card) => (
          <InfoCard
            key={card.id}
            card={card}
            onEdit={handleEditClick}
            onDelete={handleDeleteClick}
          />
        ))}
      </section>
    </div>
  );
};

export default App;
