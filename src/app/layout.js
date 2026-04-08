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

export const metadata = {
  title: "Organicfy | Assessoria Estratégica para Crescimento Previsível",
  description: "A Organicfy é uma assessoria estratégica focada em crescimento previsível e sustentável. Tráfego pago, conteúdo, funil de vendas e estratégia personalizada desde 2019.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
