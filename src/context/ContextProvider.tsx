'use client';

import { Produtos } from '@prisma/client';
import { createContext, useContext, useState } from 'react';
import type { PropsWithChildren } from 'react'; //TIPAGEM DE PROP

type CarrinhoItem = Produtos & {
    quantidade: number;
    valorTotal: number;
};

export type ContextType = {
    carrinho: Array<CarrinhoItem>;
    incluirProduto: (produto: Produtos) => void;
    adicionarProduto: (produto: Produtos) => void;
    removerProduto: (id: Produtos) => void;
};

export const Context: React.Context<ContextType | null> = createContext<ContextType | null>(null);

/************************************************************************************** */

export const ContextProvider = ({ children }: PropsWithChildren) => {
    const [carrinho, setCarrinho] = useState<Array<CarrinhoItem>>([]);

    function incluirProduto(produto: Produtos) {
        try {
            const produtoExiste = carrinho.some((array) => array.id == produto.id);
            if (produtoExiste) throw new Error('Produto já incluso no carrinho');

            setCarrinho((prev) => {
                return [
                    ...prev,
                    {
                        ...produto,
                        quantidade: 1,
                        valorTotal: 10 * 1,
                    },
                ];
            });
        } catch (error: unknown) {
            if (error instanceof Error) {
                alert(error.message);
            } else {
                alert(error);
            }
        }
    }

    function adicionarProduto(produto: Produtos) {
        setCarrinho((prev) => {
            const produtoExiste = prev.some((array) => array.id == produto.id);
            if (!produtoExiste)
                return [
                    ...prev,
                    {
                        ...produto,
                        quantidade: 1,
                        valorTotal: 10 * 1,
                    },
                ];

            return prev.map((array) => {
                if (array.id == produto.id) {
                    return { ...array, quantidade: array.quantidade + 1, valorTotal: 10 * (array.quantidade + 1) };
                }

                return array;
            });
        });
    }

    function removerProduto(produto: Produtos) {

        setCarrinho((prev) => {

            const igualAUm = prev.some((array) => array.quantidade === 1);
            if (igualAUm)
            {
                const novaLista = prev.filter((array) => array.id !== produto.id);
                return novaLista;
            }


            return prev.map((array) => {
                if (array.id == produto.id) {
                    return {
                        ...array,
                        quantidade: array.quantidade - 1,
                        valorTotal: 10 * (array.quantidade - 1),
                    };
                }

                return array;
            });
        });
    }

    return (
        <Context.Provider value={{ carrinho, incluirProduto, adicionarProduto, removerProduto }}>
            {children}
        </Context.Provider>
    );
};

/*************************************************************************************** */

export function useCarrinho() {
    // FUNÇÃO PARA TRATAR CONTEXT

    const context = useContext(Context);

    if (!context) {
        throw new Error('useCarrinho deve ser usado dentro do Provider');
    }

    return context;
}

export default ContextProvider;
