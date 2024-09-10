import { HOST } from '@/constants';
import { spec } from 'pactum';
import { test } from 'vitest';
import { Response } from '@/prisma/models/Response.ts';
import { Folder } from '@prisma/client';

test('fetching folders', async () => {
  await spec()
    .get(`${HOST}/folders`)
    .expectStatus(200)
    .then(
      async (data: Response<Folder>) => {
        if (data.results.length) await spec().get(`${HOST}/folders/someId`).expectStatus(200);
      },
      (err) => {
        console.log(err);
      },
    );
});
