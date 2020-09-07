import { Server } from 'http';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { execute, GraphQLSchema, subscribe } from 'graphql';

// const WS_PORT = 5000;

// const websocketServer = createServer((request, response) => {
//   response.writeHead(404);
//   response.end();
// });

// websocketServer.listen(WS_PORT, () => console.log(`Websocket Server is now running on http://localhost:${WS_PORT}`));

export const createWebsocketServer = (server: Server, schema: GraphQLSchema) =>
  SubscriptionServer.create(
    {
      schema,
      execute,
      subscribe
    },
    {
      server: server,
      path: '/graphql'
    }
  );
