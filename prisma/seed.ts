import { PrismaClient } from '@prisma/client';
import * as crypto from 'crypto';

const prisma = new PrismaClient();

function hash(password: string) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

async function main() {
  const email = 'admin@example.com';
  const existing = await prisma.user.findUnique({ where: { email } });
  if (!existing) {
    await prisma.user.create({
      data: {
        email,
        name: 'Admin',
        passwordHash: hash('password123'),
      },
    });
    // eslint-disable-next-line no-console
    console.log('Seeded admin user:', email);
  } else {
    // eslint-disable-next-line no-console
    console.log('Admin already exists');
  }
}

main()
  .catch((e) => {
    // eslint-disable-next-line no-console
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

