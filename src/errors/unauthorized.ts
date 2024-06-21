/**
 * Custom error class for indicating unauthorized access.
 *
 * @status 401
 * @param {string} message - The error message.
 */
export class UnauthorizedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UnauthorizedError";
  }
}
