import amqp from 'amqplib/callback_api';

interface Message {
  [key: string]: string;
}

class RabbitMQ {
  private readonly amqpUrl: string;
  private connection?: amqp.Connection;
  private channel?: amqp.Channel;

  constructor(amqpUrl: string) {
    this.amqpUrl = amqpUrl;
  }

  private async connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      amqp.connect(this.amqpUrl, (err, connection) => {
        if (err) {
          reject(err);
          return;
        }

        this.connection = connection;

        connection.createChannel((error, channel) => {
          if (error) {
            reject(error);
            return;
          }

          this.channel = channel;
          resolve();
        });
      });
    });
  }

  private async ensureConnection(): Promise<void> {
    if (!this.connection || !this.channel) {
      await this.connect();
    }
  }

  async send(exchange: string, queue: string, message: Message): Promise<void> {
    await this.ensureConnection();

    if (!this.channel) {
      throw new Error('RabbitMQ channel not available');
    }

    this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), {
      persistent: true,
    });
  }

  async receive(
    exchange: string,
    queue: string,
    handler: (message: Message) => void,
  ): Promise<void> {
    await this.ensureConnection();

    if (!this.channel) {
      throw new Error('RabbitMQ channel not available');
    }

    this.channel.assertQueue(queue, { durable: true });

    this.channel.consume(queue, (msg) => {
      const message = msg ? JSON.parse(msg?.content.toString()) : null;
      handler(message);
    });
  }
}
