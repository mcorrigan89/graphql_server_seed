import { ApolloServer } from 'apollo-server-express';
import { Context } from '@app/context';
import { AuthenticatedRequest } from '@app/auth.middleware';
import { merge } from 'lodash';
import { addResolveFunctionsToSchema } from 'apollo-server';
import { resolvers } from '@graphql/resolvers';
import { join } from 'path';
import { loadSchema } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';

export const createSchema = async () => {
  const schemaTypeDefs = await loadSchema('./src/**/*.graphql', { loaders: [new GraphQLFileLoader()] });
  const schema = addResolveFunctionsToSchema({
    schema: schemaTypeDefs,
    resolvers: merge(resolvers) ,
  });
  return schema;
};

export const createApolloServer = async () => {
  const schema = await createSchema();
  return new ApolloServer({
    schema,
    introspection: true, 
    context: async ctx => {
      const context = new Context();
      const token = (ctx.req as AuthenticatedRequest).decodedToken;
      if (token) {
        await context.setCurrentUser(token.id)
      }
      return context;
    }
  });
}