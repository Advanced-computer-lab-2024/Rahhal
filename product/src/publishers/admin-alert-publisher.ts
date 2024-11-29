import RabbitMQConnection from '@/config/rabbit-config';
import { RABBITMQ } from '@/utils/constants';

interface AdminAlertData {
  message: string;
}

export async function publishAdminAlert(data: AdminAlertData) {
  try {
    const rabbitMQ = RabbitMQConnection.getInstance();
    await rabbitMQ.connect();
    const channel = rabbitMQ.channel;

    if (!channel) {
      throw new Error('RabbitMQ channel not initialized');
    }

    await channel.assertQueue(RABBITMQ.QUEUE.ADMIN_ALERT, { durable: true });
    channel.sendToQueue(RABBITMQ.QUEUE.ADMIN_ALERT, Buffer.from(JSON.stringify(data)));
    console.log(`Message published to queue: ${RABBITMQ.QUEUE.ADMIN_ALERT}`);
  } catch (err) {
    console.error('Error publishing admin alert:', err);
  }
}
