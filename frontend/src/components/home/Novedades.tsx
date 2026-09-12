import React, { useRef, useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  BookOpen, 
  Heart 
} from 'lucide-react';
import './Novedades.css';

interface Libro {
  id: number;
  titulo: string;
  autor: string;
  portada: string;
  precioActual: number;
  precioAnterior?: number;
  descuento?: number;
  badge?: string;
}

const listaLibros: Libro[] = [
  {
    id: 1,
    titulo: 'Noches blancas',
    autor: 'Dostoievski, Fiódor M.',
    portada: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=400',
    precioActual: 75.00,
    badge: 'Novedades'
  },
  {
    id: 2,
    titulo: 'Ídolos con pies de barro',
    autor: 'MÁRQUEZ, NICOLÁS',
    portada: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=400',
    precioActual: 41.93,
    precioAnterior: 59.90,
    descuento: 30,
    badge: 'Novedades'
  },
  {
    id: 3,
    titulo: 'El universo de BTS',
    autor: 'Malik, Saumya',
    portada: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=400',
    precioActual: 34.30,
    precioAnterior: 49.00,
    descuento: 30,
    badge: 'Novedades'
  },
  {
    id: 4,
    titulo: 'Regresa a ti',
    autor: 'CIFUENTES CASTAÑEDA, ROSA MARÍA',
    portada: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=400',
    precioActual: 69.90,
    badge: 'Novedades'
  },
  {
    id: 5,
    titulo: 'El Pastor y los Lobos',
    autor: 'RONCAGLIOLO, SANTIAGO',
    portada: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=400',
    precioActual: 69.90,
    badge: 'Novedades'
  },
  {
    id: 6,
    titulo: 'Perú es clave',
    autor: 'Aita, Rafael',
    portada: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=400',
    precioActual: 59.00,
    badge: 'Novedades'
  },
  {
    id: 7,
    titulo: 'Cien años de soledad',
    autor: 'García Márquez, Gabriel',
    portada: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=400',
    precioActual: 85.00,
    badge: 'Novedades'
  },
  {
    id: 8,
    titulo: 'El principito',
    autor: 'Antoine de Saint-Exupéry',
    portada: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=400',
    precioActual: 39.00,
    badge: 'Novedades'
  }
];

export const Novedades: React.FC = () => {
  const [favoritos, setFavoritos] = useState<number[]>([]);
  const [paginaActual, setPaginaActual] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  const toggleFavorito = (id: number) => {
    setFavoritos(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const scroll = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const { scrollLeft, clientWidth } = sliderRef.current;
      const scrollAmount = clientWidth * 0.8;
      
      const newScrollPosition = direction === 'left' 
        ? scrollLeft - scrollAmount 
        : scrollLeft + scrollAmount;

      sliderRef.current.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth'
      });

      setPaginaActual(direction === 'left' ? 0 : 1);
    }
  };

  const irAPagina = (index: number) => {
    if (sliderRef.current) {
      const clientWidth = sliderRef.current.clientWidth;
      sliderRef.current.scrollTo({
        left: index * clientWidth,
        behavior: 'smooth'
      });
      setPaginaActual(index);
    }
  };

  return (
    <section className="novedades-container">
      <div className="novedades-header">
        <div className="novedades-title">
          <BookOpen className="book-icon" size={24} />
          <h2>Novedades</h2>
        </div>
        <button className="btn-ver-mas">
          Ve más <span>›</span>
        </button>
      </div>

      <div className="novedades-divider" />

      <div className="novedades-carousel">
        <button 
          className="nav-arrow left" 
          onClick={() => scroll('left')} 
          aria-label="Anterior"
        >
          <ChevronLeft size={24} />
        </button>

        <div className="books-slider" ref={sliderRef}>
          {listaLibros.map((libro) => (
            <div key={libro.id} className="book-card">
              {libro.badge && <span className="book-badge">{libro.badge}</span>}

              <button 
                className={`btn-favorite ${favoritos.includes(libro.id) ? 'active' : ''}`}
                onClick={() => toggleFavorito(libro.id)}
                aria-label="Guardar en favoritos"
              >
                <Heart size={16} fill={favoritos.includes(libro.id) ? "#1e3a8a" : "none"} />
              </button>

              <div className="book-cover">
                <img src={libro.portada} alt={libro.titulo} />
              </div>

              <div className="book-details">
                <h3 className="book-title">{libro.titulo}</h3>
                <p className="book-author">{libro.autor}</p>

                <div className="price-section">
                  <span className="price-current">S/ {libro.precioActual.toFixed(2)}</span>
                  {libro.precioAnterior && (
                    <div className="discount-block">
                      <span className="price-old">S/ {libro.precioAnterior.toFixed(2)}</span>
                      <span className="discount-tag">-{libro.descuento}%</span>
                    </div>
                  )}
                </div>

                <button className="btn-add-cart">
                  Añadir al carrito
                </button>
              </div>
            </div>
          ))}
        </div>

        <button 
          className="nav-arrow right" 
          onClick={() => scroll('right')} 
          aria-label="Siguiente"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      <div className="dots-container">
        <span 
          className={`dot ${paginaActual === 0 ? 'active' : ''}`} 
          onClick={() => irAPagina(0)} 
        />
        <span 
          className={`dot ${paginaActual === 1 ? 'active' : ''}`} 
          onClick={() => irAPagina(1)} 
        />
      </div>
    </section>
  );
};

export default Novedades;