import { Request, Response } from "express";
import { registerUser, loginUser } from "../services/authService";

export const register = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    await registerUser(username, password);
    res.status(201).send("User registered");
  } catch (error) {
    res.status(409).send("User with that username already exists");
  }
};

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
