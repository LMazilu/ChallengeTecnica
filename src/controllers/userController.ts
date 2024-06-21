import { updateUser } from "../models/user";
import {
  getAllUsersList,
  getUserProfile,
  getUserProfileById,
} from "../services/userService";
import { Request, Response } from "express";

/**
 * Handles the request to get the user profile.
 *
 * @route GET /users/profile
 * @param {Request} req - The request object containing the user's username.
 * @param {Response} res - The response object to send the user profile data.
 * @return {Promise<void>} A promise that resolves when the user profile is retrieved and sent in the response.
 * @throws {Error} If the user's username is not found.
 * @throws {Error} If an unknown error occurs.
 */
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

/**
 * Retrieves the user profile by their ID.
 *
 * @route GET /users/:id
 * @param {Request} req - The request object containing the user ID.
 * @param {Response} res - The response object to send the user profile.
 * @return {Promise<void>} A promise that resolves when the user profile is retrieved and sent in the response.
 * @throws {Error} If the user ID is not provided or if an unknown error occurs.
 */
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

/**
 * Retrieves a list of all users and sends it as a JSON response.
 *
 * @route GET /users
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @return {Promise<void>} A promise that resolves when the response is sent.
 */
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

/**
 * Handles updating a user's information based on the provided request.
 *
 * @route PUT /users
 * @param {Request} req - The request object containing the user details to update.
 * @param {Response} res - The response object to send the update status.
 * @return {Promise<void>} A promise that resolves when the user is updated successfully.
 */
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

/**
 * Handles deleting a user logically based on the provided request.
 *
 * @routee DELETE /users/:id
 * @param {Request} req - The request object containing the user ID to delete.
 * @param {Response} res - The response object to send the deletion status.
 * @return {Promise<void>} A promise that resolves when the user is deleted successfully.
 */
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
