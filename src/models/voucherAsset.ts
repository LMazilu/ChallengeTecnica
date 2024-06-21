import { db } from "../config/db";

export interface VoucherAsset {
  id: number;
  voucher_id: number;
  url: string;
}

/**
 * Creates voucher assets in the database and updates the corresponding voucher with the new URLs.
 *
 * @param {number} voucherId - The ID of the voucher.
 * @param {string[]} urls - An array of URLs to be added as voucher assets.
 * @return {Promise<void>} A Promise that resolves when the voucher assets are created and the voucher is updated.
 * @throws {Error} If there is an error during the creation or update process.
 */
export const createVoucherAssets = async (
  voucherId: number,
  urls: string[]
): Promise<void> => {
  const values = urls.map((url) => [voucherId, url]);
  try {
    // Inserimento dei nuovi URL nella tabella voucherAssets
    await db.query("INSERT INTO voucherAssets (voucher_id, url) VALUES ?", [
      values,
    ]);

    // Aggiornamento della tabella vouchers con i nuovi URL nel campo JSON
    await db.query("UPDATE vouchers SET assets = JSON_ARRAY(?) WHERE id = ?", [
      JSON.stringify(urls),
      voucherId,
    ]);

    // Commit della transazione
    await db.query("COMMIT");
  } catch (error) {
    // Rollback della transazione in caso di errore
    await db.query("ROLLBACK");
    throw error; // Rilancia l'errore per la gestione a livello superiore
  }
};

/**
 * Retrieves the voucher assets associated with a given voucher ID from the database.
 *
 * @param {number} voucherId - The ID of the voucher.
 * @return {Promise<VoucherAsset[]>} A Promise that resolves to an array of VoucherAsset objects representing the voucher assets.
 */
export const getVoucherAssets = async (
  voucherId: number
): Promise<VoucherAsset[]> => {
  const [rows] = await db.query(
    "SELECT * FROM voucherAssets WHERE voucher_id = ?",
    [voucherId]
  );
  return rows as VoucherAsset[];
};
