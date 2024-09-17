import passport from 'passport';
import { Strategy } from 'passport-local';
import { User } from '@prisma/client';
import Users from '@/prisma/classes/User.ts';
import bcrypt from 'bcryptjs';

passport.use(
  new Strategy(async (username, password, done) => {
    try {
      const user: User | null = await Users.findByUsername(username);

      if (!user) {
        return done(null, false, { message: 'Incorrect username or password.' });
      }

      if (bcrypt.compareSync(password, user.password)) {
        return done(null, user);
      }

      return done(null, false, { message: 'Incorrect username or password' });
    } catch (e) {
      done(e, false);
    }
  }),
);

// Somehow even though Express.User type has the same fields as Prisma.User, it throws field mismatch error
// Error can be ignored but I chose not to
passport.serializeUser((user, done) => {
  // Workaround I came out with
  done(null, (user as User).id);
});

passport.deserializeUser(async (userId: string, done) => {
  try {
    const user: User | null = await Users.findById(userId);

    if (!user) {
      done('No such user', false);
    }

    return done(null, user);
  } catch (e) {
    return done(e, false);
  }
});
