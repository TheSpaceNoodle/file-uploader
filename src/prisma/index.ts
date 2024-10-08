import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient().$extends({
  name: 'full_name',
  result: {
    user: {
      full_name: {
        needs: {
          first_name: true,
          last_name: true,
        },
        compute(data) {
          return `${data.first_name} ${data.last_name}`;
        },
      },
    },
  },
});

export default prisma;
