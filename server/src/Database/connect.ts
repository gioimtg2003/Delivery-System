import { connect } from "mongoose";
import { DATABASE_NAME } from "../Configs/db";
import { IConnect } from "../Lib/Types/Connect";
import mysql from "mysql2/promise";

export class MongoService implements IConnect {
    private uri: string | undefined;
    private database: string | undefined;
    constructor(uri: string | undefined, database: string | undefined) {
        this.uri = uri;
        this.database = database;
    }
    connection(): void {
        if (this.uri === undefined) {
            throw new Error("URI not defined");
        }
        try {
            if (this.database !== undefined) {
                connect(this.uri, {
                    dbName: this.database,
                });
                console.log("Connected to mongo database");
                return;
            }
        } catch (error) {
            console.error(error);
            throw new Error("Error connecting to database");
        }
    }
}

// export class MySQLService implements IConnect {
//     public conn: Promise<mysql.Connection>;
//     constructor() {
//         this.conn = mysql.createConnection({
//             host: "localhost",
//             port: 3306,
//             user: "root",
//             password: "root",
//             database: "DeliverySystem",
//         });
//         this.conn.then((err) => {
//             if (err) {
//                 console.error(err);
//                 process.exit(1);
//             }
//             console.log("Connected to mysql database");
//         });
//     }
//     connection(): void {}
// }
