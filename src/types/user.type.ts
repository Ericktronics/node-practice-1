import { RowDataPacket, FieldPacket, ResultSetHeader, PoolConnection } from 'mysql2/promise';

export interface User extends RowDataPacket {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password_hash: string;
  is_active: 0 | 1;
  created_at: Date;
  updated_at: Date;
}