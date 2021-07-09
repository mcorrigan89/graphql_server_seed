import { Server, Route } from '@app/server';
import { connectionPostgres } from '@app/setup.db';
import { createApolloServer } from '@graphql/graphql.config';
import { tokenCheck } from '@app/auth.middleware';
import { dbConnectionName, serverConfig } from '@app/config';

const healthCheck: Route = {
  path: '/status',
  handler: (req, res) => {
    res.send({ status: 'happy!' });
  }
};

const main = async () => {
  console.log('start!');
  await connectionPostgres.create(dbConnectionName());
  const server = new Server();
  const { apolloServer, schema } = await createApolloServer(server.httpServer);
  server.registerMiddleware([tokenCheck]);
  server.addApollo(apolloServer, schema);
  server.registerRoutes([healthCheck]);
  server.init(serverConfig.port);
};

main();
