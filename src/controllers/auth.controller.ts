import { type Request, type Response } from "express";
import * as AuthService from "../services/auth.service";
import { logger } from "../config/logger";
import * as PasswordManger from "../utils/password";
import { JWT_SECRET } from "../config/env";

logger.info("Auth controller");

export const login = async (req: Request, res: Response) => {
  const { email, password_hash } = req.body;

  const registerdUser = (await AuthService.getUserByEmail(email))[0];

  if (!registerdUser) {
    return res.status(404).send({ message: "User not found" });
  }

  const verifyPassword = await PasswordManger.comparePassword(
    password_hash,
    registerdUser.password_hash
  );

  if (!verifyPassword) {
    return res.status(401).send({ messsage: "Invalid password!" });
  }

  const token = AuthService.generateToken({ user: registerdUser }, JWT_SECRET, {
    expiresIn: "1h",
  });

  res.status(200).send({ token });
};
