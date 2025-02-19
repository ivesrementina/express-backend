import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

export interface IUser {
  id: number;                  // Auto-incremented in DB
  first_name: string;          // Required first name
  middle_name?: string;        // Optional middle name
  last_name: string;           // Required last name
  name_ext?: string;           // Optional name extension
  email: string;               // User email
  password?: string;           // Optional password for authentication
  created_at?: Date;           // Auto-set by MySQL
  updated_at?: Date;           // Auto-set by MySQL
}

// Create a database connection pool
export const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "testdb",
  port: Number(process.env.DB_PORT) || 3306,
  waitForConnections: true,
  connectionLimit: 10,  // Limits concurrent connections (adjust as needed)
  queueLimit: 0,
});

// ✅ Test Connection on Startup
(async () => {
  try {
    const [result] = await pool.query("SELECT DATABASE() AS db");
    console.log(`✅ Connected to Database:`, result);
  } catch (error) {
    console.error("❌ Database Connection Failed:", error);
    process.exit(1);  // Stop server if DB fails
  }
})();
