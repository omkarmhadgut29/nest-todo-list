import * as mysql from "mysql2/promise";
import * as dotenv from "dotenv";

dotenv.config({
  path: "development.env",
});

export const pool = mysql.createPool({
  host: process.env.DATABASEHOST,
  user: process.env.DATABASEUSER,
  password: process.env.DATABASEPASSWORD,
  database: "todo_db",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// export async function getConnection() {
//   return await mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "OmkarMysql@123",
//     database: "todo_db",
//   });
// }

export const pool2 = (processVar: any = "") => {
  return mysql.createPool({
    // host: "localhost",
    // host: hostName,
    // user: "root",
    // password: "OmkarMysql@123",
    host: processVar?.env?.DATABASEHOST || "localhost",
    user: processVar?.env?.DATABASEUSER || "root",
    password: processVar?.env?.DATABASEPASSWORD || "OmkarMysql@123",
    // host: process.env.DATABASEHOST,
    // user: process.env.DATABASEUSER,
    // password: process.env.DATABASEPASSWORD,
    database: "todo_db",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });
};
