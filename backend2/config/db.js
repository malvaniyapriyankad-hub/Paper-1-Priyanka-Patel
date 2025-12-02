// // backend/config/db.js
// import mysql from "mysql2";

// const pool = mysql.createPool({
//   host: "localhost",
//   user: "root",          // your MySQL user
//   password: "",          // your MySQL password
//   database: "recipe_finder",
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0,
// });

// pool.getConnection((err, connection) => {
//   if (err) {
//     console.error("❌ MySQL connection failed:", err.message);
//   } else {
//     console.log("✅ MySQL connected successfully");
//     connection.release();
//   }
// });

// export default pool.promise();


// backend/config/db.js
import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config(); // load .env

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Just to test connection once when server starts
pool.getConnection((err, connection) => {
  if (err) {
    console.error("❌ MySQL connection failed:", err.message);
  } else {
    console.log("✅ MySQL connected successfully");
    connection.release();
  }
});

// Use .promise() to use async/await
const db = pool.promise();

export default db;
