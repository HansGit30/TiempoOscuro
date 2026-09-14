import React, { useEffect, useState } from 'react';
import { fetchSupplierBooks, type Book } from '../../services/api';

export const MyBooks: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        setLoading(true);
        
        // Extraemos la sesión completa que guarda el login
        const userStr = localStorage.getItem('user');
        let token = localStorage.getItem('access_token') || localStorage.getItem('token');

        if (!token && userStr) {
          try {
            const userData = JSON.parse(userStr);
            // El backend FastAPI devuelve LoginResponse con { access_token, user }
            token = userData.access_token;
          } catch (e) {
            console.error('Error al parsear el usuario del localStorage', e);
          }
        }

        if (!token) {
          throw new Error('No se encontró una sesión activa.');
        }

        const data = await fetchSupplierBooks(token);
        setBooks(data);
      } catch (err: any) {
        console.error('Error al cargar libros:', err);
        setError(err.message || 'No se pudo cargar el catálogo de libros.');
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, []);

  if (loading) return <div style={{ padding: '20px' }}>Cargando catálogo...</div>;
  if (error) return <div style={{ padding: '20px', color: 'red' }}>{error}</div>;

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Mi Catálogo de Libros</h2>
        <button style={{
          backgroundColor: '#00e676',
          color: '#000',
          border: 'none',
          padding: '10px 16px',
          borderRadius: '6px',
          fontWeight: 'bold',
          cursor: 'pointer'
        }}>
          + Agregar Nuevo Libro
        </button>
      </div>

      {books.length === 0 ? (
        <p style={{ color: '#64748b' }}>Aún no tienes libros registrados en tu inventario.</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '20px' }}>
          {books.map((book) => (
            <div key={book.id} style={{
              backgroundColor: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              padding: '16px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
            }}>
              {book.cover_url && (
                <img 
                  src={book.cover_url} 
                  alt={book.title} 
                  style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '4px', marginBottom: '10px' }} 
                />
              )}
              <h4 style={{ margin: '0 0 6px 0', fontSize: '1rem', color: '#1e293b' }}>{book.title}</h4>
              <p style={{ margin: '0 0 4px 0', fontSize: '0.85rem', color: '#64748b' }}>
                Precio: $ {typeof book.price === 'number' ? book.price.toFixed(2) : book.price}
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px', alignItems: 'center' }}>
                <span style={{ fontSize: '0.80rem', backgroundColor: '#f1f5f9', padding: '4px 8px', borderRadius: '4px' }}>
                  Stock: {book.stock}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBooks;