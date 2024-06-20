import { db } from "../config/db";
import bcrypt from "bcryptjs";

//init default database tables
export const initializeDatabase = async () => {
  // Crea la tabella 'users' se non esiste
  const createUsersTable = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      isAdmin BOOLEAN DEFAULT FALSE,
      deleted BOOLEAN DEFAULT FALSE
    )
  `;

  // Crea la tabella 'vouchers' se non esiste
  const createVouchersTable = `
    CREATE TABLE IF NOT EXISTS vouchers (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      description TEXT,
      prices JSON,
      assets JSON,
      deleted BOOLEAN DEFAULT FALSE
    )
  `;

  const createVoucherPricesTable = `
    CREATE TABLE IF NOT EXISTS voucherPrices (
      id INT AUTO_INCREMENT PRIMARY KEY,
      voucher_id INT,
      price DECIMAL(10, 2),
      FOREIGN KEY (voucher_id) REFERENCES vouchers(id) ON DELETE CASCADE
    );
  `;

  const createVoucherAssetsTable = `
    CREATE TABLE IF NOT EXISTS voucherAssets (
      id INT AUTO_INCREMENT PRIMARY KEY,
      voucher_id INT,
      url VARCHAR(255),
      FOREIGN KEY (voucher_id) REFERENCES vouchers(id) ON DELETE CASCADE
    );
  `;

  // Crea la tabella 'purchases' se non esiste
  const createPurchasesTable = `
    CREATE TABLE IF NOT EXISTS purchases (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT,
      voucher_id INT,
      price DECIMAL(10,2),
      purchaseDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (voucher_id) REFERENCES vouchers(id)
    )
  `;

  try {
    const connection = await db.getConnection();

    await connection.query(createUsersTable);
    await connection.query(createVouchersTable);
    await connection.query(createVoucherPricesTable);
    await connection.query(createVoucherAssetsTable);
    await connection.query(createPurchasesTable);

    connection.release();
  } catch (error) {
    console.error("Database initialization error:", error);
    throw error;
  }
};

//init default database users
const initializeDefaultUsers = async () => {
  const adminUsername = "admin";
  const adminPassword = "admin";
  const userUsername = "user";
  const userPassword = "user";

  const hashedAdminPassword = await bcrypt.hash(
    adminPassword,
    Number(process.env.BCRYPT_SALT_ROUNDS)
  );
  const hashedUserPassword = await bcrypt.hash(
    userPassword,
    Number(process.env.BCRYPT_SALT_ROUNDS)
  );

  const createAdminUser = `
    INSERT INTO users (username, password, isAdmin, deleted)
    VALUES (?, ?, TRUE, FALSE)
    ON DUPLICATE KEY UPDATE username=username;
  `;

  const createUser = `
    INSERT INTO users (username, password, isAdmin, deleted)
    VALUES (?, ?, FALSE, FALSE)
    ON DUPLICATE KEY UPDATE username=username;
  `;

  try {
    const connection = await db.getConnection();

    await connection.query(createAdminUser, [
      adminUsername,
      hashedAdminPassword,
    ]);
    await connection.query(createUser, [userUsername, hashedUserPassword]);

    connection.release();
  } catch (error) {
    console.error("Default user initialization error:", error);
    throw error;
  }
};

export const initialize = async () => {
  await initializeDatabase();
  await initializeDefaultUsers();
};
