export const dynamic = 'force-dynamic';

import Image from 'next/image';
import Produtos from './Produtos';
import prisma from '../_db/prisma';
import { MdPlace } from 'react-icons/md';
import { MdAccessTimeFilled } from 'react-icons/md';
import { IoLogoWhatsapp } from 'react-icons/io';
import Carrinho from './Carrinho';
import Carrosel from './Carrosel';

const Page = async () => {
    const produtos = await prisma.produtos.findMany();

    return (
        <div
            className="w-full min-h-screen gap-4
            flex flex-col justify-start items-center"
        >
            <div
                className="w-full lg:w-[95%] 2xl:w-[80%] lg:h-[40vh] lg:max-h-[100vh]
                flex flex-col lg:flex-row items-center lg:items-start gap-4 py-5"
            >
                <main className="w-[95%] lg:w-[75%] 2xl:w-4/5 flex flex-wrap flex-col gap-8 p-4">
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
                </main>

                <Carrinho />
            </div>

            <div>
                <h2 className="font-black px-30 w-full text-center font-sans text-xl px-5">
                    Há mais de 30 anos oferecendo materiais de construção, ferramentas, tintas, elétrica, hidráulica e
                    muito mais. Atendimento rápido, estoque completo e entrega para a região.
                </h2>
            </div>

            <div className="w-full lg:w-[95%] mt-8">
                <h2 className="font-black px-30 w-full text-center font-sans text-4xl  px-2">Destaques</h2>
                <Carrosel produtos={produtos} />
            </div>

            <Produtos produtos={produtos} />
        </div>
    );
};

export default Page;
