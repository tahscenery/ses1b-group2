import 'reflect-metadata';
import express from 'express';
import * as typeGraphQL from 'type-graphql';
import * as typeorm from 'typeorm';

export const sayHello = 'Hello, World!'
const app = express();
const port = 4000;

(async () => {
  // await typeorm.createConnection().catch(error => {
  //   console.log(`Error: Failed to create connection to database: \`${error}\``)
  // });

  // const schema = await typeGraphQL.buildSchema({ resolvers: [] });

  app.listen(port, () => {
    console.log(`\nServer started on http://localhost:${port}/graphql\n`);}
  );
})();
