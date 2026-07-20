import Image from 'next/image';
import Produtos from './Produtos';
import prisma from '../_db/prisma';

const Page = async () => {

    const produtos = await prisma.produtos.findMany();

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
                    <a href='/catalogo'>Inicio</a>
                    <a>Promoções</a>
                    <a>Pedidos</a>
                    <a>Minha conta</a>
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

                    <Produtos produtos= {produtos}/>


                </main>

                <aside
                    className="lg:min-h-[50vh] w-full flex-1 p-4 pt-8 border border-slate-300 mt-8 text-white rounded-lg
                flex flex-wrap flex-col justify-start items-center"
                >
                    <h1 className="bg-slate-500 p-5 w-3/4 rounded-lg text-center">Carrinho vazio</h1>
                </aside>
            </div>

            <footer className="border lg:h-[15vh] bg-blue-800 w-full mt-8"></footer>
        </div>
    );
};

export default Page;
