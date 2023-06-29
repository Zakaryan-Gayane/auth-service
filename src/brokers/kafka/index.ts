import { CreateTopicRequest, CreateTopicResponse, KafkaClient as Client } from 'kafka-node';

class Kafka {
    private _client?: Client;

    get client() {
        if (!this._client) {
            throw new Error('Cannot connect to Kafka');
        }

        return this._client;
    }

    connect(kafkaHost: string) {

        this._client = new Client({ kafkaHost });

        this._client.on('error', (error) => {
            console.error('kafka err', error);
            //setInterval(() => {
            //    //this._client.close();
            //    //this.connect(kafkaHost)
            //}, 5000)
        });

        // this._client.on('close', () => {
        //     console.error('kafka closed');
        //     setInterval(()=>{
        //         this.connect(kafkaHost)
        //     }, 5000)
        //     // reject(error);
        // });

        this._client.on('brokersChanged', () => {
            console.error('broker changed');
            // setInterval(()=>{
            //     this.connect(kafkaHost)
            // }, 5000)
            // reject(error);
        });

        this._client.on('reconnect', () => {
            console.log('---- reconnecting --------');
        });

        return new Promise((resolve, reject) => {
            this._client.on('connect', () => {
                console.log('Connected to Kafka');
                resolve('ok');
            });
        });
    }

    createTopics(topics: CreateTopicRequest[]): Promise<void> {
        return new Promise((resolve, reject) => {
            this.client.createTopics(topics, (err: any, result: CreateTopicResponse[]) => {
                if (err) return reject(err);
                console.log('Topics has created');
                resolve();
            });
        });
    }
}

export const kafka = new Kafka();
