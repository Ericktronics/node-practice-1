import { type Request, type Response } from "express";
import * as UserService from "../services/user.service";
import { logger } from "../config/logger";
logger.info("User controller");
export const getUsers = async (req: Request, res: Response) => {
  logger.info("Getting users");
  const user = await UserService.getAllUsers();
  logger.info("Users fetched", { user });
  res.status(200).send(user);
};

export const createUser = async (req: Request, res: Response) => {
  const { name, email } = req.body;
  logger.info("Creating user", { name, email });
  const userId = await UserService.createUser(name, email);
  logger.info("User created", { userId });
  res.status(201).send({ id: userId });
}

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  logger.info("Getting user by ID", { id });
  if(!id) {
    return res.status(400).send({ message: "Missing user ID" });
  }
  const user = await UserService.getUserById(+id);
  logger.info("User fetched", { user });
  if (user) {
    res.status(200).send(user);
  } else {
    res.status(404).send({ message: "User not found" });
  }
}
export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email } = req.body;
  logger.info("Updating user", { id, name, email });
  if(!name || !email || !id) {
    return res.status(400).send({ message: "Missing required fields" });
  }

  const updated = await UserService.updateUser(+id, name, email);
  logger.info("User updated", { updated });
  if (updated) {
    res.status(200).send({ message: "User updated successfully" });
  } else {
    res.status(404).send({ message: "User not found" });
  }   
}

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  logger.info("Deleting user", { id });
  if(!id) {
    return res.status(400).send({ message: "Missing user ID" });
  }

  const deleted = await UserService.deleteUser(+id);
  logger.info("User deleted", { deleted });
  if (deleted) {
    res.status(200).send({ message: "User deleted successfully" });
  } else {
    logger.error("User not found");
    res.status(404).send({ message: "User not found" });
  }
}   