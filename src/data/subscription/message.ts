import { Subscriber } from '@utils/subscriber';
import { RedisPubSub } from 'graphql-redis-subscriptions';

export const SOMETHING_CHANGED_TOPIC = 'something-changed';

export const subscriber = (pubsub: RedisPubSub) => new Subscriber<'message', { id: string; text: string }>(pubsub, 'message', SOMETHING_CHANGED_TOPIC);
