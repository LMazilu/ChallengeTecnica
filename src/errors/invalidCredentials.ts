/**
 * Custom error class for indicating invalid credentials.
 *
 * @status 400
 * @param {string} message - The error message.
 */
export class InvalidCredentialsError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvalidCredentialsError";
  }
}
