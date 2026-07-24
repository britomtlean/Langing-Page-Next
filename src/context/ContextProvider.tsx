'use client';

import { Produtos } from '@prisma/client';
import { createContext, useContext, useState } from 'react';
import type { PropsWithChildren } from 'react'; //TIPAGEM DE PROP

type CarrinhoItem = Produtos & {
    quantidade: number;
    valorTotal: number
};

export type ContextType = {
    carrinho: Array<CarrinhoItem>;
    adicionarProduto: (produto: CarrinhoItem) => void;
    removerProduto: (id: string) => void;
};

export const Context: React.Context<ContextType | null> = createContext<ContextType | null>(null);

/************************************************************************************** */

export const ContextProvider = ({ children }: PropsWithChildren) => {

    const [carrinho, setCarrinho] = useState<Array<CarrinhoItem>>([]);

      function adicionarProduto(produto: CarrinhoItem) {


          setCarrinho((prev) => {

              const produtoExiste = prev.some((array) => array.id == produto.id);
              if (!produtoExiste) return [
                  ...prev,
                  {
                      ...produto,
                      quantidade: 1,
                      valorTotal: 10 * 1
                  },
              ];

              return prev.map((array) => {

                  if (array.id == produto.id) {
                      return { ...array, quantidade: array.quantidade + 1, valorTotal: 10 * (array.quantidade  + 1)};
                  }

                  return array;
              });
          });
      }

      function removerProduto(id: string) {
          setCarrinho((prev) => prev.filter((p) => p.id !== id));
      }

    return <Context.Provider value={{ carrinho, adicionarProduto, removerProduto }}>{children}</Context.Provider>;
};

/*************************************************************************************** */

export function useCarrinho() { // FUNÇÃO PARA TRATAR CONTEXT

    const context = useContext(Context);

    if (!context) {
        throw new Error('useCarrinho deve ser usado dentro do Provider');
    }

    return context;
}

export default ContextProvider;
