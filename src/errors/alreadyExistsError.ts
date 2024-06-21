/**
 * Custom error class for indicating that an entity already exists.
 *
 * @status 409
 * @param {string} message - The error message.
 */
export class AlreadyExistsError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AlreadyExistsError";
  }
}
