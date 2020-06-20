import { RedisOptions } from 'ioredis';

export const storeConfig: RedisOptions = {
  host: 'store',
  port: 6379,
  password: process.env.STORE_PASSWORD
};
