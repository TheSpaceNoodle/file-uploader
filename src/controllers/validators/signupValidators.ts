import Users from '@/prisma/classes/User';

export const postSignupValidator = {
  email: {
    isEmail: true,
    custom: {
      options: async (value: string) => {
        if (await Users.findByEmail(value)) {
          return Promise.reject(new Error('This email is already in-use'));
        }

        return true;
      },
    },
    normalizeEmail: {
      options: { all_lowercase: true },
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
