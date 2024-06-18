import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { db } from "../config/db";
import { RowDataPacket, FieldPacket } from "mysql2"; // Adjust the import based on your actual db client
import { NotFoundError } from "../errors/notFound";
import { InvalidCredentialsError } from "../errors/invalidCredentials";

interface User extends RowDataPacket {
  id: number;
  username: string;
  password: string;
  isAdmin: boolean;
}

export const registerUser = async (username: string, password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const [result] = await db.execute(
    "INSERT INTO users (username, password) VALUES (?, ?)",
    [username, hashedPassword]
  );
  return result;
};

export const loginUser = async (username: string, password: string) => {
  const [rows]: [User[], FieldPacket[]] = await db.execute(
    "SELECT * FROM users WHERE username = ?",
    [username]
  );
  const user = rows[0];
    if (!user) {
    throw new NotFoundError("No user found");
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
    throw new InvalidCredentialsError("Invalid password");
  }

  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }

    const token = jwt.sign(
        user,
        process.env.JWT_SECRET,
        { expiresIn: "1d" });
    if (!token) {
        throw new Error("Error during the authentication service. Please try again");
    }

    return token;
};
