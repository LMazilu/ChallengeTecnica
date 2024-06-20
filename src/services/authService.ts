import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { db } from "../config/db";
import { RowDataPacket, FieldPacket } from "mysql2";
import { NotFoundError } from "../errors/notFound";
import { InvalidCredentialsError } from "../errors/invalidCredentials";
import { AlreadyExistsError } from "../errors/alreadyExistsError";
import { User } from "../models/user";

export const registerUser = async (username: string, password: string) => {
  if (!process.env.BCRYPT_SALT_ROUNDS) {
    throw new Error("BCRYPT_SALT_ROUNDS is not defined");
  }
  // Check if the user already exists
  const [existingUsers]: [User[], FieldPacket[]] = await db.execute(
    "SELECT * FROM users WHERE username = ?",
    [username]
  );
  if (existingUsers.length > 0) {
    throw new AlreadyExistsError("User with that username already exists");
  }
  const salt = await bcrypt.genSalt(
    parseInt(process.env.BCRYPT_SALT_ROUNDS, 10)
  );
  const hashedPassword = await bcrypt.hash(password, salt);
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

  const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "1d" });
  if (!token) {
    throw new Error(
      "Error during the authentication service. Please try again"
    );
  }

  return token;
};

// Funzione per inizializzare gli utenti predefiniti
export const initializeDefaultUsers = async () => {
  try {
    // Controlla se gli utenti predefiniti esistono già
    const [userRows] = await db.query(
      "SELECT * FROM users WHERE username = ?",
      ["user"]
    );
    const [adminRows] = await db.query(
      "SELECT * FROM users WHERE username = ?",
      ["admin"]
    );
    if (!process.env.BCRYPT_SALT_ROUNDS) {
      throw new Error("BCRYPT_SALT_ROUNDS is not defined");
    }
    // Se non esiste l'utente "user", lo crea
    if (Array.isArray(userRows) && userRows.length === 0) {
      const saltUser = await bcrypt.genSalt(
        parseInt(process.env.BCRYPT_SALT_ROUNDS, 10)
      );
      const hashedPasswordUser = await bcrypt.hash("user", saltUser);
      await db.execute(
        "INSERT INTO users (username, password, isAdmin) VALUES (?, ?, ?)",
        ["user", hashedPasswordUser, false]
      );
      console.log('Utente "user" creato con successo.');
    }

    // Se non esiste l'utente "admin", lo crea
    if (Array.isArray(adminRows) && adminRows.length === 0) {
      const saltAdmin = await bcrypt.genSalt(
        parseInt(process.env.BCRYPT_SALT_ROUNDS, 10)
      );
      const hashedPasswordAdmin = await bcrypt.hash("admin", saltAdmin);
      await db.execute(
        "INSERT INTO users (username, password, isAdmin) VALUES (?, ?, ?)",
        ["admin", hashedPasswordAdmin, true]
      );
      console.log('Utente "admin" creato con successo.');
    }
  } catch (error) {
    throw new Error(
      "Errore durante l'inizializzazione degli utenti predefiniti: " + error
    );
  }
};
