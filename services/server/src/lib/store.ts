import Redis from 'ioredis';
import { storeConfig } from '../config/storeConfig';

let store: Redis.Redis | undefined;

export function getStore(): Redis.Redis {
  if (!store) {
    store = new Redis(storeConfig);
  }

  return store;
}
