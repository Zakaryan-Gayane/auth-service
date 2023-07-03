import express from "express";
import cors from 'cors';
import "express-async-errors";
import { json } from "body-parser";
import { dbConnect } from "./db/connect";
import http from "http"
import { kafka } from "./brokers/kafka";
import { NotFoundError } from "./errors/not-found-error";
import { errorHandler } from "./middlewares/error-handler";
import { indexRouter } from "./routes";


const port = process.env.PORT;
const kafkaHost = process.env.KAFKA_HOST || "kafka:9092";
const app = express()
app.set("trust proxy", true);
app.use(json());
app.use(cors());

app.use(indexRouter)
app.get("/super", (req, res) => {
    return res.json("OK");
});


app.all("*", async (req, res) => {
    throw new NotFoundError();;
});
app.use(errorHandler);

const httpServer = http.createServer(app);
const start = async () => {
    if (!process.env.JWT_KEY) {
        throw new Error("JWT_KEY must be defined");
    }
    try {
        await dbConnect();
        await kafka.connect(kafkaHost);

        httpServer.listen(port, () =>
            console.info(`Secure app listening on port ${port}`)
        );

    } catch (error) {
        console.log(error);

    }
};

start();

