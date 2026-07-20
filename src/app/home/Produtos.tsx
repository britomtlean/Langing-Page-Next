'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ul } from 'framer-motion/client';
import type { Produtos } from '@prisma/client';


const Produtos = ({produtos} : {produtos: any}) => {

    const [categoria, setCategoria] = useState<string | null>(null);

    const produtoFiltrado: Produtos = produtos.filter((array: any) => array.categoria == categoria);


    return (
        <>
            <div className="w-full h-full flex flex-col gap-8 px-8">
                <div className="flex lg:flex-row lg:justify-between flex-col lg:gap-0 gap-4 ">
                    <select
                        defaultValue={''}
                        value={categoria || ''}
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
                    <h1 className="font-black text-3xl w-full text-center">{categoria ? categoria : 'Categorias'}</h1>
                    {categoria != null ? (
                        <div
                            className="w-full h-full p-4
                                grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-2"
                        >
                            {Array.isArray(produtoFiltrado) &&
                                produtoFiltrado.map((array: Produtos) => (
                                    <button
                                        key={array.id}
                                        className="w-full h-[200px] lg:h-full p-20 border border-slate-300 rounded-lg
                                            flex flex-col items-center justify-center gap-4"
                                        onClick={() => {
                                            setCategoria('Mais Vendidos');
                                        }}
                                    >
                                        <img
                                            src={array.imagem}
                                            alt=""
                                            className="rounded-lg max-w-[33%]"
                                        />
                                        <strong className="lg:text-3xl">{array.nome}</strong>
                                        <strong className="lg:text-3xl">{array.descricao}</strong>
                                        <strong className="lg:text-3xl">R$ 13,90</strong>
                                    </button>
                                ))}
                        </div>
                    ) : (
                        <div
                            className="w-full h-full p-4
                                grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-2"
                        >
                            <button
                                className=" flex flex-col items-center justify-center p-20 border border-slate-300 rounded-lg"
                                onClick={() => {
                                    setCategoria('Mais Vendidos');
                                }}
                            >
                                <Image
                                    src="/MaisVendidos.png"
                                    alt="Logo"
                                    width={400}
                                    height={200}
                                    className="rounded-lg animate-bounce transition-all ease-in-out delay-5000"
                                />
                                <strong className="text-3xl">Mais Vendidos</strong>
                            </button>
                            <button
                                className="flex flex-col items-center justify-center p-20 border border-slate-300 rounded-lg"
                                onClick={() => {
                                    setCategoria('Outros');
                                }}
                            >
                                <Image
                                    src="/Outros.png"
                                    alt="Logo"
                                    width={400}
                                    height={200}
                                    className="rounded-lg animate-bounce transition-all ease-in-out delay-5000"
                                />
                                <strong className="text-3xl">Outros</strong>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Produtos;
