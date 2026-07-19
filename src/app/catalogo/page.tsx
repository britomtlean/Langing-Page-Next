'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import prisma from '../_db/prisma';
import Produtos from './Produtos';

const page =  () => {

    const [categoria, setCategoria] = useState<string | null>(null);
    //const produtos = await prisma.produtos.findMany();

    return (
        <div
            className="w-full min-h-screen bg-slate-100
      flex flex-col justify-start items-center"
        >
            <header
                className="w-full lg:h-[10vh] lg:bg-blue-800 relative pt-[1%]
            flex justify-center items-start"
            >
                <nav
                    className="w-1/2 h-1/2
                    text-white font-bold text-[1.2rem]
                    flex justify-around items-center"
                >
                    <a href='/catalogo'>Inicio</a>
                    <a>Promoções</a>
                    <a>Pedidos</a>
                    <a>Minha conta</a>
                </nav>
            </header>

            <div
                className="w-[80%] lg:min-h-screen
            flex flex-row items-start gap-4"
            >
                <main className="lg:min-h-screen w-4/5 flex-5 pt-2 flex flex-wrap flex-col gap-8">
                    <div className="flex flex-wrap justify-start items-center gap-10 px-8">
                        <Image src="/logo-colonia.jpeg" alt="Logo" width={200} height={200} className="rounded-lg" />

                        <div className="flex flex-col justify-start items-start gap-4">
                            <h1 className="text-3xl font-extrabold">Colônia Material de construção</h1>

                            <div className="flex lg:flex-row flex-col gap-8">
                                <li>Estrada da Matriz nº 20</li>
                                <li>Segunda - Sexta: 8:00 ás 17:00 / Sábado: 8:30 ás 12:30</li>
                                <li>
                                    <a href=""></a>Mais informações
                                </li>
                            </div>
                        </div>
                    </div>

                    <div className="w-full h-full flex flex-col gap-8 px-8">
                        <div className="flex lg:flex-row lg:justify-between flex-col lg:gap-0 gap-4 ">
                            <select
                                defaultValue={''}
                                onChange={(e) => {
                                    setCategoria(e.target.value == '' ? null : e.target.value);
                                }}
                                className="lg:w-2/5 w-full p-4 rounded-md bg-gray-200"
                            >
                                <option value={''}>{!categoria ? 'Lista de categorias' : 'Voltar ao início'}</option>
                                <option value={'Mais Vendidos'}>Mais Vendidos</option>
                                <option value={'Outros'}>Outros</option>
                            </select>

                            <input
                                className="bg-gray-200 lg:w-2/5 w-full outline-none border border-slate-300 p-4 rounded-md"
                                type="search"
                                placeholder="Pesquisar produtos..."
                            />
                        </div>

                        <div className="flex flex-wrap flex-col w-full h-full gap-4">
                            <h1 className="font-black text-3xl w-full text-center">
                                {categoria ? categoria : 'Categorias'}
                            </h1>
                            {categoria != null
                            ? (
                                <div>
                                    {categoria}
                                </div>
                            ) : (
                                <div
                                    className="w-full h-full p-4
                                grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-2"
                                >
                                    <Link
                                        className=" flex flex-col items-center justify-center p-20 border border-slate-300 rounded-lg"
                                        href='catalogo/produtos'
                                    >
                                        <Image
                                            src="/MaisVendidos.png"
                                            alt="Logo"
                                            width={400}
                                            height={200}
                                            className="rounded-lg animate-bounce transition-all ease-in-out delay-5000"
                                        />
                                        <strong className="text-3xl">Mais Vendidos</strong>
                                    </Link>
                                    <Link
                                        className="flex flex-col items-center justify-center p-20 border border-slate-300 rounded-lg"
                                        href="/catalogo/produtos"
                                    >
                                        <Image
                                            src="/Outros.png"
                                            alt="Logo"
                                            width={400}
                                            height={200}
                                            className="rounded-lg animate-bounce transition-all ease-in-out delay-5000"
                                        />
                                        <strong className="text-3xl">Outros</strong>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </main>

                <aside
                    className="lg:min-h-[50vh] w-full flex-1 p-4 pt-8 border border-slate-300 mt-8 text-white rounded-lg
                flex flex-wrap flex-col justify-start items-center"
                >
                    <h1 className="bg-slate-500 p-5 w-3/4 rounded-lg text-center">Carrinho vazio</h1>
                </aside>
            </div>

            <footer className="border lg:h-[15vh] bg-blue-800 w-full mt-8"></footer>
        </div>
    );
};

export default page;
