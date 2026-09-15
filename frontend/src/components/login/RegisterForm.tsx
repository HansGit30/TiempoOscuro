import React, { useState } from 'react';

const API_BASE_URL = 'https://backtiempooscuro.onrender.com';

interface RegisterFormProps {
  onSwitchToLogin: () => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onSwitchToLogin }) => {
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [publishers, setPublishers] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const response = await fetch(`${API_BASE_URL}/auth/request-supplier`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          company_name: company,
          email: email,
          publishers_handled: publishers,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Error al enviar la solicitud');
      }

      setSubmitted(true);
    } catch (err: any) {
      setErrorMsg(err.message || 'Ocurrió un error inesperado');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div style={{ textAlign: 'left' }}>
        <span className="step-tag" style={{ color: '#00e676' }}>SOLICITUD REGISTRADA</span>
        <h1 className="form-title">¡SOLICITUD ENVIADA!</h1>
        <div className="accent-bar" style={{ backgroundColor: '#00e676' }}></div>

        <p className="form-description" style={{ marginTop: '16px', lineHeight: '1.6' }}>
          Hemos recibido la solicitud para <strong>{email}</strong>. 
          Revisaremos la información de tus editoriales (<em>{publishers}</em>).
        </p>
        <p className="form-description" style={{ marginTop: '10px', lineHeight: '1.6' }}>
          Te avisaremos por correo cuando el administrador apruebe tu acceso.
        </p>

        <button 
          type="button" 
          onClick={onSwitchToLogin} 
          className="login-submit-btn" 
          style={{ marginTop: '24px', width: '100%' }}
        >
          VOLVER AL LOGIN
        </button>
      </div>
    );
  }

  return (
    <>
      <span className="step-tag">REGISTRO DE PROVEEDORES</span>
      <h1 className="form-title">SOLICITA TU ACCESO</h1>
      <div className="accent-bar"></div>

      <p className="form-description">
        Ingresa el correo de tu empresa y las editoriales que distribuyes para solicitar el alta.
      </p>

      {errorMsg && (
        <div style={{ color: '#ff5252', marginBottom: '12px', fontSize: '14px', fontWeight: 'bold' }}>
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="login-form">
        <label htmlFor="company" className="input-label">NOMBRE DE LA EMPRESA</label>
        <input
          type="text"
          id="company"
          className="login-input"
          placeholder="Ej. Distribuidora Lima S.A.C."
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          required
        />

        <label htmlFor="regEmail" className="input-label" style={{ marginTop: '14px' }}>CORREO ELECTRÓNICO</label>
        <input
          type="email"
          id="regEmail"
          className="login-input"
          placeholder="contacto@empresa.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="publishers" className="input-label" style={{ marginTop: '14px' }}>EDITORIALES QUE MANEJA</label>
        <input
          type="text"
          id="publishers"
          className="login-input"
          placeholder="Ej. Editorial Norma, Panini, Bruño"
          value={publishers}
          onChange={(e) => setPublishers(e.target.value)}
          required
        />

        <button type="submit" className="login-submit-btn" style={{ marginTop: '20px' }} disabled={loading}>
          {loading ? 'ENVIANDO...' : 'ENVIAR SOLICITUD'} <span className="arrow">→</span>
        </button>
      </form>

      <div className="form-footer">
        ¿Ya tienes cuenta?{' '}
        <button 
          type="button" 
          onClick={onSwitchToLogin} 
          style={{ background: 'none', border: 'none', color: '#00b4d8', cursor: 'pointer', fontWeight: 'bold' }}
        >
          Inicia sesión
        </button>
      </div>
    </>
  );
};