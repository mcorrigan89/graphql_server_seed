import { RedisPubSub } from 'graphql-redis-subscriptions';
import Redis from 'ioredis';
import { serverConfig } from '@app/config';

const redisOptions = {
  host: serverConfig.redis.host,
  port: Number(serverConfig.redis.port)
};

export const pubsub = new RedisPubSub({
  publisher: new Redis(redisOptions),
  subscriber: new Redis(redisOptions)
});

export class Subscriber<U extends string, T> {
  private pubsub: RedisPubSub;
  private name: U;
  private channel: string;

  constructor(pubsub: RedisPubSub, name: U, channel: string) {
    this.pubsub = pubsub;
    this.name = name;
    this.channel = channel;
  }

  public publish = (data: { [key in U]: T }) => {
    this.pubsub.publish(this.channel, data);
  };

  public resolve = (source: { [key in U]: T }): T => {
    return source[this.name];
  };

  public subscribe = () => this.pubsub.asyncIterator(this.channel);
}
