import { UserResolvers } from '@graphql/resolver.types';

export const userResolvers: UserResolvers = {
  id: userView => {
    return userView.id();
  }
};
