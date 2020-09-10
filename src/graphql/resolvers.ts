import { subscriber } from '@data/subscription/message';
import { Resolvers } from '@graphql/resolver.types';

export const resolvers: Resolvers = {
  Query: {
    me: (_, __, context) => context.getCurrentUser(),
    user: (_, args, context) => context.userController.getUserById(args.id)
  },
  Mutation: {
    createUser: (_, args, context) => context.userController.createUser(args.payload),
    login: (_, args, context) => context.userController.login(args.payload),
    sendMessage: (_, args) => {
      const message = { id: Date.now().toString(), ...args.payload };
      console.log(message);
      subscriber.publish({ message });
      return message;
    }
  },
  Subscription: {
    message: subscriber
  }
};
