import { HOST } from '../constants';
import { spec } from 'pactum';
import { test } from 'vitest';
import { Folder } from '@prisma/client';

test('fetching folders', async () => {
  await spec()
    .get(`${HOST}/folders`)
    .expectStatus(200)
    .then(
      async (data: Folder[]) => {
        if (data.length) await spec().get(`${HOST}/folders/${data[0].id}`).expectStatus(200);
      },
      (err) => {
        console.log(err);
      },
    );
});

test('create, update and delete folder', async () => {
  const folder = (await spec()
    .post(`${HOST}/folders/create`)
    .withCookies('connect.sid', 's%3A6iEB-F3BJa-WYD-H_vGl4iNoXNBF37Jk.Dwg4NdnYFUA2B78FuGQyejcl%2F31NQgkOiBde2TA6MDk')
    .withBody({ name: 'test create folder' })
    .expectStatus(302)) as Folder;
  console.log('create folder');

  await spec().post(`${HOST}/folders/${folder.id}/update`).withBody({ name: 'test update folder' }).expectStatus(302);
  console.log('update folder');

  await spec().post(`${HOST}/folders/${folder.id}/delete`).expectStatus(302);
  console.log('delete folder');
});
