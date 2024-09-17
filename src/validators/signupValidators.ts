import Users from '@/prisma/classes/User.ts';

export const postSignupValidator = {
  email: {
    isEmail: true,
    custom: {
      options: async (value: string) => {
        const user = await Users.findByEmail(value);

        if (user) {
          throw new Error('This email is already in-use');
        }
      },
    },
  },
  username: {
    notEmpty: true,
    custom: {
      options: async (value: string) => {
        if (await Users.findByUsername(value)) {
          return Promise.reject(new Error('Username is already in-use'));
        }

        return true;
      },
    },
  },
  first_name: {
    notEmpty: true,
    isAlpha: true,
  },
  last_name: {
    notEmpty: true,
    isAlpha: true,
  },
  password: {
    isLength: {
      options: {
        min: 6,
      },
    },
  },
};
