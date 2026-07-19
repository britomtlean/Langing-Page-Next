import React from 'react';
import prisma from '../_db/prisma';
import { ul } from 'framer-motion/client';

const Produtos = async ({categoria} : {categoria: string}) => {

    const produtos = await prisma.produtos.findMany();

    let filtrados = produtos.filter((array: any) => array.categoria == categoria)



    return <div>{filtrados.map((array: any) =>
    <ul key={array.id}>
        <li>{array.nome}</li>
    </ul>
    )}</div>;
};

export default Produtos;
