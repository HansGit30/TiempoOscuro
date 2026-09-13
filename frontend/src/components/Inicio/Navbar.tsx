import React, { forwardRef } from 'react';
import './Navbar.css';

export const Navbar = forwardRef<HTMLElement>((_, ref) => {
  return (
    <nav className="navbar" ref={ref}>
      <div className="brand-logo">
        TIEMPO<span>OSCURO</span>
      </div>
      <ul className="nav-menu">
        <li><a href="#works">MUNDOS</a></li>
        <li><a href="#about">NOSOTROS</a></li>
        <li><a href="#news">LIBROS</a></li>
      </ul>
      <div className="lang-switch">
        <span className="active">INCIAR SESION</span>
      </div>
    </nav>
  );
});

Navbar.displayName = 'Navbar';