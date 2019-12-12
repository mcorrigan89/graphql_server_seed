import { createConnection } from 'typeorm';
import { Server, Route } from '@app/server';
import { createApolloServer } from '@graphql/graphql.config';
import { tokenCheck } from '@app/auth.middleware';

const healthCheck: Route = {
  path: '/status',
  handler: (req, res) => {
    res.send({ status: 'happy!' })
  }
}

const main = async () => {
  await createConnection()
  const apollo = await createApolloServer();
  const server = new Server();
  server.registerMiddleware([
    tokenCheck
  ]);
  server.addApollo(apollo);
  server.registerRoutes([
    healthCheck,
  ]);
  server.init(8080);
}

main();