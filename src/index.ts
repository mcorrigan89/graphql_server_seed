import 'reflect-metadata';
import { Server, Route } from '@app/server';
import { createApolloServer } from '@graphql/graphql.config';
import { tokenCheck } from '@app/auth.middleware';
import { serverConfig } from '@app/config';
import { datasource } from '@app/datasource';
import { initDI } from '@app/init.di';

const healthCheck: Route = {
  path: '/status',
  handler: (req, res) => {
    res.send({ status: 'happy!' });
  }
};

const main = async () => {
  console.log('start!');
  await datasource.initialize();
  initDI();
  const server = new Server();
  const { apolloServer, schema } = await createApolloServer(server.httpServer);
  server.registerMiddleware([tokenCheck]);
  await server.addApollo(apolloServer, schema);
  server.registerRoutes([healthCheck]);
  console.log(serverConfig.port)
  server.init(serverConfig.port);
};

main();
