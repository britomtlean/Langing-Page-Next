/* eslint-disable no-unused-vars */
import { PrismaClient } from '@prisma/client';

declare global {
    // adicionei uma propriedade em global para instanciar o prisma
    var cachedPrisma: ReturnType<typeof createPrismaClient>;
}

const createPrismaClient = () => {

    return new PrismaClient();

};

let prisma: ReturnType<typeof createPrismaClient>;

if (process.env.NODE_ENV === 'production') {
    prisma = createPrismaClient();
} else {
    if (!global.cachedPrisma) {
        global.cachedPrisma = createPrismaClient();
    }
    prisma = global.cachedPrisma;
}

export default prisma;
