import passport from 'passport';
import { Strategy } from 'passport-local';
import { User } from '@prisma/client';
import Users from '@/prisma/classes/User';
import bcrypt from 'bcryptjs';

passport.use(
  new Strategy(async (username, password, done) => {
    const user: User | null = await Users.findByUsername(username);

    if (!user) {
      return done('No such user', false);
    }

    if (bcrypt.compareSync(password, user.password)) {
      return done(null, user);
    }

    return done('Wrong password', false);
  }),
);

passport.serializeUser((userId, done) => {
  done(null, userId);
});

passport.deserializeUser(async (userId: string, done) => {
  try {
    const user: User | null = await Users.findById(userId);

    if (!user) {
      throw new Error('No such user');
    }

    return done(null, user);
  } catch (e) {
    return done(e, null);
  }
});
