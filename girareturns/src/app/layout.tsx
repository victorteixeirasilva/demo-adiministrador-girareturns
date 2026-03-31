import type { Metadata, Viewport } from "next"; // Importação corrigida
import { Geist, Geist_Mono } from "next/font/google";
import  DynamicManifest  from "./PwaDispatcher";
import "./globals.scss";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GiraReturns — Demo Live View",
  description: "Demonstração interativa do painel administrativo (dados fictícios, sem API real).",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "GiraReturns Demo",
  },
};

export const viewport: Viewport = {
  themeColor: "#22C55E",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false, // Desativa o gesto de pinça e zoom manual
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="pt-br">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <DynamicManifest /> 
        {children}
      </body>
    </html>
  );
}