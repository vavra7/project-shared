import session, { SessionOptions } from 'express-session';
import connectRedis from 'connect-redis';
import { getStore } from '../lib/store';

const RedisStore = connectRedis(session);

export const sessionConfig: SessionOptions = {
  store: new RedisStore({
    client: getStore()
  }),
  secret: process.env.SESSION_SECRET || 'DEFAULT_SECRET',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false,
    maxAge: 1000 * 60 * 60 * 24
  }
};
