import { InMemoryCache } from 'apollo-cache-inmemory';
import { initialState } from '../../store';

export function getInMemoryCache(): InMemoryCache {
  const inMemoryCache = new InMemoryCache();

  inMemoryCache.writeData({ data: initialState });

  return inMemoryCache;
}
