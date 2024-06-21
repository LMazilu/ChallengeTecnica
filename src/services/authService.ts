import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { db } from "../config/db";
import { FieldPacket } from "mysql2";
import { NotFoundError } from "../errors/notFound";
import { InvalidCredentialsError } from "../errors/invalidCredentials";
import { AlreadyExistsError } from "../errors/alreadyExistsError";
import { User } from "../models/user";

/**
 * Registers a new user with the given username and password.
 *
 * @param {string} username - The username of the user to register.
 * @param {string} password - The password of the user to register.
 * @return {Promise<any>} A promise that resolves to the result of the database insertion operation.
 * @throws {Error} If the BCRYPT_SALT_ROUNDS environment variable is not defined.
 * @throws {AlreadyExistsError} If a user with the given username already exists.
 */
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


/**
 * Authenticates a user by checking their username and password against the database.
 * Returns a jwt access token.
 *
 * @param {string} username - The username of the user.
 * @param {string} password - The password of the user.
 * @return {Promise<string>} - A promise that resolves to the access token if the authentication is successful.
 * @throws {NotFoundError} - If no user is found with the given username.
 * @throws {InvalidCredentialsError} - If the provided password is incorrect.
 * @throws {Error} - If the JWT_SECRET environment variable is not defined.
 */
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


/**
 * Initializes default users in the database if they don't already exist.
 *
 * @return {Promise<void>} A promise that resolves when the default users are successfully initialized.
 * @throws {Error} If the BCRYPT_SALT_ROUNDS environment variable is not defined.
 * @throws {Error} If there is an error during the initialization process.
 */
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
