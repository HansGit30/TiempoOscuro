import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Sidebar.css';

export const Sidebar: React.FC = () => {
  const navigate = useNavigate();

  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;
  const role = user?.role;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login', { replace: true });
  };

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <span>📚</span>
        <span>PORTAL TIEMPO OSCURO</span>
      </div>

      {/* Badge Proveedor/Admin en Sidebar */}
      <div style={{ padding: '0 8px 16px 8px' }}>
        <span style={{
          fontSize: '0.7rem',
          padding: '2px 8px',
          borderRadius: '4px',
          backgroundColor: '#3b82f6',
          color: '#ffffff',
          fontWeight: 'bold'
        }}>
          {role === 'admin' ? 'ADMINISTRADOR' : 'PROVEEDOR'}
        </span>
        <p style={{ margin: '4px 0 0 0', fontSize: '0.8rem', fontWeight: 600 }}>
          {user?.company_name || user?.email}
        </p>
      </div>

      {/* Menú usando las clases exactas de tu CSS (.sidebar-nav y .nav-item) */}
      <nav className="sidebar-nav">
        <NavLink to="/dashboard" end className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <span>🏠</span> Inicio / Resumen
        </NavLink>

        {role === 'admin' && (
          <>
            <NavLink to="/dashboard/users" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
              <span>👥</span> Gestión de Usuarios
            </NavLink>
            <NavLink to="/dashboard/approvals" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
              <span>📋</span> Aprobación de Solicitudes
            </NavLink>
            <NavLink to="/dashboard/reports" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
              <span>📊</span> Reportes Generales
            </NavLink>
          </>
        )}

        {role === 'supplier' && (
          <>
            <NavLink to="/dashboard/my-books" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
              <span>📖</span> Mi Catálogo de Libros
            </NavLink>
            <NavLink to="/dashboard/consignments" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
              <span>📦</span> Mis Consignaciones
            </NavLink>
            <NavLink to="/dashboard/sales" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
              <span>💰</span> Ventas y Liquidaciones
            </NavLink>
          </>
        )}
      </nav>

      {/* Tarjeta Más Vendido */}
      <div className="best-seller-card">
        <div className="best-seller-badge">🔥 MÁS VENDIDO</div>
        <img
          src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=300"
          alt="Libro más vendido"
          className="best-seller-cover"
        />
        <div className="best-seller-info">
          <h4>Names For The Sea</h4>
          <p>Sarah Moss</p>
        </div>
      </div>

      {/* Botón Salir */}
      <button onClick={handleLogout} className="logout-btn" style={{ marginTop: '16px', justifyContent: 'center' }}>
        Cerrar Sesión
      </button>
    </aside>
  );
};