import "reflect-metadata";
import { DataSource } from "typeorm";
import { ActivityLog } from "./company.entity";
import { User } from "./user.entity";


import dotenv from "dotenv";
dotenv.config();

export function dbConnect() {
    const appDataSource = new DataSource({
        type: 'postgres',
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB,
        entities: [
            ActivityLog, User
        ],
        synchronize: true,
        logging: false
    })

    appDataSource.initialize()
        .then(() => {
            console.log("Data Source has been initialized!")
        })
        .catch((err) => {
            console.error("Error during Data Source initialization", err)
        })

}