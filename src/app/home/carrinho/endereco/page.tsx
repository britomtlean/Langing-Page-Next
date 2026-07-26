'use client';

import { ArrowBigLeft, MapPinned } from 'lucide-react';
import { useCarrinho } from '@/context/ContextProvider';
import Link from 'next/link';
import { useState } from 'react';

const Page = () => {

    const { adicionarCarrinho } = useCarrinho();

    const [endereco, setEndereco] = useState({
        cep: '',
        nome: '',
        contato: '',
        rua: '',
        bairro: '',
        cidade: '',
        estado: '',
        numero: '',
        complemento: '',
    });

    const buscarCep = async () => {
        const cep = endereco.cep.replace(/\D/g, '');

        if (cep.length !== 8) return;

        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);

            const data = await response.json();

            if (data.erro) {
                alert('CEP não encontrado.');
                return;
            }

            setEndereco((prev) => ({
                ...prev,
                rua: data.logradouro,
                bairro: data.bairro,
                cidade: data.localidade,
                estado: data.uf,
            }));
        } catch {
            alert('Erro ao buscar CEP.');
        }
    };


    return (
        <div className="h-full w-full p-5 flex flex-col gap-10 ">
            {/* Cabeçalho */}
            <div className="flex justify-center relative">
                <Link
                    href={`/home/carrinho`}
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

                <h2 className="text-3xl font-bold text-black">Endereço de Entrega</h2>
            </div>

            {/* Conteúdo */}
            <div className="flex gap-5 flex-1">
                {/* Formulário */}
                <section
                    className="
                        w-2/3
                        bg-slate-300
                        border
                        border-slate-400
                        rounded-lg
                        p-8
                    "
                >
                    <form className="flex flex-col gap-5">
                        {/* CEP */}
                        <div className="grid grid-cols-4 gap-4">
                            <div>
                                <label className="font-semibold text-black">Nome</label>
                                <input
                                    type="text"
                                    placeholder="Digite o seu nome"
                                    className="w-full mt-2 p-3 rounded-lg border border-slate-400"
                                    value={endereco.nome}
                                    onChange={(e) =>
                                        setEndereco({
                                            ...endereco,
                                            nome: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div>
                                <label className="font-semibold text-black">Contato</label>
                                <input
                                    type="tel"
                                    placeholder="Digite o seu WhatsApp"
                                    className="w-full mt-2 p-3 rounded-lg border border-slate-400"
                                    value={endereco.contato}
                                    onChange={(e) =>
                                        setEndereco({
                                            ...endereco,
                                            contato: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="col-span-1">
                                <label className="font-semibold text-black">CEP</label>

                                <input
                                    type="text"
                                    placeholder="00000-000"
                                    className="w-full mt-2 p-3 rounded-lg border border-slate-400"
                                    value={endereco.cep}
                                    onChange={(e) =>
                                        setEndereco({
                                            ...endereco,
                                            cep: e.target.value,
                                        })
                                    }
                                    onBlur={buscarCep}
                                />
                            </div>

                            <div className="col-span-3 flex items-end">
                                <button
                                    type="button"
                                    className="
                                        h-12
                                        px-6
                                        rounded-lg
                                        bg-blue-600
                                        text-white
                                        hover:bg-blue-700
                                    "
                                >
                                    Buscar CEP
                                </button>
                            </div>
                        </div>

                        {/* Rua */}
                        <div>
                            <label className="font-semibold text-black">
                                Rua
                                <input
                                    type="text"
                                    className="w-full mt-2 p-3 rounded-lg border border-slate-400"
                                    value={endereco.rua}
                                    readOnly
                                />
                            </label>
                        </div>

                        {/* Número / Complemento */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="font-semibold text-black">
                                    Número
                                    <input type="text" className="w-full mt-2 p-3 rounded-lg border border-slate-400" />
                                </label>
                            </div>

                            <div>
                                <label className="font-semibold text-black">
                                    Complemento
                                    <input type="text" className="w-full mt-2 p-3 rounded-lg border border-slate-400" />
                                </label>
                            </div>
                        </div>

                        {/* Bairro / Cidade */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="font-semibold text-black">
                                    Bairro
                                    <input
                                        type="text"
                                        className="w-full mt-2 p-3 rounded-lg border border-slate-400"
                                        value={endereco.bairro}
                                        readOnly
                                    />
                                </label>
                            </div>

                            <div>
                                <label className="font-semibold text-black">
                                    Cidade
                                    <input
                                        type="text"
                                        className="w-full mt-2 p-3 rounded-lg border border-slate-400"
                                        value={endereco.cidade}
                                        readOnly
                                    />
                                </label>
                            </div>
                        </div>

                        {/* Referência */}
                        <div>
                            <label className="font-semibold text-black">Ponto de Referência</label>

                            <textarea
                                rows={4}
                                placeholder="Ex.: Casa de esquina, portão azul..."
                                className="
                                    w-full
                                    mt-2
                                    p-3
                                    rounded-lg
                                    border
                                    border-slate-400
                                    resize-none
                                "
                            />
                        </div>
                    </form>
                </section>

                {/* Painel lateral */}
                <aside
                    className="
                        w-1/3
                        bg-slate-300
                        border
                        border-slate-400
                        rounded-lg
                        flex
                        flex-col
                        justify-center
                        items-center
                        gap-5
                        p-6
                    "
                >
                    <MapPinned className="w-36 h-36 text-slate-500" />

                    <h3 className="text-2xl font-bold text-black">Local de Entrega</h3>

                    <p className="text-center text-slate-700">
                        Informe corretamente o endereço onde o pedido deverá ser entregue.
                    </p>
                </aside>
            </div>

            {/* Rodapé */}
            <div className="flex justify-center">
                <button
                    onClick={() => {adicionarCarrinho(endereco.nome, endereco.contato, endereco.rua)}}
                    className="
                    flex justify-center
                        w-3/5
                        py-5
                        rounded-lg
                        bg-red-600
                        text-white
                        font-semibold
                        hover:bg-red-700
                        transition
                    "
                >
                    Continuar para Pagamento
                </button>
            </div>
        </div>
    );
};

export default Page;
