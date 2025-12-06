import dotenv from "dotenv";
dotenv.config({path: './src/.env'});

export const DB_HOST = process.env.DB_HOST || "localhost";
export const DB_USER = process.env.DB_USER || "user";
export const DB_PASS = process.env.DB_PASS || "password";
export const DB_PORT = process.env.DB_PORT || 3306;
export const DB_DATABASE = process.env.DB_DATABASE || "node-practice-1";


export const PORT = process.env.PORT || 3000;

export const JWT_SECRET = process.env.JWT_SECRET || "default_secret";