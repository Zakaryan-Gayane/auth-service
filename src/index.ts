import express from "express";
import http from "http"
import cors from 'cors';
import "express-async-errors";
import { json } from "body-parser";
import { EntityNotFoundError } from "typeorm";
import { dbConnect } from "./db/connect";

const port = process.env.PORT;
const app = express()
app.set("trust proxy", true);
app.use(json());
app.use(cors());

app.get("/health", (req, res) => {
    return res.json("OK");
});
// app.use(indexRouter)
// app.all("*", async (req, res) => {
//   throw new EntityNotFoundError();
// });
// app.use(errorHandler);

const httpServer = http.createServer(app);

const start = async () => {
    await dbConnect();
    try {
        app.listen(port, () => {
            console.log(`Listening on port ${port}!`);
        });
    } catch (error) {
        console.log(error);

    }
};

start();

