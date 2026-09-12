import React from 'react';
import { FiSearch, FiGlobe, FiUser, FiShoppingBag, FiCheckCircle, FiPlusCircle } from 'react-icons/fi';
import logo from '../../assets/LOGONEGRO.png'; // Ajusta la ruta a tu logo
import './Navbar.css';

const Navbar: React.FC = () => {
  return (
    <nav className="top-navbar">
      {/* SECCIÓN IZQUIERDA: LOGO + BUSCADOR */}
      <div className="nav-left">
        <div className="brand-logo">
          <img src={logo} alt="Logo Tiempo Oscuro" />
        </div>
        <div className="search-bar">
          <FiSearch className="search-icon" />
          <input type="text" placeholder="Busca por libro, autor..." />
        </div>
      </div>

      {/* SECCIÓN DERECHA: SECCIONES DESTACADAS E ÍCONOS */}
      <div className="nav-right">
        <div className="nav-links">
          <a href="#mas-vendidos" className="nav-link">
            <FiCheckCircle className="link-icon icon-orange" />
            <span>MÁS VENDIDOS</span>
          </a>
          <div className="nav-divider"></div>
          <a href="#novedades" className="nav-link">
            <FiPlusCircle className="link-icon icon-orange" />
            <span>NOVEDADES</span>
          </a>
        </div>

        <div className="nav-divider"></div>

        <div className="nav-user-actions">
          <button className="icon-btn" aria-label="Idioma" type="button">
            <FiGlobe />
          </button>
          <button className="icon-btn" aria-label="Usuario" type="button">
            <FiUser />
          </button>
          <button className="icon-btn cart-btn" aria-label="Carrito" type="button">
            <FiShoppingBag />
            <span className="cart-badge">0</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;