'use client';

import Link from 'next/link';
import { useState } from 'react';
import styles from './landing.module.css';

const WPP = 'https://wa.me/5537999545539';

const schemaOrg = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://organicfyoficial.com.br/#organization",
      "name": "Organicfy",
      "alternateName": "Organicfy Oficial",
      "url": "https://organicfyoficial.com.br",
      "logo": {
        "@type": "ImageObject",
        "url": "https://organicfyoficial.com.br/logo.jpg",
        "width": 400,
        "height": 400,
      },
      "description": "Assessoria estratégica de marketing digital focada em crescimento previsível e sustentável. Tráfego pago, conteúdo, funil de vendas e estratégia personalizada desde 2019.",
      "foundingDate": "2019",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+55-37-99954-5539",
        "contactType": "customer service",
        "availableLanguage": "Portuguese",
        "areaServed": "BR",
      },
      "sameAs": [
        "https://instagram.com/organicfyoficial",
        "https://wa.me/5537999545539",
      ],
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://organicfyoficial.com.br/#localbusiness",
      "name": "Organicfy",
      "description": "Assessoria estratégica de marketing digital. Tráfego pago, conteúdo, funil de vendas e crescimento previsível desde 2019.",
      "url": "https://organicfyoficial.com.br",
      "telephone": "+55-37-99954-5539",
      "priceRange": "$$",
      "currenciesAccepted": "BRL",
      "paymentAccepted": "PIX, Transferência Bancária",
      "areaServed": {
        "@type": "Country",
        "name": "Brasil",
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Serviços de Marketing Digital",
        "itemListElement": [
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Tráfego Pago - Meta Ads e Google Ads" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Produção de Conteúdo Estratégico" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Gestão de Redes Sociais" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Estruturação de Funil de Vendas" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "CRM e Processo Comercial" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Estratégia de Marketing e Vendas" } },
        ],
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://organicfyoficial.com.br/#website",
      "url": "https://organicfyoficial.com.br",
      "name": "Organicfy",
      "description": "Assessoria estratégica de marketing digital para crescimento previsível e sustentável",
      "publisher": { "@id": "https://organicfyoficial.com.br/#organization" },
      "inLanguage": "pt-BR",
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "A Organicfy é só mais uma agência digital?",
          "acceptedAnswer": { "@type": "Answer", "text": "Não. Somos uma assessoria estratégica. Antes de qualquer anúncio ou post, diagnosticamos seu negócio e criamos um plano sob medida. Não vendemos pacotes prontos." },
        },
        {
          "@type": "Question",
          "name": "Quanto tempo leva para ver resultados?",
          "acceptedAnswer": { "@type": "Answer", "text": "Com estratégia bem estruturada, a maioria dos clientes começa a ver resultados entre 30 e 60 dias." },
        },
        {
          "@type": "Question",
          "name": "Quais serviços a Organicfy oferece?",
          "acceptedAnswer": { "@type": "Answer", "text": "Tráfego pago (Meta Ads e Google Ads), produção de conteúdo, social media, estratégia de marketing e vendas, estruturação de funil, CRM e processo comercial." },
        },
        {
          "@type": "Question",
          "name": "Como funciona o diagnóstico gratuito?",
          "acceptedAnswer": { "@type": "Answer", "text": "É uma conversa estratégica onde analisamos seu negócio, identificamos gargalos e oportunidades, e mostramos um caminho claro de crescimento. Sem compromisso." },
        },
      ],
    },
  ],
};

export default function LandingPage() {
  const [formData, setFormData] = useState({
    nome: '', email: '', telefone: '', empresa: '', orcamento: '', descricao: '',
  });
  const [openFaq, setOpenFaq] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const msg = `Olá! Vim pelo site da Organicfy e quero um diagnóstico gratuito.\n\nNome: ${formData.nome}\nEmpresa: ${formData.empresa}\nWhatsApp: ${formData.telefone}\nInvestimento: ${formData.orcamento}\n\nSobre o negócio: ${formData.descricao}`;
    window.open(`${WPP}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const set = (field) => (e) => setFormData({ ...formData, [field]: e.target.value });

  const benefits = [
    { icon: '📈', title: 'Tráfego Pago de Alta Performance', desc: 'Anúncios estratégicos no Meta Ads e Google Ads que atraem clientes prontos para comprar, não só curtidas.' },
    { icon: '🎯', title: 'Estratégia Personalizada', desc: 'Nada de pacote genérico. Cada plano é construído do zero, pensado para o momento e mercado do seu negócio.' },
    { icon: '🔄', title: 'Funil de Vendas Estruturado', desc: 'Da atração ao fechamento, cada etapa do processo pensada para converter mais com menos desperdício.' },
    { icon: '📱', title: 'Conteúdo que Gera Autoridade', desc: 'Produção de conteúdo estratégico que posiciona sua marca, cria conexão e converte seguidores em clientes.' },
    { icon: '🤝', title: 'CRM e Processo Comercial', desc: 'Estruturamos seu processo de vendas para que nenhum lead seja perdido e sua equipe feche mais.' },
    { icon: '📊', title: 'Crescimento Previsível', desc: 'Métricas, dados e acompanhamento constante para você ter clareza de onde está e para onde vai.' },
  ];

  const whyUs = [
    { title: 'Diagnóstico Antes de Qualquer Ação', desc: 'Antes de criar um anúncio sequer, entendemos seu negócio, público, mercado e oportunidades reais.' },
    { title: 'Pensamos, Não Só Executamos', desc: 'Nossa diferença está na estratégia. Qualquer um faz post — poucos constroem crescimento de verdade.' },
    { title: 'Crescimento Orgânico e Sustentável', desc: 'Não acreditamos em atalhos. Construímos raízes sólidas que geram resultado consistente a longo prazo.' },
    { title: 'Acompanhamento Real e Constante', desc: 'Você não fica no escuro. Relatórios claros, reuniões periódicas e métricas que fazem sentido.' },
    { title: 'Time Especializado no Seu Crescimento', desc: 'Especialistas em tráfego, conteúdo, estratégia e vendas trabalhando de forma integrada pelo seu resultado.' },
  ];

  const steps = [
    { num: '01', title: 'DIAGNÓSTICO ESTRATÉGICO', desc: 'Analisamos profundamente seu negócio, posicionamento, estrutura atual, oportunidades e gargalos.' },
    { num: '02', title: 'PLANO DE AÇÃO', desc: 'Criamos uma estratégia personalizada com metas claras, canais certos e um roadmap de crescimento.' },
    { num: '03', title: 'EXECUÇÃO', desc: 'Implementamos tráfego pago, conteúdo, funil e processos comerciais com acompanhamento próximo.' },
    { num: '04', title: 'OTIMIZAÇÃO', desc: 'Medimos, analisamos os dados e otimizamos continuamente para maximizar seus resultados.' },
  ];

  const platforms = [
    { name: 'Meta Ads', stat: '+140 Milhões', desc: 'de brasileiros ativos no Facebook e Instagram' },
    { name: 'Google Ads', stat: '+6 Bilhões', desc: 'de buscas por dia — seu cliente está lá' },
    { name: 'YouTube', stat: '+127 Milhões', desc: 'de usuários mensais ativos no Brasil' },
    { name: 'TikTok Ads', stat: '+90 Milhões', desc: 'de brasileiros alcançáveis na plataforma' },
  ];

  const faqs = [
    { q: 'A Organicfy é só mais uma agência digital?', a: 'Não. Somos uma assessoria estratégica. A diferença está em pensar antes de executar. Antes de qualquer anúncio ou post, diagnosticamos seu negócio e criamos um plano sob medida. Não vendemos pacotes prontos.' },
    { q: 'Quanto tempo leva para ver resultados?', a: 'Depende do estágio e do mercado do seu negócio. Com estratégia bem estruturada, a maioria dos clientes começa a ver resultados entre 30 e 60 dias. Crescimento real leva método, não milagre.' },
    { q: 'Quais serviços a Organicfy oferece?', a: 'Tráfego pago (Meta Ads e Google Ads), produção de conteúdo, social media, estratégia de marketing e vendas, estruturação de funil, CRM, processo comercial e treinamentos.' },
    { q: 'Como funciona o diagnóstico gratuito?', a: 'É uma conversa estratégica pelo WhatsApp ou videochamada onde analisamos seu negócio, identificamos os maiores gargalos e oportunidades, e mostramos um caminho claro de crescimento. Sem compromisso.' },
    { q: 'A Organicfy atende qualquer tipo de negócio?', a: 'Atendemos empresas e empreendedores que querem crescer no digital com estratégia. Se você tem produto ou serviço e quer mais vendas com previsibilidade, a Organicfy pode te ajudar.' },
    { q: 'Qual é o investimento mínimo para trabalhar com vocês?', a: 'Isso varia conforme o escopo de trabalho. No diagnóstico gratuito, entendemos sua situação e apresentamos as opções mais adequadas para o momento do seu negócio.' },
  ];

  return (
    <div className={styles.container}>

      {/* JSON-LD Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
      />

      {/* WhatsApp Flutuante */}
      <a href={WPP} target="_blank" rel="noopener noreferrer" className={styles.wppFloat} aria-label="Falar no WhatsApp">
        <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>

      {/* NAV */}
      <nav className={styles.nav}>
        <div className={styles.logo}>
          <img src="/logo.jpg" alt="Organicfy" />
        </div>
        <div className={styles.navLinks}>
          <a href="#servicos">Serviços</a>
          <a href="#metodologia">Metodologia</a>
          <a href="#resultados">Resultados</a>
          <a href="#contato">Contato</a>
        </div>
        <a href={WPP} target="_blank" rel="noopener noreferrer" className={styles.navCta}>
          QUERO CRESCER
        </a>
      </nav>

      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <span className={styles.badge}>🌱 ASSESSORIA ESTRATÉGICA DESDE 2019</span>
          <h1>
            SEU NEGÓCIO TEM POTENCIAL.<br />
            <span>A ORGANICFY TEM A ESTRATÉGIA.</span>
          </h1>
          <p>
            Somos uma assessoria estratégica focada em crescimento previsível e sustentável.
            Não fazemos marketing genérico — construímos raízes sólidas para o seu negócio crescer de verdade.
          </p>
          <a href={WPP} target="_blank" rel="noopener noreferrer" className={styles.ctaBtn}>
            QUERO UM DIAGNÓSTICO GRATUITO
          </a>
        </div>

        <div className={styles.heroStats}>
          <div className={styles.heroStatCard}>
            <strong>+R$ 2MI</strong>
            <span>em vendas geradas</span>
          </div>
          <div className={styles.heroStatCard}>
            <strong>+5 Anos</strong>
            <span>de mercado</span>
          </div>
          <div className={styles.heroStatCard}>
            <strong>100%</strong>
            <span>foco em resultado</span>
          </div>
          <div className={styles.heroStatCard}>
            <strong>2019</strong>
            <span>fundada com propósito</span>
          </div>
        </div>
      </section>

      {/* BENEFÍCIOS */}
      <section id="servicos" className={styles.section}>
        <div className={styles.sectionInner}>
          <span className={styles.sectionLabel}>O QUE VOCÊ VAI TER</span>
          <h2>ANUNCIANDO E CRESCENDO DA FORMA CERTA, SEU NEGÓCIO VAI TER</h2>
          <div className={styles.benefitsGrid}>
            {benefits.map((b, i) => (
              <div key={i} className={styles.benefitCard}>
                <div className={styles.benefitIcon}>{b.icon}</div>
                <h3>{b.title}</h3>
                <p>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BARRA CTA */}
      <section className={styles.ctaBanner}>
        <div className={styles.ctaBannerInner}>
          <h2>VENDA SEU PRODUTO MAIS VEZES, PARA MAIS PESSOAS E POR UM MAIOR VALOR</h2>
          <a href={WPP} target="_blank" rel="noopener noreferrer" className={styles.ctaBtnWhite}>
            QUERO SAIR DO AMADORISMO
          </a>
        </div>
      </section>

      {/* POR QUE ORGANICFY */}
      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <span className={styles.sectionLabel}>NOSSOS DIFERENCIAIS</span>
          <h2>Por que escolher a Organicfy?</h2>
          <p className={styles.sectionSubtitle}>
            Nossa estratégia já gerou <strong>mais de R$ 2 Milhões em vendas</strong> para clientes e parceiros
          </p>
          <div className={styles.whyGrid}>
            {whyUs.map((w, i) => (
              <div key={i} className={styles.whyCard}>
                <span className={styles.whyNum}>0{i + 1}</span>
                <h3>{w.title}</h3>
                <p>{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* METODOLOGIA */}
      <section id="metodologia" className={styles.sectionDark}>
        <div className={styles.sectionInner}>
          <span className={styles.sectionLabel}>NOSSA METODOLOGIA</span>
          <h2>VEJA O PASSO A PASSO PARA TRABALHARMOS JUNTOS</h2>
          <div className={styles.stepsGrid}>
            {steps.map((s, i) => (
              <div key={i} className={styles.stepCard}>
                <div className={styles.stepNum}>{s.num}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RESULTADOS */}
      <section id="resultados" className={styles.section}>
        <div className={styles.sectionInner}>
          <span className={styles.sectionLabel}>NÚMEROS REAIS</span>
          <h2>AJUDAMOS NEGÓCIOS A CRESCEREM DE VERDADE</h2>
          <div className={styles.resultsGrid}>
            <div className={styles.resultCard}>
              <strong>+R$ 2.000.000</strong>
              <span>em vendas geradas para clientes e parceiros</span>
            </div>
            <div className={styles.resultCard}>
              <strong>+5 Anos</strong>
              <span>de experiência e aprendizado no mercado digital</span>
            </div>
            <div className={styles.resultCard}>
              <strong>Desde 2019</strong>
              <span>construindo crescimento real e sustentável</span>
            </div>
          </div>
        </div>
      </section>

      {/* OPORTUNIDADE */}
      <section className={styles.sectionGreen}>
        <div className={styles.sectionInner}>
          <h2>VOCÊ ESTÁ DEIXANDO MUITO DINHEIRO NA MESA SE AINDA NÃO ANUNCIA NESSAS PLATAFORMAS</h2>
          <div className={styles.platformsGrid}>
            {platforms.map((p, i) => (
              <div key={i} className={styles.platformCard}>
                <span className={styles.platformName}>{p.name}</span>
                <strong>{p.stat}</strong>
                <p>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOBRE */}
      <section className={styles.section}>
        <div className={styles.aboutInner}>
          <div className={styles.aboutText}>
            <span className={styles.sectionLabel}>NOSSA FILOSOFIA</span>
            <h2>Crescimento que tem raiz, não voo de galinha</h2>
            <p>
              A Organicfy foi fundada em 2019 com um propósito claro: ajudar donos de negócio a transformar
              suas ideias em resultados financeiros reais, com previsibilidade.
            </p>
            <p>
              Enquanto a maioria das agências entrega execução, nós entregamos estratégia. Antes de qualquer
              ação, diagnosticamos seu negócio, identificamos gargalos e oportunidades, e construímos um
              plano personalizado de crescimento.
            </p>
            <p>
              Nosso posicionamento é claro: não acreditamos em crescimento rápido e desestruturado.
              Acreditamos em crescimento sólido, estratégico e sustentável — como uma planta que tem raízes
              fortes antes de crescer alto.
            </p>
            <a href={WPP} target="_blank" rel="noopener noreferrer" className={styles.ctaBtn}>
              CONHECER A ORGANICFY
            </a>
          </div>
          <div className={styles.aboutCards}>
            <div className={styles.aboutCard}>
              <span>🌱</span>
              <strong>Semente</strong>
              <p>Sua ideia, seu negócio</p>
            </div>
            <div className={styles.aboutCard}>
              <span>🌿</span>
              <strong>Raiz</strong>
              <p>Nossa estratégia</p>
            </div>
            <div className={styles.aboutCard}>
              <span>🌾</span>
              <strong>Cultivo</strong>
              <p>Execução constante</p>
            </div>
            <div className={styles.aboutCard}>
              <span>🌳</span>
              <strong>Colheita</strong>
              <p>Seu faturamento crescendo</p>
            </div>
          </div>
        </div>
      </section>

      {/* FORMULÁRIO */}
      <section id="contato" className={styles.sectionDark}>
        <div className={styles.sectionInner}>
          <span className={styles.sectionLabel}>FALE CONOSCO</span>
          <h2>QUE TAL UM DIAGNÓSTICO GRATUITO PARA ALAVANCAR SEU NEGÓCIO?</h2>
          <p className={styles.sectionSubtitle}>Sem compromisso. Sem enrolação. Só estratégia real.</p>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formRow}>
              <input type="text" placeholder="Seu nome completo *" required value={formData.nome} onChange={set('nome')} />
              <input type="email" placeholder="Seu melhor e-mail *" required value={formData.email} onChange={set('email')} />
            </div>
            <div className={styles.formRow}>
              <input type="tel" placeholder="WhatsApp com DDD *" required value={formData.telefone} onChange={set('telefone')} />
              <input type="text" placeholder="Nome da sua empresa" value={formData.empresa} onChange={set('empresa')} />
            </div>
            <select value={formData.orcamento} onChange={set('orcamento')}>
              <option value="">Investimento mensal em marketing</option>
              <option>Ainda não invisto em marketing</option>
              <option>Até R$ 1.000/mês</option>
              <option>R$ 1.000 – R$ 3.000/mês</option>
              <option>R$ 3.000 – R$ 5.000/mês</option>
              <option>R$ 5.000 – R$ 10.000/mês</option>
              <option>Acima de R$ 10.000/mês</option>
            </select>
            <textarea
              placeholder="Me conta sobre seu negócio e seu maior desafio hoje..."
              rows={5}
              value={formData.descricao}
              onChange={set('descricao')}
            />
            <button type="submit" className={styles.ctaBtnFull}>
              QUERO MEU DIAGNÓSTICO GRATUITO →
            </button>
          </form>
        </div>
      </section>

      {/* FAQ */}
      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <span className={styles.sectionLabel}>DÚVIDAS FREQUENTES</span>
          <h2>PERGUNTAS FREQUENTES</h2>
          <div className={styles.faqList}>
            {faqs.map((f, i) => (
              <div
                key={i}
                className={`${styles.faqItem} ${openFaq === i ? styles.faqOpen : ''}`}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <div className={styles.faqQuestion}>
                  <span>{f.q}</span>
                  <span className={styles.faqIcon}>{openFaq === i ? '−' : '+'}</span>
                </div>
                {openFaq === i && <p className={styles.faqAnswer}>{f.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className={styles.finalCta}>
        <div className={styles.sectionInner}>
          <h2>PRONTO PARA CRESCER COM ESTRATÉGIA?</h2>
          <p>Fale agora com um especialista da Organicfy e dê o próximo passo rumo ao crescimento real e previsível.</p>
          <a href={WPP} target="_blank" rel="noopener noreferrer" className={styles.ctaBtnLarge}>
            FALAR COM A ORGANICFY AGORA
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <img src="/logo.jpg" alt="Organicfy" className={styles.footerLogo} />
          <p className={styles.footerTagline}>Assessoria Estratégica para Crescimento Previsível e Sustentável</p>
          <div className={styles.footerLinks}>
            <a href="https://instagram.com/organicfyoficial" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href={WPP} target="_blank" rel="noopener noreferrer">WhatsApp</a>
            <Link href="/login">Área do Cliente</Link>
          </div>
          <p className={styles.footerCopy}>© {new Date().getFullYear()} Organicfy Oficial. Todos os direitos reservados.</p>
        </div>
      </footer>

    </div>
  );
}
