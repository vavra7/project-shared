import 'reflect-metadata';
import dotenv from 'dotenv';
import express from 'express';
import session from 'express-session';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import { resolvers } from './resolver';
import { dbConfig, sessionConfig, corsConfig } from './config';

const PORT = 4000;

async function main() {
  await createConnection(dbConfig).catch(err => {
    console.error(err);
  });

  const schema = await buildSchema({ resolvers });
  const apolloServer = new ApolloServer({ schema, context: ({ req }) => ({ req }) });
  const app = express();

  app.use(cors(corsConfig));
  app.use(session(sessionConfig));
  apolloServer.applyMiddleware({ app });
  app.listen(PORT, () => console.log(`ready - started server on http://localhost:${PORT}`));
}

dotenv.config();
main();
