'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from '../login/login.module.css';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('Se o e-mail estiver cadastrado, você receberá uma senha temporária em instantes.');
      } else {
        setError(data.error || 'Erro ao processar solicitação.');
      }
    } catch (err) {
      setError('Erro de conexão. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.glassCard}>
        <div className={styles.logo}>
          <img src="/logo.jpg" alt="Organicfy Logo" className={styles.logoImg} />
        </div>
        
        <h2>Recuperar Senha</h2>
        <p className={styles.subtitle}>Digite seu e-mail para receber uma senha temporária</p>

        {!message ? (
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <label htmlFor="email">E-mail</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                required
              />
            </div>

            {error && <div className={styles.error}>{error}</div>}

            <button type="submit" className={styles.loginBtn} disabled={loading}>
              {loading ? 'Enviando...' : 'Enviar Senha Temporária'}
            </button>
          </form>
        ) : (
          <div className={styles.successMessage}>
            <p>{message}</p>
          </div>
        )}

        <div style={{ marginTop: '1.5rem' }}>
          <Link href="/login" className={styles.forgotLink}>Voltar para o Login</Link>
        </div>

        <footer className={styles.footer}>
          &copy; 2026 Organicfy Oficial
        </footer>
      </div>
    </div>
  );
}
