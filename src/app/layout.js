import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const BASE_URL = "https://organicfyoficial.com.br";

export const metadata = {
  metadataBase: new URL(BASE_URL),

  /* ── BÁSICO ── */
  title: {
    default: "Organicfy | Assessoria de Marketing Digital e Tráfego Pago",
    template: "%s | Organicfy",
  },
  description:
    "A Organicfy é uma assessoria estratégica de marketing digital. Tráfego pago no Meta Ads e Google Ads, produção de conteúdo, funil de vendas e estratégia personalizada. Desde 2019 gerando mais de R$ 2 milhões em vendas para clientes.",
  keywords: [
    "assessoria de marketing digital",
    "agência de marketing digital",
    "tráfego pago",
    "Meta Ads",
    "Google Ads",
    "gestor de tráfego",
    "marketing digital para empresas",
    "aumentar vendas online",
    "funil de vendas",
    "gestão de redes sociais",
    "produção de conteúdo",
    "assessoria estratégica",
    "crescimento previsível",
    "marketing digital Brasil",
    "organicfy",
    "organicfy oficial",
    "agência de tráfego pago",
    "CRM marketing",
    "anúncios online",
    "social media",
  ],
  authors: [{ name: "Organicfy", url: BASE_URL }],
  creator: "Organicfy",
  publisher: "Organicfy",
  category: "Marketing Digital",

  /* ── INDEXAÇÃO ── */
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  /* ── CANONICAL ── */
  alternates: {
    canonical: BASE_URL,
    languages: {
      "pt-BR": BASE_URL,
    },
  },

  /* ── OPEN GRAPH (Facebook, WhatsApp, LinkedIn) ── */
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: BASE_URL,
    siteName: "Organicfy",
    title: "Organicfy | Assessoria de Marketing Digital e Tráfego Pago",
    description:
      "Somos uma assessoria estratégica focada em crescimento previsível. Tráfego pago, conteúdo e estratégia personalizada. Desde 2019 gerando +R$ 2 milhões em vendas.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Organicfy — Assessoria Estratégica de Marketing Digital",
        type: "image/jpeg",
      },
    ],
  },

  /* ── TWITTER / X ── */
  twitter: {
    card: "summary_large_image",
    title: "Organicfy | Assessoria de Marketing Digital e Tráfego Pago",
    description:
      "Assessoria estratégica focada em crescimento previsível. Tráfego pago, conteúdo e estratégia desde 2019.",
    images: ["/og-image.jpg"],
    creator: "@organicfyoficial",
  },

  /* ── VERIFICAÇÃO (adicione os códigos quando tiver acesso) ── */
  verification: {
    google: "COLE_SEU_CODIGO_GOOGLE_SEARCH_CONSOLE_AQUI",
  },

  /* ── OUTROS ── */
  applicationName: "Organicfy",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
