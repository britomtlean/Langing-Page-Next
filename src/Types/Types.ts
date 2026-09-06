export type Produto = {
    produtoId: string;
    nome: string;
    imagem?: string
    quantidade: number;
    valorUnitario: number;
    subtotal: number;
};

export type ProdutoDB = {
    id: string;
    categoria: String | null;
    descricao: string;
    imagem: string;
    nome: string;
    disponibilidade: boolean;
    valor: string;
};
