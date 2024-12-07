import RabbitMQConnection from '@/config/rabbit-config';
import { RABBITMQ } from '@/utils/constants';

interface EventOpenData {
  entityId: string;
  message: string;
}

export async function publishEventOpen(data: EventOpenData) {
  try {
    const rabbitMQ = RabbitMQConnection.getInstance();
    await rabbitMQ.connect();
    const channel = rabbitMQ.channel;

    if (!channel) {
      throw new Error('RabbitMQ channel not initialized');
    }

    await channel.assertQueue(RABBITMQ.QUEUE.EVENT_OPEN, { durable: true });
    channel.sendToQueue(RABBITMQ.QUEUE.EVENT_OPEN, Buffer.from(JSON.stringify(data)));
    console.log(`Message published to queue: ${RABBITMQ.QUEUE.EVENT_OPEN}`);
  } catch (err) {
    console.error('Error publishing event open:', err);
  }
}
