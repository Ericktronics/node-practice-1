import jwt from "jsonwebtoken";
import * as connection from "../config/dbConnect";
import * as UserType from "../types/user.type";

export const generateToken = (
  payload: object,
  secret: string,
  options?: jwt.SignOptions
): string => {
  return jwt.sign(payload, secret, options);
};

export const verifyToken = (token: string, secret: string): object | string => {
  return jwt.verify(token, secret);
};

export async function getUserByEmail(email: string) {
  const result = await connection.query<UserType.User[]>(
    "SELECT * FROM tbuser_main WHERE email= ?",
    [email]
  );
  return result[0] ?? null;
}