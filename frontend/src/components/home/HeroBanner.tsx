import React from 'react';
import './HeroBanner.css';
import Repisa from '../../assets/REPISA.png';
import logo from '../../assets/LOGONEGRO.png';
import mario from '../../assets/MarioVargas.png'

// Si tienes imágenes locales en tu carpeta assets, puedes importarlas así:
// import PortadaPrincipal from '../assets/portada-principal.jpg';
// import AvatarUsuario from '../assets/avatar.jpg';

export const HeroBanner: React.FC = () => {
    return (
        <div className="hero-wrapper">
            <img className='personaje' src={mario} alt="" />
            {/* BARRA SUPERIOR */}
            <nav className="top-navbar">
                <div className="brand-logo">
                    <img src={logo} alt="logo" />
                </div>
                {/* <div className="nav-pills">
          <button className="pill-btn active" type="button">📖 Books</button>
          <button className="pill-btn" type="button">🎧 AudioBooks</button>
        </div> */}
                <div className="nav-actions">
                    <button className="btn-login" type="button">
                        Iniciar sesión
                    </button>
                </div>
            </nav>

            {/* CONTENIDO CENTRADO */}
            <div className="hero-content">

                {/* SECCIÓN SUPERIOR DE LA REPISA */}
                <div className="hero-shelf-top">
                    <div className="hero-text-section">
                        <h1 className="hero-title">Lecturas de<br />Tiempo Oscuro</h1>
                        <p className="hero-subtitle">Descubre nuestro catálogo recomendado</p>
                    </div>

                    <div className="featured-book">
                        <img
                            src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=300&q=80"
                            alt="The Last Thing He Told Me"
                        />
                    </div>

                    <div className="side-widgets">
                        <div className="widget-wrapper">
                            <span className="vertical-label">Autor Destacado</span>
                            <div className="author-card">
                                <h5>Mario Vargas Llosa</h5>
                                <p>Obras completas</p>
                                <img
                                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80"
                                    alt="Stephen King"
                                />
                            </div>
                        </div>

                        <div className="widget-wrapper">
                            <span className="vertical-label">Audiolibro popular</span>
                            <div className="audio-card">
                                <h5>False Witness: A Novel</h5>
                                <p>Karin Slaughter</p>
                                <div className="audio-disc">🎵</div>
                                <div className="audio-controls">
                                    <button className="play-btn-small" type="button">▶</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CONTENEDOR DE TU IMAGEN REPISA.PNG */}
                <div className="shelf-image-wrapper">
                    <img src={Repisa} alt="Wall Shelf" className="shelf-img" />
                </div>

                {/* SECCIÓN INFERIOR */}
                <div className="shelf-bottom">
                    <span className="vertical-label">Más Vendidos</span>

                    <div className="bestseller-item">
                        <img
                            src="https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=120&q=80"
                            alt="Left to Fear"
                        />
                        <div className="book-info">
                            <div className="stars">★★★★★</div>
                            <h4>False Witness: A Novel</h4>
                            <p>Karin Slaughter</p>
                            <button className="btn-buy" type="button">Ver Libro</button>
                        </div>
                    </div>

                    <div className="bestseller-item">
                        <img
                            src="https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=120&q=80"
                            alt="Malibu Rising"
                        />
                        <div className="book-info">
                            <div className="stars">★★★★☆</div>
                            <h4>Malibu Rising</h4>
                            <p>Taylor Jenkins</p>
                            <button className="btn-buy" type="button">Ver Libro</button>
                        </div>
                    </div>

                    <div className="bestseller-item">
                        <img
                            src="https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=120&q=80"
                            alt="Black Ice"
                        />
                        <div className="book-info">
                            <div className="stars">★★★★★</div>
                            <h4>Black Ice</h4>
                            <p>Brad Thor</p>
                            <button className="btn-buy" type="button">Ver Libro</button>
                        </div>
                    </div>

                    {/* <div className="bestseller-item rotated">

          </div> */}
                </div>

            </div>
        </div>
    );
};