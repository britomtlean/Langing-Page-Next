'use client';

import { ArrowBigLeft, CreditCard, QrCode, Banknote, ReceiptText } from 'lucide-react';
import Link from 'next/link';

const Page = () => {
    return (
        <div className="h-full w-full p-5 flex flex-col gap-10 ">
            {/* Cabeçalho */}
            <div className="relative flex justify-center">
                <Link
                    href={'/home/carrinho/endereco'}
                    className="
                        absolute left-20
                        flex items-center gap-2
                        bg-slate-300
                        px-5 py-3
                        rounded-lg
                        text-black
                        hover:bg-slate-400
                    "
                >
                    <ArrowBigLeft />
                    <strong>Retornar</strong>
                </Link>

                <h2 className="text-3xl font-bold text-black">Forma de Pagamento</h2>
            </div>

            {/* Conteúdo */}
            <div className="flex gap-5 flex-1">
                {/* Métodos */}
                <section
                    className="
                        w-2/3
                        bg-slate-300
                        rounded-lg
                        border
                        border-slate-400
                        p-8
                    "
                >
                    <h3 className="text-2xl font-bold text-black mb-8">Escolha como deseja pagar</h3>

                    <div className="flex flex-col gap-5">
                        {/* Cartão */}
                        <label
                            className="
                                flex
                                items-center
                                gap-5
                                p-5
                                bg-white
                                rounded-lg
                                border
                                cursor-pointer
                                hover:border-red-600
                            "
                        >
                            <input type="radio" name="pagamento" value="cartao" />

                            <CreditCard className="text-blue-600" />

                            <div>
                                <h4 className="font-semibold">Cartão de Crédito</h4>

                                <p className="text-sm text-slate-600">Visa, MasterCard, Elo...</p>
                            </div>
                        </label>

                        {/* Pix */}
                        <label
                            className="
                                flex
                                items-center
                                gap-5
                                p-5
                                bg-white
                                rounded-lg
                                border
                                cursor-pointer
                                hover:border-red-600
                            "
                        >
                            <input type="radio" name="pagamento" value="pix" />

                            <QrCode className="text-green-600" />

                            <div>
                                <h4 className="font-semibold">Pix</h4>

                                <p className="text-sm text-slate-600">Aprovação imediata</p>
                            </div>
                        </label>

                        {/* Dinheiro */}
                        <label
                            className="
                                flex
                                items-center
                                gap-5
                                p-5
                                bg-white
                                rounded-lg
                                border
                                cursor-pointer
                                hover:border-red-600
                            "
                        >
                            <input type="radio" name="pagamento" value="dinheiro" />

                            <Banknote className="text-emerald-600" />

                            <div>
                                <h4 className="font-semibold">Dinheiro</h4>

                                <p className="text-sm text-slate-600">Pagamento na entrega</p>
                            </div>
                        </label>
                    </div>
                </section>

                {/* Resumo */}
                <aside
                    className="
                        w-1/3
                        bg-slate-300
                        rounded-lg
                        border
                        border-slate-400
                        p-6
                        flex
                        flex-col
                        justify-between
                    "
                >
                    <div>
                        <div className="flex justify-center mb-5">
                            <ReceiptText className="w-28 h-28 text-slate-500" />
                        </div>

                        <h3
                            className="
                                text-center
                                text-2xl
                                font-bold
                                text-black
                                mb-6
                            "
                        >
                            Resumo
                        </h3>

                        <div className="space-y-3 text-black">
                            <div className="flex justify-between">
                                <span>Produtos</span>
                                <span>R$ 129,90</span>
                            </div>

                            <div className="flex justify-between">
                                <span>Entrega</span>
                                <span>R$ 8,00</span>
                            </div>

                            <hr />

                            <div
                                className="
                                    flex
                                    justify-between
                                    text-xl
                                    font-bold
                                "
                            >
                                <span>Total</span>
                                <span>R$ 137,90</span>
                            </div>
                        </div>
                    </div>

                    <button
                        className="
                            w-full
                            mt-8
                            py-4
                            rounded-lg
                            bg-red-600
                            text-white
                            font-semibold
                            hover:bg-red-700
                            transition
                        "
                    >
                        Finalizar Pedido
                    </button>
                </aside>
            </div>
        </div>
    );
};

export default Page;
