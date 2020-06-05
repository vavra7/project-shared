import 'reflect-metadata';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema, Resolver, Query } from 'type-graphql';

const PORT = 4000;

@Resolver()
class HelloResolver {
  @Query(() => String)
  hello() {
    return 'Hello world!';
  }
}

async function main() {
  const schema = await buildSchema({
    resolvers: [HelloResolver]
  });
  const apolloServer = new ApolloServer({ schema });
  const app = express();

  apolloServer.applyMiddleware({ app });

  app.listen(PORT, () => console.log(`ready - started server on http://localhost:${PORT}`));
}

main();
