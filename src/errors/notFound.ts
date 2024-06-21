/**
 * Custom error class for indicating that a resource was not found.
 *
 * @status 404
 * @param {string} message - The error message.
 */
export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NotFoundError";
  }
}
