import RabbitMQConnection from '@/config/rabbit-config';
import { RABBITMQ } from '@/utils/constants';
import * as jobHnadler from '@/workers/job-handler';

class EventOpenWorker {
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

    const queue = RABBITMQ.QUEUE.EVENT_OPEN;
    await channel.assertQueue(queue, { durable: true });

    channel.consume(queue, async (msg) => {
      if (msg) {
        try {
          const eventData = JSON.parse(msg.content.toString());
          await jobHnadler.openEvent(eventData.entityId, eventData.message);

          // Acknowledge message
          channel.ack(msg);
        } catch (error) {
          console.error('Event open processing error:', error);
          channel.nack(msg, false, false); // Reject and don't requeue
        }
      }
    });
  }
}

export default new EventOpenWorker();
