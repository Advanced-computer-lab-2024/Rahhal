import RabbitMQConnection from '@/config/rabbit-config';
import { RABBITMQ } from '@/utils/constants';

interface NotificationData {
  userId: string;
  message: string;
}

export async function publishNotification(data: NotificationData) {
    const rabbitMQ = RabbitMQConnection.getInstance();
    await rabbitMQ.connect();
    const channel = rabbitMQ.channel;

    if (!channel) {
      throw new Error('RabbitMQ channel not initialized');
    }
    else { 
      console.log("Channel is initialized");
    }

    await channel.assertQueue(RABBITMQ.QUEUE.NOTIFICATION, { durable: true });
    channel.sendToQueue(RABBITMQ.QUEUE.NOTIFICATION, Buffer.from(JSON.stringify(data)));
    console.log(`Message published to queue: ${RABBITMQ.QUEUE.NOTIFICATION}`);
}
