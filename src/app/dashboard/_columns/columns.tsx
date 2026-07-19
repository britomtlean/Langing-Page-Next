'use client';

import { Produtos } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';


// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

const getStatusLabel = (status: boolean  | null) => {
if( status === true) return 'Disponível'

return 'Indisponível'
}

export const ProductsColumns: ColumnDef<Produtos>[] = [
    {
        accessorKey: 'nome',
        header: 'Nome',
    },
    {
        accessorKey: 'descricao',
        header: 'Descricao',
    },
    {
        accessorKey: 'estoque',
        header: 'Estoque',
    },
    {
        accessorKey: 'disponibilidade',
        header: 'Disponibilidade',
        cell: (row) => {
            const product =  row.row.original;
            const label = getStatusLabel(product.disponibilidade);
            return <Badge className='bg-[#00A180] rounded-lg '>{label}</Badge>
        }
    },
];
