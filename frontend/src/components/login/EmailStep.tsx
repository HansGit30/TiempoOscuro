import React, { useState } from 'react';

interface EmailStepProps {
  onNext: (email: string) => void;
  onSwitchToRegister: () => void;
}

export const EmailStep: React.FC<EmailStepProps> = ({ onNext, onSwitchToRegister }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      onNext(email); // Pasa al siguiente paso (contraseña)
    }
  };

  return (
    <>
      <span className="step-tag">PASO 1 DE 2</span>
      <h1 className="form-title">INGRESA TU CORREO</h1>
      <div className="accent-bar"></div>

      <p className="form-description">
        Si tu correo es de administración o proveedor, pediremos la contraseña en el siguiente paso.
      </p>

      <form onSubmit={handleSubmit} className="login-form">
        <label htmlFor="email" className="input-label">CORREO</label>
        <input
          type="email"
          id="email"
          className="login-input"
          placeholder="nombre@empresa.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button type="submit" className="login-submit-btn" style={{ marginTop: '20px' }}>
          CONTINUAR <span className="arrow">→</span>
        </button>
      </form>

      <div className="form-footer">
        ¿No tienes cuenta?{' '}
        <button 
          type="button" 
          onClick={onSwitchToRegister} 
          style={{ background: 'none', border: 'none', color: '#00b4d8', cursor: 'pointer', fontWeight: 'bold' }}
        >
          Solicita tu acceso
        </button>
      </div>
    </>
  );
};