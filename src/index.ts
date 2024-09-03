import express, { Application, Response } from 'express';
import expressSession from 'express-session';

import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import 'dotenv/config';
import prisma from './prisma';

const app: Application = express();

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  expressSession({
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
  }),
);

app.get('/', (_, res: Response) => {
  res.send('Hello World!');
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on: http://localhost:${process.env.PORT}`);
});
