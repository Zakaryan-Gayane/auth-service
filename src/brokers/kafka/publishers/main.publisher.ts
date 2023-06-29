import { KafkaClient as Client, Producer, ProduceRequest } from "kafka-node";

export class Publisher {
    private client: Client;
    private producer: Producer;

    constructor(client: Client) {
        this.client = client;
        this.producer = new Producer(this.client);
    }

    publish(topic: string, message: string): Promise<void> {
        return new Promise((resolve, reject) => {
            this.producer.send(
                [{ topic, messages: [message] }],
                (err: Error, result: ProduceRequest): void => {
                    if (err)
                        return reject(err);
                    console.log('Message has published');
                    resolve();
                }
            );
        });
    }
}