import Redis from 'ioredis';
import { serverConfig } from '@app/config';
import { RedisPubSub } from 'graphql-redis-subscriptions';

const redisOptions = {
  host: serverConfig.redis.host,
  port: Number(serverConfig.redis.port)
};

export const createRedisPubSub = () => {
  const pubsub = new RedisPubSub({
    publisher: new Redis(redisOptions),
    subscriber: new Redis(redisOptions)
  });
  return pubsub;
};
