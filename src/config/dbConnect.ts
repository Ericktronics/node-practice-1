import mysql, {
  Pool,
  PoolConnection,
  RowDataPacket,
  ResultSetHeader,
  FieldPacket,
} from "mysql2/promise";
import { DB_HOST, DB_PASS, DB_USER, DB_PORT , DB_DATABASE} from "./env";

export const pool = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASS,
  database: DB_DATABASE,
  port: Number(DB_PORT) || 3306,
  connectionLimit: 10,
});


export async function query<
  T extends RowDataPacket[] | ResultSetHeader = RowDataPacket[]
>(
  sql: string,
  params?: any[]
): Promise<[T, FieldPacket[]]> {
  return pool.query<T>(sql, params);
}

export async function getClient(): Promise<PoolConnection> {
  return pool.getConnection();
}

export async function closePool(): Promise<void> {
  await pool.end();
}