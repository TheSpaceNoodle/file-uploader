import express, { Application, Response } from 'express';

import 'dotenv/config';

const app: Application = express();

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (_, res: Response) => {
  res.send('Hello World!');
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on: http://localhost:${process.env.PORT}`);
});
