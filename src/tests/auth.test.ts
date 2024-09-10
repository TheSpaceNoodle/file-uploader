import { test } from 'vitest';
import { spec } from 'pactum';
import { Prisma } from '@prisma/client';
import { HOST } from '@/constants';

test('login with wrong credentials', async () => {
  await spec().post(`${HOST}/login`).withAuth('user', 'password').expectStatus(401);
});

test('login with right credentials', async () => {
  await spec().post(`${HOST}/login`).withAuth('user', 'user').expectStatus(200);
});

test('sign up with already existing username & email', async () => {
  const existingUser: Prisma.UserCreateInput = {
    email: 'user@user.com',
    first_name: 'Firstname',
    last_name: 'Lastname',
    username: 'user',
    password: 'user',
  };

  await spec().post(`${HOST}/sign-up`).withBody(existingUser).expectStatus(400);
});
