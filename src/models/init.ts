import { db } from "../config/db";

export const initDb = async () => {
  // Crea la tabella 'users' se non esiste
  await db.execute(`
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      isAdmin BOOLEAN DEFAULT FALSE
    )
  `);

  // Crea la tabella 'vouchers' se non esiste
  await db.execute(`
    CREATE TABLE IF NOT EXISTS vouchers (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      description TEXT,
      price_options JSON,
      assets JSON
    )
  `);

  // Crea la tabella 'purchases' se non esiste
  await db.execute(`
    CREATE TABLE IF NOT EXISTS purchases (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT,
      voucher_id INT,
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (voucher_id) REFERENCES vouchers(id)
    )
  `);
};
