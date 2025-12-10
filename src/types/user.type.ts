import { RowDataPacket } from "mysql2/promise";

export interface BaseUser {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password_hash: string;
  is_active: 0 | 1;
  role: "HR_ADMIN" | "MEMBER" | "PROJECT_ADMIN";
  created_at: Date;
  updated_at: Date;
}

export interface User extends BaseUser, RowDataPacket {}

type OmmitedUser = "is_active" | "updated_at" | "created_at" | "id";

export type UserEditPayload = Omit<User, OmmitedUser>;

export type UserCreatePayload = Omit<User, OmmitedUser>;
