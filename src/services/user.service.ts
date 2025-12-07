import * as connection from "../config/dbConnect";
import { ResultSetHeader } from "mysql2/promise";
import * as UserType from "../types/user.type";

export async function getAllUsers(): Promise<UserType.User[]> {
  const [rows] = await connection.query<UserType.User[]>(
    "SELECT * FROM tbuser_main"
  );
  return rows;
}

export async function createUser(
  props: UserType.UserCreatePayload
): Promise<number> {
  const { first_name, last_name, email, password_hash } = props;
  const [result] = await connection.query<ResultSetHeader>(
    "INSERT INTO tbuser_main (first_name, last_name, email, password_hash) VALUES (?, ?, ?, ?)",
    [first_name, last_name, email, password_hash]
  );
  return result.insertId;
}

export async function getUserById(id: number): Promise<UserType.User | null> {
  const [rows] = await connection.query<UserType.User[]>(
    "SELECT * FROM tbuser_main WHERE id = ?",
    [id]
  );
  return rows[0] ?? null;
}

export async function updateUser(
  props: UserType.UserEditPayload
): Promise<boolean> {
  const { first_name, last_name, email, password_hash, id } = props;
  const [result] = await connection.query<ResultSetHeader>(
    "UPDATE tbuser_main SET first_name = ?, last_name = ?, email = ?, password_hash = ? WHERE id = ?",
    [first_name, last_name, email, password_hash, id]
  );
  return result.affectedRows > 0;
}

export async function deleteUser(id: number): Promise<boolean> {
  const [result] = await connection.query<ResultSetHeader>(
    "DELETE FROM tbuser_main WHERE id = ?",
    [id]
  );
  return result.affectedRows > 0;
}