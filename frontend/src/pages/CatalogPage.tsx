import React from 'react';
import { useBooks } from '../hooks/useBooks';

export const CatalogPage: React.FC = () => {
  const { books, loading, error } = useBooks();

  if (loading) return <div>Cargando catálogo...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="catalog-container">
      <h1>Catálogo de Libros - Tiempo Oscuro</h1>
      <div className="books-grid">
        {books.map((book) => (
          <div key={book.id} className="book-card">
            <img 
              src={book.cover_url || '/placeholder-cover.jpg'} 
              alt={book.title} 
              className="book-cover"
            />
            <h3>{book.title}</h3>
            <p>Precio: S/ {book.price.toFixed(2)}</p>
            <p>Stock disponible: {book.stock}</p>
            {book.is_best_seller && (
              <span className="badge-best-seller">★ Más Vendido</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};