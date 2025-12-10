import { type Request, type Response } from "express";
import * as UserService from "../services/user.service";
import { logger } from "../config/logger";
import * as UserType from "../types/user.type";
import * as PasswordManger from "../utils/password";

logger.info("User controller");

export const getUsers = async (req: Request, res: Response) => {
  logger.info("Getting users");
  const user = await UserService.getAllUsers();
  logger.info("Users fetched", { user });
  res.status(200).send(user);
};

export const createUser = async (req: Request, res: Response) => {
  const { first_name, last_name, email, password_hash } = req.body;

  logger.info("Creating user", { first_name, last_name, email, password_hash });

  if (!first_name || !last_name || !email || !password_hash) {
    return res.status(400).send({ message: "Missing required fields" });
  }

  const userCreatePayload: UserType.UserCreatePayload = {
    first_name,
    last_name,
    email,
    password_hash: await PasswordManger.hashPassword(password_hash),
  };

  const userId = await UserService.createUser(userCreatePayload);
  
  logger.info("User created", { userId });
  res.status(201).send({ userId });
};

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  logger.info("Getting user by ID", { id });
  if (!id) {
    return res.status(400).send({ message: "Missing user ID" });
  }
  const user = await UserService.getUserById(+id);
  
  if (!user) {
    return res.status(404).send({ message: "User not found" });
  }
  
  logger.info("User fetched", { user });
  res.status(200).send(user);
};

export const updateUser = async (req: Request, res: Response) => {
  const id = +req.params.id!;
  const { first_name, last_name, email, password_hash, is_active } = req.body;
  logger.info("Updating user", {
    id,
    first_name,
    last_name,
    email,
    password_hash,
  });

  if (!id) {
    return res.status(400).send({ message: "No User Id!" });
  }
  const user = await UserService.getUserById(+id);

  if (!user) {
    return res.status(404).send({ message: "User not found" });
  }
  logger.info("User found", { user });

  const userEdit: UserType.UserEditPayload = {
    id: id ?? user.id,
    first_name: first_name ?? user.first_name,
    last_name: last_name ?? user.last_name,
    password_hash: password_hash
      ? await PasswordManger.hashPassword(password_hash)
      : user.password_hash,
    email: email ?? user.email,
    is_active: is_active ?? user.is_active,
  };

  const updated = await UserService.updateUser(userEdit);
  if (!updated) {
    return res.status(500).send({ message: "Failed to update user" });
  }
  logger.info("User updated", { updated });
  res.status(200).send({ message: "User updated successfully" });
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  logger.info("Deleting user", { id });
  if (!id) {
    return res.status(400).send({ message: "Missing user ID" });
  }

  const deleted = await UserService.deleteUser(+id);
  logger.info("User deleted", { deleted });
  if (!deleted) {
    logger.error("User not found");
    return res.status(404).send({ message: "User not found" });
  }
  res.status(200).send({ message: "User deleted successfully" });
};
