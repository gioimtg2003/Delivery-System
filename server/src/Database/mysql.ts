import { createPool, PoolOptions, Pool } from "mysql2/promise";

const options: PoolOptions = {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.DATABASE_NAME,
    connectionLimit: 10,
    timezone: "+07:00",
    debug: false,
};

const pool: Pool = createPool(options);

export default pool;
