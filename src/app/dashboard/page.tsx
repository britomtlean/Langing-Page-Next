import React from 'react'

import { DataTable } from '@/components/ui/DataTable'; //IMPORTAÇÃO DA TABELA
import { ProductsColumns } from './_columns/columns' // IMPORTAÇÃO DAS COLUNAS
import prisma from '../_db/prisma' //IMPORTAÇÃO DOS DADOS DA TABELA

const page = async () => {

  const produtos = await prisma.produtos.findMany();

  return (
      <div className="w-full h-screen bg-white flex flex-row justify-center items-start p-[2%] gap-4">
        
          <div className='flex-1'>
              <DataTable columns={ProductsColumns} data={produtos} />
          </div>

          <div className='flex-1 w-full h-full bg-slate-400'></div>
      </div>
  );
}

export default page
