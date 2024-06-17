import { Request, Response } from "express";
import { loginUser } from "../services/authService";

export const register = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    // await registerUser(username, password);
    res.status(201).send("User registered");
  } catch (error) {
    res.status(500).send("Error registering user");
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    // const { token } = await loginUser(username, password);
    // res.json({ token });
  } catch (error) {
    res.status(401).send("Invalid credentials");
  }
};
