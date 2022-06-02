import { Resolvers } from '@graphql/resolver.types';

export const resolvers = (): Resolvers => ({
  Query: {
    me: (_, __, context) => context.getCurrentUser(),
    user: (_, args, context) => context.userController.getUserById(args.id)
  },
  Mutation: {
    createUser: (_, args, context) => context.userController.createUser(args.payload),
    login: (_, args, context) => context.userController.login(args.payload)
  }
});
