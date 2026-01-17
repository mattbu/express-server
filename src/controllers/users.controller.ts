import { Request, Response } from "express";
import * as usersService from "../services/users.service";

export async function getUsers(req: Request, res: Response) {
  const users = await usersService.listUsers();
  res.json(users);
}

export async function getUser(req: Request, res: Response) {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    res.status(400).json({ message: "id must be a number" });
    return;
  }

  const user = await usersService.getUserById(id);
  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  res.json(user);
}
