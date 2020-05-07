import { ApolloServer } from "apollo-server-express";
import Express from "express";
import "reflect-metadata";
import { buildSchema } from "type-graphql";

import { UserResolver } from "./resolvers/User";
import { ProductResolver } from "./resolvers/Product";
import { ItemResolver } from "./resolvers/Item";

const connectDB = require("./connection");

const main = async () => {
  const schema = await buildSchema({
    resolvers: [    
      ItemResolver,
      ProductResolver,
      UserResolver,
    ],
    emitSchemaFile: true,
    validate: false,
  });

  // create mongoose connection
  const mongoose = connectDB();
  await mongoose;

  const server = new ApolloServer({ schema });

  const app = Express();

  server.applyMiddleware({ app });

  app.listen({ port: 3333 }, () =>
    console.log(
      `🚀 Server ready and listening at ==> http://localhost:3333${server.graphqlPath}`
    )
  );
};

main().catch((error) => {
  console.log(error, "error");
});