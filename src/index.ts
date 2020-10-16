import { Server, Route } from '@app/server';
import { connectionPostgres } from '@app/setup.db';
import { createApolloServer } from '@graphql/graphql.config';
import { tokenCheck } from '@app/auth.middleware';
import { dbConnectionName } from '@app/config';

const healthCheck: Route = {
  path: '/status',
  handler: (req, res) => {
    res.send({ status: 'happy!' });
  }
};

const main = async () => {
  console.log('start!');
  await connectionPostgres.create(dbConnectionName());
  const apollo = await createApolloServer();
  const server = new Server();
  server.registerMiddleware([tokenCheck]);
  server.addApollo(apollo);
  server.registerRoutes([healthCheck]);
  server.init(8080);
};

main();
