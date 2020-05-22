import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";

import * as resolvers from "./resolvers";
import connectDB from "./connection";

const main = async () => {
  const schema = await buildSchema({
    resolvers: [
      resolvers.AdminResolver,
      resolvers.ItemResolver,
      resolvers.StaffResolver,
      resolvers.TableResolver,
      resolvers.UserResolver,
    ],
    emitSchemaFile: true,
    validate: false,
  });

  // create mongoose connection
  await connectDB();
  
  const app = express();
  const server = new ApolloServer({ schema });
  server.applyMiddleware({ app });

  const port = 4000;
  app.listen({ port }, () =>
    console.log(
      `🚀 Server ready and listening at => http://localhost:${port}${server.graphqlPath}`
    )
  );
};

main().catch((error) => {
  console.log(error, "error");
});
