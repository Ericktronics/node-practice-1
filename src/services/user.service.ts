import * as connection from '../config/dbConnect';
import { ResultSetHeader } from 'mysql2/promise';
import * as UserType from '../types/user.type';


export async function getAllUsers(): Promise<UserType.User[]> {
  const [rows] = await connection.query<UserType.User[]>('SELECT * FROM tbuser_main');
  return rows;
}

export async function createUser(name: string, email: string): Promise<number> {
  const [result] = await connection.query<ResultSetHeader>(
    'INSERT INTO users (name, email) VALUES (?, ?)',
    [name, email]
  );
  return result.insertId;
}

export async function getUserById(id: number): Promise<UserType.User | null> {
  const [rows] = await connection.query<UserType.User[]>(
    'SELECT id, name, email FROM users WHERE id = ?',
    [id]
  );
  return rows[0] ?? null;
}

export async function updateUser(id: number, name: string, email: string): Promise<boolean> {
  const [result] = await connection.query<ResultSetHeader>(
    'UPDATE users SET name = ?, email = ? WHERE id = ?',
    [name, email, id]
  );
  return result.affectedRows > 0;
}

export async function deleteUser(id: number): Promise<boolean> {
  const [result] = await connection.query<ResultSetHeader>(
    'DELETE FROM users WHERE id = ?',
    [id]
  );
  return result.affectedRows > 0;
}