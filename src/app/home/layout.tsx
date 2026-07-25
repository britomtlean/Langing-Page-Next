import type { Metadata } from "next";
import ContextProvider from "@/context/ContextProvider";
//import { Inter, Geist } from "next/font/google";
import { Inter } from 'next/font/google';
import "../globals.css";
import { cn } from "@/lib/utils";
import { Button } from "@base-ui/react";
import { MenuIcon } from "lucide-react";

//const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: 'Colônia - Menu',
    description: 'Landing Page',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="pt-br" className={cn('font-sans')}>
          <body className={inter.className}>
              <header
                  className="w-full h-[12vh] bg-blue-800 relative pt-[1%]
                        flex justify-around lg:justify-center items-center lg:items-start"
              >
                  <h1 className="text-white text-xl font-sans font-bold lg:hidden">Faça o seu login</h1>
                  <Button className={`${'lg:hidden'}`}>Login</Button>

                  <nav
                      className="w-1/2 h-1/2 hidden
                                text-white font-bold text-2xl
                                lg:flex justify-around items-center"
                  >
                      <a href="/home">
                          <MenuIcon className="size-10" />
                      </a>
                      <a>Promoções</a>
                      <a target="_blank" href={'/catalogo'}>
                          Catálogo
                      </a>
                      <a>Minha conta</a>
                  </nav>
              </header>
              <ContextProvider>{children}</ContextProvider>
              <footer className="border lg:h-[15vh] bg-blue-800 w-full"></footer>
          </body>
      </html>
  );
}
