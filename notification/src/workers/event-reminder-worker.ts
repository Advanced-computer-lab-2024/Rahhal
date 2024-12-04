import RabbitMQConnection from '@/config/rabbit-config';
import { RABBITMQ } from '@/utils/constants';
import * as jobHnadler from '@/workers/job-handler';

class EventReminderWorker {
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

    const queue = RABBITMQ.QUEUE.EVENT_REMINDER;
    await channel.assertQueue(queue, { durable: true });

    channel.consume(queue, async (msg) => {
      if (msg) {
        try {
          const reminderData = JSON.parse(msg.content.toString());
          await jobHnadler.sendEventReminder(reminderData.entityId, reminderData.userId, reminderData.type);

          // Acknowledge message
          channel.ack(msg);
        } catch (error) {
          console.error('Event reminder processing error:', error);
          channel.nack(msg, false, false); // Reject and don't requeue
        }
      }
    });
  }
}

export default new EventReminderWorker();
