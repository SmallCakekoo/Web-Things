import { useContext } from 'react';
import { IncidentsContext } from '../context/IncidentsContext';

export const FiltersBar = () => {
  const context = useContext(IncidentsContext);
  if (!context) return null;
  const { filters, setFilters } = context;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  return (
    <div className="panel" style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
      <div style={{ flex: 1, minWidth: '150px' }}>
        <label style={{ fontSize: '12px', fontWeight: 'bold' }}>Categoría</label>
        <select name="category" value={filters.category} onChange={handleChange} style={{ width: '100%', padding: '8px' }}>
          <option value="">Todas</option>
          <option value="Software">Software</option>
          <option value="Hardware">Hardware</option>
          <option value="Access">Acceso (Access)</option>
          <option value="Network">Red (Network)</option>
        </select>
      </div>

      <div style={{ flex: 1, minWidth: '150px' }}>
        <label style={{ fontSize: '12px', fontWeight: 'bold' }}>Prioridad</label>
        <select name="priority" value={filters.priority} onChange={handleChange} style={{ width: '100%', padding: '8px' }}>
          <option value="">Todas</option>
          <option value="low">Baja</option>
          <option value="medium">Media</option>
          <option value="high">Alta</option>
        </select>
      </div>

      <div style={{ flex: 1, minWidth: '150px' }}>
        <label style={{ fontSize: '12px', fontWeight: 'bold' }}>Estado</label>
        <select name="status" value={filters.status} onChange={handleChange} style={{ width: '100%', padding: '8px' }}>
          <option value="">Todos</option>
          <option value="pending">Pendiente</option>
          <option value="in-progress">En proceso</option>
          <option value="resolved">Resuelto</option>
        </select>
      </div>
      
      <button 
        onClick={() => setFilters({ category: '', priority: '', status: '' })}
        style={{ marginTop: '20px', background: '#333', color: '#fff' }}
      >

        Limpiar Filtros
      </button>
    </div>
  );
};
