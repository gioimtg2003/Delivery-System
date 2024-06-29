import { createPool, PoolOptions, Pool } from "mysql2/promise";

const options: PoolOptions = {
    host: "localhost",
    user: "root",
    password: "root",
    database: "DeliverySystem",
    connectionLimit: 10,
    timezone: "+07:00",
    debug: false,
};

const pool: Pool = createPool(options);

export default pool;
