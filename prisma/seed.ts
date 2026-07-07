import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const email = process.env.SUPERADMIN_EMAIL;

if (!email) {
  console.error("SUPERADMIN_EMAIL belum di-set di .env");
  process.exit(1);
}

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    console.error(`User dengan email ${email} belum terdaftar. Daftar dulu, lalu jalankan ulang.`);
    process.exit(1);
  }

  await prisma.user.update({
    where: { email },
    data: { role: "superadmin" },
  });

  console.log(`✓ ${email} sekarang superadmin`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
