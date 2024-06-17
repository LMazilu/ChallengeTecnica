import mysql from "mysql2/promise";

export const db = mysql.createPool({
  host: "db", // nome del servizio docker del database
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "challenge_tecnica_db",
});
