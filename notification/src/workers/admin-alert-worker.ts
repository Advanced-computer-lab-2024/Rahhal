import RabbitMQConnection from '@/config/rabbit-config';
import { RABBITMQ } from '@/utils/constants';
import * as jobHnadler from '@/workers/job-handler';

class AdminAlertWorker {
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

    const queue = RABBITMQ.QUEUE.ADMIN_ALERT;
    await channel.assertQueue(queue, { durable: true });

    channel.consume(queue, async (msg) => {
      if (msg) {
        try {
          const reminderData = JSON.parse(msg.content.toString());
          await jobHnadler.sendAdminAlert(reminderData.message);

          // Acknowledge message
          channel.ack(msg);
        } catch (error) {
          console.error('Admin Alert processing error:', error);
          channel.nack(msg, false, false); // Reject and don't requeue
        }
      }
    });
  }
}

export default new AdminAlertWorker();
