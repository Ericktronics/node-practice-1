import { RowDataPacket } from "mysql2/promise";

export interface BaseUser {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password_hash: string;
  is_active: 0 | 1;
  created_at: Date;
  updated_at: Date;
}

export interface User extends BaseUser, RowDataPacket {}


export type UserEditPayload = Omit<User, "updated_at" | "created_at">;

export type UserCreatePayload = Omit<
  User,
  "is_active" | "updated_at" | "created_at" | "id"
>;
