import React from 'react'
import { db } from '../_lib/prisma';
import Image from 'next/image';

const page = async () => {

  const produtos = await db.produtos.findMany();
  console.log(produtos);

  return (
      <main className="min-h-screen bg-blue-950 py-12 px-4">
          <div className="mx-auto max-w-7xl">
              <h1 className="mb-10 text-center text-4xl font-bold text-white">Nossos Produtos</h1>

              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {produtos.map((produto: any) => (
                      <div
                          key={produto.id}
                          className="group overflow-hidden rounded-2xl bg-cyan-800 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                      >
                          <div className="relative h-60 w-full overflow-hidden bg-white">
                          <img src={produto.imagem} alt="" />
                          </div>

                          <div className="space-y-3 p-5">
                              <h2 className="line-clamp-2 text-xl font-bold text-white">{produto.nome}</h2>

                              <p className="text-sm text-gray-200">{produto.descricao}</p>

                              <div className="flex items-center justify-between">
                                  <span className="text-2xl font-bold text-red-500">
                                      {/*produto.valor.toLocaleString('pt-BR', {
                                          style: 'currency',
                                          currency: 'BRL',
                                      })*/ "R$ 10,00"}
                                  </span>

                                  <span className="rounded-full bg-white/20 px-3 py-1 text-xs text-white">
                                      {produto.estoque} em estoque
                                  </span>
                              </div>

                              <button className="mt-2 w-full rounded-xl bg-red-500 py-3 font-semibold text-white transition hover:bg-red-600 active:scale-95">
                                  Ver Produto
                              </button>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      </main>
  );
}

export default page
