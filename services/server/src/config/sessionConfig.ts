import session, { SessionOptions } from 'express-session';
import connectRedis from 'connect-redis';
import Redis from 'ioredis';
import { storageConfig } from './storageConfig';

const RedisStore = connectRedis(session);

export const sessionConfig: SessionOptions = {
  store: new RedisStore({
    client: new Redis(storageConfig)
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
