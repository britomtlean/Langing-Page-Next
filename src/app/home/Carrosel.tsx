'use client'
import { Produtos } from '@prisma/client';
import React, { useState } from 'react'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

const Carrosel = ({produtos} : {produtos: any}) => {

    const [item, setItem] = useState<Array<Produtos>>(produtos);

        const nextProduct = () => {
            const first: Produtos = item[0];
            const fila: Array<Produtos> = item.filter((_, index) => index != 0);
            const newArray: Array<Produtos> = [...fila, first];

            setItem(newArray);
        };

        const returnProduct = () => {
            const last: Produtos = item[item?.length! - 1];
            const fila: Array<Produtos> = item?.filter((_, index) => index != item?.length! - 1);
            const newArray: Array<Produtos> = [last, ...fila];

            setItem(newArray);
        };


  return (
      <div
          className="w-full h-[201px] flex justify-center items-center
           overflow-hidden rounded-lg
          md:min-h-[300px]"
      >
          <button className="md:w-[10%] h-full border-l-0! rounded-r-[0]! bg-blue-900/40" onClick={returnProduct}>
              <FaAngleLeft className="text-white text-4xl text-center w-full" />
          </button>

          <img
              className="md:w-[30%] h-full bg-indigo-100 flex-2 overflow-hidden object-contain border border-slate-200
                  "
              src={item[0].imagem}
              alt=""
          />
          <img
              className="md:w-[30%] h-full bg-indigo-100 flex-2 overflow-hidden object-contain border border-slate-200
                  "
              src={item[1].imagem}
              alt=""
          />
          <img
              className="md:w-[30%] h-full bg-indigo-100 flex-2 overflow-hidden object-contain border border-slate-200
                  "
              src={item[2].imagem}
              alt=""
          />

          <button className="md:w-[10%] h-full bg-green-900/40 border-r-0! rounded-l-[0]!" onClick={nextProduct}>
              <FaAngleRight className="text-white text-4xl text-center w-full" />
          </button>
      </div>
  );
}

export default Carrosel
