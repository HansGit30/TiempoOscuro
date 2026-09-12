import React, { forwardRef } from 'react';
import './Navbar.css';

export const Navbar = forwardRef<HTMLElement>((_, ref) => {
  return (
    <nav className="navbar" ref={ref}>
      <div className="brand-logo">
        TIEMPO<span>OSCURO</span>
      </div>
      <ul className="nav-menu">
        <li><a href="#works">WORKS</a></li>
        <li><a href="#about">ABOUT</a></li>
        <li><a href="#news">NEWS</a></li>
        <li><a href="#contact">CONTACT</a></li>
      </ul>
      <div className="lang-switch">
        Iniciar <span className="active">Sesion</span>
      </div>
    </nav>
  );
});

Navbar.displayName = 'Navbar';