import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { EmailStep } from '../components/login/EmailStep';
import { PasswordStep } from '../components/login/PasswordStep';
import { RegisterForm } from '../components/login/RegisterForm';
import '../components/login/Login.css';

export const Login: React.FC = () => {
  const [step, setStep] = useState<'email' | 'password' | 'register'>('email');
  const [userEmail, setUserEmail] = useState('');

  const handleNextStep = (email: string) => {
    setUserEmail(email);
    setStep('password');
  };

  return (
    <div className="login-wrapper">
      <div className="login-card-container">

        {/* Panel Izquierdo dinámico */}
        <div className="login-left-panel">
          <div className="left-panel-overlay">
            <Link to="/" className="back-home-btn">
              ← Volver al inicio
            </Link>
            {/* <div className="left-panel-header">
              <span className="brand-name">PORTAL TIEMPO OSCURO</span>
            </div>
            
            <div className="left-panel-content">
              <span className="subtitle">LIBRERÍA DIGITAL</span>
              <h2>{step === 'register' ? 'SOLICITUD DE PROVEEDOR' : 'ACCESO VERIFICADO'}</h2>
              <p>
                {step === 'register' 
                  ? 'Envía tus datos y las editoriales que representas para la evaluación del administrador.'
                  : 'Ingreso exclusivo para la administración y proveedores autorizados.'}
              </p>

              <ul className="login-features-list">
                <li>
                  <span className="icon">✉</span> Identificación por correo
                </li>
                <li>
                  <span className="icon">🔑</span> {step === 'register' ? 'Asignación de sellos editoriales' : 'Autenticación de proveedores y admin'}
                </li>
                <li>
                  <span className="icon">🛡</span> Verificación de estado de cuenta
                </li>
              </ul>
            </div> */}
          </div>
        </div>

        {/* Panel Derecho */}
        <div className="login-right-panel">

          <div className="form-container">
            {step === 'email' && (
              <EmailStep
                onNext={handleNextStep}
                onSwitchToRegister={() => setStep('register')}
              />
            )}

            {step === 'password' && (
              <PasswordStep
                email={userEmail}
                onBack={() => setStep('email')}
              />
            )}

            {step === 'register' && (
              <RegisterForm
                onSwitchToLogin={() => setStep('email')}
              />
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;