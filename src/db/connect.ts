import "reflect-metadata";
import { DataSource, createConnection } from "typeorm";
import { ActivityLog } from "./company.entity";
import { User } from "./user.entity";
// export function dbConnect (){
//     return new Promise((resolve, rejects)=>{
//         createConnection({
//             type: 'postgres',
//             host: process.env.DB_HOST,
//             port: Number(process.env.DB_PORT),
//             username: process.env.DB_USERNAME,
//             password: process.env.DB_PASSWORD,
//             database: process.env.DB,
//             entities: [
//                 ActivityLog, User

//             ],
//             synchronize: true,
//             logging: false
//         }).then(connection => {
//             console.log(`connected to db`);
//             resolve(connection);
//         }).catch(error => {
//             console.log(`DB error`);
//             rejects(error);
//         });
//     })
// }

export function dbConnect(){
const AppDataSource = new DataSource({
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

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })

}