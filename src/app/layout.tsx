import type { Metadata } from "next";
import ContextProvider from "@/context/ContextProvider";
//import { Inter, Geist } from "next/font/google";
import { Inter } from 'next/font/google';
import "./globals.css";
import { cn } from "@/lib/utils";

//const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: 'Colônia - Menu',
    description:
        'Loja de materiais de construção em Guaratiba. Ferramentas, tintas, elétrica, hidráulica, ferragens e muito mais.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="pt-br" className={cn('font-sans')}>
          <body className={inter.className}>
              <ContextProvider>{children}</ContextProvider>
          </body>
      </html>
  );
}
