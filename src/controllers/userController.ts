import { updateUser } from "../models/user";
import {
  getAllUsersList,
  getUserProfile,
  getUserProfileById,
} from "../services/userService";
import { Request, Response } from "express";

export const getUserProfileHandler = async (req: Request, res: Response) => {
  try {
    const userName = req.body.user.username;
    if (!userName) {
      throw new Error("User not found");
    }
    const user = await getUserProfile(userName);
    res.status(200).json(user);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: "An unknown error occurred" });
    }
  }
};

export const getUserProfileByIdHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.params.id;
    const user = await getUserProfileById(parseInt(userId, 10));
    res.status(200).json(user);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: "An unknown error occurred" });
    }
  }
};

export const getAllUsersHandler = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsersList();
    res.status(200).json(users);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: "An unknown error occurred" });
    }
  }
};

export const updateUserHandler = async (req: Request, res: Response) => {
  try {
    const userId = req.body.user.id;
    if (!userId) {
      throw new Error("User not found");
    }
    const { id, username, password, isAdmin, deleted } = req.body.user;
    await updateUser(userId, username, password, isAdmin, deleted);
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: "An unknown error occurred" });
    }
  }
};

export const deleteUserHandler = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      throw new Error("User not found");
    }
    await updateUser(parseInt(userId, 10), null, null, null, true);
    res.status(204).json({ message: "User deleted successfully" });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: "An unknown error occurred" });
    }
  }
};
