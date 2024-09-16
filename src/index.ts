import express, { Application } from 'express';

import passport from 'passport';
import path from 'path';
import { fileURLToPath } from 'url';
import { HOST } from './constants';
import { sessionsMiddleware } from './prisma/sessionsMiddleware';
import { foldersRouter, indexRouter, loginRouter, signUpRouter } from './routes';
import authenticatedRoute from './auth/authenticatedRoute';

import '@/auth/passport.ts';
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

app.listen(process.env.PORT, () => {
  console.log(`Server is running on: ${HOST}`);
});
