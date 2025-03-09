import { Request, Response } from "express";
import {
  createUser,
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser,
} from "../services/user.service";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const { email, firstName, lastName, roleId, page, limit } = req.query;

    const users = await getAllUsers(
      email ? String(email) : undefined,
      firstName ? String(firstName) : undefined,
      lastName ? String(lastName) : undefined,
      roleId ? Number(roleId) : undefined,
      page ? Number(page) : 1,
      limit ? Number(limit) : undefined
    );

    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Error fetching users" });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await getUserById(Number(id));
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Error fetching user" });
  }
};

export const createNewUser = async (req: Request, res: Response) => {
  try {
    const { email, password, firstName, lastName, roleId } = req.body;
    if (!email || !password) {
      res.status(400).json({ message: "Email and password are required." });
    }

    const newUser = await createUser(email, password, firstName, lastName, roleId);
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Error creating user" });
  }
};

export const updateUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { email, password, firstName, lastName, roleId } = req.body;

    const updatedUser = await updateUser(
      Number(id),
      email,
      password,
      firstName,
      lastName,
      roleId
    );

    res.json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Error updating user" });
  }
};

export const deleteUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await deleteUser(Number(id));
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Error deleting user" });
  }
};
