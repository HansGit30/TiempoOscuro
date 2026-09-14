import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Header: React.FC = () => {
  const navigate = useNavigate();

  // Leer usuario y rol actual desde localStorage
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;
  const role = user?.role;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login', { replace: true });
  };

  return (
    <header style={{
      height: '64px',
      backgroundColor: '#ffffff',
      borderBottom: '1px solid #e2e8f0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 28px',
      boxSizing: 'border-box',
      width: '100%'
    }}>
      {/* Buscador de la izquierda */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        backgroundColor: '#f1f5f9',
        padding: '8px 16px',
        borderRadius: '20px',
        width: '320px'
      }}>
        <span style={{ fontSize: '0.85rem' }}>🔍</span>
        <input 
          type="text" 
          placeholder="Buscar libro, autor, ISBN..." 
          style={{
            border: 'none',
            background: 'transparent',
            outline: 'none',
            width: '100%',
            fontSize: '0.85rem',
            color: '#334155'
          }}
        />
      </div>

      {/* Perfil del Usuario a la derecha */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img 
            src={user?.avatar_url || "https://i.pravatar.cc/100"} 
            alt="User Avatar" 
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              objectFit: 'cover'
            }}
          />
          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1e293b' }}>
            {role === 'admin' ? 'Administrador' : (user?.company_name || 'Proveedor')}
          </span>
        </div>

        {/* Botón Salir */}
        <button 
          onClick={handleLogout} 
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: '#fef2f2',
            color: '#ef4444',
            border: '1px solid #fecaca',
            padding: '6px 14px',
            borderRadius: '6px',
            fontWeight: 700,
            fontSize: '0.8rem',
            cursor: 'pointer'
          }}
        >
          🚪 Salir
        </button>
      </div>
    </header>
  );
};