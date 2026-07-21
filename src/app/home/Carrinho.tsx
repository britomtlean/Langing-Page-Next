'use client';

import { useCarrinho } from "@/context/ContextProvider";

export default function Carrinho() {

    const { carrinho, removerProduto } = useCarrinho();

    return (
        <aside
            className="lg:min-h-[50vh] h-[10vh] lg:w-full w-[90vw] flex-1 overflow-hidden
            p-4 lg:pt-8 bg-blue-800 border border-slate-300
            lg:mt-8 text-white rounded-lg lg:relative fixed
            bottom-[1%] flex flex-col"
        >
            <h2 className="text-2xl font-bold mb-4 text-center">Carrinho</h2>

            {carrinho.length === 0 ? (
                <h1 className="bg-slate-500 p-5 rounded-lg text-center ">Carrinho vazio</h1>
            ) : (
                <>
                    <div className="flex flex-col gap-3 overflow-y-auto flex-1">
                        {carrinho.map((produto) => (
                            <div
                                key={produto.id}
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

                                    <p className="text-sm text-slate-600">{produto.descricao}</p>

                                    {/** <p className="font-bold">R$ {produto.valor?.toString()}</p> */}
                                </div>

                                <button
                                    onClick={() => removerProduto(produto.id)}
                                    className="bg-red-600 px-3 py-2 rounded
                                    text-white hover:bg-red-700"
                                >
                                    X
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="mt-4 border-t border-blue-500 pt-4">
                        <strong>Itens: {carrinho.length}</strong>
                    </div>
                </>
            )}
        </aside>
    );
}
