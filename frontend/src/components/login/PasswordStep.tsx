import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../services/api';

interface PasswordStepProps {
  email: string;
  onBack: () => void;
}

export const PasswordStep: React.FC<PasswordStepProps> = ({ email, onBack }) => {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      // 1. Petición al backend mediante FastAPI
      const data = await loginUser(email, password);

      // 2. Guardar token y datos del usuario
      localStorage.setItem('token', data.access_token);
      localStorage.setItem('user', JSON.stringify(data.user));

      // Imprimir para verificar en consola la estructura del usuario devuelto
      console.log('Login exitoso. Datos de usuario:', data.user);

      // 3. Redirección condicional según el rol exacto de la base de datos
      const userRole = data.user?.role;

      if (userRole === 'admin') {
        navigate('/dashboard', { replace: true });
      } else if (userRole === 'supplier') {
        navigate('/dashboard', { replace: true });
      } else {
        // Ruta de fallback
        navigate('/', { replace: true });
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Credenciales inválidas o error de conexión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button 
        type="button" 
        onClick={onBack} 
        style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', marginBottom: '12px', padding: 0 }}
      >
        ← Cambiar correo
      </button>

      <span className="step-tag">PASO 2 DE 2</span>
      <h1 className="form-title">INGRESA TU CONTRASEÑA</h1>
      <div className="accent-bar"></div>

      <p className="form-description">
        Ingresando como: <strong>{email}</strong>
      </p>

      {errorMessage && (
        <div style={{
          padding: '10px 14px',
          marginBottom: '16px',
          borderRadius: '6px',
          backgroundColor: '#fef2f2',
          color: '#991b1b',
          border: '1px solid #fecaca',
          fontSize: '0.875rem'
        }}>
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="login-form">
        <label htmlFor="password" className="input-label">CONTRASEÑA</label>
        <input
          type="password"
          id="password"
          className="login-input"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoFocus
        />

        <button type="submit" className="login-submit-btn" style={{ marginTop: '20px' }} disabled={loading}>
          {loading ? 'VERIFICANDO...' : 'INICIAR SESIÓN'} <span className="arrow">→</span>
        </button>
      </form>
    </>
  );
};