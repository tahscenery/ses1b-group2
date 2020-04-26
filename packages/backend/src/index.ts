import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import { User } from './entity/User';
import { UserResolver } from './resolvers/UserResolver';
import express from 'express';
import * as dotenv from 'dotenv';
import * as typeGraphQL from 'type-graphql';
import * as typeorm from 'typeorm';

const app = express();
const port = 4000;
dotenv.config();

async function saveUser(connection: typeorm.Connection, user: User): Promise<void> {
  const loadedUsers = (await connection.mongoManager.find(User)).map(user => user.email);

  if (loadedUsers.includes(user.email)) {
    return Promise.reject(`Email '${user.email}' is already taken!`);
  }

  await connection.mongoManager.save(user);
  return Promise.resolve();
}

async function main(connection: typeorm.Connection) {
  const johnSmith = new User('john.smith@email.com', 'John', 'Smith', 'password123');
  const lucyLane = new User('lucy.lane@email.com', 'Lucy', 'Lane', 'password123');
  const markBrown = new User('mark.brown@email.com', 'Mark', 'Brown', '123password123');
  const samuelMueller = new User('samuel.mueller@email.com', 'Sam', 'Müller', '123password123');

  try {
    await saveUser(connection, johnSmith);
    await saveUser(connection, lucyLane);
    await saveUser(connection, markBrown);
    await saveUser(connection, samuelMueller);

    const loadedUsers = await connection.mongoManager.find(User);
    console.log(`*** Loaded users from database: ${
      loadedUsers
        .map(user => `${user.firstName} ${user.lastName} (${user.email})`)
        .join(", ")
    }`);
  } catch (error) {
    console.log(`*** Failed to save user: ${error}`);
  }
}

async function startConnection() {
  await typeorm.createConnection({
    name: 'default',
    type: 'mongodb',
    host: 'localhost',
    port: port,
    url: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@my-cluster-s1j8q.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
    database: "test",
    entities: [User],
  })
  .then(main)
  .catch(error => console.log(`*** Failed to create connection to database: \`${error}\``));

  const schema = await typeGraphQL.buildSchema({ resolvers: [UserResolver] });
  const apolloServer = new ApolloServer({ schema });
  apolloServer.applyMiddleware({ app });

  app.listen(port, () => {
    console.log(`\nServer started on http://localhost:${port}/graphql\n`);}
  );
}

startConnection().catch(error => console.log(`*** An error occured: ${error}`));
