import plantas from './data/plantas.json' with { type: 'json' };
import pacientes from './data/pacientes.json' with { type: 'json' };
import medicinas from './data/medicinas.json' with { type: 'json' };

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    // PELIGRO: Borramos todo
    await prisma.medicina.deleteMany();
    await prisma.paciente.deleteMany();
    await prisma.planta.deleteMany();

    // Reset auto-increment
    try {
        await prisma.$executeRaw`ALTER TABLE Medicina AUTO_INCREMENT = 1;`
        await prisma.$executeRaw`ALTER TABLE Paciente AUTO_INCREMENT = 1;`
        await prisma.$executeRaw`ALTER TABLE Planta AUTO_INCREMENT = 1;`
    } catch (e) {
        console.log("No se pudo resetear el auto_increment (posiblemente SQLite/Postgres no soporte esto de esta manera)")
    }


    console.log("Añadiendo plantas...")
    await prisma.planta.createMany({
        data: plantas,
        skipDuplicates: true,
    });

    console.log("Añadiendo pacientes...")
    await prisma.paciente.createMany({
        data: pacientes,
        skipDuplicates: true,
    });

    console.log("Añadiendo medicinas...")
    await prisma.medicina.createMany({
        data: medicinas,
        skipDuplicates: true,
    });

    console.log("Listo!")
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
