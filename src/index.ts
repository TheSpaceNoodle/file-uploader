import express, { Application } from 'express';

import passport from 'passport';
import path from 'path';
import { fileURLToPath } from 'url';
import { HOST } from '@/constants/index.ts';
import { sessionsMiddleware } from '@/prisma/sessionsMiddleware.ts';
import { foldersRouter, indexRouter, loginRouter, sharedFoldersRouter, signUpRouter } from '@/routes/index.ts';
import { authenticatedRoute } from '@/middleware/index.ts';

import '@/auth/passport';
import 'dotenv/config';

const app: Application = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(sessionsMiddleware);
app.use(passport.session());

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/sign-up', signUpRouter);
app.use('/folders', authenticatedRoute, foldersRouter);
app.use('/share', sharedFoldersRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on: ${HOST}`);
});
