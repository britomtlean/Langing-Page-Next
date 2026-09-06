import type { Metadata } from "next";
import ContextProvider from "@/context/ContextProvider";
import { Inter } from 'next/font/google';
import "../../globals.css";
import { cn } from "@/lib/utils";
import { Button } from "@base-ui/react";
import { HomeIcon } from "lucide-react";
import prisma from "@/app/_db/prisma";
import { Usuarios } from "@prisma/client";
import { ProdutoDB } from "@/Types/Types";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: 'Colônia - Menu',
    description:
        'Loja de materiais de construção em Guaratiba. Ferramentas, tintas, elétrica, hidráulica, ferragens e muito mais.',
};

export default async function RootLayout({ children, params }: { children: React.ReactNode; params: { id: string } }) {

    const { id } = await params;
    const login: Usuarios | null = await prisma.usuarios.findUnique({ where: { user: id } });
    const produtos: ProdutoDB[] | null = await prisma.produtos.findMany({
        where: {
            //disponibilidade: true,
            login: id,
        },
        select: {
            id: true,
            categoria: true,
            descricao: true,
            imagem: true,
            nome: true,
            disponibilidade: true,
            valor: true,
        },
    });

    if (!login){
        return (
            <div className="h-screen w-full flex justify-center items-center font-mono font-bold text-4xl bg-white">
                Pagina não encontrada {"=("}
            </div>
        );
    }

    return (
        <html lang="pt-br" className={cn('font-sans')}>
            <body className={inter.className}>
                <header
                    className="w-full min-h-[15vh] bg-blue-800 relative pt-[3%]
                        flex justify-around lg:justify-center items-center lg:items-start"
                >
                    <h1 className="text-white text-xl font-sans font-bold lg:hidden">Faça o seu login</h1>
                    <Button className={`${'lg:hidden'}`}>Login</Button>

                    <nav
                        className="w-3/4 h-1/2 hidden
                                text-white font-bold text-2xl
                                lg:flex justify-around items-center gap-8 xl:w-1/2"
                    >
                        <a href={"/"+login.user+"/catalogo"}>
                            <HomeIcon className="size-10" />
                        </a>

                        <a>Promoções</a>

                        <a target="_blank" href={'/produtos'}>
                            Catálogo
                        </a>
                        <a>Minha conta</a>
                        <a>Sobre</a>
                    </nav>
                </header>



                <ContextProvider dados={login} produtos={produtos}>
                    <div className="lg:min-h-[100vh] bg-slate-100">{children}</div>
                </ContextProvider>






                <footer className="bg-blue-900 text-white">
                    <div className="max-w-7xl mx-auto px-6 py-12 grid gap-10 md:grid-cols-3">
                        {/* Empresa */}
                        <section>
                            <h2 className="text-2xl font-bold mb-4">{login.Nome}</h2>

                            <p className="text-slate-300 leading-7">
                                {login.Descricao}
                            </p>
                        </section>

                        {/* Contato */}
                        <section>
                            <h2 className="text-xl font-semibold mb-4">Contato</h2>

                            <ul className="space-y-3 text-slate-300">
                                <li>{login.Endereco}</li>

                                <li>{login.WhatsApp}</li>

                                <li>💬 WhatsApp</li>

                                <li>
                                    🕒 Segunda a Sexta
                                    <br />
                                    08:00 às 17:00
                                </li>

                                <li>
                                    🕒 Sábado
                                    <br />
                                    08:30 às 12:30
                                </li>
                            </ul>
                        </section>

                        {/* Navegação */}
                        <section>
                            <h2 className="text-xl font-semibold mb-4">Navegação</h2>

                            <nav className="flex flex-col gap-3 text-slate-300">
                                <a href="/home" className="hover:text-white transition">
                                    Início
                                </a>

                                <a href="/catalogo" className="hover:text-white transition">
                                    Catálogo
                                </a>

                                <a href="#" className="hover:text-white transition">
                                    Promoções
                                </a>

                                <a href="#" className="hover:text-white transition">
                                    Minha Conta
                                </a>

                                <a href="/politica-de-privacidade" className="hover:text-white transition">
                                    Política de Privacidade
                                </a>
                            </nav>
                        </section>
                    </div>

                    <div className="border-t border-blue-800">
                        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-slate-300">
                            <p>
                                © {new Date().getFullYear()} Colônia Material de Construção. Todos os direitos
                                reservados.
                            </p>

                            <p>Desenvolvido por Leandro Matos</p>
                        </div>
                    </div>
                </footer>
            </body>
        </html>
    );
}
