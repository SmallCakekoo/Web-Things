import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export const Navbar = () => {
  const location = useLocation();

  const linkStyle = (path: string) => ({
    textDecoration: 'none',
    color: location.pathname === path ? '#fff' : '#aaa',
    fontWeight: location.pathname === path ? 'bold' : 'normal',
    padding: '8px 16px',
    borderRadius: '4px',
    background: location.pathname === path ? '#444' : 'transparent',
    transition: 'all 0.3s ease'

  });

  return (
    <nav style={{ 
      display: 'flex', 
      gap: '8px', 
      marginBottom: '24px', 
      padding: '8px',
      background: '#242424',
      borderBottom: '1px solid #444',

      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <Link to="/" style={linkStyle('/')}>Todas las Incidencias</Link>
      <Link to="/summary" style={linkStyle('/summary')}>Resumen y Destacadas</Link>

    </nav>
  );
};
