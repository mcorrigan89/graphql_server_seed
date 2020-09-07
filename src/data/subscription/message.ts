import { PubSub } from 'graphql-subscriptions';
import { Subscriber } from '@utils/subscriber';

export const pubsub = new PubSub();

export const SOMETHING_CHANGED_TOPIC = 'something-changed';

export const subscriber = new Subscriber<'message', { id: string; text: string }>(pubsub, 'message', SOMETHING_CHANGED_TOPIC);

// setInterval(() => {
//   subscriber.publish({ message: { id: '345', text: new Date().toLocaleTimeString() } });
// }, 5000);
