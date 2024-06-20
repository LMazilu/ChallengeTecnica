import { db } from "../config/db";
import { RowDataPacket } from "mysql2";

export interface User extends RowDataPacket {
  id: number;
  username: string;
  password: string;
  isAdmin: boolean;
  deleted: boolean;
}

export const getUserByUsername = async (
  username: string
): Promise<User | null> => {
  const [rows]: [User[], any] = await db.query(
    "SELECT id, username, password, isAdmin, deleted FROM users WHERE username = ?",
    [username]
  );
  return (rows[0] as User) || null;
};

export const getUserById = async (id: number): Promise<User | null> => {
  const [rows]: [User[], any] = await db.query(
    "SELECT id, username, password, isAdmin, deleted FROM users WHERE id = ?",
    [id]
  );
  return rows[0];
};

export const getAllUsers = async (): Promise<User[]> => {
  const [rows]: [User[], any] = await db.query(
    "SELECT id, username, password, isAdmin, deleted FROM users"
  );
  return rows;
};

export const updateUser = async (
  id: number,
  username?: string | null,
  password?: string | null,
  isAdmin?: boolean | null,
  deleted?: boolean | null
): Promise<void> => {
  // Costruisci la query SQL dinamicamente
  const fields: string[] = [];
  const values: (string | boolean | number)[] = [];

  if (username !== undefined && username !== null) {
    fields.push("username = ?");
    values.push(username);
  }

  if (password !== undefined && password !== null) {
    fields.push("password = ?");
    values.push(password);
  }

  if (isAdmin !== undefined && isAdmin !== null) {
    fields.push("isAdmin = ?");
    values.push(isAdmin);
  }

  if (deleted !== undefined && deleted !== null) {
    fields.push("deleted = ?");
    values.push(deleted);
  }

  // Se non ci sono campi da aggiornare, esci dalla funzione
  if (fields.length === 0) {
    throw new Error("No fields to update");
  }

  // Aggiungi l'id alla fine dei valori
  values.push(id);

  const query = `UPDATE users SET ${fields.join(", ")} WHERE id = ?`;

  // Esegui la query
  await db.query(query, values);
};
