import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { db } from "../config/db";
import { RowDataPacket, FieldPacket, QueryResult } from "mysql2"; // Adjust the import based on your actual db client
import { NotFoundError } from "../errors/notFound";
import { InvalidCredentialsError } from "../errors/invalidCredentials";

interface User extends RowDataPacket {
  id: number;
  username: string;
  password: string;
  isAdmin: boolean;
}

export const registerUser = async (username: string, password: string) => {
  if (!process.env.BCRYPT_PASSWORD_SALT) {
    throw new Error("BCRYPT_PASSWORD_SALT is not defined");
  }
  const hashedPassword = await bcrypt.hash(password, process.env.BCRYPT_PASSWORD_SALT);
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

// Funzione per inizializzare gli utenti predefiniti
export const initializeDefaultUsers = async () => {
  try {
    // Controlla se gli utenti predefiniti esistono già
      const [userRows] = await db.query('SELECT * FROM users WHERE username = ?', ['user']);
      const [adminRows] = await db.query('SELECT * FROM users WHERE username = ?', ['admin']);
      if (!process.env.BCRYPT_PASSWORD_SALT) {
        throw new Error("BCRYPT_PASSWORD_SALT is not defined");
      }
      // Se non esiste l'utente "user", lo crea
      if (Array.isArray(userRows) && userRows.length === 0) {

          const hashedPasswordUser = await bcrypt.hash('user', process.env.BCRYPT_PASSWORD_SALT);
          await db.execute('INSERT INTO users (username, password, isAdmin) VALUES (?, ?, ?)', ['user', hashedPasswordUser, false]);
          console.log('Utente "user" creato con successo.');
    }

    // Se non esiste l'utente "admin", lo crea
    if (Array.isArray(adminRows)  && adminRows.length === 0) {
      const hashedPasswordAdmin = await bcrypt.hash('admin', process.env.BCRYPT_PASSWORD_SALT);
      await db.execute('INSERT INTO users (username, password, isAdmin) VALUES (?, ?, ?)', ['admin', hashedPasswordAdmin, true]);
      console.log('Utente "admin" creato con successo.');
    }
  } catch (error) {
    throw new Error("Errore durante l'inizializzazione degli utenti predefiniti: "+ error);
  }
};
