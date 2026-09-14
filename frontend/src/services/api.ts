const API_BASE_URL = 'http://127.0.0.1:8000';

// --- Tipos de Autenticación y Usuario ---
export interface User {
  id: string;
  email: string;
  role: 'admin' | 'supplier';
  company_name?: string;
}

export interface LoginResponse {
  access_token: string;
  user: User;
}

// --- Tipos para el modelo de Libros ---
export interface Book {
  id: string;
  title: string;
  price: number;
  stock: number;
  cover_url: string;
  is_best_seller: boolean;
  publishers?: { id: string; name: string };
  book_authors?: { authors: { id: string; name: string } }[];
  book_categories?: { categories: { id: string; name: string; slug: string } }[];
}

// --- Autenticación ---
export const loginUser = async (email: string, password: string): Promise<LoginResponse> => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Error al iniciar sesión');
  }

  return await response.json();
};

// --- Catálogo y Libros ---

// Obtener todos los libros del catálogo
export const fetchBooks = async (): Promise<Book[]> => {
  const response = await fetch(`${API_BASE_URL}/books/`);
  if (!response.ok) {
    throw new Error('Error al obtener la lista de libros');
  }
  return await response.json();
};

// Obtener el libro Best Seller actual
export const fetchBestSeller = async (): Promise<Book> => {
  const response = await fetch(`${API_BASE_URL}/books/best-seller`);
  if (!response.ok) {
    throw new Error('Error al obtener el libro más vendido');
  }
  return await response.json();
};

// Establecer el libro más vendido (Admin)
export const setBestSeller = async (bookId: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/admin/set-best-seller`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ book_id: bookId }),
  });
  if (!response.ok) {
    throw new Error('Error al actualizar el libro más vendido');
  }
};

export const fetchSupplierBooks = async (token: string): Promise<Book[]> => {
  const response = await fetch(`${API_BASE_URL}/books/supplier`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  
  if (!response.ok) {
    throw new Error('Error al obtener el catálogo del proveedor');
  }
  
  return await response.json();
};