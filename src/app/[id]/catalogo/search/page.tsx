'use client'

import { Context } from '@/context/ContextProvider';
import { div } from 'framer-motion/client';
import Image from 'next/image';
import React, { useContext } from 'react'

export default function Page({searchParams}: { searchParams: { produto?: string } })
{
    const { produtosEstabelecimento } = useContext(Context)!;
    const busca = searchParams.produto;

        const produtosSearch = produtosEstabelecimento?.filter((p) => {
            const texto = (busca || '').toLowerCase();
            return p.nome.toLowerCase().includes(texto);
        });


        if(produtosSearch?.length == 0)
        {
            return <div className="text-4xl text-black font-sans font-medium w-full h-[50vh] flex justify-center items-center">Nenhum produto relacionado</div>
        }


    return (
        <div
            className="text-2xl text-black font-sans font-medium w-[90%] min-h-[50vh] mx-auto
            grid grid-cols-3 gap-2 mb-4"
        >
            {produtosSearch?.map((p) => (
                <div className="flex gap-4 items-center w-full h-[400px] border-2 bg-slate-100 border-blue-700/30" key={p.id}>
                    <img src={p.imagem} alt={p.imagem} width={200} height={200} className="rounded-lg" />
                    <div
                        className="w-full h-full
                                grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-2"
                    >
                        <div className="flex w-full flex-col items-center justify-center p-20 border border-slate-300 rounded-lg">
                            <h1 className="text-xl mb-3 font-semibold">{p.nome}</h1>
                            <h1 className="text-md font-light">{p.descricao}</h1>
                            <h1 className="text-xl">
                                {Number(p.valor).toLocaleString('pt-BR', {
                                    style: 'currency',
                                    currency: 'BRL',
                                })}
                            </h1>
                            <button
                                className="mt-auto bg-red-600 text-white py-4 rounded-lg p-4 lg:w-[100%]
                                                hover:bg-cyan-300 disabled:bg-slate-300
                                                disabled:cursor-not-allowed transition"
                            >
                                Detalhes
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
