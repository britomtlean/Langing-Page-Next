import React from 'react'
import { db } from '../_lib/prisma';

const page = async () => {

  const product = await db.produtos.findMany();
  console.log(product);

  return (
      <div
          className="w-full h-screen py-8 px-[10%] lg:px-[20%]
       flex flex-col justify-start items-center gap-2
       bg-slate-300 font-semibold"
      >
          {product.map((array: any) => (
              <ul
                  key={array.id}
                  className=" w-full p-4
                  flex flex-col items-center justify-between gap-2
                   rounded-md bg-blue-500 text-white
              "
              >
                  <h1>{array.nome}</h1>
                  <h1>{array.descricao}</h1>
              </ul>
          ))}
      </div>
  );
}

export default page
