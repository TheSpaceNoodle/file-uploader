import { test } from 'vitest';
import { spec } from 'pactum';
import { Prisma } from '@prisma/client';
import { HOST } from '@/constants/index.ts';

test('login with wrong credentials', async () => {
  await spec().post(`${HOST}/login`).withBody({ username: 'user', password: 'password' }).expectStatus(401);
});

test('login with right credentials', async () => {
  await spec().post(`${HOST}/login`).withBody({ username: 'user', password: 'user' }).expectStatus(302);
});

test('log out', async () => {
  await spec().get(`${HOST}/login/logout`).expectStatus(302);
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
