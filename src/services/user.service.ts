import * as connection from "../config/dbConnect";
import { ResultSetHeader } from "mysql2/promise";
import * as UserType from "../types/user.type";
import { logger } from "../config/logger";

export async function getAllUsers(): Promise<UserType.User[]> {
  try {
    logger.info("Fetching all users");
    const [rows] = await connection.query<UserType.User[]>(
      "SELECT * FROM tbuser_main"
    );
    logger.info("Fetched users", { count: rows.length });
    return rows;
  } catch (error) {
    logger.error("Failed to fetch users", { error });
    throw error;
  }
}

export async function createUser(
  props: UserType.UserCreatePayload
): Promise<number> {
  const { first_name, last_name, email, password_hash } = props;
  try {
    logger.info("Creating user", { email });
    const [result] = await connection.query<ResultSetHeader>(
      "INSERT INTO tbuser_main (first_name, last_name, email, password_hash) VALUES (?, ?, ?, ?)",
      [first_name, last_name, email, password_hash]
    );
    logger.info("User created", { id: result.insertId, email });
    return result.insertId;
  } catch (error) {
    logger.error("Failed to create user", { email, error });
    throw error;
  }
}

export async function getUserById(id: number): Promise<UserType.User | null> {
  try {
    logger.info("Fetching user by id", { id });
    const [rows] = await connection.query<UserType.User[]>(
      "SELECT * FROM tbuser_main WHERE id = ?",
      [id]
    );
    const user = rows[0] ?? null;
    logger.info("Fetched user by id", { id, found: !!user });
    return user;
  } catch (error) {
    logger.error("Failed to fetch user by id", { id, error });
    throw error;
  }
}

export async function updateUser(
  props: UserType.UserEditPayload
): Promise<boolean> {
  const { first_name, last_name, email, password_hash, id } = props;
  try {
    logger.info("Updating user", { id, email });
    const [result] = await connection.query<ResultSetHeader>(
      "UPDATE tbuser_main SET first_name = ?, last_name = ?, email = ?, password_hash = ? WHERE id = ?",
      [first_name, last_name, email, password_hash, id]
    );
    const updated = result.affectedRows > 0;
    logger.info("User update result", { id, updated });
    return updated;
  } catch (error) {
    logger.error("Failed to update user", { id, email, error });
    return false;
  }
}

export async function deleteUser(id: number): Promise<boolean> {
  try {
    logger.info("Deleting user", { id });
    const [result] = await connection.query<ResultSetHeader>(
      "DELETE FROM tbuser_main WHERE id = ?",
      [id]
    );
    const deleted = result.affectedRows > 0;
    logger.info("User delete result", { id, deleted });
    return deleted;
  } catch (error) {
    logger.error("Failed to delete user", { id, error });
    throw error;
  }
}