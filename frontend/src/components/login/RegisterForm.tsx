import React, { useState } from 'react';

interface RegisterFormProps {
  onSwitchToLogin: () => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onSwitchToLogin }) => {
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [publishers, setPublishers] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
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