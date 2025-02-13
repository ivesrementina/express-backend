import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

export interface User {
    id: string;
    name: string;
    email: string;
  }

  dotenv.config();

  // Create a database connection pool
  export const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'testdb',
    port: 3306,
  }); 