import { ApolloServer } from 'apollo-server-express';
import { Context } from '@app/context';
import { AuthenticatedRequest } from '@app/auth.middleware';
import { merge } from 'lodash';
import { makeExecutableSchema, gql } from 'apollo-server';
import { userResolvers } from '@data/user/resolvers';
import { importSchema } from 'graphql-import';

export const createSchema = () => {
  const schema = makeExecutableSchema({ 
    typeDefs: importSchema('src/graphql/schema.graphql'), 
    resolvers: merge(userResolvers) 
  });
  return schema;
};

export const createApolloServer = async () => {
  const schema = createSchema();
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