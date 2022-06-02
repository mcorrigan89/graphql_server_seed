import { ApolloServer } from 'apollo-server-express';
import { Context, ContextFactory } from '@app/context';
import { AuthenticatedRequest } from '@app/auth.middleware';
import { merge } from 'lodash';
import { resolvers } from '@resolvers/resolvers';
import { Server } from 'http';
import { loadSchema } from '@graphql-tools/load';
import { addResolversToSchema } from '@graphql-tools/schema'
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { container } from 'tsyringe';

export const createSchema = async () => {
  const schemaTypeDefs = await loadSchema('./src/**/*.graphql', { loaders: [new GraphQLFileLoader()] });
  const schema = addResolversToSchema({
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
    plugins:[],
    context: async ctx => {
      const contextFactory = container.resolve(ContextFactory)
      try {
        const context = contextFactory.createContext();
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
