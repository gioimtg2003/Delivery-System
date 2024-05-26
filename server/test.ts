import { MySQLService } from "./src/Database/connect";
import { LoginAdmin } from "./src/Services/Auth/LoginAdmin";
import { HashPassword } from "./src/Services/Hash";

let mysql = new MySQLService();
mysql.conn.query(
    "INSERT INTO Employee (Email, Password, Role) VALUES (?, ?, ?)",
    ["admin", "hello", "admin"],
    (err, result) => {
        if (err) {
            console.log(err);
        }
        console.log(result);
    }
);
