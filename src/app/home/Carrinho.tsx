'use client';

import { useCarrinho } from '@/context/ContextProvider';
import { Produtos } from '@prisma/client';
import Link from 'next/link';

export default function Carrinho() {

    const { produtosCarrinho, decrementarProduto, incrementarProduto } = useCarrinho();


    return (
        <aside
            className="h-[10vh] w-[95%] p-4 bottom-[1%] overflow-hidden
            bg-blue-800 border border-slate-300 text-white rounded-lg
            flex flex-col fixed
            lg:h-full lg:max-h-[500px] lg:w-[25%] 2xl:w-1/5 lg:relative lg:pt-8 z-50"
        >
            <h2 className="text-2xl font-bold mb-4 text-center">Carrinho</h2>

            {produtosCarrinho.length === 0 ? (
                <h1 className="bg-slate-400 p-5 rounded-lg text-center ">Carrinho vazio</h1>
            ) : (
                <>
                    <div className="flex flex-col gap-3 overflow-y-auto flex-1">
                        {produtosCarrinho.map((produto) => (
                            <div
                                key={produto.produtoId}
                                className="bg-white text-black rounded-lg p-3
                                flex items-center gap-3"
                            >
                                <img
                                    src={produto.imagem}
                                    alt={produto.nome}
                                    className="w-16 h-16 object-contain rounded"
                                />

                                <div className="flex-1">
                                    <h3 className="font-semibold">{produto.nome}</h3>

                                    <p>Quantidade: {produto.quantidade}</p>
                                    <p>
                                        SubTotal:{' '}
                                        {produto.subtotal.toLocaleString('pt-BR', {
                                            style: 'currency',
                                            currency: 'BRL',
                                        })}
                                    </p>

                                    {/** <p className="font-bold">R$ {produto.valor?.toString()}</p> */}
                                </div>

                                <div className="flex flex-col gap-4">
                                    {' '}
                                    <button
                                        onClick={() => incrementarProduto(produto)}
                                        className="bg-green-600 px-3 py-2 rounded
                                    text-white hover:bg-green-700"
                                    >
                                        +
                                    </button>
                                    <button
                                        onClick={() => decrementarProduto(produto)}
                                        className="bg-red-600 px-3 py-2 rounded
                                    text-white hover:bg-red-700"
                                    >
                                        -
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-4 border-t border-blue-500 pt-4 flex flex-col justify-center items-center gap-4">
                        <strong>Itens: {produtosCarrinho.length}</strong>
                        <Link
                            className="
                                inline-flex items-center justify-center gap-2
                                w-full
                                px-5 py-3
                                rounded-lg
                                bg-red-600
                                text-white
                                font-semibold
                                shadow-md
                                transition-all duration-200
                                hover:bg-red-700
                                hover:shadow-lg
                                active:scale-95
                                focus:outline-none
                                focus:ring-2
                                focus:ring-blue-400
                                "
                            href={'/home/carrinho'}
                        >
                            Ver carrinho
                        </Link>
                    </div>
                </>
            )}
        </aside>
    );
}
