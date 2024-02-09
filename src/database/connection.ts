import * as mysql from "mysql2/promise";

// export async function getConnection() {
//   return await mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "OmkarMysql@123",
//     database: "todo_db",
//   });
// }

export const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "OmkarMysql@123",
  database: "todo_db",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
