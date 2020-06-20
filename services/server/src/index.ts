import 'reflect-metadata';
import dotenv from 'dotenv';
import express from 'express';
import session from 'express-session';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import { resolvers } from './modules/resolvers';
import { dbConfig } from './config/dbConfig';
import { sessionConfig } from './config/sessionConfig';
import { corsConfig } from './config/corsConfig';
import { Request } from 'express';

const PORT = 4000;

async function main() {
  await createConnection(dbConfig).catch(err => {
    console.error(err);
  });

  const schema = await buildSchema({
    resolvers,
    authChecker: ({ context: { req } }) => !!req.session.userId
  });
  const apolloServer = new ApolloServer({
    schema,
    context: ({ req }: { req: Request }) => ({ req })
  });
  const app = express();

  app.use(cors(corsConfig));
  app.use(session(sessionConfig));
  apolloServer.applyMiddleware({ app });
  app.listen(PORT, () => console.log(`ready - started server on http://localhost:${PORT}`));
}

dotenv.config();
main();
