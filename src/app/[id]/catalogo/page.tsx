export const revalidate = 60;

import Image from 'next/image';
import Produtos from './Produtos';
import { MdPlace } from 'react-icons/md';
import { MdAccessTimeFilled } from 'react-icons/md';
import { IoLogoWhatsapp } from 'react-icons/io';
import Carrinho from './Carrinho';
import Carrosel from './Carrosel';
import { div } from 'framer-motion/client';
import prisma from '@/app/_db/prisma';

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {

    const { id } = await params;

    const produtos = await prisma.produtos.findMany({
        where: {
            disponibilidade: true,
            login: id,
        },
        select: {
            id: true,
            categoria: true,
            descricao: true,
            imagem: true,
            nome: true,
            disponibilidade: true,
            valor: true,
        },
    });


    if(produtos.length == 0) return <div className='h-screen w-full flex justify-center items-center font-mono font-bold text-3xl'>Pagina não encontrada</div>

    return (
        <div
            className="w-full min-h-screen gap-4
            flex flex-col justify-start items-center"
        >
            <div
                className="w-full lg:w-[95%] 2xl:w-[80%] lg:h-[380px]
                flex flex-col lg:flex-row items-center lg:items-start gap-4 py-4"
            >
                <main className="w-[95%] lg:w-[75%] 2xl:w-4/5 flex flex-wrap flex-col gap-8 ">
                    <div
                        className="hidden lg:flex lg:flex-row justify-center lg:justify-center items-center gap-10
                        bg-slate-300 rounded-lg p-4 px-8 border border-slate-200"
                    >
                        <Image src="/logo-colonia.jpeg" alt="Logo" width={200} height={200} className="rounded-lg" />

                        <div className="flex flex-col justify-start items-start lg:gap-4">
                            <h1 className="lg:text-5xl font-extrabold font-sans text-center">
                                Colônia Material de construção
                            </h1>

                            <div
                                className="flex lg:flex-row flex-col gap-5
                                list-none font-sans font-medium text-md"
                            >
                                <div className="flex gap-2 justify-center items-center">
                                    <MdPlace />
                                    <li className="inline">Estrada da Matriz nº 20</li>
                                </div>
                                <div className="flex gap-2 justify-center items-center">
                                    <MdAccessTimeFilled />
                                    <li>Segunda - Sexta: 8:00 ás 17:00 / Sábado: 8:30 ás 12:30</li>
                                </div>
                                <div className="flex gap-2 justify-center items-center">
                                    <IoLogoWhatsapp />
                                    <a className="underline" href="https://wa.me/552124171020">
                                        (21) 2417-1020
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div>
                            <img src="/logo.jpg" className="w-[220px] rounded-lg" />
                        </div>
                    </div>

                    <div className="flex flex-row gap-2 w-full">
                        <input
                            type="search"
                            placeholder="Pesquisar produto..."
                            className="flex-1 p-3 rounded-lg border border-slate-400 outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <button
                            type="button"
                            className="px-5 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
                        >
                            Pesquisar
                        </button>
                    </div>
                </main>

                <Carrinho id={id} />
            </div>

            <div className="w-3/4 2xl:w-1/2 border-b border-slate-300">
                <h2 className="font-black px-30 w-full text-center font-sans text-2xl pb-8">
                    Há mais de 30 anos oferecendo materiais de construção, ferramentas, tintas, elétrica, hidráulica e
                    muito mais. Atendimento rápido, estoque completo e entrega para a região.
                </h2>
            </div>

            <div className="w-full lg:w-[95%] 2xl:w-[80%] flex flex-col gap-10 py-8 border-b border-slate-300">
                <h2 className="font-black px-30 w-full text-center font-sans text-4xl px-2">Destaques</h2>
                <Carrosel produtos={produtos} />
            </div>

            <Produtos produtos={produtos} />
        </div>
    );
};

export default Page;
