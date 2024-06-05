import { createPool, PoolOptions, Pool } from "mysql2";
export class BaseService {
    protected options: PoolOptions;
    protected pool: Pool;
    constructor() {
        this.options = {
            host: "localhost",
            user: "root",
            password: "root",
            database: "DeliverySystem",
            connectionLimit: 100,
        };
        this.pool = createPool(this.options);
        this.pool.getConnection((err, connection) => {});
    }
}
