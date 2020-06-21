import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Request } from 'express';
import session from 'express-session';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import { corsConfig } from './config/corsConfig';
import { dbConfig } from './config/dbConfig';
import { sessionConfig } from './config/sessionConfig';
import { resolvers } from './modules/resolvers';

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
