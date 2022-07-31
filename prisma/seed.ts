import { PrismaClient } from '@prisma/client';
import { NIL as NIL_UUID } from 'uuid';

const prisma = new PrismaClient();

async function main() {
  const favs = await prisma.favs.upsert({
    where: { id: NIL_UUID },
    update: {},
    create: { id: NIL_UUID },
  });

  console.log(favs);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
