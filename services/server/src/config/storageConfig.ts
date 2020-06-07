import { RedisOptions } from 'ioredis';

export const storageConfig: RedisOptions = {
  host: 'storage',
  port: 6379,
  password: process.env.STORAGE_PASSWORD
};
