import { Request, Response } from "express";
import { registerUser, loginUser } from "../services/authService";


/**
 * @route POST /auth/register
 * @description Register a new user.
 * @param {string} username - The username for the new user.
 * @param {string} password - The password for the new user.
 * @returns {Response} - Returns a 201 status code if the user is successfully registered, or a 409 status code if a user with that username already exists.
 */
export const register = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    await registerUser(username, password);
    res.status(201).send("User registered");
  } catch (error) {
    res.status(409).send("User with that username already exists");
  }
};

/**
 * @route POST /auth/login
 * @description Login a user and generate an access token.
 * @param {string} username - The username of the user.
 * @param {string} password - The password of the user.
 * @returns {Response} - Returns a 200 status code if the login is successful, with an access token in the response body. Returns a 401 status code if the credentials are invalid.
 */
export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const token = await loginUser(username, password);
    res
      .status(200)
      .cookie("accessToken", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      })
      .json({ token });
  } catch (error) {
    res.status(401).send("Invalid credentials");
  }
};

