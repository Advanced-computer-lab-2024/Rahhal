import RabbitMQConnection from '@/config/rabbit-config';
import { RABBITMQ } from '@/utils/constants';

interface EventReminderData {
  entityId: string;
  message: string;
}

export async function publishEventReminder(data: EventReminderData) {
  try {
    const rabbitMQ = RabbitMQConnection.getInstance();
    await rabbitMQ.connect();
    const channel = rabbitMQ.channel;

    if (!channel) {
      throw new Error('RabbitMQ channel not initialized');
    }

    await channel.assertQueue(RABBITMQ.QUEUE.EVENT_REMINDER, { durable: true });
    channel.sendToQueue(RABBITMQ.QUEUE.EVENT_REMINDER, Buffer.from(JSON.stringify(data)));
    console.log(`Message published to queue: ${RABBITMQ.QUEUE.EVENT_REMINDER}`);
  } catch (err) {
    console.error('Error publishing event reminder:', err);
  }
}
