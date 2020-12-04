import { subscriber } from '@data/subscription/message';
import { Resolvers } from '@graphql/resolver.types';
import { RedisPubSub } from 'graphql-redis-subscriptions';

export const resolvers = (pubsub: RedisPubSub): Resolvers => ({
  Query: {
    me: (_, __, context) => context.getCurrentUser(),
    user: (_, args, context) => context.userController.getUserById(args.id),
    users: (_, __, context) => context.userController.getUsers()
  },
  Mutation: {
    createUser: (_, args, context) => context.userController.createUser(args.payload),
    login: (_, args, context) => context.userController.login(args.payload),
    sendMessage: (_, args) => {
      const message = { id: Date.now().toString(), ...args.payload };
      subscriber(pubsub).publish({ message });
      return message;
    }
  },
  Subscription: {
    message: subscriber(pubsub)
  }
});
