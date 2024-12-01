import { PrismaClient } from '@prisma/client';

declare global {
  var prisma: PrismaClient | undefined;
}

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;

export async function testPrismaConnection() {
  try {
    await prisma.$connect();
    console.log('Successfully connected to the database via Prisma');
    await prisma.$disconnect();
  } catch (error) {
    console.error('Failed to connect to the database via Prisma:', error);
    throw error;
  }
}
