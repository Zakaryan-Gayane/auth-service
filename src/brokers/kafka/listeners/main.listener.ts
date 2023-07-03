import { ConsumerGroup, Message, ConsumerGroupOptions } from 'kafka-node';

export abstract class Listener {
  private consumer?: ConsumerGroup;
  private options?: ConsumerGroupOptions;
  private kafkaHost = process.env.KAFKA_HOST || 'kafka:9092';

  abstract onMessage(message: Message): void;

  constructor(groupId: string) {
    this.options = {
      groupId,
      kafkaHost: this.kafkaHost,
      autoCommit: true,
      fetchMaxWaitMs: 1000,
      fetchMaxBytes: 1024 * 1024,
      protocol: ['roundrobin']
    };
  }

  subscribe(topic: string) {
    this.consumer = new ConsumerGroup(this.options, topic);

    this.consumer!.on('message', (message) => {
      this.onMessage(message);
    });

  }
}
