import { ApolloServer } from 'apollo-server-express';
import { Context } from '@app/context';
import { AuthenticatedRequest } from '@app/auth.middleware';
import { merge } from 'lodash';
import { addResolveFunctionsToSchema } from 'apollo-server';
import { KeyValueCache } from 'apollo-server-caching';
import { resolvers } from '@graphql/resolvers';
import { Server } from 'http';
import { loadSchema } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import responseCachePlugin from 'apollo-server-plugin-response-cache';

export const createSchema = async () => {
  const schemaTypeDefs = await loadSchema('./src/**/*.graphql', { loaders: [new GraphQLFileLoader()] });
  const schema = addResolveFunctionsToSchema({
    schema: schemaTypeDefs,
    resolvers: merge(resolvers())
  });
  return schema;
};

export const createApolloServer = async (server: Server) => {
  const schema = await createSchema();
  const apolloServer = new ApolloServer({
    schema,
    introspection: true,
    plugins:[responseCachePlugin({
      sessionId: (requestContext) => { 
        const context = requestContext.context as Context;
        const user = context.getCurrentUser();
        const userId = user?.id;
        return userId ?? null;
      },
    })],
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
  return { apolloServer, schema };
};
