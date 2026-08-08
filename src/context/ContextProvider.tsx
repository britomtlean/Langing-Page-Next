'use client';

import { Produto } from '@/Types/Types';
import { Produtos } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { createContext, useContext, useState } from 'react';
import type { PropsWithChildren } from 'react'; //TIPAGEM DE PROP

type Carrinho = {
    nomeCliente: string | null;
    contatoCliente: string | null;
    enderecoCliente: string | null;
    produtos: Produto[] | null;
    valorTotal: number;

};

export type ContextType = {
    produtosCarrinho: Array<Produto>;
    incluirProduto: (produto: Produtos) => void;
    incrementarProduto: (produto: Produto) => void;
    decrementarProduto: (id: Produto) => void;
    carrinho: Carrinho | null;
    adicionarCarrinho: (nome: string, contato: string, endereco: string) => void;
};

export const Context: React.Context<ContextType | null> = createContext<ContextType | null>(null);

/************************************************************************************** */

export const ContextProvider = ({ children }: PropsWithChildren) => {

    const navigate = useRouter();

    const [produtosCarrinho, setProdutosCarrinho] = useState<Array<Produto>>([]);
    const [carrinho, setCarrinho] = useState<Carrinho | null>(null);

    function adicionarCarrinho(nome : string, contato: string, endereco: string) {

        const carrinho: Carrinho = {
            nomeCliente: nome,
            contatoCliente: contato,
            enderecoCliente: endereco,
            produtos: produtosCarrinho,
            valorTotal: produtosCarrinho.reduce((acc, produto) => {return produto.subtotal + acc},0)
        }

        setCarrinho(carrinho);


        navigate.push('/home/carrinho/endereco/pagamento');


    }

    function incluirProduto(produto: Produtos) {


            const quantidade = 1;
            const valorUnitario = produto.valor;

            const produtoConvertido: Produto = {
                produtoId: produto.id,
                nome: produto.nome,
                imagem: produto.imagem,
                quantidade: quantidade,
                valorUnitario: valorUnitario,
                subtotal: quantidade * valorUnitario
            }

        try {
            const produtoExiste = produtosCarrinho.some((array) => array.produtoId == produto.id);
            if (produtoExiste) throw new Error('Produto já incluso no carrinho');

            setProdutosCarrinho((prev: Produto[]) => {
                return [
                    ...prev,
                    produtoConvertido
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

    function incrementarProduto(produto: Produto) {

        const quantidade = 1;
        const valorUnitario = produto.valorUnitario;

        const produtoConvertido: Produto = {
            produtoId: produto.produtoId,
            nome: produto.nome,
            quantidade: quantidade,
            valorUnitario: valorUnitario,
            subtotal: quantidade * valorUnitario,
        };


        setProdutosCarrinho((prev: Produto[]) => {

            const produtoExiste = prev.some((array) => array.produtoId == produto.produtoId);

            if (!produtoExiste)
                return [
                    ...prev,
                    produtoConvertido
                ];

            return prev.map((array) => {
                if (array.produtoId == produto.produtoId) {
                    return { ...array, quantidade: array.quantidade + 1, subtotal: (array.quantidade + 1) * array.valorUnitario };
                }

                return array;
            });
        });
    }

    function decrementarProduto(produto: Produto) {

        setProdutosCarrinho((prev) => {

            const produtoExiste = prev.some((array) => array.produtoId == produto.produtoId && array.quantidade === 1);
            if (produtoExiste) {
                const novaLista = prev.filter((array) => array.produtoId !== produto.produtoId);
                return novaLista;
            }

            return prev.map((array) => {
                if (array.produtoId == produto.produtoId) {
                    return {
                        ...array,
                        quantidade: array.quantidade - 1,
                        subtotal: array.valorUnitario * (array.quantidade -1 ) ,
                    };
                }

                return array;
            });
        });
    }

    return (
        <Context.Provider
            value={{
                produtosCarrinho,
                incluirProduto,
                incrementarProduto,
                decrementarProduto,
                adicionarCarrinho,
                carrinho,
            }}
        >
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
