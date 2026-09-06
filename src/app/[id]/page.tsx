import prisma from '../_db/prisma';
import Landing from './Landing';

export default async function Home({ params }: { params: Promise<{ id: string }> }) {

    const { id } = await params;

    const user = await prisma.usuarios.findUnique({where: {user: id}});

    return (
        <Landing user={user}/>
    );
}


