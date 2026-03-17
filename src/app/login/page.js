'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import styles from './login.module.css';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await signIn('credentials', {
        username,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError('Usuário ou senha inválidos');
      } else {
        router.push('/');
        router.refresh();
      }
    } catch (err) {
      setError('Erro ao tentar entrar. Tente novamente.');
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
        
        <h2>Portal do Administrador</h2>
        <p className={styles.subtitle}>Acesse o painel financeiro exclusivo</p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="username">Usuário</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Digite seu usuário"
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <div className={styles.labelRow}>
              <label htmlFor="password">Senha</label>
              <a href="/forgot-password" className={styles.forgotLink}>Esqueceu a senha?</a>
            </div>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          {error && <div className={styles.error}>{error}</div>}

          <button type="submit" className={styles.loginBtn} disabled={loading}>
            {loading ? 'Entrando...' : 'Acessar Painel'}
          </button>

          <div className={styles.divider}>
            <span>ou</span>
          </div>

          <button 
            type="button" 
            className={styles.googleBtn}
            onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
          >
            <img src="https://authjs.dev/img/providers/google.svg" alt="Google" width="20" />
            Entrar com Google
          </button>
        </form>

        <footer className={styles.footer}>
          &copy; 2026 Organicfy Oficial
        </footer>
      </div>
    </div>
  );
}
