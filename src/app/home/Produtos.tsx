'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import type { Produtos } from '@prisma/client';
import { useCarrinho } from '@/context/ContextProvider';


const Produtos = ({produtos} : {produtos: any}) => {

    const { incluirProduto } = useCarrinho();

    const [categoria, setCategoria] = useState<string | null>(null);

    const produtoFiltrado: Produtos = produtos.filter((array: any) => array.categoria == categoria);


    return (
        <>
            <div className="w-[100vw] h-full flex flex-col lg:px-5 mb-20 2xl:w-[80vw]">
                <div className="flex lg:flex-row lg:justify-between flex-col lg:gap-0 gap-4 p-4">
                    <select
                        defaultValue={''}
                        value={categoria || ''}
                        onChange={(e) => {
                            setCategoria(e.target.value == '' ? null : e.target.value);
                        }}
                        className=" w-full lg:w-[40vw] 2xl:w-2/6 p-4 rounded-md bg-gray-200"
                    >
                        <option value={''}>{!categoria ? 'Lista de categorias' : 'Voltar ao início'}</option>
                        <option value={'Mais Vendidos'}>Mais Vendidos</option>
                        <option value={'Outros'}>Outros</option>
                    </select>

                    <input
                        className="bg-gray-200 w-full lg:w-[50vw] 2xl:w-2/6 outline-none border border-slate-300 p-4 rounded-md"
                        type="search"
                        placeholder="Pesquisar produtos..."
                        onFocus={() => {
                            '';
                        }}
                    />
                </div>

                <div className="flex flex-wrap flex-col w-full h-full gap-4 pt-8">
                    <h1 className="font-black text-3xl w-full text-center lg:text-left">
                        {categoria ? categoria : 'Categorias'}
                    </h1>
                    {categoria != null ? (
                        <div
                            className="w-full h-full p-4
                            grid lg:grid-cols-4 gap-4"
                        >
                            {Array.isArray(produtoFiltrado) &&
                                produtoFiltrado.map((produto: Produtos) => (
                                    <div
                                        key={produto.id}
                                        className="border border-slate-300 rounded-xl bg-white shadow-sm max-h-[400px]
                                        overflow-hidden flex flex-col transition hover:shadow-lg"
                                    >
                                        <div className="h-52 flex items-center justify-center p-4">
                                            <img
                                                src={produto.imagem}
                                                alt={produto.nome}
                                                className="max-h-full object-contain"
                                            />
                                        </div>

                                        <div className="flex flex-col gap-2 p-4 flex-1">
                                            <h2 className="text-lg font-semibold">{produto.nome}</h2>

                                            <p className="text-sm text-slate-600 line-clamp-2">{produto.descricao}</p>

                                            <span
                                                className={`text-sm font-medium ${
                                                    produto.disponibilidade ? 'text-green-600' : 'text-red-500'
                                                }`}
                                            >
                                                {produto.disponibilidade ? 'Disponível' : 'Indisponível'}
                                            </span>

                                            <span className="text-sm text-slate-500">Estoque: {produto.estoque}</span>

                                            {/* <strong className="text-2xl mt-2">R$ {Number(produto.valor).toFixed(2)}</strong>*/}

                                            <button
                                                onClick={() => incluirProduto(produto)}
                                                disabled={!produto.disponibilidade}
                                                className="mt-auto bg-blue-600 text-white py-2 rounded-lg
                            hover:bg-blue-700 disabled:bg-slate-300
                            disabled:cursor-not-allowed transition"
                                            >
                                                Adicionar ao carrinho
                                            </button>
                                        </div>
                                    </div>
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
