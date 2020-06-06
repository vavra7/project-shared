import 'reflect-metadata';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import { resolvers } from './resolver';
import dotenv from 'dotenv';
import { entities } from './entity';

const PORT = 4000;

dotenv.config();

async function main() {
  createConnection({
    type: 'postgres',
    host: 'db',
    port: 5432,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    synchronize: true,
    logging: true,
    entities: entities
  })
    .then(() => {
      console.log('database connection SUCCESSFUL');
    })
    .catch(err => {
      console.log('database connection FAILED');
      console.log(err);
    });

  const schema = await buildSchema({
    resolvers: resolvers
  });
  const apolloServer = new ApolloServer({ schema });
  const app = express();

  apolloServer.applyMiddleware({ app });

  app.listen(PORT, () => console.log(`ready - started server on http://localhost:${PORT}`));
}

main();
