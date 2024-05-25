import { Connect } from "../Lib/Types";
import { connect } from "mongoose";
import { createConnection } from "mysql";
import { DATABASE_NAME } from "../Configs/db";
export class MongoService implements Connect {
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

export class MySQLService implements Connect {
    connection(): void {
        const mysqlConnect = createConnection({
            host: "localhost",
            port: 3306,
            user: "root",
            password: "",
            database: DATABASE_NAME,
        });
        mysqlConnect.connect((err) => {
            if (err) {
                console.error("Error connecting to database");
                return;
            }
            console.log("Connected to mysql database");
        });
    }
}
