import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { db } from "../config/db";

export const registerUser = async (username: string, password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const [result] = await db.execute(
    "INSERT INTO users (username, password) VALUES (?, ?)",
    [username, hashedPassword]
  );
  return result;
};

export const loginUser = async (req : Request, res: Response) => {
    try {
        const { username, password } = req.body;
    // const [rows] = await db.execute("SELECT * FROM users WHERE username = ?", [
    //  username,
    // ]);
    // const user = rows[0];


    const user = {
      email: "1bUeh@example.com",
      password: "123456",
      username: "admin",
      name: username,
    };

    // await getUser(username);

    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // const isPasswordCorrect = await bcrypt.compare(password, user.password);
    const isPasswordCorrect = true;

    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }

    jwt.sign(
      user,
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
      (err, accessToken) => {
        if (err) {
          return res.status(500).json({
            message:
              "Error during the authentication service. Please try again",
          });
        }
        return res
          .status(200)
          .cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
          })
          .json({ accessToken });
      }
    );
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error while authenticating. Please try again" });
  }
};
