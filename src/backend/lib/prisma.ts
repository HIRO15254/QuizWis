import { PrismaClient } from '@prisma/client';

// eslint-disable-next-line import/no-mutable-exports
export let prisma: PrismaClient;

declare global {
  // eslint-disable-next-line vars-on-top, no-var
  var prisma: PrismaClient;
}

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient({
      log: ['query', 'info', 'warn', 'error'],
    });
  }
  prisma = global.prisma;
}
