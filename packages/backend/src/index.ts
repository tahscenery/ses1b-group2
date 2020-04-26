import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import { UserResolver } from './resolvers/UserResolver';
import express from 'express';
import * as typeGraphQL from 'type-graphql';
import * as typeorm from 'typeorm';

export const sayHello = 'Hello, World!'
const app = express();
const port = 4000;

async function main() {
  await typeorm.createConnection().catch(error => {
    console.log(`Error: Failed to create connection to database: \`${error}\``)
  });

  const schema = await typeGraphQL.buildSchema({ resolvers: [UserResolver] });
  const apolloServer = new ApolloServer({ schema });
  apolloServer.applyMiddleware({ app });

  app.listen(port, () => {
    console.log(`\nServer started on http://localhost:${port}/graphql\n`);}
  );
}

main().catch(error => console.log(`*** An error occured: ${error}`));
