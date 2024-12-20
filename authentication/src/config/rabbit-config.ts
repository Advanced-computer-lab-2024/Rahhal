import amqp from 'amqplib';
import { RABBITMQ } from '@/utils/constants';

class RabbitMQConnection {
  private static instance: RabbitMQConnection;
  public connection: amqp.Connection | null = null;
  public channel: amqp.Channel | null = null;

  private constructor() {}

  public static getInstance(): RabbitMQConnection {
    if (!RabbitMQConnection.instance) {
      RabbitMQConnection.instance = new RabbitMQConnection();
    }
    return RabbitMQConnection.instance;
  }

  async connect() {
    if (this.connection) return this.connection;

    try {
      this.connection = await amqp.connect(process.env.RABBITMQ_URL || 'amqp://rabbitmq');
      this.channel = await this.connection.createChannel();

      // Declare queues
      await this.channel.assertQueue(RABBITMQ.QUEUE.NOTIFICATION, { durable: true });

      return this.connection;
    } catch (error) {
      console.error('RabbitMQ Connection Error:', error);
      throw error;
    }
  }
}

export default RabbitMQConnection;
