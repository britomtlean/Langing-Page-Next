'use client';

import { Produtos } from '@prisma/client';
import { createContext, useContext, useState } from 'react';
import type { PropsWithChildren } from 'react'; //TIPAGEM DE PROP

export type ContextType = {
    carrinho: Array<Produtos>;
    adicionarProduto: (produto: Produtos) => void;
    removerProduto: (id: string) => void;
};

export const Context: React.Context<ContextType | null> = createContext<ContextType | null>(null);

/************************************************************************************** */

export const ContextProvider = ({ children }: PropsWithChildren) => {

    const [carrinho, setCarrinho] = useState<Array<Produtos>>([]);

      function adicionarProduto(produto: Produtos) {
          setCarrinho((prev) => [...prev, produto]);
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
