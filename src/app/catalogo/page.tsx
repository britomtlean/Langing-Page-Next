import React from 'react'
import { motion } from 'framer-motion';
import Image from 'next/image';
import Products from './produtos/page';

const page = () => {
  return (
      <div
          className="w-full min-h-screen bg-slate-100
      flex flex-col justify-start items-center"
      >
          <header
              className="w-full lg:h-[10vh] lg:bg-blue-800 relative pt-[1%]
            flex justify-center items-start"
          >
              <nav
                  className="w-1/2 h-1/2
                    text-white font-bold text-[1.2rem]
                    flex justify-around items-center"
              >
                  <div>Inicio</div>
                  <div>Promoções</div>
                  <div>Pedidos</div>
                  <div>Minha conta</div>
              </nav>
          </header>

          <div
              className="w-[80%] lg:min-h-screen
            flex flex-row items-start gap-4"
          >
              <main className="lg:min-h-screen w-4/5 flex-5 pt-2 flex flex-wrap flex-col gap-8">
                  <div className="flex flex-wrap justify-start items-center gap-10 px-8">
                      <Image src="/logo-colonia.jpeg" alt="Logo" width={200} height={200} className="rounded-lg" />

                      <div className="flex flex-col justify-start items-start gap-4">
                          <h1 className="text-3xl font-extrabold">Colônia Material de construção</h1>

                          <div className="flex lg:flex-row flex-col gap-8">
                              <li>Estrada da Matriz nº 20</li>
                              <li>Segunda - Sexta: 8:00 ás 17:00 / Sábado: 8:30 ás 12:30</li>
                              <li>
                                  <a href=""></a>Mais informações
                              </li>
                          </div>
                      </div>
                  </div>

                  <div className="w-full h-full flex flex-col gap-8 px-8">
                      <div className="flex lg:flex-row lg:justify-between flex-col lg:gap-0 gap-4 ">
                          <select className="lg:w-2/5 w-full p-4 rounded-md bg-gray-200">
                              <option>Mais Vendidos</option>
                              <option>Outros</option>
                          </select>

                          <input
                              className="bg-gray-200 lg:w-2/5 w-full outline-none border border-slate-300 p-4 rounded-md"
                              type="search"
                              placeholder="Pesquisar produtos..."
                          />
                      </div>

                      <div className="flex flex-wrap flex-col w-full h-full">
                          <h1 className="font-black text-3xl">Categorias</h1>
                          <div
                              className="border border-black w-full h-full p-4
                        grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-2"
                          >
                              <a className="bg-slate-400 flex justify-center p-20" href="/catalogo/produtos">
                                  Mais vendidos
                              </a>
                              <a className="bg-slate-400 flex justify-cente p-20" href="/catalogo/produtos">
                                  Outros
                              </a>
                          </div>
                      </div>
                  </div>
              </main>

              <aside
                  className="lg:min-h-screen w-full flex-1 p-4
                flex flex-wrap flex-col justify-start items-center"
              >
                  <div className="bg-slate-500 p-10 w-full rounded-lg">Carrinho vazio</div>
              </aside>
          </div>

          <footer className="border lg:h-[15vh] bg-blue-800 w-full mt-8"></footer>
      </div>
  );
}

export default page
