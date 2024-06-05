import pool from "./src/Database/mysql";

(async () => {
    let admin = await pool.execute(
        "INSERT INTO employee (Name, Email, Password, Phone, Role) VALUES (?, ?, ?, ?, ?)",
        ["admin", "admin@", "admin", "123456789", "admin"]
    );
    console.log(admin);
})();
