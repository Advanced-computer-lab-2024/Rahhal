import RabbitMQConnection from '@/config/rabbit-config';
import { RABBITMQ } from '@/utils/constants';
import * as jobHnadler from '@/workers/job-handler';

class NotificationWorker {
  private connection: RabbitMQConnection;

  constructor() {
    this.connection = RabbitMQConnection.getInstance();
  }

  async start() {
    await this.connection.connect();
    const channel = this.connection.channel;

    if (!channel) {
      throw new Error('RabbitMQ channel not initialized');
    }

    const queue = RABBITMQ.QUEUE.NOTIFICATION;
    await channel.assertQueue(queue, { durable: true });

    channel.consume(queue, async (msg) => {
      if (msg) {
        try {
          const notificationData = JSON.parse(msg.content.toString());
          await jobHnadler.sendNotification(notificationData);
          console.log('Notification processed:', notificationData);

          // Acknowledge message
          channel.ack(msg);
        } catch (error) {
          console.error('Notification processing error:', error);
          channel.nack(msg, false, false); // Reject and don't requeue
        }
      }
    });
  }
}

export default new NotificationWorker();
