import { Resolvers } from '@graphql/resolver.types';

export const resolvers: Resolvers = {
  Query: {
    me: (_, __, context) => context.getCurrentUser(),
    user: (_, args, context) => context.userController.getUserById(context, args.id)
  },
  Mutation: {
    createUser: (_, args, context) => context.userController.createUser(context, args.payload),
    login: (_, args, context) => context.userController.login(context, args.payload),
  }
}