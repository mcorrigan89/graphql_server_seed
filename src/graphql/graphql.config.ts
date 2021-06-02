import { ApolloServer } from 'apollo-server-express';
import { Context } from '@app/context';
import { AuthenticatedRequest } from '@app/auth.middleware';
import { merge } from 'lodash';
import { addResolveFunctionsToSchema } from 'apollo-server';
import { resolvers } from '@graphql/resolvers';
import { Server } from 'http';
import { loadSchema } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { createWebsocketServer } from '@app/websocket.server';
import { RedisPubSub } from 'graphql-redis-subscriptions';

export const createSchema = async (pubsub: RedisPubSub) => {
  const schemaTypeDefs = await loadSchema('./src/**/*.graphql', { loaders: [new GraphQLFileLoader()] });
  const schema = addResolveFunctionsToSchema({
    schema: schemaTypeDefs,
    resolvers: merge(resolvers(pubsub))
  });
  return schema;
};

export const createApolloServer = async (server: Server, pubsub: RedisPubSub) => {
  const schema = await createSchema(pubsub);
  createWebsocketServer(server, schema);
  return new ApolloServer({
    schema,
    introspection: true,
    context: async ctx => {
      try {
        const context = new Context();
        const token = (ctx.req as AuthenticatedRequest).decodedToken;
        if (token) {
          await context.setCurrentUser(token.id);
        }
        return context;
      } catch (err) {
        console.log(err);
      }
    }
  });
};
