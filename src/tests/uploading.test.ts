import { HOST } from '@/constants/index.ts';
import { spec } from 'pactum';
import { test } from 'vitest';
import { Folder } from '@prisma/client';

import 'dotenv/config';

test('fetching folders', async () => {
  const folders = (await spec()
    .get(`${HOST}/folders`)
    .withCookies(process.env.COOKIES_TESTS_NAME || '', process.env.COOKIES_TESTS_VALUE || '')
    .expectStatus(200)) as Folder[];

  if (folders.length) {
    await spec().get(`${HOST}/folders/${folders[0].id}`).expectStatus(200);
  }
});

test('create, update and delete folder', async () => {
  const folder = (await spec()
    .post(`${HOST}/folders/create`)
    .withCookies(process.env.COOKIES_TESTS_NAME || '', process.env.COOKIES_TESTS_VALUE || '')
    .withBody({ name: 'test create folder' })
    .expectStatus(302)) as Folder;
  console.log('create folder');

  await spec().post(`${HOST}/folders/${folder.id}/update`).withBody({ name: 'test update folder' }).expectStatus(302);
  console.log('update folder');

  await spec().post(`${HOST}/folders/${folder.id}/delete`).expectStatus(302);
  console.log('delete folder');
});
