'use client';

import Link from 'next/link';
import styles from './landing.module.css';

export default function LandingPage() {
  return (
    <div className={styles.container}>
      {/* Header / Navbar */}
      <nav className={styles.nav}>
        <div className={styles.logo}>
          <img src="/logo.jpg" alt="Organicfy Logo" />
        </div>
        <div className={styles.navLinks}>
          <a href="#funcionalidades">Funcionalidades</a>
          <a href="#como-funciona">Como Funciona</a>
          <a href="#planos">Planos</a>
        </div>
        <Link href="/login" className={styles.loginBtn}>
          Área do Cliente
        </Link>
      </nav>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.badge}>CONTROLE FINANCEIRO INTELIGENTE</span>
          <h1>Chega de terminar o mês <span>sem saber pra onde foi seu dinheiro.</span></h1>
          <p>O portal de gestão financeira da Organicfy. Tudo o que você precisa para controlar entradas, saídas e previsões em um só lugar.</p>
          <div className={styles.heroActions}>
            <Link href="/login" className={styles.ctaBtn}>
              Começar Agora
            </Link>
            <button className={styles.secondaryBtn}>Ver Demonstração</button>
          </div>
        </div>
        <div className={styles.heroImage}>
          <div className={styles.dashboardMockup}>
             <img src="/dashboard-preview.png" alt="Dashboard Preview" />
             <div className={styles.floatingCard}>
                <span>Receita Total</span>
                <strong>R$ 12.700,00</strong>
             </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <div className={styles.stats}>
        <div className={styles.statItem}>
          <strong>+10.000</strong>
          <span>Clientes Atendidos</span>
        </div>
        <div className={styles.statItem}>
          <strong>R$ 2M+</strong>
          <span>Gerenciados</span>
        </div>
        <div className={styles.statItem}>
          <strong>50.000+</strong>
          <span>Transações</span>
        </div>
        <div className={styles.statItem}>
          <strong>4.9/5</strong>
          <span>Satisfação</span>
        </div>
      </div>

      {/* Features Section */}
      <section id="funcionalidades" className={styles.features}>
        <h2>Funcionalidades que fazem a diferença</h2>
        <div className={styles.featureGrid}>
          <div className={styles.featureCard}>
            <div className={styles.icon}>💰</div>
            <h3>Fluxo de Caixa Real</h3>
            <p>Acompanhe cada centavo que entra e sai da sua empresa em tempo real.</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.icon}>📊</div>
            <h3>Relatórios Premium</h3>
            <p>Gráficos intuitivos para você tomar decisões baseadas em dados, não em palpites.</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.icon}>🔗</div>
            <h3>Integração ClickUp</h3>
            <p>Seus dados financeiros sincronizados automaticamente com suas tarefas.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <img src="/logo.jpg" alt="Organicfy Logo" className={styles.footerLogo} />
          <p>&copy; 2026 Organicfy Oficial. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
