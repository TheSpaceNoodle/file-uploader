import expressSession from 'express-session';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import prisma from '@/prisma';

export const sessionsMiddleware = expressSession({
  cookie: {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 1 week
  },
  secret: 'pepe',
  resave: true,
  saveUninitialized: false,
  store: new PrismaSessionStore(prisma, {
    checkPeriod: 2 * 60 * 1000,
    dbRecordIdIsSessionId: true,
    dbRecordIdFunction: undefined,
  }),
});
