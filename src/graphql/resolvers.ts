import { Resolvers } from '@graphql/resolver.types';

export const resolvers = (): Resolvers => ({
  Query: {
    me: (_, __, context) => context.getCurrentUser(),
    user: (_, args, context) => context.userController.getUserById(args.id),
    users: (_, __, context, info) => {
      console.log(info.cacheControl.cacheHint);
      return context.userController.getUsers();
    }
  },
  Mutation: {
    createUser: (_, args, context) => context.userController.createUser(args.payload),
    login: (_, args, context) => context.userController.login(args.payload)
  }
});
