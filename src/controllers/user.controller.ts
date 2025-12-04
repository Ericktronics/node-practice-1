import { type Request, type Response } from "express";
import * as UserService from "../services/user.service";

export const getUsers = async (req: Request, res: Response) => {
  const user = await UserService.getAllUsers();
  res.status(200).send(user);
};

export const createUser = async (req: Request, res: Response) => {
  const { name, email } = req.body;
  const userId = await UserService.createUser(name, email);
  res.status(201).send({ id: userId });
}

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await UserService.getUserById(id);
  if (user) {
    res.status(200).send(user);
  } else {
    res.status(404).send({ message: "User not found" });
  }
}
export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email } = req.body;
  const updated = await UserService.updateUser(id, name, email);
  if (updated) {
    res.status(200).send({ message: "User updated successfully" });
  } else {
    res.status(404).send({ message: "User not found" });
  }   
}

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const deleted = await UserService.deleteUser(id);
  if (deleted) {
    res.status(200).send({ message: "User deleted successfully" });
  } else {
    res.status(404).send({ message: "User not found" });
  }
}   