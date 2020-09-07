import { PubSub } from 'graphql-subscriptions';

export class Subscriber<U extends string, T> {
  private pubsub: PubSub;
  private name: U;
  private channel: string;

  constructor(pubsub: PubSub, name: U, channel: string) {
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
